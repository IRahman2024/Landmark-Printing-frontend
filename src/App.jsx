import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

function App() {


  return (
    <div className="bg-white">
      <div className='top-0 sticky z-50'>
        <Navbar></Navbar>
      </div>

      <div className='min-h-screen'>
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default App
