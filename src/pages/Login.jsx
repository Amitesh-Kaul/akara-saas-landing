import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import * as THREE from "three"

const S = { fontFamily: "'Cormorant Garamond', serif" }
const M = { fontFamily: "'Space Mono', monospace" }
const I = { fontFamily: "'Inter', sans-serif" }

const ADMIN_EMAILS = ["amiykaul@gmail.com", "akhil@email.com"]

function ThreeBackground() {
  const mountRef = useRef(null)
  useEffect(() => {
    const mount = mountRef.current
    const W = mount.clientWidth
    const H = mount.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000)
    camera.position.z = 22
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const torusGeo = new THREE.TorusKnotGeometry(10, 2, 200, 20)
    const torusMat = new THREE.MeshBasicMaterial({ color: "#C9A84C", wireframe: true, transparent: true, opacity: 0.15 })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    scene.add(torus)

    const icoGeo = new THREE.IcosahedronGeometry(8, 1)
    const icoMat = new THREE.MeshBasicMaterial({ color: "#C9A84C", wireframe: true, transparent: true, opacity: 0.1 })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    ico.position.set(16, -4, -5)
    scene.add(ico)

    const particleCount = 150
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    const partGeo = new THREE.BufferGeometry()
    partGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const partMat = new THREE.PointsMaterial({ size: 0.2, color: "#C9A84C", transparent: true, opacity: 0.6 })
    const particles = new THREE.Points(partGeo, partMat)
    scene.add(particles)

    const gridHelper = new THREE.GridHelper(80, 30, "#C9A84C", "#1a1400")
    gridHelper.position.y = -18
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.2
    scene.add(gridHelper)

    let mouseX = 0, mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", onMouseMove)

    let frame = 0
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      frame++
      const t = frame * 0.005
      torus.rotation.x = t * 0.3
      torus.rotation.y = t * 0.5
      ico.rotation.x = t * 0.4
      ico.rotation.y = t * 0.3
      particles.rotation.y = t * 0.05
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02
      camera.lookAt(scene.position)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("mousemove", onMouseMove)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])
  return <div ref={mountRef} className="fixed inset-0 w-full h-full z-0" />
}

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (mode === "login") {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setError(error.message); setLoading(false); return }
      if (ADMIN_EMAILS.includes(data.user.email)) {
        navigate("/admin")
      } else {
        navigate("/client")
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } })
      if (error) { setError(error.message); setLoading(false); return }
      setError("Check your email to confirm your account.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col" style={I}>

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

      <div className="flex-1 flex items-center justify-center px-6 pt-20 relative z-20">
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs tracking-[4px] uppercase mb-2" style={M}>
              {mode === "login" ? "Welcome Back" : "Join Akara"}
            </p>
            <h1 className="text-4xl font-light text-white" style={S}>
              {mode === "login" ? "Sign in to your account." : "Create your account."}
            </h1>
          </div>

          {/* Card */}
          <div className="border border-white/10 bg-[#0f0f0f] p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "signup" && (
                <div>
                  <label className="text-white/30 text-xs block mb-2" style={M}>FULL NAME</label>
                  <input value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-white/3 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors placeholder-white/20"
                    placeholder="Your full name" style={I} required/>
                </div>
              )}
              <div>
                <label className="text-white/30 text-xs block mb-2" style={M}>EMAIL ADDRESS</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/3 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors placeholder-white/20"
                  placeholder="you@example.com" style={I} required/>
              </div>
              <div>
                <label className="text-white/30 text-xs block mb-2" style={M}>PASSWORD</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/3 border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-[#C9A84C]/50 transition-colors placeholder-white/20"
                  placeholder="••••••••" style={I} required/>
              </div>

              {error && (
                <p className={`text-xs px-4 py-3 border ${error.includes("Check") ? "text-green-400 border-green-400/20 bg-green-400/5" : "text-red-400 border-red-400/20 bg-red-400/5"}`} style={M}>
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-[#C9A84C] text-black py-4 text-sm font-medium hover:bg-[#b8973d] transition-all duration-200 disabled:opacity-50" style={M}>
                {loading ? "PLEASE WAIT..." : mode === "login" ? "SIGN IN →" : "CREATE ACCOUNT →"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="text-white/30 text-xs" style={I}>
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError("") }}
                  className="text-[#C9A84C] hover:underline" style={M}>
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}