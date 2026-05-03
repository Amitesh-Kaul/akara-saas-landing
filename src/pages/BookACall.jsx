import { useState } from "react"
import { Link } from "react-router-dom"

const S = { fontFamily: "'Cormorant Garamond', serif" }
const M = { fontFamily: "'Space Mono', monospace" }
const I = { fontFamily: "'Inter', sans-serif" }

export default function BookACall() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", time: "" })
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

      <div className="max-w-2xl mx-auto px-6 pt-32 pb-24">
        <div className="text-center mb-12">
          <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-4" style={M}>Schedule a Call</p>
          <h1 className="text-5xl font-light mb-4" style={S}>Book a free consultation.</h1>
          <p className="text-white/40" style={I}>Tell us when works best and we'll reach out to confirm.</p>
        </div>

        <div className="border border-white/10 bg-[#0f0f0f] p-8">
          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-2xl mx-auto mb-6">✓</div>
              <h2 className="text-3xl font-light mb-4" style={S}>Call booked!</h2>
              <p className="text-white/40 text-sm mb-8" style={I}>We'll confirm your slot within 24 hours.</p>
              <Link to="/" className="inline-block text-xs text-[#C9A84C] border border-[#C9A84C]/30 px-6 py-3 hover:bg-[#C9A84C]/10 transition-all" style={M}>
                BACK TO HOME →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white/30 text-xs block mb-2" style={M}>YOUR NAME</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors"
                  placeholder="John Smith" style={I} required/>
              </div>
              <div>
                <label className="text-white/30 text-xs block mb-2" style={M}>EMAIL ADDRESS</label>
                <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors"
                  placeholder="john@company.com" style={I} required/>
              </div>
              <div>
                <label className="text-white/30 text-xs block mb-2" style={M}>CONTACT NUMBER</label>
                <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors"
                  placeholder="+1 234 567 8900" style={I} required/>
              </div>
              <div>
                <label className="text-white/30 text-xs block mb-2" style={M}>AVAILABLE TIME TO CONTACT</label>
                <select value={form.time} onChange={e => setForm({...form, time: e.target.value})}
                  className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors" style={I} required>
                  <option value="">Select your preferred time</option>
                  <optgroup label="Morning (IST)">
                    <option>9:00 AM – 10:00 AM IST</option>
                    <option>10:00 AM – 11:00 AM IST</option>
                    <option>11:00 AM – 12:00 PM IST</option>
                  </optgroup>
                  <optgroup label="Afternoon (IST)">
                    <option>12:00 PM – 1:00 PM IST</option>
                    <option>2:00 PM – 3:00 PM IST</option>
                    <option>3:00 PM – 4:00 PM IST</option>
                  </optgroup>
                  <optgroup label="Evening (IST)">
                    <option>5:00 PM – 6:00 PM IST</option>
                    <option>6:00 PM – 7:00 PM IST</option>
                    <option>7:00 PM – 8:00 PM IST</option>
                  </optgroup>
                  <optgroup label="US Friendly (IST)">
                    <option>8:00 PM – 9:00 PM IST</option>
                    <option>9:00 PM – 10:00 PM IST</option>
                    <option>10:00 PM – 11:00 PM IST</option>
                  </optgroup>
                </select>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#C9A84C] text-black py-4 text-sm font-medium hover:bg-[#b8973d] transition-all duration-200 disabled:opacity-50" style={M}>
                {loading ? "BOOKING..." : "BOOK MY CALL →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}