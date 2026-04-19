/* Flippy — Pricing, AI Credits calculator, Roadmap, Investors, Waitlist */

const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Pricing ---------- */

function PricingSection(){
  const [yearly,setYearly] = useState(false);
  const tiers = [
    { name:'Lite', audience:'Students & Hobbyists', price:0, color:'#C9C9D1',
      features:['Basic design tools','1 active project','Limited AI usage','Community assets read-only','Export to PNG/SVG'],
      cta:'Start free', highlight:false },
    { name:'Starter', audience:'Indie Developers', price:9, color:'#38B6FF',
      features:['Unlimited projects','Unity & Godot bridges','Basic AI module','GitHub connect (1 repo)','Live Sync beta'],
      cta:'Get Starter', highlight:false },
    { name:'Pro', audience:'Professional Designers', price:19, color:'#8B5CF6',
      features:['All engine bridges (incl. Unreal)','Advanced AI · Anti-Prompt','Version control · branches','Priority WebSocket lane','Animapy timeline'],
      cta:'Go Pro', highlight:true },
    { name:'Studio', audience:'Teams & Companies', price:49, color:'#00D672', perSeat:true,
      features:['Team collaboration','Shared asset libraries','Private cloud storage','Priority SDK support','SSO & audit log'],
      cta:'Talk to sales', highlight:false },
  ];
  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 06</span>
          <span className="eyebrow">Business Model</span>
          <div className="bar"/>
        </div>
        <div style={{display:'flex',alignItems:'end',justifyContent:'space-between',flexWrap:'wrap',gap:24}}>
          <div>
            <h2 style={{maxWidth:900}}>Pricing built for<br/><span className="grad-lime">the whole pipeline.</span></h2>
            <p className="lede" style={{maxWidth:640,marginTop:16}}>
              From the student's first tilemap to a studio's live-ops war room. We charge for
              the time we save — not per seat of frustration.
            </p>
          </div>
          <div className="toggle">
            <button className={!yearly?'on':''} onClick={()=>setYearly(false)}>Monthly</button>
            <button className={yearly?'on':''} onClick={()=>setYearly(true)}>Yearly <span className="save">–20%</span></button>
          </div>
        </div>

        <div className="pricing-grid">
          {tiers.map(t=><PriceCard key={t.name} tier={t} yearly={yearly}/>)}
        </div>

        <div className="pricing-extra">
          <div className="pe-badge mono tiny">EARLY BIRD · LIFETIME DEAL</div>
          <div style={{flex:1}}>
            <b>Lifetime launch license.</b>
            <span style={{color:'#8B8B95'}}> Limited to the first 500 power users. Pro features, forever.</span>
          </div>
          <a className="btn btn-ghost btn-sm" href="#waitlist">Reserve a seat →</a>
        </div>
      </div>
    </section>
  );
}

function PriceCard({tier,yearly}){
  const price = yearly ? Math.round(tier.price*12*0.8) : tier.price;
  const unit = tier.price===0 ? '' : yearly ? '/ yr' : '/ mo';
  return (
    <div className={"price-card "+(tier.highlight?'hl':'')} style={{'--accent':tier.color}}>
      {tier.highlight && <div className="pc-ribbon mono tiny">MOST POPULAR</div>}
      <div className="pc-head">
        <div className="pc-name">{tier.name}</div>
        <div className="pc-aud mono tiny">{tier.audience}</div>
      </div>
      <div className="pc-price">
        <span className="pc-currency">$</span>
        <span className="pc-num">{price}</span>
        <span className="pc-unit">{unit}{tier.perSeat?' / seat':''}</span>
      </div>
      <ul className="pc-feat">
        {tier.features.map(f=><li key={f}><span className="pc-dot" style={{background:tier.color}}/>{f}</li>)}
      </ul>
      <a href="#waitlist" className={"btn "+(tier.highlight?'btn-primary':'btn-ghost')} style={{width:'100%',justifyContent:'center'}}>
        {tier.cta}
      </a>
    </div>
  );
}

/* ---------- AI Credit Calculator (layer.ai-style) ---------- */

function CreditCalculator(){
  const [images,setImages] = useState(200);
  const [upscales,setUpscales] = useState(40);
  const [variations,setVariations] = useState(60);
  const [hd,setHd] = useState(true);

  const base = images * (hd?1.5:1);
  const up = upscales * 3;
  const vars_ = variations * 0.5;
  const total = Math.round(base+up+vars_);
  const cost = (total * 0.01).toFixed(2);

  const [tier,setTier] = useState('pro');
  const included = {lite:50, starter:500, pro:3000, studio:10000}[tier];
  const overage = Math.max(0, total - included);
  const overageCost = (overage * 0.008).toFixed(2);

  return (
    <section id="credits" className="section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 07</span>
          <span className="eyebrow">Usage-Based · AI Compute Credits</span>
          <div className="bar"/>
        </div>
        <div className="twocol">
          <div>
            <h2>Pay only for the<br/><span className="grad-violet">AI you actually run.</span></h2>
            <p className="lede">
              Every plan includes a monthly credit bucket. Scale past it at flat binary rates —
              no per-pixel surprises, no model-switch roulette. Credits roll over for 60 days.
            </p>
            <div className="credit-table">
              <div className="ct-row ct-head">
                <div>Operation</div><div>Credits</div>
              </div>
              <div className="ct-row"><div>1× Asset generation (SD)</div><div className="mono">1</div></div>
              <div className="ct-row"><div>1× HD generation (SDXL)</div><div className="mono">1.5</div></div>
              <div className="ct-row"><div>1× Upscale 4K</div><div className="mono">3</div></div>
              <div className="ct-row"><div>1× Style variation</div><div className="mono">0.5</div></div>
              <div className="ct-row"><div>1× Anti-Prompt filter pass</div><div className="mono" style={{color:'#34E08B'}}>free</div></div>
            </div>
          </div>

          <div className="calc">
            <div className="calc-top">
              <span className="mono tiny" style={{color:'#8B8B95'}}>ESTIMATOR</span>
              <span className="mono tiny" style={{marginLeft:'auto',color:'#34E08B'}}>● live</span>
            </div>

            <div className="calc-tier">
              {['lite','starter','pro','studio'].map(k=>(
                <button key={k} className={"ct-pill "+(tier===k?'on':'')} onClick={()=>setTier(k)}>
                  {k[0].toUpperCase()+k.slice(1)}
                </button>
              ))}
            </div>

            <Slider label="Asset generations / month" value={images} onChange={setImages} min={0} max={2000} step={10} color="#8B5CF6"/>
            <Slider label="Upscales / month" value={upscales} onChange={setUpscales} min={0} max={500} step={5} color="#0094FF"/>
            <Slider label="Style variations / month" value={variations} onChange={setVariations} min={0} max={1000} step={10} color="#FF4D8D"/>
            <label className="calc-check">
              <input type="checkbox" checked={hd} onChange={e=>setHd(e.target.checked)}/>
              <span>HD output (SDXL) · 1.5× credits</span>
            </label>

            <div className="calc-out">
              <div>
                <div className="mono tiny" style={{color:'#8B8B95'}}>CREDITS / MONTH</div>
                <div className="mono calc-num">{total.toLocaleString()}</div>
              </div>
              <div>
                <div className="mono tiny" style={{color:'#8B8B95'}}>INCLUDED IN {tier.toUpperCase()}</div>
                <div className="mono calc-num" style={{color:'#34E08B'}}>{included.toLocaleString()}</div>
              </div>
              <div>
                <div className="mono tiny" style={{color:'#8B8B95'}}>OVERAGE COST</div>
                <div className="mono calc-num" style={{color: overage>0?'#FFB020':'#34E08B'}}>
                  {overage>0? `$${overageCost}` : '$0.00'}
                </div>
              </div>
            </div>

            <div className="calc-note mono tiny">
              {overage>0
                ? `${overage.toLocaleString()} credits over · billed at $0.008 / credit`
                : `✓ Covered entirely by your ${tier} plan`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({label,value,onChange,min,max,step,color}){
  const pct = ((value-min)/(max-min))*100;
  return (
    <div className="slider">
      <div className="sl-top">
        <span>{label}</span>
        <span className="mono">{value.toLocaleString()}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e=>onChange(+e.target.value)}
        style={{background:`linear-gradient(90deg, ${color} 0%, ${color} ${pct}%, #1E1E23 ${pct}%, #1E1E23 100%)`}}/>
    </div>
  );
}

/* ---------- Roadmap ---------- */

function RoadmapSection(){
  const phases = [
    { q:'Q2 · 2026', title:'Protocol Optimization', body:'Bidirectional WebSocket/TCP bridge. Memory buffer tuning. Instant asset reflection.', color:'#8B5CF6', status:'in progress' },
    { q:'Q3 · 2026', title:'Latency-Optimized AI', body:'Flippy Diffusion on low-latency inference servers. C++ API wrapper. <5s per asset.', color:'#0094FF', status:'queued' },
    { q:'Q4 · 2026', title:'Cross-Engine Integration', body:'Native SDKs for Unreal (C++) and Godot (C++). Beyond the initial Unity (C#) release.', color:'#00D672', status:'queued' },
    { q:'Q1 · 2027', title:'Cloud Persistence & API', body:'Managed asset layer. RESTful API for third-party production tool integrations.', color:'#FF4D8D', status:'queued' },
  ];
  return (
    <section id="roadmap" className="section">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 08</span>
          <span className="eyebrow">Technical Roadmap</span>
          <div className="bar"/>
        </div>
        <h2 style={{maxWidth:900}}>Optimizing the <span className="grad-violet">binary flow</span> of creativity.</h2>
        <div className="roadmap">
          <div className="rm-line"/>
          {phases.map((p,i)=>(
            <div key={i} className="rm-item" style={{'--clr':p.color}}>
              <div className="rm-node"><span/></div>
              <div className="rm-card">
                <div className="rm-q mono tiny">{p.q}</div>
                <div className="rm-t">{p.title}</div>
                <p>{p.body}</p>
                <div className="rm-s mono tiny">
                  <span className="dot" style={{background:p.status==='in progress'?'#FFB020':'#5C5C66'}}/>
                  {p.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Investors / Market / Team ---------- */

function InvestorsSection(){
  return (
    <section id="investors" className="section investors">
      <div className="container">
        <div className="section-head">
          <span className="num">/ 09</span>
          <span className="eyebrow">For Investors</span>
          <div className="bar"/>
        </div>
        <h2 style={{maxWidth:1000}}>Capturing the <span className="grad-lime">$330B</span> digital production revolution.</h2>

        <div className="market">
          <MarketRing label="TAM" v="$331.3B" sub="Global video game software" pct={100} color="#8B5CF6"/>
          <MarketRing label="SAM" v="$4.6B" sub="UI/UX + Dev tools" pct={32} color="#0094FF"/>
          <MarketRing label="SOM" v="$500M" sub="AI-powered 2D production" pct={12} color="#00D672"/>
        </div>

        <div className="investor-quote">
          <div className="iq-mark">“</div>
          <p>We aren't just selling a license; we are charging for the time we save. In a high-speed industry, efficiency is the ultimate currency.</p>
        </div>

        <div className="investor-cta">
          <div>
            <h3 style={{fontSize:28,letterSpacing:'-0.02em'}}>Pre-seed round · Q2 2026</h3>
            <p style={{color:'#8B8B95',marginTop:10,maxWidth:520}}>
              Raising to finish the Unity bridge, ship Unreal & Godot SDKs, and scale the Flippy Diffusion inference cluster.
            </p>
          </div>
          <div className="ic-actions">
            <a href="#waitlist" className="btn btn-primary">Request the deck</a>
            <a href="#waitlist" className="btn btn-ghost">Book a call</a>
          </div>
        </div>
      </div>
    </section>
  );
}
function MarketRing({label,v,sub,pct,color}){
  const C = 2*Math.PI*54;
  return (
    <div className="mring">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r="54" stroke="#1E1E23" strokeWidth="10" fill="none"/>
        <circle cx="70" cy="70" r="54" stroke={color} strokeWidth="10" fill="none"
          strokeDasharray={`${C*pct/100} ${C}`} strokeLinecap="round"
          transform="rotate(-90 70 70)" style={{filter:`drop-shadow(0 0 6px ${color})`}}/>
        <text x="70" y="70" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="22" fontFamily="var(--font-mono)" fontWeight="600">{label}</text>
      </svg>
      <div className="mring-v">{v}</div>
      <div className="mring-sub">{sub}</div>
    </div>
  );
}

/* ---------- Waitlist ---------- */

function WaitlistSection(){
  const [email,setEmail] = useState('');
  const [sent,setSent] = useState(false);
  const [role,setRole] = useState('indie');
  return (
    <section id="waitlist" className="section waitlist">
      <div className="container">
        <div className="wl-card dotgrid">
          <div className="wl-bloom"/>
          <div style={{position:'relative'}}>
            <div className="chip" style={{marginBottom:18}}>
              <span className="dot"/>
              <span>Private Beta · opening Q3 2026</span>
            </div>
            <h2 style={{maxWidth:900}}>The production OS is coming.<br/><span className="grad-violet">Be on the canvas first.</span></h2>
            <p className="lede" style={{maxWidth:600,marginTop:14}}>
              Join 2,400+ designers, developers, and studios already on the list. Early members get
              the lifetime deal, closed beta access, and a seat in the Flippy Founders channel.
            </p>

            {!sent ? (
              <form className="wl-form" onSubmit={e=>{e.preventDefault();if(email.includes('@')) setSent(true)}}>
                <div className="wl-roles">
                  {[['indie','Indie Dev'],['designer','Designer'],['studio','Studio'],['investor','Investor']].map(([k,v])=>(
                    <button type="button" key={k} className={"wl-role "+(role===k?'on':'')} onClick={()=>setRole(k)}>{v}</button>
                  ))}
                </div>
                <div className="wl-input-row">
                  <input type="email" placeholder="you@studio.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
                  <button className="btn btn-primary" type="submit">Reserve my seat →</button>
                </div>
                <div className="mono tiny" style={{color:'#5C5C66',marginTop:10}}>
                  We'll never spam. One launch email, one beta invite. That's it.
                </div>
              </form>
            ) : (
              <div className="wl-success">
                <div className="ws-check">✓</div>
                <div>
                  <div style={{fontSize:20,fontWeight:500}}>You're in.</div>
                  <div style={{color:'#8B8B95',marginTop:6}}>We'll email <b style={{color:'#fff'}}>{email}</b> the moment the beta opens.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer(){
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Logo/>
          <p style={{marginTop:14,maxWidth:320}}>The real-time production OS for the next generation of games.</p>
          <div className="mono tiny" style={{color:'#5C5C66',marginTop:18}}>© 2026 Flippy · Istanbul · Made by Game Design Academia</div>
        </div>
        <div>
          <div className="foot-h">Product</div>
          <a href="#livesync">Live Sync</a><a href="#engines">Engines</a><a href="#ai">Make with AI</a><a href="#pricing">Pricing</a>
        </div>
        <div>
          <div className="foot-h">Company</div>
          <a href="#roadmap">Roadmap</a><a href="#investors">Investors</a><a href="#benchmarks">Benchmarks</a><a href="#compare">vs. Competitors</a>
        </div>
        <div>
          <div className="foot-h">Resources</div>
          <a href="#">SDK Docs</a><a href="#">GitHub</a><a href="#">Discord</a><a href="#">Press Kit</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window,{PricingSection,CreditCalculator,RoadmapSection,InvestorsSection,WaitlistSection,Footer});
