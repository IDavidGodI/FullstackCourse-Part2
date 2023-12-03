import {useState} from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import PersonList, {} from "./components/PersonList"


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

  const peopleToShow = persons.filter(person => 
    person.name.startsWith(filter) || person.number.startsWith(filter) || person.name.split(' ').some(w => w.startsWith(filter))
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <ContactForm 
        addContact={addContact} 
        newName = {newName}
        handleNewName = {handleNewName}
        newNumber = {newNumber}
        handleNewNumber = {handleNewNumber}
      />
      <h2>Numbers</h2>
      <PersonList people={peopleToShow}/>
    </div>
  )
}

export default App
