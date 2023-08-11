import { useEffect, useState } from "react"
import { Card, Typography } from "@mui/material"



function Problems() {
    const [problems, setProblems] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/admin/problems', {
            method : "GET",
            headers : {
                'Authorization' : 'Barer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data.problems)
                setProblems(data.problems)
            })
        })
    },[])

    return <div>
        {problems.map((problem) => {
           return <Problem problem={problem} />
        })}
    </div>
}

function Problem(props) {
    return <>
    <br />
    <Card variant="outlined">
        <Typography>{props.problem.title}</Typography>
    </Card>
    </>
}
export default Problems