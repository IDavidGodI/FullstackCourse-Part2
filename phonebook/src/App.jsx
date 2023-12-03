import { useState } from 'react'

const Person = ({person})=>{
  return(
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event)=> setNewName(event.target.value);

  const addContact = (event)=>{
    event.preventDefault()
    const trimmedName = newName.trim()
    if (persons.some((person)=>person.name===trimmedName)){
      alert(`${trimmedName} already exists in your contacts`)
      return
    }
    const newPerson = {name: trimmedName}
    setPersons(persons.concat(newPerson))
    setNewName('')
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
        persons.map(person=>{
          console.log(person)
          return <Person key={person.name} person={person}/>
        })
      }
    </div>
  )
}

export default App
