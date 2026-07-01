import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WebDesign from './pages/WebDesign'
import SalesMarketing from './pages/SalesMarketing'
import Contact from './pages/Contact'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web-design" element={<WebDesign />} />
        <Route path="/sales-marketing" element={<SalesMarketing />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
