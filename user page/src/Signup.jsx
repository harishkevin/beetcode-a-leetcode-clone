import { useState } from "react";
import {Card, Typography, TextField, Button} from '@mui/material'


function Signup() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    // const host = window.location.host
    const host = 'localhost:3000'

    return <div style={{
        display : 'flex',
        justifyContent : 'center',
        backgroundColor : '#ecf0f1',
        alignItems: 'center',
        height: '100vh'
    }}>
        <Card style={{
            width : '350px',
            padding : 30,
            height : '400px',
            display : 'flex',
            flexDirection : 'column',
            alignItems : 'center',
            paddingTop : 70
        }}>
        <img style={{
            width : 60,
            marginBottom: -15
        }} src="../beet_5194813 (1).png" alt="" />
        <Typography variant='h5' style={{
            margin : 25,
            marginTop: 0
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
                    setUser({
                        userEmail: username,
                        isLoading: false
                    })
                    navigate('/home')
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