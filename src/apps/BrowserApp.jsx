import React, {useState} from 'react'

// Uses a proxy iframe. Replace PROXY_BASE with your proxy if desired.
const PROXY_BASE = 'https://aetherosproxy.onrender.com/'

export default function BrowserApp(){
  const [url, setUrl] = useState('https://example.com')
  const [src, setSrc] = useState(PROXY_BASE + 'https://example.com')

  const navigate = ()=> {
    let val = url.trim()
    if(!/^https?:\/\//.test(val)) val = 'https://'+val
    setSrc(PROXY_BASE + val)
  }

  return (
    <div className="browser-app" style={{height:'100%'}}>
      <div className="nav">
        <input className="nav-input" value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=> e.key==='Enter' && navigate()} aria-label="URL" />
        <button onClick={navigate}>Go</button>
      </div>
      <div className="frame-wrap" style={{height:'calc(100% - 44px)'}}>
        <iframe title="Aether Browser" src={src} sandbox="allow-scripts allow-forms allow-same-origin" />
      </div>
    </div>
  )
}
