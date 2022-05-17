import { useState , useEffect } from 'react'
import phoneService from './services/phoneService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [search , setSearch] = useState("")
  const [messageText , setMessageText] = useState(null)
  const [messageType , setMessageType] = useState("")


  useEffect(()=>{

         phoneService.getAll()
        .then((response)=>{
         setPersons(response)
        })

  },[])


  function addNewName(event){

     event.preventDefault()
    
     if(persons.every((person)=>(person.name !== newName)))
     { 
       const newPerson = {name : newName , number : newPhoneNumber}

            phoneService.create(newPerson)
           .then((response)=>{
            setPersons(persons.concat({...newPerson,id : response.id}))
            setMessageText(`Added ${newName}`)
            setMessageType("success")
            setTimeout(()=>
            {setMessageText(null)
             setMessageType("")}
            ,3000)

      })
     }
     else
     {
        if(window.confirm(`${newName} is already added to phonebook,replace the old numbeer with new one?`)){
         const modifiedPerson = persons.find((person)=>(person.name === newName))
         
          phoneService.update(modifiedPerson.id,{...modifiedPerson,number:newPhoneNumber})
          .then((response)=>{
             setPersons(persons.map(person=>(person.id !== modifiedPerson.id ? person : {...person,number : response.number} )))

      })
        }
     }

     setNewName("")
     setNewPhoneNumber("")
  }

  function deletePerson(id) {

    const toBeDeletedPerson = persons.find((person)=>(person.id === id))
    if (window.confirm(`Do you want to delete ${toBeDeletedPerson.name} ?`)) {

      phoneService.deletePerson(id)
       .then((response)=>{
         setPersons(persons.filter((person)=>(person.id !== id)))
       })
       .catch((error)=>{
        setMessageText(`${toBeDeletedPerson.name} is not present , please refresh the page!`)
        setMessageType("error")
        setTimeout(()=>
        {setMessageText(null)
         setMessageType("")}
        ,3000)
       })
    }

  }

  return (
    <div>
      <Notification message={messageText} messageType={messageType}/>
      <h2>Phonebook</h2>
        <Filter value = {search} onChangeHandler = {(event)=>(setSearch(event.target.value))} />

        <h2>add a new</h2>
      <PersonForm onSubmitFunction={addNewName}
                  newName = {newName}
                  onChangeNewName = {(event)=>{setNewName(event.target.value)}}
                  newPhoneNumber = {newPhoneNumber}
                  onChangeNewPhoneNumber = {(event)=>{setNewPhoneNumber(event.target.value)}}
      />

      <h2>Numbers</h2>
      <Persons persons = {persons}  search = {search} deletePerson={deletePerson}/>
    </div>
  )
}

const Persons = ({persons,search,deletePerson}) => {

  return (
    <>
     {persons
      .filter((person)=>person.name.toUpperCase().includes(search.toUpperCase()))
      .map((person) => <div key={person.id}>
                           <span>{person.name} {person.number} </span> 
                           <button onClick={()=>(deletePerson(person.id))}>delete</button>
                       </div>)
      }
    </>
  )

}

const Filter = ({search,onChangeHandler}) => {

  return (
    <div>
          filter shown with <input value = {search} onChange = {onChangeHandler} />
    </div>
  )
}

const PersonForm = (props) => {

  return (
    <form onSubmit={props.onSubmitFunction}>
    <div>
      name: <input value = {props.newName} onChange = {props.onChangeNewName} />
    </div>
    <div>
      number: <input type= "number" value = {props.newPhoneNumber} onChange = {props.onChangeNewPhoneNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Notification = ({ message , messageType}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default App;