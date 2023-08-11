import {Typography, Button} from '@mui/material'


function Appbar() {
    return <div style={{
        display : 'flex',
        justifyContent : 'space-between',
        borderBottom: '1px solid #eeeeee',
        paddingLeft : 250,
        paddingRight : 250,
        backgroundColor : '#282828',
        border: 'none'
    }}>
    <div>
        <Typography variant='h6' style={{display : 'inline', margin: 10, color: '#8E354A'}}>beetcode</Typography>
        <Button style={{
            display : 'inline',
            color:'#bdbec2',
            textTransform : 'capitalize'
        }} onClick={() => {
            window.location = '/problems'
        }}>Problems</Button>
    </div>
    <div>
        <Button style={{
            color:'#bdbec2',
            textTransform : 'capitalize'
        }} onClick={() => {
            window.location = '/signup'
        }}>Register</Button>
        <Typography style={{display: 'inline',color:'#bdbec2'}}>or</Typography>
        <Button style={{
            color:'#bdbec2',
            textTransform : 'capitalize'
        }} onClick={() => {
            window.location = '/signin'
        }}>Signin</Button>
        <Button style={{
            color:'#bdbec2',
            textTransform : 'capitalize'
        }} onClick={() => {
            localStorage.setItem('token', null)
            window.location = '/'
        }}>Signout</Button>
    </div>
    </div>
}

export default Appbar;