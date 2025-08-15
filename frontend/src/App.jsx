import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'   
import ResetPassword from './pages/ResetPassword'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'


const hiddenPaths = ['/login','/email-verify', '/reset-password']
const App = () => {
  const location = useLocation()
  const hideLayout = hiddenPaths.includes(location.pathname)
  return (
    <>
      {/* <Navbar /> */}
      {!hideLayout && <Navbar />}
      
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
       </Routes>
      {/* <Footer /> */}
      {!hideLayout && <Footer />}
      
       
    </>
  )
}

export default App
