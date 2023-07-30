import {Typography, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


function OtherAppbar() {
    const navigate = useNavigate()
    const [username, setUsername] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/admin/me',{
            method : 'GET',
            headers : {
                'Authorization' : 'Barer ' + localStorage.getItem('token') 
            }
        }).then((res) => {
            res.json().then((data) => {
                if (data.username) {
                    setUsername(data.username)
                }
            })
        })
    },[])

    if(username) {
        return <div>
        <div style={{
            display : 'flex',
            justifyContent : 'space-between'
        }}>
            <div>
                <Typography variant='h5' style={{display:'inline'}}>Beetcode</Typography>
                <Button>Explore</Button>
                <Button>Problem</Button>
                <Button>Interview</Button>
                <Button>Contest</Button>
                <Button>Discuss</Button>
                <Button>Store</Button>
                <Button onClick={() => {window.location = '/addproblem'}}>Add Problem</Button>
            </div>
            <div>
                <Button>Premium</Button>
                <Typography style={{display : 'inline'}}>{username}</Typography>
                <Button onClick={ () => {localStorage.setItem('token', null); window.location='/'} }>Logout</Button>
            </div>
        </div>
    </div>
    }

    return <div>
        <div style={{
            display : 'flex',
            justifyContent : 'space-between'
        }}>
            <div>
                <Typography variant='h5' style={{display:'inline'}}>Beetcode</Typography>
                <Button>Explore</Button>
                <Button>Problem</Button>
                <Button>Interview</Button>
                <Button>Contest</Button>
                <Button>Discuss</Button>
                <Button>Store</Button>
            </div>
            <div>
                <Button>Premium</Button>
            </div>
        </div>
    </div>
}

export default OtherAppbar;