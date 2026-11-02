import {useState,useMemo} from 'react';
import {useParams,Link} from 'react-router-dom';
import {ArrowLeft,Phone,MapPin,Clock} from 'lucide-react';
import {Img,Form,waLink} from './ui.jsx';
import {DEMOS,ROOMS,MENU,PROJECTS,PROPS,FASHION,PACKAGES} from './data.js';
const Bar=({d})=><div className="dbar"><Link to="/portfolio"><ArrowLeft size={16}/> Back to Aimpi Digital Studio</Link><span>Concept demonstration · fictional business</span></div>;
const F=(n,label,o={})=>({n,label,...o});
const NAME=[F('name','Name',{req:1}),F('email','Email',{type:'email',req:1})];

function Hotel(){const [r,setR]=useState(0);return <>
 <section className="dh"><Img name="hotel-hero" alt="Luxury hotel exterior" label="Hotel exterior" className="bg" eager/><div className="shade"/><div className="wrap"><h1>Aurelia Grand</h1><p>Seaside luxury, quietly perfected.</p><a className="btn" href="#book">Book your stay</a></div></section>
 <section className="wrap ds"><h2>Rooms</h2><div className="tabs">{ROOMS.map((x,i)=><button key={i} className={r===i?'on':''} onClick={()=>setR(i)}>{x[0]}</button>)}</div>
  <Img name={ROOMS[r][1]} alt={ROOMS[r][0]+' room'} label={ROOMS[r][0]} className="big"/><p>{ROOMS[r][2]}</p>
  <h2>Amenities</h2><div className="chips">{['Infinity pool','Spa','Sea-view restaurant','Concierge','Airport transfer','Free Wi-Fi'].map(a=><span key={a}>{a}</span>)}</div>
  <p className="note">Guest reviews: illustrative content only.</p><h2 id="book">Booking enquiry</h2>
  <Form name="hotel" cta="Request booking" fields={[...NAME,F('checkin','Check-in',{type:'date',req:1}),F('checkout','Check-out',{type:'date',req:1}),F('room','Room',{type:'select',options:ROOMS.map(x=>x[0]),req:1}),F('guests','Guests',{type:'number',req:1})]}/>
  <p className="info"><MapPin size={14}/> 1 Seafront Road (fictional) · <Phone size={14}/> +00 000 000 000</p></section></>}

function Restaurant(){const [c,setC]=useState('Starters');return <>
 <section className="dh"><Img name="restaurant-hero" alt="Restaurant dining room" label="Dining room" className="bg" eager/><div className="shade"/><div className="wrap"><h1>Ember &amp; Salt</h1><p>Fire, seasons and patience.</p><a className="btn" href="#res">Reserve a table</a></div></section>
 <section className="wrap ds"><h2>Menu</h2><div className="tabs">{Object.keys(MENU).map(k=><button key={k} className={c===k?'on':''} onClick={()=>setC(k)}>{k}</button>)}</div>
  {MENU[c].map(([n,d,p])=><div key={n} className="mrow"><div><b>{n}</b><br/><small>{d}</small></div><span>${p}</span></div>)}
  <p className="info"><Clock size={14}/> Tue–Sun 12:00–23:00 · Mon closed</p><h2 id="res">Reservation enquiry</h2>
  <Form name="restaurant" cta="Request reservation" fields={[...NAME,F('date','Date',{type:'date',req:1}),F('time','Time',{type:'select',options:['12:00','13:30','19:00','20:30'],req:1}),F('guests','Guests',{type:'number',req:1})]}/></section></>}

function Construction(){const [f,setF]=useState('All');const list=PROJECTS.filter(p=>f==='All'||p[1]===f);return <>
 <section className="dh"><Img name="construction-hero" alt="Building under construction" label="Construction site" className="bg" eager/><div className="shade"/><div className="wrap"><h1>Northbridge Build Co.</h1><p>Engineered to last. Delivered on time.</p><a className="btn" href="#quote">Request a quote</a></div></section>
 <section className="wrap ds"><h2>Capabilities</h2><div className="chips">{['Design & build','Project management','Structural engineering','Fit-out'].map(a=><span key={a}>{a}</span>)}</div>
  <h2>Illustrative projects</h2><div className="tabs">{['All','Commercial','Residential','Industrial'].map(k=><button key={k} className={f===k?'on':''} onClick={()=>setF(k)}>{k}</button>)}</div>
  <div className="grid3">{list.map(p=><figure key={p[0]}><Img name={p[2]} alt={p[0]+' concept project'} label={p[0]}/><figcaption>{p[0]} · {p[1]}</figcaption></figure>)}</div>
  <h2 id="quote">Quotation request</h2><Form name="construction" cta="Request quotation" fields={[...NAME,F('type','Project type',{type:'select',options:['Commercial','Residential','Industrial'],req:1}),F('budget','Budget range',{type:'select',options:['<$100k','$100k–$500k','$500k+']}),F('details','Project details',{type:'textarea',wide:1,req:1})]}/></section></>}

function Estate(){const [q,setQ]=useState('');const [t,setT]=useState('');const [max,setMax]=useState('');const [sel,setSel]=useState(null);
 const L=useMemo(()=>PROPS.filter(p=>(!t||p[1]===t)&&(!max||p[2]<=+max)&&(!q||(p[0]+p[4]).toLowerCase().includes(q.toLowerCase()))),[q,t,max]);
 return <><section className="dh short"><Img name="estate-hero" alt="Modern residential building" label="Residential exterior" className="bg" eager/><div className="shade"/><div className="wrap"><h1>Haven &amp; Row</h1><p>Homes worth coming home to. (Demonstration data)</p></div></section>
 <section className="wrap ds"><div className="filters"><input aria-label="Search" placeholder="Search name or area" value={q} onChange={e=>setQ(e.target.value)}/>
  <select aria-label="Type" value={t} onChange={e=>setT(e.target.value)}><option value="">All types</option><option>Apartment</option><option>House</option><option>Villa</option></select>
  <select aria-label="Max price" value={max} onChange={e=>setMax(e.target.value)}><option value="">Any price</option><option value="500000">≤ $500k</option><option value="1000000">≤ $1M</option></select></div>
  <p>{L.length} properties</p><div className="grid3">{L.map(p=><figure key={p[0]} onClick={()=>setSel(p)} tabIndex="0" onKeyDown={e=>e.key==='Enter'&&setSel(p)}><Img name={p[5]} alt={p[0]} label={p[0]}/><figcaption>{p[0]}<br/><small>{p[1]} · {p[3]} bed · {p[4]} · ${p[2].toLocaleString()}</small></figcaption></figure>)}</div>
  {!L.length&&<p>No matches — adjust filters.</p>}
  <h2>Enquire{sel?` about ${sel[0]}`:''}</h2><Form name="realestate" cta="Contact agent" prefill={{property:sel?sel[0]:''}} fields={[...NAME,F('property','Property'),F('message','Message',{type:'textarea',wide:1})]}/>
  <p className="info">Agent: Alex Morgan (fictional) · +00 000 000 000</p></section></>}

function Fashion(){const [c,setC]=useState('Women');const [p,setP]=useState(null);return <>
 <section className="dh"><Img name="fashion-hero" alt="Fashion editorial" label="Editorial" className="bg" eager/><div className="shade"/><div className="wrap"><h1>Maison Ardent</h1><p>Quiet luxury, cut with intent.</p></div></section>
 <section className="wrap ds"><p>Maison Ardent is a fictional label created for demonstration.</p><div className="tabs">{Object.keys(FASHION).map(k=><button key={k} className={c===k?'on':''} onClick={()=>setC(k)}>{k}</button>)}</div>
  <div className="grid3">{FASHION[c].map(x=><figure key={x[0]}><Img name={x[2]} alt={x[0]} label={x[0]}/><figcaption>{x[0]} · ${x[1]}<br/><button className="link" onClick={()=>setP(x[0])}>Enquire →</button></figcaption></figure>)}</div>
  <h2 id="enq">Product enquiry{p?`: ${p}`:''}</h2><Form name="fashion" cta="Send enquiry" prefill={{product:p||''}} fields={[...NAME,F('product','Product',{req:1}),F('size','Size',{type:'select',options:['XS','S','M','L','XL']})]}/>
  {(()=>{const w=waLink(`Hello, I'd like to order: ${p||'a product'} (Maison Ardent demo)`);return w?<a className="btn" href={w}>Order on WhatsApp</a>:<p className="note">WhatsApp ordering is not configured (set VITE_WHATSAPP_NUMBER).</p>})()}</section></>}

function Cleaning(){const [s,setS]=useState(50);return <>
 <section className="dh"><Img name="clean-hero" alt="Bright clean interior" label="Clean interior" className="bg" eager/><div className="shade"/><div className="wrap"><h1>Brightwell Cleaning</h1><p>Spotless, on schedule.</p><a className="btn" href="#q">Get a quote</a></div></section>
 <section className="wrap ds"><h2>Packages</h2><div className="grid3">{PACKAGES.map(p=><div key={p[0]} className="cell"><small>{p[1]}</small><h3>{p[0]}</h3><b>{p[2]}</b><p>{p[3]}</p></div>)}</div>
  <h2>Before &amp; after</h2><div className="ba"><Img name="clean-after" alt="After cleaning" label="After"/><div className="ov" style={{clipPath:`inset(0 ${100-s}% 0 0)`}}><Img name="clean-before" alt="Before cleaning" label="Before"/></div>
  <input type="range" min="0" max="100" value={s} onChange={e=>setS(+e.target.value)} aria-label="Before and after slider"/></div>
  <h2 id="q">Quote request</h2><Form name="cleaning" cta="Request quote" fields={[...NAME,F('service','Service',{type:'select',options:PACKAGES.map(p=>p[0]),req:1}),F('date','Preferred date',{type:'date'}),F('details','Details',{type:'textarea',wide:1})]}/></section></>}

const MAP={hotel:Hotel,restaurant:Restaurant,construction:Construction,'real-estate':Estate,fashion:Fashion,cleaning:Cleaning};
export default function Demo(){const {slug}=useParams();const C=MAP[slug];const d=DEMOS.find(x=>x.slug===slug);
 if(!C)return <div className="wrap sec"><h1>Demo not found</h1><Link className="btn" to="/portfolio">Back</Link></div>;
 return <div className={'demo t-'+slug}><Bar d={d}/><C/></div>}
