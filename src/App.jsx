import React, {useEffect, useState} from 'react'
import Desktop from './components/Desktop.jsx'
import Boot from './components/Boot.jsx'

export default function App(){
  const [booted, setBooted] = useState(false)

  useEffect(()=>{
    // simulate boot sequence then show desktop
    const t = setTimeout(()=> setBooted(true), 2600)
    return ()=> clearTimeout(t)
  },[])

  return booted ? <Desktop/> : <Boot/>
}
