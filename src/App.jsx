import {useEffect,useState} from 'react';
import {Routes,Route,Link,NavLink,useLocation} from 'react-router-dom';
import {Menu,X} from 'lucide-react';
import {Home,About,Services,Industries,Portfolio,Contact,NotFound} from './pages.jsx';
import Demo from './demos.jsx';
const NAV=[['/about','About'],['/services','Services'],['/industries','Industries'],['/portfolio','Portfolio'],['/contact','Contact']];
const TITLES={'/':'Aimpi Digital Studio — Premium Websites','/about':'About','/services':'Services','/industries':'Industries','/portfolio':'Portfolio','/contact':'Contact'};
export default function App(){
  const {pathname,hash}=useLocation();const [open,setOpen]=useState(false);const [ready,setReady]=useState(false);
  const demo=pathname.startsWith('/demos/');
  useEffect(()=>{setOpen(false);if(!hash)window.scrollTo(0,0);else setTimeout(()=>document.querySelector(hash)?.scrollIntoView(),50);
    document.title=TITLES[pathname]?(pathname==='/'?TITLES[pathname]:TITLES[pathname]+' | Aimpi Digital Studio'):'Aimpi Digital Studio';},[pathname,hash]);
  useEffect(()=>{const t=setTimeout(()=>setReady(true),500);return()=>clearTimeout(t)},[]);
  return <>
    {!ready&&<div className="loader" aria-hidden><span>Aimpi</span></div>}
    <a href="#main" className="skip">Skip to content</a>
    {!demo&&<header className="nav"><Link to="/" className="logo">Aimpi<i>.</i></Link>
      <nav className={open?'open':''} aria-label="Main">{NAV.map(([to,l])=><NavLink key={to} to={to}>{l}</NavLink>)}</nav>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>}
    <main id="main" key={pathname} className="page-t">
      <Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/services" element={<Services/>}/>
        <Route path="/industries" element={<Industries/>}/><Route path="/portfolio" element={<Portfolio/>}/><Route path="/contact" element={<Contact/>}/>
        <Route path="/demos/:slug" element={<Demo/>}/><Route path="*" element={<NotFound/>}/></Routes></main>
    {!demo&&<footer className="foot"><div className="wrap"><Link to="/" className="logo">Aimpi<i>.</i></Link>
      <p>Concept demonstrations on this site are fictional. No real clients, awards or partnerships are claimed.</p>
      <div className="row">{NAV.map(([to,l])=><Link key={to} to={to}>{l}</Link>)}</div></div></footer>}
  </>}
