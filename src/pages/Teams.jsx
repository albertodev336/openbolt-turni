import { useState, useEffect } from 'react'
    import TeamForm from '../components/TeamForm'
    import TeamList from '../components/TeamList'

    const STORAGE_KEY = 'teamsData'

    export default function Teams() {
      const [teams, setTeams] = useState([])
      const [collaborators, setCollaborators] = useState([])

      // Carica i dati iniziali
      useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY)
        if (savedData) {
          const { teams, collaborators } = JSON.parse(savedData)
          setTeams(teams)
          setCollaborators(collaborators)
        }
      }, [])

      // Salva i dati quando cambiano
      useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ teams, collaborators }))
      }, [teams, collaborators])

      const handleCreateTeam = (newTeam) => {
        setTeams(prev => [...prev, newTeam])
      }

      const handleAddMember = (teamId, collaboratorId) => {
        // Rimuovi il collaboratore da altri team
        const updatedTeams = teams.map(team => ({
          ...team,
          members: team.members.filter(member => member !== collaboratorId)
        }))

        // Aggiungi al nuovo team
        setTeams(updatedTeams.map(team => 
          team.id === teamId
            ? { ...team, members: [...team.members, collaboratorId] }
            : team
        ))
      }

      return (
        <div className="space-y-8">
          <h1 className="text-2xl font-bold">Gestione Team</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Crea Nuovo Team</h2>
              <TeamForm 
                onCreate={handleCreateTeam} 
                existingNames={teams.map(t => t.name)}
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Lista Team</h2>
              <TeamList 
                teams={teams}
                collaborators={collaborators}
                onAddMember={handleAddMember}
              />
            </div>
          </div>
        </div>
      )
    }
