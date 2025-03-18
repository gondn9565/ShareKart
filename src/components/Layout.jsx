import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

function Layout({ onLogout }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLogout={onLogout} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

