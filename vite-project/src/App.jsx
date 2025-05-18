import { useState } from 'react'
import './App.css'
import { Qrcode } from './Qrcode'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Qrcode/>
    </>
  )
}

export default App


