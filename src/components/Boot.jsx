import React from 'react'

export default function Boot(){
  return (
    <div className="boot-screen">
      <div className="boot-card">
        <img src="/logo.svg" alt="logo" className="boot-logo"/>
        <h1>AetherOS</h1>
        <div className="boot-bar"><div className="boot-progress"/></div>
        <p className="boot-sub">Initializing... </p>
      </div>
    </div>
  )
}
