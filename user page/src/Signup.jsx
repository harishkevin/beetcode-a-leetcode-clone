import { useState } from "react";
import {Card, Typography, TextField, Button} from '@mui/material'


function Signup() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const host = window.localStorage.host

    return <div style={{
        display : 'flex',
        justifyContent : 'center',
        backgroundColor : '#ecf0f1',
        padding : 125,
        height : '65.4vh'
    }}>
        <Card style={{
            width : '20vw',
            padding : 30,
            height : '400px',
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
            paddingTop : 70
        }}>
        <Typography variant='h5' style={{
            margin : 25
        }}>beetcode</Typography>
        <TextField label='username' fullWidth onChange={(e)  => {
            setUsername(e.target.value)
        }} type="text" />
        <br /><br />
        <TextField label='password' fullWidth onChange={(e) => {
            setPassword(e.target.value)
        }} type="password" />
        <br /><br />
        <Button variant="contained" fullWidth style={{
            backgroundColor : '#526a76',
            textTransform : 'capitalize'
        }} onClick={() => {
            fetch(`http://${host}/user/signup`,{
                method : "POST",
                body : JSON.stringify({
                    username : username,
                    password : password
                }),
                headers : {
                    'Content-type' : 'Application/json'
                }
            }).then((res) => {
                res.json().then((data) => {
                    console.log(data)
                    localStorage.setItem('token', data.token)
                })
            })
        }}>Sign up</Button>
        <Button style={{
            color:'#728691',
            textTransform : 'capitalize',
            alignSelf : 'flex-end',
            margin : 10
        }}>Sign In</Button>
        </Card>
    </div>
}

export default Signup;