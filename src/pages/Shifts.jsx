import { useState } from 'react'
    import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
    import { it } from 'date-fns/locale'

    const shiftTypes = {
      morning: 'Mattina',
      afternoon: 'Pomeriggio',
      night: 'Notte',
      free: 'Libero'
    }

    export default function Shifts() {
      const [lastMonth, setLastMonth] = useState(null)
      const [currentMonth, setCurrentMonth] = useState(null)
      const [shifts, setShifts] = useState({})

      const handleCreateNewMonth = () => {
        const newMonth = lastMonth ? addMonths(lastMonth, 1) : new Date()
        setCurrentMonth(newMonth)
        setLastMonth(newMonth)
        setShifts({})
      }

      const handleAssignShift = (date, shiftType) => {
        setShifts(prev => ({
          ...prev,
          [date.toISOString()]: shiftType
        }))
      }

      if (!currentMonth) {
        return (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h1 className="text-2xl font-bold mb-4">Generazione Turni Mensili</h1>
            <button
              onClick={handleCreateNewMonth}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Crea Nuova Programmazione
            </button>
            <p className="mt-4 text-gray-600">
              {lastMonth 
                ? `Ultima programmazione: ${format(lastMonth, 'MMMM yyyy', { locale: it })}`
                : 'Nessuna programmazione esistente'
              }
            </p>
          </div>
        )
      }

      const days = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
      })

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              Turni di {format(currentMonth, 'MMMM yyyy', { locale: it })}
            </h1>
            <button
              onClick={handleCreateNewMonth}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm"
            >
              Nuovo Mese
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
              <div key={day} className="text-center font-semibold">
                {day}
              </div>
            ))}

            {days.map(day => {
              const dayKey = day.toISOString()
              const currentShift = shifts[dayKey]
              const isWeekend = [0, 6].includes(day.getDay())

              return (
                <div
                  key={dayKey}
                  className={`p-3 rounded-lg ${
                    isWeekend ? 'bg-gray-50' : 'bg-white'
                  } shadow-sm`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      {format(day, 'd', { locale: it })}
                    </span>
                    {isWeekend && (
                      <span className="text-xs text-gray-500">Weekend</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {Object.entries(shiftTypes).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => handleAssignShift(day, key)}
                        className={`w-full text-left px-2 py-1 rounded text-sm ${
                          currentShift === key
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
