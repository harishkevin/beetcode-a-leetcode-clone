import {Typography, Button} from '@mui/material'
import { userEmailState } from './store/selectors/userEmail'
import { isLoadingState } from './store/selectors/isLoading'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { userState } from './store/atoms/user'

function Appbar() {
    const isLoading = useRecoilValue(isLoadingState)
    const userEmail = useRecoilValue(userEmailState)
    const navigate = useNavigate()
    const setUser = useSetRecoilState(userState)

    if (isLoading) {
        return <></>
    }

    if (userEmail) {
        return <div style={{
            width: '100%'
        }}>
            <div style={{
                display : 'flex',
                justifyContent : 'space-between',
                borderBottom: '1px solid #eeeeee',
                backgroundColor : '#282828',
                border: 'none',
                paddingLeft: '15%',
                paddingRight: '15%'
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
                    localStorage.setItem('token', null)
                    setUser({
                        userEmail: null,
                        isLoading: false
                    })
                    navigate('/')
                    // window.location = '/'
                }}>Signout</Button>
            </div>
            </div>
        </div>
    } else {
        return <div style={{
            width: '100%'
        }}>
            <div style={{
                display : 'flex',
                justifyContent : 'space-between',
                border: 'none',
                borderBottom: '1px solid #eeeeee',
                backgroundColor : 'white',
                paddingLeft: '15%',
                paddingRight: '15%'
            }}>
            <div>
                <Typography variant='h6' style={{display : 'inline', margin: 10, color: '#8E354A'}}>beetcode</Typography>
                <Button style={{
                    display : 'inline',
                    color:'#8a9ba4 ',
                    textTransform : 'capitalize'
                }} onClick={() => {
                    window.location = '/problems'
                }}>Problems</Button>
            </div>
            <div>
                <Button style={{
                    color:'#8a9ba4 ',
                    textTransform : 'capitalize'
                }} onClick={() => {
                    window.location = '/signup'
                }}>Register</Button>
                <Typography style={{display: 'inline',color:'#8a9ba4 '}}>or</Typography>
                <Button style={{
                    color:'#8a9ba4 ',
                    textTransform : 'capitalize'
                }} onClick={() => {
                    window.location = '/signin'
                }}>Signin</Button>
            </div>
            </div>
        </div>
    }
}

export default Appbar;