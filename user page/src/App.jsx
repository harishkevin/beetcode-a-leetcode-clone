import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Appbar from './Appbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup'
import Signin from './Signin'
import Problems from './Problems'
import SolvingScreen from './SolvingScreen'
import BelowBar from './BelowBar'
import Landing from './Landing'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      height : '100vh'
          }}>
    <Router>
      <Appbar></Appbar>
      <Routes>
        <Route path ='/' element = {<Landing/>}/>
        <Route path ='/signup' element = {<Signup/>}/>
        <Route path ='/signin' element = {<Signin/>}/>
        <Route path ='/problems' element = {<Problems/>}/>
        <Route path ='/problem/:problemId' element = {<SolvingScreen/>}/>
      </Routes>
      <BelowBar></BelowBar>
    </Router>
    </div>
  )
}

export default App
