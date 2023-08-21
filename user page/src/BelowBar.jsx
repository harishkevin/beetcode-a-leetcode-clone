import {Typography, Button} from '@mui/material'


function BelowBar() {
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
}

export default BelowBar;