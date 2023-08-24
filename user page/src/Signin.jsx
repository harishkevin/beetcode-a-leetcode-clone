import { useState } from "react";
import {Button, Typography, TextField, Card} from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "./store/atoms/user";


function Signup() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)

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
            fetch(`http://${host}/user/login`,{
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
                    // window.location = '/home'
                    setUser({
                        userEmail: username,
                        isLoading: false
                    })
                    navigate('/home')

                })
            })
        }}>Sign In</Button>
        <Button style={{
            color:'#728691',
            textTransform : 'capitalize',
            alignSelf : 'flex-end',
            margin : 10
        }}>Sign Up</Button>
        </Card>
    </div>
}

export default Signup;