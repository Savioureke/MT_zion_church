import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AudioPlayer from './components/AudioPlayer'
import Home from './pages/Home'
import About from './pages/About'
import Sermons from './pages/Sermons'
import Watch from './pages/Watch'
import Gospel from './pages/Gospel'
import Resources from './pages/Resources'
import Salvation from './pages/Salvation'
import SalvationStep from './pages/SalvationStep'
import GrowthJourney from './pages/GrowthJourney'
import LessonDetail from './pages/LessonDetail'
import Events from './pages/Events'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/sermons" element={<Sermons />} />
                  <Route path="/watch" element={<Watch />} />
                  <Route path="/gospel" element={<Gospel />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/salvation" element={<Salvation />} />
                  <Route path="/salvation/step/:stepId" element={<SalvationStep />} />
                  <Route path="/growth" element={<GrowthJourney />} />
                  <Route path="/growth/lesson/:lessonId" element={<LessonDetail />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </main>
              <Footer />
              <AudioPlayer />
            </>
          }
        />
      </Routes>
    </div>
  )
}
