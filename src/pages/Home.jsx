import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const S = { fontFamily: "'Cormorant Garamond', serif" };
const M = { fontFamily: "'Space Mono', monospace" };
const I = { fontFamily: "'Inter', sans-serif" };

const NAV_LINKS = ["Services", "Work", "About", "Careers"];

const SERVICES = [
  {
    title: "UI Design",
    desc: "Pixel-perfect interfaces that convert visitors into customers. Clean, modern, and built for your brand.",
    icon: "▣",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    title: "Web Development",
    desc: "Fast, scalable websites and web apps built with modern technology. From landing pages to full platforms.",
    icon: "⟨/⟩",
    img: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&q=80",
  },
  {
    title: "QA Testing",
    desc: "Rigorous quality assurance so your product works flawlessly. We break things so your users don't have to.",
    icon: "✓",
    img: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
  },
];

const STATS = [
  { number: "50+", label: "Projects Delivered" },
  { number: "30+", label: "Happy Clients" },
  { number: "3", label: "Core Services" },
  { number: "100%", label: "Client Satisfaction" },
];

const PROJECTS = [
  { title: "SaaS Dashboard UI", tag: "UI Design", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { title: "E-Commerce Platform", tag: "Web Development", img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80" },
  { title: "Mobile App Design", tag: "UI Design", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" },
  { title: "QA Automation Suite", tag: "QA Testing", img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80" },
];

function ThreeBackground() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 22;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const gold = new THREE.Color("#C9A84C");
    const dimGold = new THREE.Color("#7a6020");

    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      const c = Math.random() > 0.5 ? gold : dimGold;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    partGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const partMat = new THREE.PointsMaterial({ size: 0.25, vertexColors: true, transparent: true, opacity: 1 });
    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    const torusGeo = new THREE.TorusKnotGeometry(14, 2.5, 200, 20);
    const torusMat = new THREE.MeshBasicMaterial({ color: "#C9A84C", wireframe: true, transparent: true, opacity: 0.35 });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    const icoGeo = new THREE.IcosahedronGeometry(10, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: "#C9A84C", wireframe: true, transparent: true, opacity: 0.4 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(18, -4, -5);
    scene.add(ico);

    const octGeo = new THREE.OctahedronGeometry(7, 0);
    const octMat = new THREE.MeshBasicMaterial({ color: "#C9A84C", wireframe: true, transparent: true, opacity: 0.45 });
    const oct = new THREE.Mesh(octGeo, octMat);
    oct.position.set(-20, 8, -3);
    scene.add(oct);

    const gridHelper = new THREE.GridHelper(80, 30, "#C9A84C", "#1a1400");
    gridHelper.position.y = -18;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.35;
    scene.add(gridHelper);

    const lineMat = new THREE.LineBasicMaterial({ color: "#C9A84C", transparent: true, opacity: 0.2 });
    for (let i = 0; i < 20; i++) {
      const pts = [
        new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20),
        new THREE.Vector3((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20),
      ];
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
    }

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const t = frame * 0.005;
      torus.rotation.x = t * 0.3;
      torus.rotation.y = t * 0.5;
      ico.rotation.x = t * 0.4;
      ico.rotation.y = t * 0.3;
      oct.rotation.x = t * 0.5;
      oct.rotation.z = t * 0.4;
      particles.rotation.y = t * 0.05;
      particles.rotation.x = t * 0.02;
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden" style={I}>

      {/* Global 3D Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <ThreeBackground />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <polygon points="24,4 44,40 4,40" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="24" cy="24" r="3" fill="#C9A84C"/>
            </svg>
            <span className="text-lg font-medium tracking-widest text-[#C9A84C]" style={M}>AKARA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
  link === "Careers" ? (
    <Link key={link} to="/careers"
      className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors duration-200" style={M}>
      {link}
    </Link>
  ) : link === "Work" ? (
    <a key={link} href="https://akara-dashboard.vercel.app" target="_blank" rel="noreferrer"
      className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors duration-200" style={M}>
      {link}
    </a>
  ) : (
    <a key={link} href={`#${link.toLowerCase()}`}
      className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors duration-200" style={M}>
      {link}
    </a>
  )
))}
            <div className="flex items-center gap-3">
  <Link to="/contact-us"
    className="text-sm text-white/50 hover:text-[#C9A84C] transition-all duration-200" style={M}>
    Contact Us
  </Link>
  <Link to="/login"
    className="w-9 h-9 rounded-full border-2 border-[#C9A84C] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-200 text-xs" style={M}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
  </Link>

</div>
          </div>
          <button className="md:hidden text-white/60" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors" style={M}>{link}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]/10 z-10 pointer-events-none"/>
        <div className="relative z-20 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 border border-[#C9A84C]/30 bg-[#C9A84C]/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse"/>
            <p className="text-[#C9A84C] text-xs" style={M}>● AVAILABLE FOR NEW PROJECTS</p>
          </div>
          <h1 className="text-6xl md:text-8xl font-light leading-none mb-6 tracking-tight" style={S}>
            Giving shape to
            <br/>
            <span className="text-[#C9A84C]" style={S}>great ideas.</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={I}>
            We are Akara Technologies — an Indian tech studio building premium digital products for global clients across US, UK and Europe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="https://akara-dashboard.vercel.app" target="_blank" rel="noreferrer"
  className="px-8 py-4 bg-[#C9A84C] text-black text-sm font-medium tracking-widest hover:bg-[#b8973d] transition-all duration-200" style={M}>
  VIEW OUR WORK
</a>
            <Link to="/contact" className="px-8 py-4 border border-white/20 text-white/70 text-sm hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200" style={M}>
              START A PROJECT
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {["UI Design", "Web Dev", "QA Testing"].map((s, i) => (
              <div key={s} className="border border-white/10 bg-black/30 backdrop-blur-sm p-4 text-center hover:border-[#C9A84C]/40 transition-all">
                <div className="text-[#C9A84C] text-2xl mb-2">{["▣", "⟨/⟩", "✓"][i]}</div>
                <p className="text-white/50 text-xs" style={M}>{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-xs text-white/30" style={M}>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C] to-transparent"/>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 border-y border-white/5 py-16 px-6 bg-[#0a0a0a]/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-light text-[#C9A84C] mb-2" style={S}>{stat.number}</p>
              <p className="text-white/40 text-xs" style={M}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative z-10 py-24 px-6 bg-[#0a0a0a]/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4" style={M}>What We Do</p>
          <h2 className="text-3xl md:text-5xl font-light mb-16 max-w-xl leading-tight" style={S}>
            Services built for results.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div key={service.title}
                className="border border-white/10 overflow-hidden hover:border-[#C9A84C]/50 transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img src={service.img} alt={service.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"/>
                  <p className="absolute bottom-4 left-6 text-[#C9A84C] text-3xl">{service.icon}</p>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-3 group-hover:text-[#C9A84C] transition-colors" style={S}>{service.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed" style={I}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative z-10 py-24 px-6 bg-[#0a0a0a]/60 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4" style={M}>Our Work</p>
          <h2 className="text-3xl md:text-5xl font-light mb-16 max-w-xl leading-tight" style={S}>
            Projects we are proud of.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <div key={project.title}
                className="group relative overflow-hidden border border-white/10 hover:border-[#C9A84C]/40 transition-all duration-500 cursor-pointer"
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}>
                <div className="relative h-64 overflow-hidden">
                  <img src={project.img} alt={project.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent"/>
                </div>
                <div className="p-6">
                  <p className="text-white/20 text-xs mb-2" style={M}>0{i + 1}</p>
                  <h3 className="text-xl font-light mb-1 group-hover:text-[#C9A84C] transition-colors" style={S}>{project.title}</h3>
                  <p className="text-white/30 text-sm" style={M}>{project.tag} · Concept Project · 2024</p>
                </div>
                {hoveredProject === i && (
                  <div className="absolute top-4 right-4 bg-[#C9A84C] text-black text-xs px-3 py-1 font-medium" style={M}>VIEW →</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative z-10 py-24 px-6 bg-[#0a0a0a]/60 backdrop-blur-sm border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-0 overflow-hidden border border-white/10">
          <div className="relative h-80 md:h-auto overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="team" className="w-full h-full object-cover opacity-40"/>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]"/>
            <div className="absolute bottom-8 left-8">
              <p className="text-[#C9A84C] text-4xl font-light" style={S}>A·K·A</p>
              <p className="text-white/30 text-xs mt-1" style={M}>AMITESH · AKHIL · AKARA</p>
            </div>
          </div>
          <div className="p-10 md:p-12 flex flex-col justify-center bg-[#0a0a0a]/40">
            <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4" style={M}>About Us</p>
            <h2 className="text-3xl md:text-4xl font-light mb-6 leading-tight" style={S}>
              Indian talent.<br/>Global standards.
            </h2>
            <p className="text-white/40 leading-relaxed mb-4 text-sm" style={I}>
              Akara — meaning form and shape in Sanskrit — was founded by Amitesh and Akhil with one goal: to build digital products that look world-class and work flawlessly.
            </p>
            <p className="text-white/40 leading-relaxed mb-8 text-sm" style={I}>
              Based in India, we work with clients across the US, UK and Europe — delivering premium UI, web development and QA services at honest prices.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["UI Design", "React & Next.js", "QA & Testing", "Web Apps"].map((skill) => (
                <div key={skill} className="border border-white/10 px-4 py-3 text-center hover:border-[#C9A84C]/40 transition-all">
                  <p className="text-white/50 text-xs" style={M}>{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6 bg-[#0a0a0a]/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                  <polygon points="24,4 44,40 4,40" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="3" fill="#C9A84C"/>
                </svg>
                <span className="text-[#C9A84C] text-sm" style={M}>AKARA TECHNOLOGIES</span>
              </div>
              <p className="text-white/30 text-xs leading-relaxed" style={I}>
                Indian talent. Global standards. Building premium digital products for clients across US, UK and Europe.
              </p>
            </div>
            {/* Contact */}
            <div>
              <p className="text-white/20 text-xs tracking-widest mb-4" style={M}>CONTACT US</p>
              <div className="space-y-3">
                <a href="mailto:hello@akaratechnologies.com?subject=Project%20Inquiry&body=Hi%20Akara%20Team%2C"
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-[#C9A84C] transition-colors group" style={I}>
                  <span className="text-[#C9A84C] text-xs" style={M}>✉</span>
                  SEND US AN EMAIL
                </a>
                <Link to="/contact-us"
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-[#C9A84C] transition-colors group" style={I}>
                  <span className="text-[#C9A84C] text-xs" style={M}>◎</span>
                  CONTACT US
                </Link>
                <Link to="/contact"
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-[#C9A84C] transition-colors group" style={I}>
                  <span className="text-[#C9A84C] text-xs" style={M}>▣</span>
                  START A PROJECT
                </Link>
              </div>
            </div>
            {/* Links */}
            <div>
              <p className="text-white/20 text-xs tracking-widest mb-4" style={M}>QUICK LINKS</p>
              <div className="space-y-3">
                <Link to="/careers" className="flex items-center gap-3 text-sm text-white/40 hover:text-[#C9A84C] transition-colors" style={I}>
                  <span className="text-[#C9A84C] text-xs" style={M}>→</span>
                  Careers
                </Link>
                <a href="https://akara-dashboard.vercel.app" target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-white/40 hover:text-[#C9A84C] transition-colors" style={I}>
                  <span className="text-[#C9A84C] text-xs" style={M}>→</span>
                  Our Work
                </a>
                <Link to="/login" className="flex items-center gap-3 text-sm text-white/40 hover:text-[#C9A84C] transition-colors" style={I}>
                  <span className="text-[#C9A84C] text-xs" style={M}>→</span>
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-white/20 text-xs" style={M}>© 2024 Akara Technologies. All rights reserved.</span>
            <span className="text-white/20 text-xs" style={M}>Giving shape to great ideas.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}