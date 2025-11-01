import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import  HomeFeed  from './pages/HomeFeed'
import Navbar from './components/shared/Navbar'
import LogIn from './components/auth/LogIn'
import Register from './components/auth/Register'
import Profile from './pages/Profile'

function App() {


  return (
    <div className='min-h-screen bg-white text-black-100 transition-opacity duration-700 pt-20'>
      <Navbar />
      <div className='container mx-auto px-4 py-6'>
        <Routes>
          <Route path="/" element={<HomeFeed/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path='/register' element={ <Register />}/>
          <Route path='/profile' element={ <Profile />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
