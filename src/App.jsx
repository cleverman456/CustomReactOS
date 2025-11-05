import React, {useState, useEffect} from 'react'
import Desktop from './components/Desktop.jsx'
import Boot from './components/Boot.jsx'

export default function App(){
  const [booted, setBooted] = useState(false)

  useEffect(()=>{
    const t = setTimeout(()=> setBooted(true), 1800)
    return ()=> clearTimeout(t)
  },[])

  return booted ? <Desktop/> : <Boot/>
}
