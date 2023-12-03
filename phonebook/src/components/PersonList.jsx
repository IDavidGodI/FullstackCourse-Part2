import Person from "./Person"

const PersonList = ({people})=>{
  return(
    <>
      {
        people.map(person=>{
          return <Person key={person.name} person={person}/>
        })
      }
    </>
  )
}

export default PersonList;