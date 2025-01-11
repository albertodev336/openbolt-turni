export default function TeamList({ teams, collaborators, onAddMember }) {
      const getAvailableCollaborators = (team) => {
        const teamMembers = new Set(team.members)
        return collaborators.filter(c => !teamMembers.has(c.id))
      }

      return (
        <div className="space-y-4">
          {teams.length > 0 ? (
            teams.map(team => (
              <div key={team.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{team.name}</h3>
                  <span className="text-sm text-gray-500">
                    {team.members.length} membri
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{team.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium">Membri:</h4>
                  {team.members.length > 0 ? (
                    <ul className="space-y-1">
                      {team.members.map(memberId => {
                        const member = collaborators.find(c => c.id === memberId)
                        return (
                          <li key={memberId} className="text-sm text-gray-700">
                            {member?.name || 'Membro sconosciuto'}
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">Nessun membro</p>
                  )}

                  <div>
                    <select
                      onChange={(e) => onAddMember(team.id, e.target.value)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      defaultValue=""
                    >
                      <option value="" disabled>Aggiungi membro...</option>
                      {getAvailableCollaborators(team).map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nessun team creato</p>
          )}
        </div>
      )
    }
