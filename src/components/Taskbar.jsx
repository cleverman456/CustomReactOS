import React from 'react'

export default function Taskbar({openApps,onOpen}){
  return (
    <div className="taskbar" role="toolbar" aria-label="Taskbar">
      <div className="taskbar-left">
        <button className="start-btn" onClick={()=> onOpen('settings')}>🪟</button>
      </div>
      <div className="taskbar-center">
        {openApps.map(a=> <span key={a} className="taskbar-item">{a}</span>)}
      </div>
      <div className="taskbar-right">{new Date().toLocaleTimeString()}</div>
    </div>
  )
}
