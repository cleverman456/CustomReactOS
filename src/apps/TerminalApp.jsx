import React, {useState, useRef, useEffect} from 'react'

export default function TerminalApp(){
  const [lines, setLines] = useState(['AetherOS Terminal — type help for commands'])
  const [cmd, setCmd] = useState('')
  const ref = useRef()

  useEffect(()=>{ ref.current?.scrollTo({top: ref.current.scrollHeight, behavior:'smooth'}) },[lines])

  const run = (c)=>{
    const t = c.trim()
    if(!t) return
    if(t==='help') setLines(l=> [...l, '> '+c, 'commands: help, echo <text>, clear, date'])
    else if(t.startsWith('echo ')) setLines(l=> [...l, '> '+c, t.slice(5)])
    else if(t==='clear') setLines(['AetherOS Terminal — type help for commands'])
    else if(t==='date') setLines(l=> [...l, new Date().toString()])
    else setLines(l=> [...l, '> '+c, 'command not found: '+t])
    setCmd('')
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div ref={ref} className="terminal-screen" style={{flex:1,overflow:'auto'}}>
        {lines.map((ln,i)=>(<div key={i} style={{fontFamily:'ui-monospace,monospace',fontSize:13,whiteSpace:'pre-wrap'}}>{ln}</div>))}
      </div>
      <div className="terminal-input" style={{marginTop:8}}>
        <input value={cmd} onChange={e=>setCmd(e.target.value)} onKeyDown={e=> e.key==='Enter' && run(cmd)} style={{flex:1,padding:8,borderRadius:8,border:'none',background:'rgba(255,255,255,0.03)',color:'white'}} placeholder="Type a command..." />
        <button onClick={()=>run(cmd)}>Run</button>
      </div>
    </div>
  )
}
