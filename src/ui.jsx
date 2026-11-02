import {useState,useEffect,useRef} from 'react';
export const ENV={email:import.meta.env.VITE_CONTACT_EMAIL||'ameenuridwan005@gmail.com',wa:(import.meta.env.VITE_WHATSAPP_NUMBER||'2349067111460').replace(/\D/g,'')};
export const waLink=t=>ENV.wa?`https://wa.me/${ENV.wa}?text=${encodeURIComponent(t)}`:null;

export function Img({name,alt,label,className='',eager}){
  const [ext,setExt]=useState('avif');const bad=ext==='none';
  if(bad)return <div className={'ph '+className} role="img" aria-label={alt}><span>{label||alt}</span></div>;
  return <img className={className} src={`/images/${name}.${ext}`} alt={alt} loading={eager?'eager':'lazy'} decoding="async" onError={()=>setExt(e=>{const L=['avif','webp','jpg','png','jpeg','none'];return L[L.indexOf(e)+1]})}/>;
}
export function Reveal({children,className=''}){
  const r=useRef();const [v,setV]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect()}},{threshold:.12});o.observe(r.current);return()=>o.disconnect()},[]);
  return <div ref={r} className={`reveal ${v?'in':''} ${className}`}>{children}</div>;
}
// Netlify Forms submit + validation. fields: {n,label,type,options,req}
export function Form({name,fields,cta='Send enquiry',prefill={}}){
  const [vals,setVals]=useState(prefill);const [err,setErr]=useState({});const [st,setSt]=useState('idle');
  useEffect(()=>setVals(v=>({...v,...prefill})),[JSON.stringify(prefill)]);
  const set=(k,v)=>setVals(s=>({...s,[k]:v}));
  async function submit(e){
    e.preventDefault();const er={};
    fields.forEach(f=>{const v=(vals[f.n]||'').trim();
      if(f.req&&!v)er[f.n]='Required';
      else if(f.type==='email'&&v&&!/^\S+@\S+\.\S+$/.test(v))er[f.n]='Enter a valid email';});
    setErr(er);if(Object.keys(er).length)return;
    setSt('sending');
    try{
      const body=new URLSearchParams({'form-name':name,...vals}).toString();
      const r=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body});
      if(!r.ok)throw 0;setSt('sent');
    }catch{setSt('error')}
  }
  if(st==='sent')return <div className="notice ok" role="status">Thank you — your enquiry was received. This is a concept demonstration; replies are not guaranteed for demo forms.</div>;
  const mail=ENV.email?`mailto:${ENV.email}?subject=${encodeURIComponent(name+' enquiry')}&body=${encodeURIComponent(Object.entries(vals).map(([k,v])=>k+': '+v).join('\n'))}`:null;
  return <form onSubmit={submit} noValidate className="form" aria-label={name+' form'}>
    {fields.map(f=><label key={f.n} className={f.wide?'wide':''}>{f.label}{f.req&&' *'}
      {f.type==='select'?<select value={vals[f.n]||''} onChange={e=>set(f.n,e.target.value)}><option value="">Select…</option>{f.options.map(o=><option key={o}>{o}</option>)}</select>
      :f.type==='textarea'?<textarea rows="4" value={vals[f.n]||''} onChange={e=>set(f.n,e.target.value)}/>
      :<input type={f.type||'text'} value={vals[f.n]||''} onChange={e=>set(f.n,e.target.value)}/>}
      {err[f.n]&&<em role="alert">{err[f.n]}</em>}</label>)}
    <div className="wide row"><button className="btn" disabled={st==='sending'}>{st==='sending'?'Sending…':cta}</button>
      {mail&&<a className="btn ghost" href={mail}>Or email us</a>}</div>
    {st==='error'&&<div className="notice err wide" role="alert">Submission works once deployed on Netlify (Forms are detected at build time). Locally, use the email option.</div>}
  </form>;
}
