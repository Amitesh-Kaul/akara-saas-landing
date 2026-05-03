import { Link } from "react-router-dom"

const S = { fontFamily: "'Cormorant Garamond', serif" }
const M = { fontFamily: "'Space Mono', monospace" }
const I = { fontFamily: "'Inter', sans-serif" }

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={I}>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
              <polygon points="24,4 44,40 4,40" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="24" cy="24" r="3" fill="#C9A84C"/>
            </svg>
            <span className="text-lg font-medium tracking-widest text-[#C9A84C]" style={M}>AKARA</span>
          </Link>
          <Link to="/" className="text-sm text-white/40 hover:text-[#C9A84C] transition-colors" style={M}>
            ← BACK TO HOME
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4" style={M}>Contact Us</p>
          <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight" style={S}>
            How can we help you?
          </h1>
          <p className="text-white/40 leading-relaxed max-w-xl mx-auto" style={I}>
            Choose how you'd like to reach us. We're available for calls and emails during business hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Email Us */}
          <a href="mailto:hello@akaratechnologies.com?subject=Inquiry&body=Hi%20Akara%20Team%2C"
            className="border border-white/10 bg-[#0f0f0f] p-10 hover:border-[#C9A84C]/50 transition-all duration-300 group text-left">
            <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-2xl mb-6 group-hover:bg-[#C9A84C]/10 transition-all">
              ✉
            </div>
            <h2 className="text-2xl font-light mb-3 group-hover:text-[#C9A84C] transition-colors" style={S}>
              Send us an Email
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6" style={I}>
              Drop us an email and we'll get back to you within 24 hours with a detailed response.
            </p>
            <div className="flex items-center gap-2 text-[#C9A84C] text-xs" style={M}>
              hello@akaratechnologies.com
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </a>

          {/* Book a Call */}
          <Link to="/book-a-call"
            className="border border-white/10 bg-[#0f0f0f] p-10 hover:border-[#C9A84C]/50 transition-all duration-300 group text-left">
            <div className="w-14 h-14 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-2xl mb-6 group-hover:bg-[#C9A84C]/10 transition-all">
              ◎
            </div>
            <h2 className="text-2xl font-light mb-3 group-hover:text-[#C9A84C] transition-colors" style={S}>
              Book a Call
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-6" style={I}>
              Schedule a free 30-minute consultation. Tell us about your project and we'll discuss how we can help.
            </p>
            <div className="flex items-center gap-2 text-[#C9A84C] text-xs" style={M}>
              SCHEDULE A CALL
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

        </div>

        {/* Info row */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { label: "RESPONSE TIME", value: "Within 24 hours" },
            { label: "BASED IN", value: "India · Serving Globally" },
            { label: "AVAILABILITY", value: "Mon – Sat, 9AM – 8PM IST" },
          ].map(item => (
            <div key={item.label} className="border border-white/5 bg-[#0f0f0f] p-5 text-center">
              <p className="text-white/20 text-xs mb-2" style={M}>{item.label}</p>
              <p className="text-white/50 text-sm" style={I}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}