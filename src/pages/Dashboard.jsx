import { useState, useEffect } from 'react'
    import { clearCache, getCacheStatus } from '../utils/cache'

    export default function Dashboard() {
      const [cacheStatus, setCacheStatus] = useState(getCacheStatus())

      const handleClearCache = () => {
        clearCache()
        setCacheStatus('empty')
        window.location.reload()
      }

      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className={`text-sm font-medium ${
                cacheStatus === 'active' ? 'text-green-600' :
                cacheStatus === 'expired' ? 'text-yellow-600' : 'text-gray-600'
              }`}>
                Stato Cache: {
                  cacheStatus === 'active' ? 'Attiva' :
                  cacheStatus === 'expired' ? 'Scaduta' : 'Vuota'
                }
              </span>
              <button
                onClick={handleClearCache}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
              >
                Cancella Cache
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Turni del Giorno</h2>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Disponibilità</h2>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Statistiche</h2>
            </div>
          </div>
        </div>
      )
    }
