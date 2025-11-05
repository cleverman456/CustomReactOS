import React, {useState, useEffect, useRef} from 'react'
import Taskbar from './Taskbar.jsx'
import Window from './Window.jsx'
import BrowserApp from '../apps/BrowserApp.jsx'
import SettingsApp from '../apps/SettingsApp.jsx'
import FilesApp from '../apps/FilesApp.jsx'
import TerminalApp from '../apps/TerminalApp.jsx'
import MusicApp from '../apps/MusicApp.jsx'

export default function Desktop(){
  const [open, setOpen] = useState([])
  const [zmap, setZmap] = useState({})
  const zCounter = useRef(1)
  const [settings, setSettings] = useState({theme:'aether', wallpaper:'/wallpaper.svg'})

  useEffect(()=>{
    try{
      const s = JSON.parse(localStorage.getItem('aetheros.settings') || '{}')
      setSettings(s.theme ? s : settings)
    }catch(e){}
  },[])

  useEffect(()=>{
    localStorage.setItem('aetheros.settings', JSON.stringify(settings))
  },[settings])

  const openApp = (id)=> {
    setOpen(s=> s.includes(id) ? s : [...s,id])
    bringToFront(id)
  }
  const closeApp = (id)=> setOpen(s=> s.filter(x=> x!==id))
  const bringToFront = (id)=> {
    zCounter.current += 1
    setZmap(m=> ({...m, [id]: zCounter.current}))
  }

  const setTheme = (t)=> setSettings(s=> ({...s, theme: t}))
  const setWallpaper = (w)=> setSettings(s=> ({...s, wallpaper: w}))

  return (
    <div className="desktop" role="application" aria-label="AetherOS Desktop" style={{backgroundImage:`url(${settings.wallpaper})`}}>
      <div className="desktop-icons">
        <div className="desktop-icon" onDoubleClick={()=>openApp('browser')}>🌐<span>Browser</span></div>
        <div className="desktop-icon" onDoubleClick={()=>openApp('files')}>🗂️<span>Files</span></div>
        <div className="desktop-icon" onDoubleClick={()=>openApp('terminal')}>🖥️<span>Terminal</span></div>
        <div className="desktop-icon" onDoubleClick={()=>openApp('music')}>🎵<span>Music</span></div>
        <div className="desktop-icon" onDoubleClick={()=>openApp('settings')}>⚙️<span>Settings</span></div>
      </div>

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

      {open.includes('music') && (
        <Window id="music" title="Music" z={zmap['music']||1} onFocus={()=>bringToFront('music')} onClose={()=>closeApp('music')}>
          <MusicApp />
        </Window>
      )}

      {open.includes('settings') && (
        <Window id="settings" title="Settings" z={zmap['settings']||1} onFocus={()=>bringToFront('settings')} onClose={()=>closeApp('settings')}>
          <SettingsApp settings={settings} setTheme={setTheme} setWallpaper={setWallpaper} />
        </Window>
      )}

      <Taskbar openApps={open} onOpen={openApp}/>
    </div>
  )
}
