import React, {useState} from 'react'

const tracks = [
  {title:'Chill Loop', src:'https://filesamples.com/samples/audio/mp3/sample3.mp3'},
  {title:'Ambient Pad', src:'https://filesamples.com/samples/audio/mp3/sample2.mp3'}
]

export default function MusicApp(){
  const [idx, setIdx] = useState(0)
  return (
    <div style={{padding:12,display:'flex',flexDirection:'column',height:'100%'}}>
      <h3>Music</h3>
      <div style={{flex:1}}>
        <ul>
          {tracks.map((t,i)=> <li key={t.title} style={{cursor:'pointer',padding:6,background:i===idx?'rgba(255,255,255,0.03)':'transparent'}} onClick={()=>setIdx(i)}>{t.title}</li>)}
        </ul>
      </div>
      <div>
        <audio controls src={tracks[idx].src} style={{width:'100%'}} />
      </div>
    </div>
  )
}
