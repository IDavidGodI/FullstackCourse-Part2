import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event)=> setNewName(event.target.value);

  const addContact = (event)=>{
    event.preventDefault()
    const newPersons = [...persons, {name: newName}]

    setPersons(newPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person=> <p key={person.name}>{person.name}</p>)
      }
    </div>
  )
}

export default App
