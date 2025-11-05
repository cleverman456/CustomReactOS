import React, {useState, useRef} from 'react'

export default function TerminalApp(){
  const [lines, setLines] = useState(['AetherOS Terminal — type `help` for commands'])
  const [cmd, setCmd] = useState('')
  const inputRef = useRef()

  const run = (c)=>{
    const trimmed = c.trim()
    if(!trimmed) return
    if(trimmed === 'help') setLines(l=> [...l, '> '+c, 'commands: help, echo <text>, clear'])
    else if(trimmed.startsWith('echo ')) setLines(l=> [...l, '> '+c, trimmed.slice(5)])
    else if(trimmed === 'clear') setLines(['AetherOS Terminal — type `help` for commands'])
    else setLines(l=> [...l, '> '+c, 'command not found: '+trimmed])
    setCmd('')
    inputRef.current?.focus()
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      <div style={{flex:1,background:'rgba(0,0,0,0.6)',padding:8,overflow:'auto',borderRadius:6}}>
        {lines.map((ln,i)=>(<div key={i} style={{fontFamily:'monospace',fontSize:13}}>{ln}</div>))}
      </div>
      <div style={{display:'flex',gap:8,marginTop:8}}>
        <input ref={inputRef} value={cmd} onChange={e=>setCmd(e.target.value)} onKeyDown={e=> e.key==='Enter' && run(cmd)} style={{flex:1,padding:8,borderRadius:6,border:'none',background:'rgba(255,255,255,0.03)',color:'white'}} />
        <button onClick={()=>run(cmd)}>Run</button>
      </div>
    </div>
  )
}
