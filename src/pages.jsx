import {Link} from 'react-router-dom';
import {ArrowUpRight,Layers,Compass,Gem,ShieldCheck} from 'lucide-react';
import {Img,Reveal,Form,waLink} from './ui.jsx';
import {SERVICES,INDUSTRIES,DEMOS,PREVIEWS} from './data.js';
const Head=({k,t,children})=><div className="head"><span className="kicker">{k}</span><h2>{t}</h2>{children&&<p>{children}</p>}</div>;
const CONTACT=[{n:'name',label:'Name',req:1},{n:'email',label:'Email',type:'email',req:1},{n:'service',label:'Interested in',type:'select',options:SERVICES.map(s=>s[0]),wide:1},{n:'message',label:'Tell us about your project',type:'textarea',req:1,wide:1}];

export function Home(){return <>
<section className="hero"><Img name="hero" alt="Modern studio workspace" label="Hero photograph" className="bg" eager/>
 <div className="shade"/><div className="wrap hero-in">
  <span className="kicker">Aimpi Digital Studio — Web Development Agency</span>
  <h1>Your Business Deserves a <i>Better</i> Digital Experience.</h1>
  <p className="lead">We transform ambitious business ideas into exceptional digital experiences that inspire confidence, connect customers and accelerate growth.</p>
  <div className="row"><Link className="btn" to="/industries">View Industry Demonstrations</Link><Link className="btn ghost" to="/portfolio">Explore Our Work</Link></div></div></section>
<section className="wrap sec"><Reveal><Head k="Introduction" t="Design-led websites, engineered to perform.">We build fast, accessible, conversion-focused websites. Explore six working industry demonstrations below — every form, filter and gallery is functional.</Head></Reveal>
 <div className="grid4">{[[Layers,'Craft','Art-directed layouts, never templates.'],[Compass,'Strategy','Every page leads to a next step.'],[Gem,'Quality','Sharp photography, refined detail.'],[ShieldCheck,'Reliability','Accessible, fast, secure by default.']].map(([I,t,d])=><Reveal key={t}><div className="cell"><I/><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div></section>
<section className="wrap sec"><Head k="Industry demonstrations" t="Six industries. Six identities."/>
 <div className="demo-grid">{DEMOS.map((d,i)=><Reveal key={d.slug} className={'dc d'+i}><Link to={'/demos/'+d.slug}><Img name={d.img} alt={d.title+' concept'} label={d.title}/><div className="cap"><small>{d.tag} · Concept demo</small><h3>{d.title}</h3><ArrowUpRight/></div></Link></Reveal>)}</div></section>
<section className="wrap sec"><Head k="Our process" t="From first call to launch."/>
 <ol className="steps">{['Discover — goals, audience, competitors','Design — identity, layout and prototype','Develop — clean, tested, accessible code','Deploy — launch, measure, refine'].map((s,i)=><Reveal key={s}><li><b>0{i+1}</b>{s}</li></Reveal>)}</ol></section>
<section className="wrap sec"><Head k="Testimonials" t="What clients could say.">Illustrative content only — we do not claim real clients here.</Head>
 <div className="grid3">{['“A concept quote about clarity and speed.”','“A concept quote about a smooth booking flow.”','“A concept quote about responsive design.”'].map((q,i)=><Reveal key={i}><blockquote className="cell">{q}<footer>Illustrative testimonial</footer></blockquote></Reveal>)}</div></section>
<section className="cta"><h2>Ready to transform your website?</h2><Link className="btn" to="/contact">Start Your Project</Link></section></>}

export function About(){return <div className="wrap sec page"><Head k="About" t="A studio built on craft.">Aimpi Digital Studio is a web development studio. We do not list fabricated clients, awards or partnerships — our work speaks through the demonstrations on this site.</Head>
 <div className="grid3">{[['Mission','Help businesses look as good as they are.'],['Vision','A web where small businesses compete on quality.'],['Philosophy','Clarity first, polish second, performance always.']].map(([t,d])=><div key={t} className="cell"><h3>{t}</h3><p>{d}</p></div>)}</div>
 <h3 className="sub">Core values</h3><div className="grid4">{['Honesty','Craft','Accessibility','Reliability'].map(v=><div key={v} className="cell"><h3>{v}</h3></div>)}</div>
 <div className="row"><Link className="btn" to="/contact">Discuss Your Project</Link></div></div>}

export function Services(){return <div className="wrap sec page"><Head k="Services" t="Everything your digital presence needs."/>
 <div className="grid2">{SERVICES.map(([t,d,b])=><Reveal key={t}><div className="cell"><h3>{t}</h3><p>{d}</p><p className="benefit">Benefit: {b}</p><Link className="link" to="/contact">Discuss this service →</Link></div></Reveal>)}</div></div>}

export function Industries(){return <div className="wrap sec page"><Head k="Industries" t="Solutions shaped by your sector."/>
 <div className="grid2">{INDUSTRIES.map(([t,d,to])=><Reveal key={t}><Link to={to} className="cell hov"><h3>{t}</h3><p>{d}</p><span className="link">{to.startsWith('/demos')?'Open live demo →':'See preview →'}</span></Link></Reveal>)}</div></div>}

export function Portfolio(){return <div className="wrap sec page"><Head k="Portfolio" t="Concept demonstrations.">All projects below are fictional concepts created to demonstrate our capabilities.</Head>
 <div className="grid2">{DEMOS.map(d=><Reveal key={d.slug}><article className="proj"><Img name={d.img} alt={d.title+' concept'} label={d.title}/>
  <div className="pad"><small>{d.tag} · Concept demonstration</small><h3>{d.title}</h3><p>{d.blurb}</p><ul>{d.points.map(p=><li key={p}>{p}</li>)}</ul>
  <div className="row"><Link className="btn" to={'/demos/'+d.slug}>Open demo</Link><Link className="btn ghost" to="/contact">Start a similar project</Link></div></div></article></Reveal>)}</div>
 <h3 id="more" className="sub">More previews</h3><div className="grid4">{PREVIEWS.map(([t,d])=><div key={t} className="cell"><h3>{t}</h3><p>{d}</p><small>Concept preview</small></div>)}</div></div>}

export function Contact(){const wa=waLink('Hello Aimpi Digital Studio, I would like to discuss a project.');
 return <div className="wrap sec page narrow"><Head k="Contact" t="Let’s discuss your project."/>
 <Form name="contact" fields={CONTACT} cta="Start Your Project"/>
 <div className="row">{wa?<a className="btn ghost" href={wa}>Chat on WhatsApp</a>:<p className="muted">WhatsApp is not configured. Set VITE_WHATSAPP_NUMBER (see README).</p>}</div></div>}

export const NotFound=()=><div className="wrap sec page"><Head k="404" t="Page not found."/><Link className="btn" to="/">Back to home</Link></div>;
