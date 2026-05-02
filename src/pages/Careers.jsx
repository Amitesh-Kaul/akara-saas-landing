import { Link } from "react-router-dom"

const S = { fontFamily: "'Cormorant Garamond', serif" }
const M = { fontFamily: "'Space Mono', monospace" }
const I = { fontFamily: "'Inter', sans-serif" }

export default function Careers() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col" style={I}>

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

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 pt-20">
        <div className="text-center max-w-2xl">
          <div className="w-20 h-20 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-3xl mx-auto mb-8">◎</div>
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4" style={M}>Careers at Akara</p>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight" style={S}>
            Coming Soon.
          </h1>
          <p className="text-white/40 leading-relaxed mb-10 text-lg" style={I}>
            We're building something special here. Talented people who want to work with global clients on premium digital products — watch this space.
          </p>
          <div className="border border-white/10 bg-[#0f0f0f] p-6 mb-8 text-left">
            <p className="text-white/30 text-xs mb-4" style={M}>WHAT WE'LL BE HIRING FOR</p>
            <div className="space-y-3">
              {["UI/UX Designer", "React Developer", "QA Engineer", "Project Manager"].map(role => (
                <div key={role} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]"/>
                  <span className="text-white/50 text-sm" style={I}>{role}</span>
                  <span className="text-xs text-white/20 ml-auto" style={M}>SOON</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/30 text-sm mb-6" style={I}>
            Want to be notified when we open positions?
          </p>
          <Link to="/contact"
            className="inline-block px-8 py-4 bg-[#C9A84C] text-black text-sm font-medium hover:bg-[#b8973d] transition-all" style={M}>
            GET IN TOUCH →
          </Link>
        </div>
      </div>
    </div>
  )
}