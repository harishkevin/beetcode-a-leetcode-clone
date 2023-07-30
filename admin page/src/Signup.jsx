import {Card, Typography, Button, TextField} from '@mui/material'
import { useState } from 'react'



function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <div style={{
        display : 'flex',
        justifyContent : 'center'
    }}>
        <Card variant="outlined" style={{
            width : 400,
            padding : 20
        }}>

            <TextField onChange={(e) => {
                setUsername(e.target.value)
            }} fullWidth id="username" label="Username" variant="outlined" />
            <br /><br />
            <TextField onChange={(e) => {
                setPassword(e.target.value)
            }} fullWidth id="password" label="Password" variant="outlined" type='password' />
            <br /><br />
            <Button onClick={() => {
                fetch('http://localhost:3000/admin/signup',{
                    method : 'POST',
                    body : JSON.stringify({
                        username : username,
                        password : password
                    }),
                    headers : {
                        'Content-type': 'Application/json'
                    }
                }).then((res) => {
                    res.json().then((data) => {
                        console.log(data)
                        localStorage.setItem('token', data.token)
                        window.location = '/home'
                    })
                })
            }} variant="contained">Sign up</Button>
        </Card>
    </div>
}

export default Signup;