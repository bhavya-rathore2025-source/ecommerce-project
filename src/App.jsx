import './App.css'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/checkout' element={<div>Testing</div>} />
    </Routes>
  )
}

export default App
