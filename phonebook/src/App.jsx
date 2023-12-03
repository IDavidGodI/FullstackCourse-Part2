import { useState } from 'react'

const Person = ({person})=>{
  return(
    <p>{person.name} {person.phone}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNewName = (event)=> setNewName(event.target.value);
  const handleNewPhone = (event)=> setNewPhone(event.target.value);

  const addContact = (event)=>{
    event.preventDefault()
    const trimmedName = newName.trim()
    const trimmedPhone = newPhone.trim()

    if (trimmedName.length===0 || trimmedPhone.length===0){
      alert("Fill the two fields")
      return
    }

    if (persons.some((person)=>person.name===trimmedName)){
      alert(`${trimmedName} already exists in your contacts`)
      return
    }
    if (persons.some((person)=>person.phone===trimmedPhone)){
      alert(`The number ${trimmedPhone} already exists in your contacts`)
      return
    }

    const newPerson = {name: trimmedName, phone: trimmedPhone}
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleNewPhone}/>
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
