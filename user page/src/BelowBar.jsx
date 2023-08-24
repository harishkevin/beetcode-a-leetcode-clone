import {Typography, Button} from '@mui/material'
import { userEmailState } from './store/selectors/userEmail'
import { isLoadingState } from './store/selectors/isLoading'
import { useRecoilValue } from 'recoil'


function BelowBar() {
    const isLoading = useRecoilValue(isLoadingState)
    const userEmail = useRecoilValue(userEmailState)

    if (isLoading) {
        return <></>
    }

    if (userEmail) {
        return <div style={{
            width: '100%'
        }}>
            <div style={{
                borderBottom: '1px solid #eeeeee',
                padding : 10,
                paddingLeft : '15%',
                paddingRight : '15%',
                border : 'none',
                backgroundColor : '#282828'
            }}>
            <div>
                <Typography style={{display: 'inline',color:'#bdbec2'}}>This is a open-source leetcode clone project for learning purpose</Typography>
            </div>
            <div>
            
            </div>
            </div>
        </div>
    } else {
        return <div style={{
            width: '100%'
        }}>
            <div style={{
                borderBottom: '1px solid #eeeeee',
                padding : 10,
                paddingLeft : '15%',
                paddingRight : '15%',
                border : 'none',
                backgroundColor : 'white'
            }}>
            <div>
                <Typography style={{display: 'inline',color:'#8a9ba4'}}>This is a open-source leetcode clone project for learning purpose</Typography>
            </div>
            <div>
            
            </div>
            </div>
        </div>
    }
}

export default BelowBar;