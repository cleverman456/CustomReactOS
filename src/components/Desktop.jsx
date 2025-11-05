import React, {useState, useRef, useEffect} from 'react'
import Dock from './Dock.jsx'
import Window from './Window.jsx'
import BrowserApp from '../apps/BrowserApp.jsx'
import FilesApp from '../apps/FilesApp.jsx'
import TerminalApp from '../apps/TerminalApp.jsx'
import SettingsApp from '../components/SettingsApp.jsx'

export default function Desktop(){
  const [open, setOpen] = useState([])
  const [zmap, setZmap] = useState({})
  const z = useRef(1)

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem('aetheros.open')||'[]')
    if(Array.isArray(s)) setOpen(s)
  },[])
  useEffect(()=>{ localStorage.setItem('aetheros.open', JSON.stringify(open)) },[open])

  const openApp = (id)=>{
    if(!open.includes(id)) setOpen(prev=> [...prev,id])
    bringToFront(id)
  }
  const closeApp = (id)=> setOpen(prev=> prev.filter(x=> x!==id))
  const bringToFront = (id)=>{ z.current += 1; setZmap(m => ({...m, [id]: z.current})) }

  return (
    <div className="desktop" role="application" aria-label="AetherOS Desktop">
      <div className="desktop-icons" aria-hidden>
        <div className="desktop-icon" onDoubleClick={()=>openApp('browser')} title="Browser">🌐<span>Browser</span></div>
        <div className="desktop-icon" onDoubleClick={()=>openApp('files')} title="Files">🗂️<span>Files</span></div>
        <div className="desktop-icon" onDoubleClick={()=>openApp('terminal')} title="Terminal">⌨️<span>Terminal</span></div>
        <div className="desktop-icon" onDoubleClick={()=>openApp('settings')} title="Settings">⚙️<span>Settings</span></div>
      </div>

      <Dock openApps={open} onOpen={openApp} zmap={zmap} />

      {open.includes('browser') && (
        <Window id="browser" title="Aether Browser" z={zmap['browser']||1} onFocus={()=>bringToFront('browser')} onClose={()=>closeApp('browser')}>
          <BrowserApp />
        </Window>
      )}

      {open.includes('files') && (
        <Window id="files" title="Files" z={zmap['files']||1} onFocus={()=>bringToFront('files')} onClose={()=>closeApp('files')}>
          <FilesApp />
        </Window>
      )}

      {open.includes('terminal') && (
        <Window id="terminal" title="Terminal" z={zmap['terminal']||1} onFocus={()=>bringToFront('terminal')} onClose={()=>closeApp('terminal')}>
          <TerminalApp />
        </Window>
      )}

      {open.includes('settings') && (
        <Window id="settings" title="Settings" z={zmap['settings']||1} onFocus={()=>bringToFront('settings')} onClose={()=>closeApp('settings')}>
          <SettingsApp />
        </Window>
      )}
    </div>
  )
}
