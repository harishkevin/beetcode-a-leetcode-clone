import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Appbar from './Appbar'
import OtherAppbar from './OtherAppbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup.jsx'
import Landing from './Landing.jsx'
import { useLocation } from 'react-router-dom';
import Signin from './Signin'
import AddProblem from './AddProblem'


function App() {
  const [count, setCount] = useState(0)
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<> <Appbar /> <Landing /> </>} />
          <Route path='/signup' element={<> <OtherAppbar /> <Signup /> </>} />
          <Route path='/signin' element={<> <OtherAppbar /> <Signin /> </>} />
          <Route path='/home' element={<> <OtherAppbar /> </>} />
          <Route path='/addproblem' element={<> <OtherAppbar /> <AddProblem /> </>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
