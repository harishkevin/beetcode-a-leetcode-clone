import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Typography, Card, Select, MenuItem, FormControl, InputLabel, Button} from '@mui/material'

// const host = window.location.host
const host = 'localhost:3000'

function SolvingScreen() {
    const {problemId} = useParams()
    const [problem, setProblem] = useState()
    const [code, setCode] = useState("")
    const [output, setOutput] = useState("")

    useEffect(() => {
        fetch(`http://${host}/user/problem/` + problemId, {
            method : "GET",
            headers : {
                'Authorization' : 'Barer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            res.json().then((data) => {
                setProblem(data.problem)
            })
        })
    }, [])

    if(!problem) {
        return <>
        loading...
        </>
    }
    
    return <div style={{
        display : 'flex',
        backgroundColor : '#1a1a1a',
        color : 'white',
        minHeight : '100vh'
        }}>
        <ProblemStatement problem={problem}></ProblemStatement>
        <CodingArea code={code} setCode={setCode} problem={problem} setOutput={setOutput} output={output}></CodingArea>
    </div>
}

function ProblemStatement(props) {
    const examples = props.problem.example
    return <Card style={{
        width : '50%',
        margin : 5,
        backgroundColor : '#282828',
        color : 'white',
        marginLeft : 10,
        marginTop : 10,
        padding : 10
    }}>
        <div>
            <Typography variant="h4" style={{fontSize : '18px'}}>{props.problem.title}</Typography>
        </div>
        <br />
        <div>
            <Typography variant="h6" style={{fontSize : '14px'}}>{props.problem.description}</Typography>
        </div>
        <br />
        <div>
            {examples.map(example => {
                return <div>
                    <Typography style={{margin:5, fontSize : '14px'}}>example :</Typography>
                    <Card style={{
                        backgroundColor : '#373737',
                        color : 'white',
                        padding : 5
                    }}>
                        <RenderingExample example={example}></RenderingExample>
                    </Card>
                    <br />
                </div>
            })}
        </div>
    </Card>
}

function RenderingExample(props) {
    return <>
    <Typography style={{fontSize : '14px'}}>input: {props.example.input}</Typography>
    <br />
    <Typography style={{fontSize : '14px'}}>output: {props.example.output}</Typography>
    <br />
    {props.example.explanation !== '' && (<>
        <Typography style={{fontSize : '14px'}}>explanation: {props.example.explanation}</Typography>
        <br />
    </>
    )}
    </>
}


function CodingArea(props) {
    return <div style={{
        display : 'flex',
        flexDirection : 'column',
        width : '50%',
        margin : 5,
        marginRight : 10,
        marginTop : 10
    }}>
    <Card style={{
        backgroundColor : '#282828'
    }}>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Language</InputLabel>
        <Select
    labelId="demo-select-small-label"
    id="demo-select-small"
    label="Javascript"
    value="Javascript"
>
    <MenuItem value="Javascript">
        <em>Javascript</em>
    </MenuItem>
    </Select>
    </FormControl>
        <textarea style={{
            minHeight : '70%',
            minWidth : '100%',
            border : 'none',
            backgroundColor : '#282828',
            outline : 'none',
            color : 'white',
            minHeight : '400px'
        }} onChange={(e) => {
            props.setCode(e.target.value)
        }} name="code here" id="" cols="30" rows="10" defaultValue="//Write your code here"></textarea>
        <br />
        <Button variant="contained" style={{
            backgroundColor : '#454545',
            margin : 5
        }} onClick={async () => {
            console.log(JSON.stringify({code : props.code}))
            try {
                const response = await fetch(`http://${host}/user/execute`, {
                method : "POST",
                body : JSON.stringify({code : props.code}),
                headers : {
                    'content-type' : 'Application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem('token')
                }
            })

                const data = await response.json()
                props.setOutput(data.output || data.error)
                console.log(data.output)

            }catch (error) {
                props.setOutput('ERROR: ' + error.message)
            }
           

        }}>Run</Button>
        <Button variant="contained" color="success">
        Submit
        </Button>
    </Card>
    <Card style={{
        backgroundColor : '#282828',
        marginTop : '10px',
        color : 'gray'
    }}>
        output :
        <br />
        {props.output}
    </Card>
    </div>
}

export default SolvingScreen