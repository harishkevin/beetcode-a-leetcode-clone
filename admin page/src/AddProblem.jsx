import { useState } from "react";
import { Typography, Card, TextField, Button } from "@mui/material";


function AddProblem() {
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [example, setExample] = useState("");
    const [testcase, setTestcase] = useState("");

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div style={{
            paddingTop : '150px'
        }}>            
            <div style={{
                marginBottom : 10,
                display : 'flex',
                justifyContent : 'center'
            }}>
                <Typography variant='h5'>
                    Add problem here
                </Typography>
            </div>
            
            <div style={{
                display : 'flex',
                justifyContent : 'center'
            }}>
                <Card variant="outlined" style={{width:400, padding : 20}}>
                <TextField onChange={(e) => {
                    setTitle(e.target.value)
                }} fullWidth id="title" label="title" variant="outlined" />
                <br />
                <br />
                <TextField onChange={(e) => {
                    setDescription(e.target.value)
                }} fullWidth id="description" label="description" variant="outlined" type='text'/>
                <br />
                <br />
                <TextField onChange={(e) => {
                    setExample(e.target.value)
                }} fullWidth id="example" label="example" variant="outlined" type='text'/>
                <br />
                <br />
                <TextField onChange={(e) => {
                    setTestcase(e.target.value)
                }} fullWidth id="testcase" label="test cases" variant="outlined" type='text'/>
                <br />
                <br />
                <Button variant="contained" onClick={() => {

                    fetch('http://localhost:3000/admin/addProblem', {
                        method : 'POST',
                        body : JSON.stringify({
                            title,
                            description,
                            example,
                            testcase
                        }),
                        headers : {
                            'Content-type' : 'application/json',
                            'Authorization' : 'Barer '+localStorage.getItem('token')
                        }
                    }).then((res) => {
                        res.json().then((data) => {
                            console.log(data)
                        })
                    })
                }} style={{
                    backgroundColor : 'green'
                }}>Add Problem</Button>
                </Card>
            </div>
        </div>
    )
}

export default AddProblem