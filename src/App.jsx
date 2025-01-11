import { BrowserRouter, Routes, Route } from 'react-router-dom'
    import Dashboard from './pages/Dashboard'
    import Shifts from './pages/Shifts'
    import Calendar from './pages/Calendar'
    import Profile from './pages/Profile'
    import Collaborators from './pages/Collaborators'
    import Teams from './pages/Teams'
    import Layout from './components/Layout'

    export default function App() {
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="shifts" element={<Shifts />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="profile" element={<Profile />} />
              <Route path="collaborators" element={<Collaborators />} />
              <Route path="teams" element={<Teams />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )
    }
