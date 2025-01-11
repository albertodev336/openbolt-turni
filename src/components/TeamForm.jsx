import { useState } from 'react'

    export default function TeamForm({ onCreate, existingNames }) {
      const [name, setName] = useState('')
      const [description, setDescription] = useState('')
      const [error, setError] = useState('')

      const handleSubmit = (e) => {
        e.preventDefault()
        
        if (!name.trim() || !description.trim()) {
          setError('Tutti i campi sono obbligatori')
          return
        }

        if (existingNames.includes(name)) {
          setError('Nome team già esistente')
          return
        }

        onCreate({
          id: crypto.randomUUID(),
          name,
          description,
          members: []
        })

        setName('')
        setDescription('')
        setError('')
      }

      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome Team
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrizione
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Crea Team
          </button>
        </form>
      )
    }
