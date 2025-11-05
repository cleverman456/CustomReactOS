import React from 'react'

const SAMPLE = [
  {name:'readme.md', size:'2 KB'},
  {name:'photo.jpg', size:'420 KB'},
  {name:'project.zip', size:'1.2 MB'},
  {name:'notes.txt', size:'1 KB'}
]

export default function FilesApp(){
  return (
    <div style={{padding:12,height:'100%'}}>
      <h3>Files</h3>
      <div className="files-grid" style={{height:'calc(100% - 36px)'}}>
        {SAMPLE.map(f=> <div key={f.name} className="file-card"><strong>{f.name}</strong><div style={{color:'var(--muted)',marginTop:6}}>{f.size}</div></div>)}
      </div>
    </div>
  )
}
