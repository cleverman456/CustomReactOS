import React, {useRef, useEffect, useState} from 'react'

export default function Window({id, title, children, onClose, onFocus, z=1}){
  const ref = useRef()
  const [pos, setPos] = useState({x:120, y:80})
  const [size, setSize] = useState({w:700, h:420})
  const dragging = useRef(false)
  const resizing = useRef(false)
  const resizeDir = useRef(null)

  useEffect(()=>{
    const onPointerMove = (e)=>{
      if(dragging.current){
        setPos(p => ({...p, x: Math.max(8, p.x + e.movementX), y: Math.max(8, p.y + e.movementY)}))
      } else if(resizing.current){
        const dir = resizeDir.current
        setSize(s => {
          let w = s.w, h = s.h
          if(dir.includes('e')) w = Math.max(240, w + e.movementX)
          if(dir.includes('s')) h = Math.max(160, h + e.movementY)
          if(dir.includes('w')) { w = Math.max(240, w - e.movementX); setPos(p=>({...p, x: Math.max(8, p.x + e.movementX)})) }
          if(dir.includes('n')) { h = Math.max(160, h - e.movementY); setPos(p=>({...p, y: Math.max(8, p.y + e.movementY)})) }
          return {w,h}
        })
      }
    }
    const onPointerUp = ()=>{ dragging.current=false; resizing.current=false; resizeDir.current=null }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    return ()=>{ window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('pointerup', onPointerUp) }
  },[])

  useEffect(()=>{
    setPos({x:120 + Math.random()*120, y:80 + Math.random()*80})
  },[id])

  const handleFocus = ()=> { onFocus && onFocus() }

  return (
    <div ref={ref} className="window" style={{left:pos.x, top:pos.y, width:size.w, height:size.h, zIndex: z}} onPointerDown={handleFocus}>
      <div className="window-header" onPointerDown={(e)=> { dragging.current=true; e.target.setPointerCapture?.(e.pointerId) }}>
        <div className="window-title">{title}</div>
        <div className="window-controls">
          <button onClick={onClose} aria-label="Close">✖</button>
        </div>
      </div>

      <div className="window-body">{children}</div>

      <div className="resize-handle nw" onPointerDown={(e)=> { resizing.current=true; resizeDir.current='nw'; e.target.setPointerCapture?.(e.pointerId) }} />
      <div className="resize-handle ne" onPointerDown={(e)=> { resizing.current=true; resizeDir.current='ne'; e.target.setPointerCapture?.(e.pointerId) }} />
      <div className="resize-handle sw" onPointerDown={(e)=> { resizing.current=true; resizeDir.current='sw'; e.target.setPointerCapture?.(e.pointerId) }} />
      <div className="resize-handle se" onPointerDown={(e)=> { resizing.current=true; resizeDir.current='se'; e.target.setPointerCapture?.(e.pointerId) }} />
      <div className="resize-handle n" onPointerDown={(e)=> { resizing.current=true; resizeDir.current='n'; e.target.setPointerCapture?.(e.pointerId) }} />
      <div className="resize-handle e" onPointerDown={(e)=> { resizing.current=true; resizeDir.current='e'; e.target.setPointerCapture?.(e.pointerId) }} />
      <div className="resize-handle s" onPointerDown={(e)=> { resizing.current=true; resizeDir.current='s'; e.target.setPointerCapture?.(e.pointerId) }} />
      <div className="resize-handle w" onPointerDown={(e)=> { resizing.current=true; resizeDir.current='w'; e.target.setPointerCapture?.(e.pointerId) }} />
    </div>
  )
}
