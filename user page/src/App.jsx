import { useEffect, useState } from 'react'
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
import {useSetRecoilState, RecoilRoot} from "recoil"
import {userState} from './store/atoms/user'
import Home from './Home'

// const host = window.location.host
const host = 'localhost:3000'

function App() {

  return (
    <RecoilRoot>
      <div className='globalParent' style={{
        width : '100%',
        height: '100%'
            }}>
      <Router>
        <Appbar></Appbar>
        <Init></Init>
        <Routes>
          <Route path ='/home' element = {<Home/>}/>
          <Route path ='/' element = {<Landing/>}/>
          <Route path ='/signup' element = {<Signup/>}/>
          <Route path ='/signin' element = {<Signin/>}/>
          <Route path ='/problems' element = {<Problems/>}/>
          <Route path ='/problem/:problemId' element = {<SolvingScreen/>}/>
        </Routes>
        <BelowBar></BelowBar>
      </Router>
      </div>
    </RecoilRoot>
  )
}

function Init() {

  const setUser = useSetRecoilState(userState)

  const init = async() => {
    try {
      const res = await fetch(`http://${host}/user/me`, {
      method : 'GET',
      headers : {
        'Authorization' : 'Bearer ' + window.localStorage.getItem('token')
      }
      });

      const data = await res.json()

      if (data) {
        setUser({
          isLoading : false,
          userEmail : data
        })
      } else {
        setUser({
          isLoading : false,
          userEmail : null
        })
      }
    } catch (e) {
      setUser({
        isLoading : false,
        userEmail : null
      })
    }
  }
  useEffect(() => {
    init()
  }, [])

  return <></>
}

export default App
