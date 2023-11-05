import { Typography, Button } from "@mui/material"

function Landing() {

    return (
    <div>
        
        <div style={{
            minHeight : '100%',
            paddingLeft: '17%',
            paddingRight: '17%',
            backgroundColor: '#313131'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'flex',
                    marginTop: 150
                }}>
                    <div style={{
                        width: '50%'
                    }}>
                        <center>
                            <img style={{
                                width: 400,
                                rotate: '-10deg'
                            }} src="../landing asserts/main4.png" alt="" />
                        </center>
                    </div>
                    <div style={{
                        width: '50%',
                        marginTop: 50
                    }}>
                        <center>
                            <Typography variant="h5" color={'white'} style={{
                                fontSize: 35
                            }}>A New Way to Learn</Typography>
        
                        <br />
                        <Typography variant="h6" style={{
                            fontSize: 15,
                            color: '#737373 '
                        }}>LeetCode is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</Typography>
                        <br />
                        <Button variant="contained" style={{
                            backgroundColor: '#1da09c',
                            textTransform: 'capitalize'
                        }}>Create Account</Button>
                        </center>
                    </div>
                </div>
                <div style={{
                display: 'flex',
                marginTop: 150
            }}>
                <div style={{
                    width: '50%',
                    textAlign: 'right'
                }}>
                    <Typography variant="h5" color={'#1da09c'}>Start Exploring</Typography>
                    <br />
                    <p><Typography variant="h6" style={{
                            fontSize: 15,
                            color: '#737373 '
                        }}>Explore is a well-organized tool that helps you get the most out of <br /> LeetCode by providing structure to guide your progress towards the next <br /> step in your programming career.</Typography></p>
                    <br />
                    <Button style={{
                        textTransform: 'capitalize'
                    }}>Get Started &gt;</Button>
                </div>
                <div style={{
                    width: '50%'
                }}>
                    <img style={{
                        width: 450,
                        marginLeft: 80
                    }} src="../landing asserts/side2.png" alt="" />
                </div>
            </div>
            <div style={{
                    display: 'flex',
                    marginTop: 150
                }}>
                    <div style={{
                        width: '50%',
                        marginLeft: 70
                    }}>
                        <Typography variant="h5" color={'#259af3 '}>Questions, Community & Contests</Typography>
                        <br />
                        <p>
                            <Typography variant="h6" style={{
                                fontSize: 15,
                                color: '#737373 '
                            }}>Over 2950 questions for you to practice. Come and join one of <br /> the largest tech communities with hundreds of thousands of active <br /> users and participate in our contests to challenge yourself and <br /> earn rewards.</Typography>
                        </p>
                        <br />
                        <Button style={{
                        textTransform: 'capitalize'
                    }}>View Questions &gt;</Button>
                    </div>
                    <div style={{
                        width: '50%',
                        marginLeft: 70
                    }}>
                        <Typography variant="h5" color={'#b7892b'}>Companies & Candidates</Typography>
                        <br />
                        <Typography variant="h6" style={{
                                fontSize: 15,
                                color: '#737373 '
                            }}>Not only does LeetCode prepare candidates for technical <br /> interviews, we also help companies identify top technical talent. <br /> From sponsoring contests to providing online assessments and <br /> training, we offer numerous services to businesses.</Typography>
                        <br />
                        <Button style={{
                        textTransform: 'capitalize'
                    }}>Business Opportunities &gt;</Button>
                    </div>
                </div>
                <div style={{
                    marginTop: 200
                }}>
                    <center>
                        <Typography variant="h5" color={'#49adaa'}>Developer</Typography>
                        <br />
                        <Typography variant="h6" style={{
                                fontSize: 15,
                                color: '#737373 ',
                                paddingLeft: 250,
                                paddingRight: 250
                            }}>We now support 14 popular coding languages. At our core, LeetCode is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online.</Typography>
                        <br />
                        <div>
                            <div></div>
                            <div>
                                <textarea style={{
                                    minWidth: '70%',
                                    minHeight: '300px'
                                }} name="" id="" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    </div>)
}

export default Landing