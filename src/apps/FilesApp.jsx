import React from 'react'

const sampleFiles = ['document.txt','photo.png','notes.md','presentation.pptx']

export default function FilesApp(){
  return (
    <div style={{padding:12}}>
      <h3>Files</h3>
      <ul>
        {sampleFiles.map(f=> <li key={f}>{f}</li>)}
      </ul>
      <p style={{color:'var(--muted)'}}>This is a demo file browser (read-only).</p>
    </div>
  )
}
