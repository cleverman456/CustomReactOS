import React, {useState, useEffect} from 'react'

export default function SettingsApp(){
  const [theme, setTheme] = useState('sonoma')
  const [wallpaper, setWallpaper] = useState('/wallpaper.svg')

  useEffect(()=>{
    const s = JSON.parse(localStorage.getItem('aetheros.settings')||'{}')
    if(s.theme) setTheme(s.theme)
    if(s.wallpaper) setWallpaper(s.wallpaper)
  },[])
  useEffect(()=>{ localStorage.setItem('aetheros.settings', JSON.stringify({theme,wallpaper})) },[theme,wallpaper])

  const wallpapers = ['/wallpaper.svg','/wallpaper2.svg']

  return (
    <div style={{padding:12}}>
      <h2>Settings</h2>
      <div className="settings-row">
        <label>Theme</label>
        <select value={theme} onChange={e=> setTheme(e.target.value)} style={{marginLeft:8}}>
          <option value="sonoma">macOS Sonoma</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      <div style={{marginTop:12}}>
        <label>Wallpaper</label>
        <div style={{display:'flex',gap:8,marginTop:8}}>
          {wallpapers.map(w=> (
            <img key={w} src={w} alt="" style={{width:120,height:70,objectFit:'cover',cursor:'pointer',border: wallpaper===w ? '3px solid rgba(124,58,237,0.9)' : '2px solid rgba(255,255,255,0.04)'}} onClick={()=> setWallpaper(w)} />
          ))}
        </div>
      </div>

      <div style={{marginTop:12,color:'var(--muted)'}}>Settings persist to localStorage.</div>
    </div>
  )
}
