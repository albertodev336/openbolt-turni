import { useState, useEffect } from 'react'
    import { saveToCache, loadFromCache } from '../utils/cache'

    export default function Collaborators() {
      const [collaborators, setCollaborators] = useState([])
      const [teams, setTeams] = useState([])
      const [newCollaborator, setNewCollaborator] = useState({
        name: '',
        workPercentage: 50,
        teamId: ''
      })
      const [showSuccess, setShowSuccess] = useState(false)

      // Carica i dati iniziali
      useEffect(() => {
        const cachedData = loadFromCache()
        if (cachedData) {
          setTeams(cachedData.teams || [])
          setCollaborators(cachedData.collaborators || [])
        }
      }, [])

      const handleAddCollaborator = (e) => {
        e.preventDefault()
        
        if (!newCollaborator.name.trim()) {
          alert('Il nome è obbligatorio')
          return
        }

        const newCollaboratorData = {
          id: Date.now().toString(),
          name: newCollaborator.name,
          workPercentage: newCollaborator.workPercentage
        }

        // Aggiorna i collaboratori
        const updatedCollaborators = [...collaborators, newCollaboratorData]
        setCollaborators(updatedCollaborators)

        // Se è stato selezionato un team, aggiungi il collaboratore
        let updatedTeams = teams
        if (newCollaborator.teamId) {
          updatedTeams = teams.map(team => 
            team.id === newCollaborator.teamId
              ? { ...team, members: [...(team.members || []), newCollaboratorData.id] }
              : team
          )
          setTeams(updatedTeams)
        }

        // Salva i dati aggiornati nella cache
        const updatedData = {
          teams: updatedTeams,
          collaborators: updatedCollaborators
        }
        saveToCache(updatedData)

        // Reset form e mostra feedback
        setNewCollaborator({
          name: '',
          workPercentage: 50,
          teamId: ''
        })
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }

      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Gestione Collaboratori</h1>

          {showSuccess && (
            <div className="fixed top-4 right-4 bg-green-50 p-4 rounded-lg shadow-lg flex items-center space-x-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-green-400" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-green-800">Collaboratore aggiunto con successo!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Aggiungi Collaboratore</h2>
              <form onSubmit={handleAddCollaborator} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newCollaborator.name}
                    onChange={(e) => setNewCollaborator({ ...newCollaborator, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="workPercentage" className="block text-sm font-medium text-gray-700">
                    Percentuale di Lavoro (%)
                  </label>
                  <input
                    type="number"
                    id="workPercentage"
                    min="0"
                    max="100"
                    value={newCollaborator.workPercentage}
                    onChange={(e) => setNewCollaborator({ ...newCollaborator, workPercentage: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="team" className="block text-sm font-medium text-gray-700">
                    Assegna a Team (opzionale)
                  </label>
                  <select
                    id="team"
                    value={newCollaborator.teamId}
                    onChange={(e) => setNewCollaborator({ ...newCollaborator, teamId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Seleziona un team...</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Aggiungi Collaboratore
                </button>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Lista Collaboratori</h2>
              {collaborators.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {collaborators.map(collaborator => {
                    const team = teams.find(t => t.members?.includes(collaborator.id))
                    return (
                      <li key={collaborator.id} className="py-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-900 font-medium">{collaborator.name}</p>
                            <p className="text-gray-500 text-sm">
                              Percentuale lavoro: {collaborator.workPercentage}%
                            </p>
                            {team && (
                              <p className="text-gray-500 text-sm">
                                Team: {team.name}
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="text-gray-500">Nessun collaboratore aggiunto</p>
              )}
            </div>
          </div>
        </div>
      )
    }
