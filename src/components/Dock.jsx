import React from 'react'

export default function Dock({openApps,onOpen,zmap}){
  const apps = ['browser','files','terminal','settings']

  return (
    <div className="dock" role="toolbar" aria-label="Dock">
      {apps.map(a=> {
        const active = openApps.includes(a)
        return (
          <button key={a} className={'dock-btn'+(active?' active':'')} onClick={()=> onOpen(a)} aria-pressed={active}>
            {a==='browser' ? '🌐' : a==='files' ? '🗂️' : a==='terminal' ? '⌨️' : '⚙️'}
          </button>
        )
      })}
      <div className="task-clock" aria-live="polite">{new Date().toLocaleTimeString()}</div>
    </div>
  )
}
