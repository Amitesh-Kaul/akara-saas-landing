import { useState } from "react";

const NAV_LINKS = ["Services", "Work", "About", "Contact"];

const SERVICES = [
  {
    icon: "▣",
    title: "UI Design",
    desc: "Pixel-perfect interfaces that convert visitors into customers. Clean, modern, and built for your brand.",
  },
  {
    icon: "⟨/⟩",
    title: "Web Development",
    desc: "Fast, scalable websites and web apps built with modern technology. From landing pages to full platforms.",
  },
  {
    icon: "✓",
    title: "QA Testing",
    desc: "Rigorous quality assurance so your product works flawlessly. We break things so your users don't have to.",
  },
];

const STATS = [
  { number: "50+", label: "Projects Delivered" },
  { number: "30+", label: "Happy Clients" },
  { number: "3", label: "Core Services" },
  { number: "100%", label: "Client Satisfaction" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <polygon points="24,4 44,40 4,40" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="24" cy="24" r="3" fill="#C9A84C"/>
            </svg>
            <span className="text-lg font-medium tracking-widest text-[#C9A84C]">AKARA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors duration-200 tracking-wide">
                {link}
              </a>
            ))}
            <a href="#contact"
              className="text-sm px-5 py-2 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-200 tracking-wide">
              Get in Touch
            </a>
          </div>
          <button className="md:hidden text-white/60" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#111] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-sm text-white/60 hover:text-[#C9A84C] transition-colors">
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-6">
            UI Design · Web Development · QA
          </p>
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-6 tracking-tight">
            Giving shape to
            <span className="text-[#C9A84C]"> great ideas.</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We are Akara Technologies — an Indian tech studio building premium digital products for global clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#work"
              className="px-8 py-3 bg-[#C9A84C] text-black text-sm font-medium tracking-widest hover:bg-[#b8973d] transition-all duration-200">
              VIEW OUR WORK
            </a>
            <a href="#contact"
              className="px-8 py-3 border border-white/20 text-white/70 text-sm tracking-widest hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-200">
              START A PROJECT
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-light text-[#C9A84C] mb-2">{stat.number}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-light mb-16 max-w-xl leading-tight">
            Services built for results.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div key={service.title}
                className="border border-white/10 p-8 hover:border-[#C9A84C]/50 transition-all duration-300 group">
                <p className="text-[#C9A84C] text-2xl mb-6">{service.icon}</p>
                <h3 className="text-lg font-medium mb-3 group-hover:text-[#C9A84C] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4">Our Work</p>
          <h2 className="text-3xl md:text-5xl font-light mb-16 max-w-xl leading-tight">
            Projects we are proud of.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["SaaS Dashboard UI", "E-Commerce Platform", "Mobile App Design", "QA Automation Suite"].map((project, i) => (
              <div key={project}
                className="bg-white/3 border border-white/10 p-10 hover:border-[#C9A84C]/40 transition-all duration-300 group cursor-pointer">
                <p className="text-white/20 text-xs tracking-widest mb-4">0{i + 1}</p>
                <h3 className="text-xl font-light mb-2 group-hover:text-[#C9A84C] transition-colors">{project}</h3>
                <p className="text-white/30 text-sm">Concept Project · 2024</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4">About Us</p>
            <h2 className="text-3xl md:text-5xl font-light mb-6 leading-tight">
              Indian talent. Global standards.
            </h2>
            <p className="text-white/40 leading-relaxed mb-4">
              Akara — meaning form and shape in Sanskrit — was founded by Amitesh and Akhil with one goal: to build digital products that look world-class and work flawlessly.
            </p>
            <p className="text-white/40 leading-relaxed">
              Based in India, we work with clients across the US, UK and Europe — delivering premium UI, web development and QA services at honest prices.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["UI Design", "React & Next.js", "QA & Testing", "Web Apps"].map((skill) => (
              <div key={skill} className="border border-white/10 p-6 text-center hover:border-[#C9A84C]/40 transition-all">
                <p className="text-white/60 text-sm tracking-wide">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-light mb-6 leading-tight">
            Ready to build something great?
          </h2>
          <p className="text-white/40 mb-10">
            Tell us about your project and we will get back to you within 24 hours.
          </p>
          <a href="mailto:hello@akaratechnologies.com"
            className="inline-block px-10 py-4 bg-[#C9A84C] text-black text-sm font-medium tracking-widest hover:bg-[#b8973d] transition-all duration-200">
            SEND US AN EMAIL
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[#C9A84C] text-sm tracking-widest">AKARA TECHNOLOGIES</span>
          <span className="text-white/20 text-xs">© 2024 Akara Technologies. All rights reserved.</span>
          <span className="text-white/20 text-xs">Giving shape to great ideas.</span>
        </div>
      </footer>

    </div>
  );
}