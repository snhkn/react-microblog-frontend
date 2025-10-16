import './styles/App.css'
import { Routes, Route } from 'react-router-dom'
import  HomeFeed  from './pages/HomeFeed'
import Navbar from './components/Navbar'

function App() {


  return (
    <div className='min-h-screen bg-white text-black-100 transition-opacity duration-700 pt-20'>
      <Navbar />
      <div className='container mx-auto px-4 py-6'>
        <Routes>
          <Route path="/" element={<HomeFeed/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
