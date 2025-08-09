import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'   
import ResetPassword from './pages/ResetPassword'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'

const App = () => {

  const location = useLocation()
  return (
    <>
      {/* <Navbar /> */}
      {location.pathname !== '/login' && <Navbar />}
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
       </Routes>
      {/* <Footer /> */}
      {location.pathname !== '/login' && <Footer />}
       
    </>
  )
}

export default App
