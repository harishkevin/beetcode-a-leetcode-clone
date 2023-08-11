import React, { useEffect, useState } from "react";
import {Typography, Button, Card} from '@mui/material'

function Problems() {
  const [problems, setProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

  useEffect(() => {
    fetch(`http://localhost:3000/user/problems?page=${currentPage}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProblems(data.problems);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(problems.length / problemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderProblems = () => {
    const startIndex = (currentPage - 1) * problemsPerPage;
    const endIndex = startIndex + problemsPerPage;
    const currentProblems = problems.slice(startIndex, endIndex);

    return currentProblems.map((problem) => <Problem key={problem.id} problem={problem} />);
  };

  return (
    <div style={{
      backgroundColor : '#1a1a1a',
      color : 'white',
      minHeight : '91.6vh',
      paddingLeft : '250px',
      paddingTop : '30px'
    }}>
      {renderProblems()}
      
      <PageNumberButton
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function Problem(props) {
  return (
    <>
      <br />
        <Typography style={{
            padding : 7
        }} className="problem" onClick={() => {
        window.location = '/problem/' + props.problem._id
      }} id = {props.problem._id}>
        {props.problem.title}
      </Typography>
    </>
  );
}

function PageNumberButton({ currentPage, totalPages, onPageChange }) {
    const getPageNumbers = () => {
      const pageNumbers = [];
  
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
  
      return pageNumbers;
    };
  
    const pageNumbers = getPageNumbers();
  
    return (
      <div>
        {pageNumbers.map((pageNumber) => (
          <Button variant="contained" style={{
            margin : 5,
            backgroundColor : '#313131'
          }}
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            disabled={pageNumber === currentPage}
          >
            {pageNumber}
          </Button>
        ))}
      </div>
    );
  }
  

export default Problems;
