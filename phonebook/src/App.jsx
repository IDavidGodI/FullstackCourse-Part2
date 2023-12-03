import { useState } from 'react'

const Person = ({person})=>{
  return(
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewName = (event)=> setNewName(event.target.value);
  const handleNewNumber = (event)=> setNewNumber(event.target.value);
  const handleFilter = (event)=> setFilter(event.target.value);

  const addContact = (event)=>{
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    if (trimmedName.length===0 || trimmedNumber.length===0){
      alert("Fill the two fields")
      return
    }

    if (persons.some((person)=>person.name===trimmedName)){
      alert(`${trimmedName} already exists in your contacts`)
      return
    }
    if (persons.some((person)=>person.number===trimmedNumber)){
      alert(`The number ${trimmedNumber} already exists in your contacts`)
      return
    }

    const newPerson = {name: trimmedName, number: trimmedNumber}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const peopleToShow = persons.filter(person => person.name.startsWith(filter) || person.number.startsWith(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={filter} onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        peopleToShow.map(person=>{
          return <Person key={person.name} person={person}/>
        })
      }
    </div>
  )
}

export default App
