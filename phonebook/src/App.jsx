import {useState} from 'react'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'
import PersonList, {} from "./components/PersonList"
import { useEffect } from 'react'
import personsService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNewName = (event)=> setNewName(event.target.value);
  const handleNewNumber = (event)=> setNewNumber(event.target.value);
  const handleFilter = (event)=> setFilter(event.target.value);

  useEffect(()=>{
    personsService.getAll("http://localhost:3001/persons")
    .then((res)=>{
      console.log("Data obtained")
      setPersons(res)
    })

  },[])

  const addContact = (event)=>{
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedNumber = newNumber.trim()

    if (trimmedName.length===0 || trimmedNumber.length===0){
      alert("Fill the two fields")
      return
    }

    if (persons.some((person)=>person.number===trimmedNumber)){
      alert(`The number ${trimmedNumber} already exists in your contacts`)
      return
    }
    
    const existentName = persons.find(p=>p.name===trimmedName)

    if (existentName){
      const confirmed = window.confirm(`${existentName.name} is already in your contacts, do you want to replace the old number?`)
      if (!confirmed) return;
      const updatedPerdon = {...existentName, number: trimmedNumber}

      personsService
      .update(existentName.id,updatedPerdon)
      .then(returnedPerson=>{
        setPersons(persons.map(p=> p.id!==existentName.id? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      return
    }
    
    const newPerson = {name: trimmedName, number: trimmedNumber}
    personsService
    .create(newPerson)
    .then(returnedPerson =>{
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const removeContact = (id) =>{
    const person = persons.find(p=>p.id===id)
    const confirmed = window.confirm(`Delete ${person.name}`)
    if (confirmed){
      personsService
      .remove(id)
      .then(response => console.log(response))
      setPersons(persons.filter(person => person.id!==id))
    }
  }

  const peopleToShow = persons.filter(person =>{ 
    return person.name.startsWith(filter) || person.number.startsWith(filter) || person.name.split(' ').some(w => w.startsWith(filter))
  }
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
      <PersonList people={peopleToShow} handleRemove={removeContact}/>
    </div>
  )
}

export default App
