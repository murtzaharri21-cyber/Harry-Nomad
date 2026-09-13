import React, { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, CalendarDays, Check, Compass, Instagram, Menu, Play, ShieldCheck, Star, X } from 'lucide-react'
import { saveInquiry } from './lib/supabase'

const destinations = [
  {
    title: 'Passu Cones',
    eyebrow: 'The cinematic north',
    copy: 'A valley shaped by glaciers, apricot orchards and the unmistakable spires of Passu.',
    details: 'Passu is all about scale. The granite cones rise above the Karakoram Highway, while apricot orchards, riverside villages and slow afternoons make the landscape feel cinematic without ever feeling rushed.',
    image: '/images/passu-cones.jpg',
    gallery: ['/images/passu-cones.jpg', '/images/passu-hero.jpg', '/images/pinterest-passu-mountain.jpg', '/images/gojal-passu.jpg'],
    tag: '01',
  },
  {
    title: 'Attabad Lake',
    eyebrow: 'Blue, but brighter',
    copy: 'Turquoise water, sheer mountains and a quiet afternoon on the lake.',
    details: 'One of the most vivid stops in Hunza, Attabad Lake turns the valley into a mirror of blue. It is a favourite place for a slow drive, a short walk and a long pause by the water.',
    image: '/images/attabad-lake.jpg',
    gallery: ['/images/attabad-lake.jpg', '/images/pinterest-hunza-window.jpg', '/images/gulmit.jpg', '/images/hunza-window-hero.jpg'],
    tag: '02',
  },
  {
    title: 'Eagle’s Nest',
    eyebrow: 'Above the valley',
    copy: 'Catch Hunza’s last light from a ridge with a front-row view of the Karakoram.',
    details: 'Eagle’s Nest is a ridge-top lookout above Karimabad, where the valley opens out and the colours shift from gold to deep evening blue. It is one of those places where a simple stop turns into a memory.',
    image: '/images/eagles-nest.jpg',
    gallery: ['/images/eagles-nest.jpg', '/images/eagles-valley.jpg', '/images/pinterest-eagles-nest.jpg', '/images/pinterest-hunza-window.jpg'],
    tag: '03',
  },
  {
    title: 'Khunjerab Pass',
    eyebrow: 'Where borders disappear',
    copy: 'A high-altitude road to the roof of the world, where Pakistan meets China at 4,693 metres.',
    details: 'Khunjerab Pass is the high-country crossing that defines the north. The road rises into a striking, almost lunar landscape, and the sense of distance is as powerful as the scenery itself.',
    image: '/images/khunjerab-pass.jpg',
    gallery: ['/images/khunjerab-pass.jpg', '/images/sost.jpg', '/images/sost-exact.jpg', '/images/gojal-passu.jpg'],
    tag: '04',
  },
  {
    title: 'Altit Fort',
    eyebrow: 'A thousand years of Hunza',
    copy: 'Walk through a restored royal village above the valley, with orchards spilling toward the river.',
    details: 'Altit is hushed, terraced and beautifully layered. The fort, the narrow stone lanes and the valley below all work together to create one of Hunza’s most atmospheric heritage stops.',
    image: '/images/altit-fort.jpg',
    gallery: ['/images/altit-fort.jpg', '/images/altit-top.jpg', '/images/baltit-fort.jpg', '/images/baltit-autumn.jpg'],
    tag: '05',
  },
  {
    title: 'Deosai Plains',
    eyebrow: 'The land of giants',
    copy: 'Wildflowers, wide skies and Himalayan brown bears across one of the highest plateaus on earth.',
    details: 'Deosai feels immense and open in a way few places do. It is one of the best destinations for wild roaming, long horizons and the kind of quiet that changes the way you travel.',
    image: '/images/deosai-plains.jpg',
    gallery: ['/images/deosai-plains.jpg', '/images/pinterest-deosai.jpg', '/images/fairy-meadows.jpg', '/images/pinterest-nanga-parbat.jpg'],
    tag: '06',
  },
  {
    title: 'Fairy Meadows',
    eyebrow: 'Killer mountain views',
    copy: 'A pine-framed meadow beneath Nanga Parbat, reached by one of Pakistan’s great mountain roads.',
    details: 'Fairy Meadows brings together forest, meadow and one of the world’s most dramatic mountain faces. The experience is simple but unforgettable: a walk, a slow evening and a wide sky.',
    image: '/images/fairy-meadows.jpg',
    gallery: ['/images/fairy-meadows.jpg', '/images/pinterest-nanga-parbat.jpg', '/images/pinterest-hunza-window.jpg', '/images/deosai-plains.jpg'],
    tag: '07',
  },
  {
    title: 'Shigar Fort',
    eyebrow: 'A garden in the mountains',
    copy: 'A centuries-old Balti fort and orchard retreat in the gateway valley to K2.',
    details: 'Shigar sits where the landscape begins to turn toward Baltistan’s high, rugged terrain. Its fort, gardens and courtyards make it a striking stop for anyone interested in heritage and hospitality.',
    image: '/images/shigar-fort.jpg',
    gallery: ['/images/shigar-fort.jpg', '/images/khaplu-palace.jpg', '/images/baltit-balcony.jpg', '/images/baltit-fort.jpg'],
    tag: '08',
  },
  {
    title: 'Shangrila Lake',
    eyebrow: 'Skardu, reflected',
    copy: 'A calm alpine lake set against the stark, beautiful drama of the Skardu valley.',
    details: 'Shangrila Lake is a gentler kind of drama. The reflections are quiet and cinematic, and the surrounding valley gives the whole stop a calm, restorative pace.',
    image: '/images/shangrila-lake.jpg',
    gallery: ['/images/shangrila-lake.jpg', '/images/attabad-lake.jpg', '/images/fairy-meadows.jpg', '/images/khaplu-palace.jpg'],
    tag: '09',
  },
  {
    title: 'Passu Gojal',
    eyebrow: 'The Karakoram road',
    copy: 'Follow the highway through autumn poplars and sharp granite walls toward the high valleys of Gojal.',
    details: 'Passu Gojal is where the road starts to feel like a story. Narrow lanes, river crossings and the sense of moving deeper into the mountains give this part of Hunza its own rhythm.',
    image: '/images/gojal-passu.jpg',
    gallery: ['/images/gojal-passu.jpg', '/images/passu-hero.jpg', '/images/passu-cones.jpg', '/images/pinterest-passu-mountain.jpg'],
    tag: '10',
  },
  {
    title: 'Gulmit Valley',
    eyebrow: 'A village above the river',
    copy: 'Stone lanes, old homes and wide mountain views in the heart of Upper Hunza.',
    details: 'Gulmit is a lovely reminder that the north is defined by everyday life as much as by postcard views. The valley’s lanes, homes and river-facing terraces make it feel both grounded and beautiful.',
    image: '/images/gulmit-exact.jpg',
    gallery: ['/images/gulmit-exact.jpg', '/images/gulmit.jpg', '/images/gojal-passu.jpg', '/images/passu-cones.jpg'],
    tag: '11',
  },
  {
    title: 'Borith Lake',
    eyebrow: 'Quiet water, high country',
    copy: 'A peaceful glacial lake near Gulmit, framed by dry peaks and the colors of the upper valley.',
    details: 'Borith Lake is a place for quiet observation. The water is still, the slopes are stark and the mood feels more reflective than dramatic, which is exactly why it stays with people.',
    image: '/images/borith-lake.jpg',
    gallery: ['/images/borith-lake.jpg', '/images/gulmit-exact.jpg', '/images/gulmit.jpg', '/images/attabad-lake.jpg'],
    tag: '12',
  },
  {
    title: 'Hussaini Bridge',
    eyebrow: 'A crossing to remember',
    copy: 'Step carefully above the Hunza River on one of Gojal’s most unforgettable village crossings.',
    details: 'Hussaini Bridge is one of those places that turns a simple crossing into a memorable moment. It is a narrow and striking passage, and the river below gives the whole experience its intensity.',
    image: '/images/hussaini-bridge.jpg',
    gallery: ['/images/hussaini-bridge.jpg', '/images/gulmit-exact.jpg', '/images/gojal-passu.jpg', '/images/passu-cones.jpg'],
    tag: '13',
  },
  {
    title: 'Sost',
    eyebrow: 'The last town before the pass',
    copy: 'A rugged trading town where the Karakoram Highway turns toward Khunjerab and the Chinese border.',
    details: 'Sost is the gateway to the high pass and the last major settlement before the border. It is practical, lively and shaped by travel, making it a fascinating stop on any route north.',
    image: '/images/sost-exact.jpg',
    gallery: ['/images/sost-exact.jpg', '/images/sost.jpg', '/images/khunjerab-pass.jpg', '/images/gojal-passu.jpg'],
    tag: '14',
  },
]

const stories = [
  ['01', 'A living crossroads', 'For centuries, Hunza sat along the old Silk Road, connecting Central and South Asia through mountain passes.'],
  ['02', 'High-altitude gardens', 'Irrigation channels turn steep valleys into orchards. In spring, apricot blossom softens the granite landscape.'],
  ['03', 'The roof of Pakistan', 'Gilgit-Baltistan is home to five of the country’s fourteen 8,000-metre peaks, including K2.'],
]

const instagramSources = [
  ['Visit Gilgit-Baltistan', '@visitgilgitbaltistan', 'https://www.instagram.com/visitgilgitbaltistan/reel/DQe0mGdjbO3/', '/images/attabad-lake.jpg'],
  ['The Himalayan Tourism Club', '@thehimlayantourismclub', 'https://www.instagram.com/thehimlayantourismclub/reel/DcV9DOQNsVy/', '/images/fairy-meadows.jpg'],
  ['Pakistan Travel', '@pakistan.travel', 'https://www.instagram.com/pakistan.travel/', '/images/shangrila-lake.jpg'],
]

const fallbackImages = [
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85',
]

function useFallbackImage(event, fallback) {
  if (event.currentTarget.dataset.fallbackApplied) return
  event.currentTarget.dataset.fallbackApplied = 'true'
  event.currentTarget.src = fallback
}

function AdminImageManager({ slots, overrides, onUpload, onReset, onClose, onLogout }) {
  return <div className="admin-manager" role="dialog" aria-modal="true" aria-labelledby="admin-title"><div className="admin-manager-head"><div><div className="admin-badge"><ShieldCheck size={17} /> Private preview</div><h2 id="admin-title">Image manager</h2><p>Replace any visual on the site. Changes are saved in this browser for the demo.</p></div><div className="admin-manager-actions"><button className="reset-image" onClick={onLogout}>Log out</button><button className="modal-close" onClick={onClose} aria-label="Close image manager"><X size={20} /></button></div></div><div className="admin-image-grid">{slots.map((slot) => <div className="admin-image-row" key={slot.key}><img src={overrides[slot.key] || slot.src} alt="" /><div className="admin-image-meta"><strong>{slot.label}</strong><span>{slot.group}</span><div className="admin-image-actions"><label className="upload-button">Change image<input type="file" accept="image/*" onChange={(event) => onUpload(slot.key, event)} /></label>{overrides[slot.key] && <button className="reset-image" onClick={() => onReset(slot.key)}>Reset</button>}</div></div></div>)}</div><button className="primary-button full-width" onClick={onClose}>Done <Check size={17} /></button></div>
}

function AdminLoginScreen({ adminForm, setAdminForm, adminError, onLogin, onClose }) {
  return <div className="admin-manager" role="dialog" aria-modal="true" aria-labelledby="admin-login-title"><div className="admin-manager-head"><div><div className="admin-badge"><ShieldCheck size={17} /> Admin access</div><h2 id="admin-login-title">Sign in</h2><p>Use the Harry Nomad admin account to manage the site.</p></div><button className="modal-close" onClick={onClose} aria-label="Close admin login"><X size={20} /></button></div><form className="admin-login-form" onSubmit={onLogin}><div className="admin-login-grid"><label className="admin-field"><span>Email</span><input type="email" value={adminForm.email} onChange={(event) => setAdminForm((current) => ({ ...current, email: event.target.value }))} placeholder="murtzharry21@gmail.com" required /></label><label className="admin-field"><span>Password</span><input type="password" value={adminForm.password} onChange={(event) => setAdminForm((current) => ({ ...current, password: event.target.value }))} placeholder="Enter password" required /></label></div><div className="admin-login-note"><strong>Demo credentials</strong><span>Email: murtzharry21@gmail.com</span><span>Password: harrynomad2026</span></div>{adminError && <p className="admin-error">{adminError}</p>}<button className="primary-button full-width" type="submit">Login to dashboard <ArrowUpRight size={17} /></button></form></div>
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [showBooking, setShowBooking] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [adminAuthenticated, setAdminAuthenticated] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('harry-nomad-admin-auth') || 'false')
    } catch {
      return false
    }
  })
  const [adminForm, setAdminForm] = useState({ email: 'murtzharry21@gmail.com', password: '' })
  const [adminError, setAdminError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', month: '', note: '' })
  const [imageOverrides, setImageOverrides] = useState(() => {
    try { return JSON.parse(localStorage.getItem('harry-nomad-image-overrides') || '{}') } catch { return {} }
  })
  const heroVisualRef = useRef(null)

  const imageSlots = [
    { key: 'hero', label: 'Homepage hero', group: 'Front page', src: '/images/hunza-real.jpg' },
    { key: 'story', label: 'Story image', group: 'History section', src: '/images/baltit-fort.jpg' },
    { key: 'heritage-baltit', label: 'Baltit autumn', group: 'Heritage gallery', src: '/images/baltit-autumn.jpg' },
    { key: 'heritage-altit', label: 'Altit from above', group: 'Heritage gallery', src: '/images/altit-top.jpg' },
    { key: 'heritage-khaplu', label: 'Khaplu Palace', group: 'Heritage gallery', src: '/images/khaplu-palace.jpg' },
    { key: 'heritage-balcony', label: 'Royal Balcony', group: 'Heritage gallery', src: '/images/baltit-balcony.jpg' },
    { key: 'mountain-passu', label: 'Passu mountains', group: 'Mountains section', src: '/images/pinterest-passu-mountain.jpg' },
    { key: 'mountain-nanga', label: 'Nanga Parbat', group: 'Mountains section', src: '/images/pinterest-nanga-parbat.jpg' },
    { key: 'mountain-eagles', label: "Eagle's Nest", group: 'Mountains section', src: '/images/pinterest-eagles-nest.jpg' },
    { key: 'mountain-deosai', label: 'Deosai', group: 'Mountains section', src: '/images/pinterest-deosai.jpg' },
    ...destinations.map((destination, index) => ({ key: `destination-${index}`, label: destination.title, group: 'Journeys gallery', src: destination.image })),
  ]

  useEffect(() => {
    localStorage.setItem('harry-nomad-image-overrides', JSON.stringify(imageOverrides))
  }, [imageOverrides])

  useEffect(() => {
    localStorage.setItem('harry-nomad-admin-auth', JSON.stringify(adminAuthenticated))
  }, [adminAuthenticated])

  useEffect(() => {
    const onScroll = () => {
      document.documentElement.style.setProperty('--scroll-parallax', `${Math.min(window.scrollY * -0.045, 34)}px`)
      document.documentElement.style.setProperty('--scroll-depth', `${Math.min(window.scrollY * -0.018, 18)}px`)
      const sections = ['home', 'journeys', 'story', 'visit']
      const current = sections.find((id) => {
        const element = document.getElementById(id)
        return element && window.scrollY >= element.offsetTop - 160
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function getImage(key, source) {
    return imageOverrides[key] || source
  }

  function handleImageUpload(key, event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImageOverrides((current) => ({ ...current, [key]: reader.result }))
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  useEffect(() => {
    if (document.querySelector('script[src="https://www.instagram.com/embed.js"]')) return undefined
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => script.remove()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const cards = document.querySelectorAll('.destination-card, .instagram-card')
    const cleanups = []
    cards.forEach((card) => {
      const onPointerMove = (event) => {
        const bounds = card.getBoundingClientRect()
        const x = (event.clientX - bounds.left) / bounds.width - 0.5
        const y = (event.clientY - bounds.top) / bounds.height - 0.5
        card.style.setProperty('--card-tilt-x', `${y * -5}deg`)
        card.style.setProperty('--card-tilt-y', `${x * 5}deg`)
        card.style.setProperty('--card-glow-x', `${(x + 0.5) * 100}%`)
        card.style.setProperty('--card-glow-y', `${(y + 0.5) * 100}%`)
      }
      const resetPointer = () => {
        card.style.setProperty('--card-tilt-x', '0deg')
        card.style.setProperty('--card-tilt-y', '0deg')
      }
      card.addEventListener('pointermove', onPointerMove)
      card.addEventListener('pointerleave', resetPointer)
      cleanups.push(() => {
        card.removeEventListener('pointermove', onPointerMove)
        card.removeEventListener('pointerleave', resetPointer)
      })
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  useEffect(() => {
    const revealItems = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.16 })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const hero = heroVisualRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const onPointerMove = (event) => {
      const bounds = hero.getBoundingClientRect()
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
      hero.style.setProperty('--tilt-x', `${x * 2.2}deg`)
      hero.style.setProperty('--tilt-y', `${y * -2.2}deg`)
      hero.style.setProperty('--drift-x', `${x * -10}px`)
      hero.style.setProperty('--drift-y', `${y * -8}px`)
    }
    const resetPointer = () => {
      hero.style.setProperty('--tilt-x', '0deg')
      hero.style.setProperty('--tilt-y', '0deg')
      hero.style.setProperty('--drift-x', '0px')
      hero.style.setProperty('--drift-y', '0px')
    }
    hero.addEventListener('pointermove', onPointerMove)
    hero.addEventListener('pointerleave', resetPointer)
    return () => {
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', resetPointer)
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    await saveInquiry({ ...form, created_at: new Date().toISOString() })
    setSubmitted(true)
  }

  function handleAdminLogin(event) {
    event.preventDefault()

    if (adminForm.email.trim().toLowerCase() !== 'murtzharry21@gmail.com') {
      setAdminError('That email is not recognised for the admin account.')
      return
    }

    if (adminForm.password !== 'harrynomad2026') {
      setAdminError('Incorrect password. Please use the demo password shown below.')
      return
    }

    setAdminAuthenticated(true)
    setAdminError('')
    setAdminForm({ email: 'murtzharry21@gmail.com', password: '' })
  }

  function handleAdminLogout() {
    setAdminAuthenticated(false)
    setAdminError('')
    setAdminForm({ email: 'murtzharry21@gmail.com', password: '' })
  }

  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <button className="brand" onClick={() => goTo('home')} aria-label="Harry Nomad home">
          <span><strong>Harry</strong> Nomad</span>
        </button>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Primary navigation">
          {['journeys', 'story', 'visit'].map((item) => (
            <button key={item} className={activeSection === item ? 'active' : ''} onClick={() => goTo(item)}>{item}</button>
          ))}
        </nav>
        <div className="topbar-actions">
          <button className="admin-link" onClick={() => setShowAdmin(true)}>Admin demo</button>
          <button className="primary-button compact" onClick={() => setShowBooking(true)}>Plan a trip <ArrowUpRight size={16} /></button>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> Hunza · Gilgit-Baltistan</div>
            <h1>Go further.<br /><em>Feel more.</em></h1>
            <p className="hero-intro">Thoughtful journeys through Pakistan's high north, shaped by local knowledge and made for slow days.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => goTo('journeys')}>Explore journeys <ArrowDownRight size={17} /></button>
              <button className="watch-button" onClick={() => goTo('story')}><span className="play-icon"><Play size={13} fill="currentColor" /></span> Meet the people</button>
            </div>
            <div className="hero-note"><span className="dot" /> Curated locally, travelled slowly</div>
          </div>
          <div className="hero-visual" id="film" ref={heroVisualRef}>
            <div className="hero-image-wrap">
              <img src={getImage('hero', '/images/hunza-real.jpg')} onError={(event) => useFallbackImage(event, fallbackImages[4])} alt="Real view of Hunza Valley from Eagle's Nest with the Karakoram peaks and Hunza river" />
              <div className="image-shade" />
            </div>
            <div className="hero-stamp"><Compass size={16} /><span>GB / 01</span></div>
            <div className="hero-caption"><span>Hunza Valley · Karimabad</span><a href="https://www.pinterest.com/pin/630715122800060444/" target="_blank" rel="noreferrer">Image source · Pinterest</a></div>
          </div>
        </section>

        <section className="intro-strip">
          <div className="intro-label">A different kind of<br />travel company</div>
          <p>We make the journey feel like the destination. Thoughtful routes, unhurried days, and a local point of view that stays with you long after the mountains fade.</p>
          <div className="intro-signature">HN<span>✦</span></div>
        </section>

        <div className="kinetic-band" aria-hidden="true"><div className="kinetic-track"><span>Hunza</span><i>✦</i><span>Gojal</span><i>✦</i><span>Gilgit-Baltistan</span><i>✦</i><span>Find your north</span><i>✦</i><span>Hunza</span><i>✦</i><span>Gojal</span><i>✦</i><span>Gilgit-Baltistan</span><i>✦</i><span>Find your north</span><i>✦</i></div></div>

        <section className="instagram-section content-section">
          <div className="section-heading instagram-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> From the field</div><h2>See the north<br /><em>in motion.</em></h2></div><p>Original reels from people travelling, guiding and documenting the places we love. Tap through to meet the creators.</p></div>
          <div className="instagram-grid">{instagramSources.map(([name, handle, url, image], index) => <article className="instagram-card reveal" key={handle}><a className="field-image" href={url} target="_blank" rel="noreferrer"><img src={getImage(`field-${index}`, image)} alt={`${name} view of northern Pakistan`} /><span className="field-open"><ArrowUpRight size={16} /></span></a><div className="instagram-credit"><span>{name}</span><a href={url} target="_blank" rel="noreferrer">{handle} <ArrowUpRight size={14} /></a></div></article>)}</div>
        </section>

        <section id="journeys" className="journeys-section content-section">
          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> The places in between</div><h2>Go where the<br /><em>air feels rare.</em></h2></div><p>Not a checklist. A collection of places to feel, taste and remember. Each trip is designed around the rhythm of the valley.</p></div>
          <div className="destination-grid">
            {destinations.map((destination, index) => <article className={`destination-card card-${index + 1} reveal reveal-delay-${(index % 3) + 1}`} key={destination.title} onClick={() => setSelectedDestination(destination)}><div className="destination-image"><img src={getImage(`destination-${index}`, destination.image)} onError={(event) => useFallbackImage(event, fallbackImages[index])} alt={`${destination.title}, Hunza Gilgit-Baltistan`} loading="lazy" /><span className="card-number">{destination.tag}</span><span className="card-arrow"><ArrowUpRight size={17} /></span></div><div className="destination-copy"><div><span>{destination.eyebrow}</span><h3>{destination.title}</h3></div><p>{destination.copy}</p></div></article>)}
          </div>
          <div className="journey-footer"><span>Three ways to meet the mountains</span><button className="text-button" onClick={() => setShowBooking(true)}>Build your itinerary <ArrowUpRight size={16} /></button></div>
        </section>

        <section id="story" className="story-section content-section">
          <div className="story-image reveal"><img src={getImage('story', '/images/baltit-fort.jpg')} onError={(event) => useFallbackImage(event, fallbackImages[4])} alt="Baltit Fort in Karimabad, Hunza" loading="lazy" /><div className="story-image-label">Baltit Fort<br />Karimabad, Hunza</div></div>
          <div className="story-copy"><div className="eyebrow"><span className="eyebrow-line" /> A little context</div><h2>Every view has<br />a <em>story.</em></h2><p className="story-lead">Hunza is more than a backdrop. It is an ancient culture, a generous table and a landscape that has shaped the people who call it home.</p><div className="story-list">{stories.map(([number, title, copy]) => <div className="story-item" key={number}><span>{number}</span><div><h4>{title}</h4><p>{copy}</p></div></div>)}</div><button className="text-button" onClick={() => setShowBooking(true)}>Read the field notes <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="heritage-section content-section">
          <div className="heritage-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> Architecture of the north</div><h2>Forts, courtyards<br /><em>and carved light.</em></h2></div><p>Across Hunza and Baltistan, timber, stone and mountain light come together in places that still feel lived in.</p></div>
          <div className="heritage-grid">
            <article className="heritage-card heritage-wide reveal"><img src={getImage('heritage-baltit', '/images/baltit-autumn.jpg')} alt="Baltit Fort surrounded by autumn trees" loading="lazy" /><div><span>01 · Karimabad, Hunza</span><h3>Baltit Fort in autumn</h3></div></article>
            <article className="heritage-card reveal reveal-delay-1"><img src={getImage('heritage-altit', '/images/altit-top.jpg')} alt="Altit Fort and Hunza Valley from above" loading="lazy" /><div><span>02 · Altit, Hunza</span><h3>Altit from the valley</h3></div></article>
            <article className="heritage-card reveal reveal-delay-2"><img src={getImage('heritage-khaplu', '/images/khaplu-palace.jpg')} alt="Khaplu Palace in Baltistan" loading="lazy" /><div><span>03 · Khaplu, Baltistan</span><h3>Khaplu Palace</h3></div></article>
            <article className="heritage-card heritage-wide reveal reveal-delay-3"><img src={getImage('heritage-balcony', '/images/baltit-balcony.jpg')} alt="Carved Royal Balcony at Baltit Fort overlooking Hunza" loading="lazy" /><div><span>04 · Royal Balcony, Baltit Fort</span><h3>A room with a view</h3></div></article>
          </div>
        </section>

        <section className="mountains-section content-section">
          <div className="mountains-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> The high country</div><h2>Where the earth<br /><em>reaches upward.</em></h2></div><p>Gilgit-Baltistan holds some of the highest mountains on earth. Each valley has its own light, weather and way of making you feel small in the best possible way.</p></div>
          <div className="mountains-feature reveal"><img src={getImage('mountain-passu', '/images/pinterest-passu-mountain.jpg')} alt="Passu mountains and the Karakoram road in Gojal" loading="lazy" /><div className="mountains-feature-copy"><span>01 · Passu Cones · Gojal</span><h3>Granite spires<br />above the highway.</h3><p>The sharp silhouettes of Passu rise above the Karakoram Highway and the villages of Upper Hunza.</p><button className="text-button" onClick={() => setShowBooking(true)}>Plan a Gojal route <ArrowUpRight size={16} /></button></div></div>
          <div className="mountain-grid"><article className="mountain-card reveal reveal-delay-1"><img src={getImage('mountain-nanga', '/images/pinterest-nanga-parbat.jpg')} alt="Snow covered Nanga Parbat above Fairy Meadows" loading="lazy" /><div><span>8,126 m · Nanga Parbat</span><h3>The Killer Mountain</h3><p>See Pakistan's ninth-highest peak from a pine-framed meadow in Diamer.</p></div></article><article className="mountain-card reveal reveal-delay-2"><img src={getImage('mountain-eagles', '/images/pinterest-eagles-nest.jpg')} alt="Karakoram peaks viewed from Eagle's Nest" loading="lazy" /><div><span>3,050 m · Eagle's Nest</span><h3>Above the valley</h3><p>A high ridge above Karimabad, with Rakaposhi and the Hunza Valley in view.</p></div></article><article className="mountain-card reveal reveal-delay-3"><img src={getImage('mountain-deosai', '/images/pinterest-deosai.jpg')} alt="Snowy ridges and open grassland across Deosai" loading="lazy" /><div><span>4,114 m · Deosai</span><h3>Sky without edges</h3><p>High plateau, open horizons and a landscape shaped by wind, water and wildflowers.</p></div></article></div>
        </section>

        <section id="visit" className="visit-section content-section"><div className="visit-backdrop" /><div className="visit-content"><div className="eyebrow light"><span className="eyebrow-line" /> Your next chapter</div><h2>Meet you<br /><em>in the north.</em></h2><p>Tell us what kind of traveller you are. We’ll send back a route that feels like it was made for you.</p><button className="light-button" onClick={() => setShowBooking(true)}>Start planning <ArrowUpRight size={17} /></button></div><div className="visit-aside"><div className="weather"><span>Today in Karimabad</span><strong>14°</strong><small>Clear skies · perfect for a walk</small></div><div className="quote">“The mountains are calling and I must go.”<small>— John Muir</small></div></div></section>
      </main>

      <footer className="footer"><div className="footer-brand"><span><strong>Harry</strong> Nomad</span></div><div className="footer-meta"><span>Hunza · Gilgit-Baltistan · Pakistan</span><span>© 2026 Harry Nomad</span></div><div className="footer-social"><Instagram size={17} /><span>Follow the feeling</span></div></footer>

      {showBooking && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowBooking(false)}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="modal-close" onClick={() => setShowBooking(false)} aria-label="Close booking form"><X size={20} /></button>{submitted ? <div className="success-state"><span className="success-icon"><Check size={27} /></span><div className="eyebrow">Message received</div><h2>Your north starts here.</h2><p>Thanks, {form.name || 'traveller'}. A Harry Nomad guide will be in touch shortly.</p><button className="primary-button" onClick={() => { setShowBooking(false); setSubmitted(false); setForm({ name: '', email: '', month: '', note: '' }) }}>Back to the valley <ArrowDownRight size={17} /></button></div> : <><div className="eyebrow"><span className="eyebrow-line" /> Start a conversation</div><h2 id="booking-title">Plan your<br /><em>way north.</em></h2><p className="modal-intro">Tell us a little about your trip and we’ll shape something around you.</p><form onSubmit={handleSubmit}><label>Your name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Amina Khan" /></label><label>Email address<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" /></label><div className="form-row"><label>When are you thinking?<select value={form.month} onChange={(event) => setForm({ ...form, month: event.target.value })}><option value="">Choose a month</option><option>April - May</option><option>June - July</option><option>August - September</option><option>October - November</option></select></label><label>Travellers<input type="number" min="1" max="12" placeholder="2" /></label></div><label>What are you dreaming of?<textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="A slow week, big mountains, local food..." rows="3" /></label><button className="primary-button full-width" type="submit">Send my enquiry <ArrowUpRight size={17} /></button></form></>}</div></div>}

      {selectedDestination && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelectedDestination(null)}><div className="booking-modal destination-modal" role="dialog" aria-modal="true" aria-labelledby="destination-title"><button className="modal-close" onClick={() => setSelectedDestination(null)} aria-label={`Close ${selectedDestination.title} details`}><X size={20} /></button><div className="destination-modal-layout"><div className="destination-modal-gallery">{selectedDestination.gallery.map((photo, photoIndex) => <img key={`${selectedDestination.title}-${photoIndex}`} src={photo} alt={`${selectedDestination.title} view ${photoIndex + 1}`} loading="lazy" />)}</div><div className="destination-modal-copy"><div className="eyebrow"><span className="eyebrow-line" /> {selectedDestination.eyebrow}</div><h2 id="destination-title">{selectedDestination.title}</h2><p className="modal-intro">{selectedDestination.details}</p><div className="destination-modal-actions"><button className="primary-button" onClick={() => { setSelectedDestination(null); setShowBooking(true) }}>Plan this trip <ArrowUpRight size={16} /></button><button className="text-button" onClick={() => setSelectedDestination(null)}>Close</button></div></div></div></div></div>}

      {showAdmin && <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowAdmin(false)}>{adminAuthenticated ? <AdminImageManager slots={imageSlots} overrides={imageOverrides} onUpload={handleImageUpload} onReset={(key) => setImageOverrides((current) => { const next = { ...current }; delete next[key]; return next })} onClose={() => setShowAdmin(false)} onLogout={handleAdminLogout} /> : <AdminLoginScreen adminForm={adminForm} setAdminForm={setAdminForm} adminError={adminError} onLogin={handleAdminLogin} onClose={() => setShowAdmin(false)} />}</div>}
    </div>
  )
}

export default App
