import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between align-center">
          <div className="w-64">
            <Logo />
          </div>
        </div>
      </header>
      <section className="max-w-screen-2xl mx-auto py-5 mt-10">
        <Outlet />
      </section>
      <footer className="py-5">
        <p className="text-center text-gray-500">
          &copy; 2024 All rights reserved.
        </p>
      </footer>
    </>
  )
}
