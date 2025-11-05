import React, {useState} from 'react'

export default function BrowserApp(){
  const [url, setUrl] = useState('https://example.com')
  const [src, setSrc] = useState(url)

  return (
    <div className="browser-app">
      <div className="nav">
        <input className="nav-input" value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=> e.key==='Enter' && setSrc(url)} />
        <button onClick={()=>setSrc(url)}>Go</button>
      </div>
      <div className="frame-wrap">
        <iframe title="browser" src={src} sandbox="allow-forms allow-scripts allow-same-origin" />
      </div>
    </div>
  )
}
