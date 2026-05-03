import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Careers from "./pages/Careers"
import Login from "./pages/Login"
import BookACall from "./pages/BookACall"
import ContactUs from "./pages/ContactUs"

const ADMIN_EMAILS = ["amiykaul@gmail.com", "akhil@email.com"]

function AdminRoute({ children }) {
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null))
  }, [])
  if (user === undefined) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><p style={{fontFamily:"'Space Mono',monospace"}} className="text-[#C9A84C] text-xs">LOADING...</p></div>
  if (!user || !ADMIN_EMAILS.includes(user.email)) return <Navigate to="/login"/>
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/careers" element={<Careers />}/>
        <Route path="/login" element={<Login />}/>
<Route path="/book-a-call" element={<BookACall />}/>
<Route path="/contact-us" element={<ContactUs />}/>
        <Route path="/client" element={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white" style={{fontFamily:"'Cormorant Garamond',serif"}}><h1 className="text-4xl font-light">Client Portal — Coming Soon</h1></div>}/>
        <Route path="/admin" element={
          <AdminRoute>
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white" style={{fontFamily:"'Cormorant Garamond',serif"}}>
              <h1 className="text-4xl font-light text-[#C9A84C]">Admin Console — Coming Soon</h1>
            </div>
          </AdminRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}