import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault() 
    const personObject = {name: newName, number: newNumber}    
    
    if (persons.findIndex(p => p.name === newName) != -1) {
      const isConfimed = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const id = persons.find(p => p.name === newName).id        
      if (isConfimed) {
        phonebookService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.filter(p => p.id != id).concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccessMessage(`Updated ${returnedPerson.name}`)
            setTimeout(()=> setSuccessMessage(null), 5000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${personObject.name} has already been removed from server`)
            setTimeout(()=> setErrorMessage(null), 5000)  
          })
      }
      return
    }

    phonebookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(()=> setSuccessMessage(null), 5000)
        })
  }

  const deletePerson = (person) => {
    confirm(`Delete ${person.name}?`)
    
    phonebookService
      .deleteObject(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setSuccessMessage(`Deleted ${person.name}`)
        setTimeout(()=> setSuccessMessage(null), 5000)
      })
      .catch(error => {
            setErrorMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(()=> setErrorMessage(null), 5000)  
      })
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value) 
  const handleFilter = (event) => setFilter(event.target.value) 

  const personsToShow = persons.filter(p => p.name?.toLowerCase().includes(filter.toLowerCase()))
    
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <Filter value={filter} onChange={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm 
          onSubmit={addPerson}
          valueName={newName} 
          valueNumber={newNumber} 
          onChangeName={handleNewName} 
          onChangeNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClick={deletePerson} />
    </div>
  )
}

export default App