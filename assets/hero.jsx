/* Flippy — Hero + Canvas simulation
   Visible, animated: dotted canvas, floating frames, live-sync wires,
   cursor trails, sparkle, and the product chrome preview.
*/

const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Reusable bits ---------- */

function Logo({size=22}){
  return (
    <img src="/flippy_logo.png" alt="Flippy" style={{height:size,width:'auto',display:'block'}}/>
  );
}

function NavBar(){
  const [scrolled,setScrolled] = useState(false);
  useEffect(()=>{
    const f=()=>setScrolled(window.scrollY>8);
    window.addEventListener('scroll',f); f(); return ()=>window.removeEventListener('scroll',f);
  },[]);
  return (
    <div className="nav" style={{background: scrolled? 'rgba(10,10,11,.85)':'rgba(10,10,11,.55)'}}>
      <div className="container nav-inner">
        <a href="#top"><Logo/></a>
        <nav className="nav-links" style={{marginLeft:14}}>
          <a href="#product">Product</a>
          <a href="#engines">Engines</a>
          <a href="#ai">AI Studio</a>
          <a href="#pricing">Pricing</a>
          <a href="#investors">For Investors</a>
        </nav>
        <div className="nav-actions">
          <span className="chip" style={{borderColor:'#3a2a6b',background:'rgba(139,92,246,.08)'}}>
            <span className="dot" style={{background:'#A78BFA',boxShadow:'0 0 10px #A78BFA'}}/>
            <span style={{color:'#d9cdff'}}>Private Beta · Q3 2026</span>
          </span>
          <a href="#waitlist" className="btn btn-primary btn-sm">Join Waitlist →</a>
        </div>
      </div>
    </div>
  );
}

/* ---------- Hero canvas (the showpiece) ---------- */

function HeroCanvas(){
  const stageRef = useRef(null);
  const [t,setT] = useState(0);
  useEffect(()=>{
    let raf;
    const loop = ()=>{ setT(performance.now()/1000); raf=requestAnimationFrame(loop); };
    raf=requestAnimationFrame(loop);
    return ()=>cancelAnimationFrame(raf);
  },[]);

  // Three floating frames that "sync" to engines
  const frames = [
    { id:'f1', x: '14%', y:'18%', w:220, h:150, color:'#8B5CF6', label:'Hero/Character', engine:'Unity' },
    { id:'f2', x: '54%', y:'12%', w:180, h:120, color:'#0094FF', label:'HUD/Health', engine:'Godot' },
    { id:'f3', x: '30%', y:'58%', w:260, h:170, color:'#00D672', label:'UI/Pause Menu', engine:'Unreal' },
  ];

  // Simulate a pulse timeline
  const pulse = (Math.sin(t*1.6)+1)/2;

  return (
    <div ref={stageRef} className="hero-canvas dotgrid">
      {/* ambient beams */}
      <div className="beam beam-a"/>
      <div className="beam beam-b"/>

      {/* floating frames */}
      {frames.map((f,i)=>(
        <div key={f.id} className="floatframe" style={{
          left:f.x, top:f.y, width:f.w, height:f.h,
          borderColor:f.color,
          transform:`translateY(${Math.sin(t*0.8 + i)*8}px) rotate(${Math.sin(t*0.3+i)*1.2}deg)`
        }}>
          <div className="ff-chrome">
            <span className="ff-dot" style={{background:f.color,boxShadow:`0 0 8px ${f.color}`}}/>
            <span className="ff-label">{f.label}</span>
            <span className="ff-engine mono">→ {f.engine}</span>
          </div>
          <div className="ff-body" style={{background:`radial-gradient(120% 80% at 30% 20%, ${f.color}22, transparent 60%)`}}>
            {/* faux layer content */}
            <div className="ff-shape" style={{background:`${f.color}33`,borderColor:`${f.color}66`}}/>
          </div>
          {/* sync indicator */}
          <div className="ff-sync" style={{opacity:.6+pulse*.4}}>
            <span className="ff-sync-dot" style={{background:f.color}}/>
            <span className="mono">Live Sync · {(pulse*180+30|0)}ms</span>
          </div>
        </div>
      ))}

      {/* SVG connector wires */}
      <svg className="wires" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wireA" x1="0" x2="1">
            <stop offset="0" stopColor="#8B5CF6" stopOpacity="0"/>
            <stop offset=".5" stopColor="#8B5CF6" stopOpacity=".7"/>
            <stop offset="1" stopColor="#38B6FF" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M 230 200 C 400 180, 520 260, 680 180" stroke="url(#wireA)" strokeWidth="1.5" fill="none" strokeDasharray="4 6"
              style={{strokeDashoffset: -t*30}}/>
        <path d="M 340 420 C 500 420, 620 340, 780 260" stroke="url(#wireA)" strokeWidth="1.5" fill="none" strokeDasharray="4 6"
              style={{strokeDashoffset: -t*20}}/>
      </svg>

      {/* traveling packets */}
      {[0,1,2].map(i=>{
        const phase = (t*0.4 + i*0.33) % 1;
        const x = 24 + phase*62;
        const y = 30 + Math.sin(phase*Math.PI*2)*18;
        return <div key={i} className="packet" style={{left:x+'%',top:y+'%',opacity:Math.sin(phase*Math.PI)}}/>;
      })}

      {/* engine receiver badges */}
      <div className="engine-badge eb-unity" style={{top:'20%',right:'6%'}}>
        <EngineIcon name="unity"/>
        <div><div className="mono tiny">UNITY</div><div className="ok">synced</div></div>
      </div>
      <div className="engine-badge eb-unreal" style={{top:'44%',right:'10%'}}>
        <EngineIcon name="unreal"/>
        <div><div className="mono tiny">UNREAL</div><div className="ok">synced</div></div>
      </div>
      <div className="engine-badge eb-godot" style={{top:'68%',right:'5%'}}>
        <EngineIcon name="godot"/>
        <div><div className="mono tiny">GODOT</div><div className="ok">synced</div></div>
      </div>

      {/* toolbar mimicking the product screenshot */}
      <div className="canvas-toolbar">
        <ToolBtn>+</ToolBtn>
        <sep/>
        <ToolBtn>▭</ToolBtn>
        <ToolBtn>◯</ToolBtn>
        <ToolBtn>T</ToolBtn>
        <ToolBtn>✦</ToolBtn>
        <ToolBtn>↗</ToolBtn>
        <ToolBtn active>▷</ToolBtn>
        <ToolBtn>✎</ToolBtn>
        <sep/>
        <span className="mono" style={{color:'#8B8B95',fontSize:11,padding:'0 10px'}}>100%</span>
        <button className="tb-export">Export</button>
      </div>

      {/* Make-with-AI CTA — floating */}
      <div className="ai-chip">
        <span className="spark"/>Make with AI
      </div>
    </div>
  );
}

function EngineIcon({name}){
  const logos = {unity:'/Unity_Logo.png', unreal:'/Unreal_Logo.png', godot:'/Godot_Logo.png'};
  const bg = {unity:'#00B9BB22', unreal:'#ffffff10', godot:'#3B85C422'}[name];
  return <div className="eng-icon" style={{background:bg}}><img src={logos[name]} alt={name} style={{width:18,height:18,objectFit:'contain'}}/></div>;
}
function ToolBtn({children, active}){ return <button className={"tb-btn "+(active?'on':'')}>{children}</button> }

/* ---------- Hero block ---------- */

function Hero(){
  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-left">
          <div className="chip">
            <span className="dot"/>
            <span>Live Sync · Design ⇄ Unity · Unreal · Godot</span>
          </div>
          <h1 style={{marginTop:22}}>
            The design canvas<br/>
            that <span className="grad-violet">ships to engine.</span>
          </h1>
          <p className="hero-sub">
            Flippy is a hybrid, infinite-canvas tool for game teams. Draw once — sync live to
            Unity, Unreal, and Godot. Generate layer-ready assets with <span style={{color:'#C4B5FD'}}>Make with AI</span>.
            Zero export, zero reimport.
          </p>
          <div className="hero-cta">
            <a href="#waitlist" className="btn btn-primary">Join the Waitlist <span aria-hidden>→</span></a>
            <a href="#investors" className="btn btn-ghost">Investor Brief</a>
          </div>
          <div className="hero-metrics">
            <Metric v="&lt;200ms" label="Live-Sync Latency"/>
            <Metric v="100%" label="Vector Fidelity"/>
            <Metric v="40%" label="Workflow Time Saved"/>
          </div>
        </div>
        <div className="hero-right">
          <HeroCanvas/>
          <div className="hero-right-legend">
            <span className="mono tiny" style={{color:'#5C5C66'}}>/01 · product.canvas</span>
            <span className="mono tiny" style={{color:'#5C5C66'}}>auto-save · every 5m</span>
          </div>
        </div>
      </div>

      {/* Engine marquee */}
      <div className="engine-marquee">
        <div className="marquee-track">
          {[...Array(2)].map((_,k)=>(
            <div key={k} className="marquee-row">
              <span className="mono label">Ships to →</span>
              <MarqueeTag>Unity 6</MarqueeTag>
              <MarqueeTag>Unreal Engine 5</MarqueeTag>
              <MarqueeTag>Godot 4.3</MarqueeTag>
              <MarqueeTag>GitHub</MarqueeTag>
              <MarqueeTag>WebSocket Bridge</MarqueeTag>
              <MarqueeTag>C#</MarqueeTag>
              <MarqueeTag>C++</MarqueeTag>
              <MarqueeTag>GDScript</MarqueeTag>
              <MarqueeTag>Flippy Diffusion</MarqueeTag>
              <MarqueeTag>Animapy</MarqueeTag>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({v,label}){
  return (
    <div className="metric">
      <div className="metric-v" dangerouslySetInnerHTML={{__html:v}}/>
      <div className="metric-l">{label}</div>
    </div>
  );
}
function MarqueeTag({children}){ return <span className="mtag mono">{children}</span> }

Object.assign(window,{NavBar,Hero,Logo});
