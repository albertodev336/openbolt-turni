import { NavLink } from 'react-router-dom'

    export default function Navbar() {
      return (
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `text-xl font-bold ${isActive ? 'text-indigo-600' : 'text-gray-800'}`
                  }
                >
                  Gestione Turni
                </NavLink>
                <div className="hidden md:flex space-x-4">
                  <NavLink 
                    to="/shifts" 
                    className={({ isActive }) => 
                      `hover:text-gray-700 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
                    }
                  >
                    Turni
                  </NavLink>
                  <NavLink 
                    to="/calendar"
                    className={({ isActive }) => 
                      `hover:text-gray-700 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
                    }
                  >
                    Calendario
                  </NavLink>
                  <NavLink 
                    to="/collaborators"
                    className={({ isActive }) => 
                      `hover:text-gray-700 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
                    }
                  >
                    Collaboratori
                  </NavLink>
                  <NavLink 
                    to="/teams"
                    className={({ isActive }) => 
                      `hover:text-gray-700 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`
                    }
                  >
                    Team
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )
    }
