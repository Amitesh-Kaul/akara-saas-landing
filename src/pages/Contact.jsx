import { useState } from "react"
import { Link } from "react-router-dom"

const S = { fontFamily: "'Cormorant Garamond', serif" }
const M = { fontFamily: "'Space Mono', monospace" }
const I = { fontFamily: "'Inter', sans-serif" }

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

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

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Left */}
          <div>
            <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4" style={M}>Get In Touch</p>
            <h1 className="text-5xl md:text-6xl font-light mb-6 leading-tight" style={S}>
              Let's build something great.
            </h1>
            <p className="text-white/40 leading-relaxed mb-10" style={I}>
              Tell us about your project. We'll get back to you within 24 hours with a proposal.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] shrink-0">✉</div>
                <div>
                  <p className="text-white/20 text-xs mb-1" style={M}>EMAIL</p>
                  <p className="text-white/60 text-sm" style={I}>hello@akaratechnologies.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] shrink-0">◎</div>
                <div>
                  <p className="text-white/20 text-xs mb-1" style={M}>BASED IN</p>
                  <p className="text-white/60 text-sm" style={I}>India · Serving US, UK & Europe</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] shrink-0">⚡</div>
                <div>
                  <p className="text-white/20 text-xs mb-1" style={M}>RESPONSE TIME</p>
                  <p className="text-white/60 text-sm" style={I}>Within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] shrink-0">◈</div>
                <div>
                  <p className="text-white/20 text-xs mb-1" style={M}>SERVICES</p>
                  <p className="text-white/60 text-sm" style={I}>UI Design · Web Development · QA Testing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="border border-white/10 bg-[#0f0f0f] p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-2xl mb-6">✓</div>
                <h2 className="text-3xl font-light mb-4 text-white" style={S}>Message sent!</h2>
                <p className="text-white/40 text-sm mb-8" style={I}>We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}
                  className="text-xs text-[#C9A84C] border border-[#C9A84C]/30 px-6 py-3 hover:bg-[#C9A84C]/10 transition-all" style={M}>
                  SEND ANOTHER →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-white/30 text-xs block mb-2" style={M}>YOUR NAME</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full bg-white/3 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors placeholder-white/20"
                    placeholder="John Smith" style={I} required/>
                </div>
                <div>
                  <label className="text-white/30 text-xs block mb-2" style={M}>EMAIL ADDRESS</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full bg-white/3 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors placeholder-white/20"
                    placeholder="john@company.com" style={I} required/>
                </div>
                <div>
                  <label className="text-white/30 text-xs block mb-2" style={M}>PROJECT BUDGET</label>
                  <select value={form.budget} onChange={e => setForm({...form, budget: e.target.value})}
                    className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors" style={I} required>
                    <option value="">Select budget range</option>
                    <option>Under $1,000</option>
                    <option>$1,000 – $3,000</option>
                    <option>$3,000 – $5,000</option>
                    <option>$5,000 – $10,000</option>
                    <option>$10,000+</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/30 text-xs block mb-2" style={M}>TELL US ABOUT YOUR PROJECT</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full bg-white/3 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors placeholder-white/20 resize-none h-32"
                    placeholder="Describe what you need..." style={I} required/>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-[#C9A84C] text-black py-4 text-sm font-medium hover:bg-[#b8973d] transition-all duration-200 disabled:opacity-50" style={M}>
                  {loading ? "SENDING..." : "SEND MESSAGE →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}