import React from 'react'

export default function SettingsApp({settings, setTheme, setWallpaper}){
  const wallpapers = ['/wallpaper.svg', '/wallpaper2.svg']

  return (
    <div style={{padding:12}}>
      <h2>Settings</h2>
      <div style={{marginTop:8}}>
        <label>Theme:</label>
        <select value={settings.theme} onChange={e=> setTheme(e.target.value)} style={{marginLeft:8}}>
          <option value="aether">Aether</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div style={{marginTop:12}}>
        <label>Wallpaper:</label>
        <div style={{display:'flex',gap:8,marginTop:6}}>
          {wallpapers.map(w=> <img key={w} src={w} alt="" style={{width:120,height:70,objectFit:'cover',cursor:'pointer',border: settings.wallpaper===w ? '3px solid var(--accent)' : '2px solid rgba(255,255,255,0.04)'}} onClick={()=> setWallpaper(w)} />)}
        </div>
      </div>

      <div style={{marginTop:12,color:'var(--muted)'}}>Settings are saved in localStorage.</div>
    </div>
  )
}
