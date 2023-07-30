import {Typography, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'


function Landing() {
    const navigate = useNavigate()
    
    return <div>
        <div style={{
            display : 'flex'
        }}>
            <div style={{
                width : '50%'
            }}>
                img
            </div>
            <div>
                <Typography variant='h6'>A New Way to Learn</Typography>
                <Typography>LeetCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</Typography>
                <Button onClick={() => {navigate('/signup')}} variant="contained">Create Account</Button>
            </div>
        </div>
    </div>
}

export default Landing;