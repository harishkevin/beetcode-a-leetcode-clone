import {Typography, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom'


function Appbar() {
    const navigate = useNavigate()

    return <div>
        <div style={{
            display : 'flex',
            justifyContent : 'space-between'
        }}>
            <div>
                <Typography variant='h5'>Beetcode</Typography>
            </div>
            <div>
                <Button>Premium</Button>
                <Button>Explore</Button>
                <Button>Product</Button>
                <Button>Developer</Button>
                <Button onClick={() => {navigate('/signin')}} >Sign in</Button>
            </div>
        </div>
    </div>
}

export default Appbar;