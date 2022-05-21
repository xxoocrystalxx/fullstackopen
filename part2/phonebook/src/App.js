import { useState, useEffect } from "react"
import React from "react"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import PersonList from "./components/PersonList"
import Notification from "./components/Notification"
import phonebookService from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState({
    message: "Some message here ...",
    color: "success",
  })
  useEffect(() => {
    phonebookService.getAll().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personFound = persons.find((value) => value.name === newName)
    if (personFound) {
      if (
        window.confirm(
          `${personFound.name} is already added to phonebook,replace the old number with a new one?`
        )
      ) {
        const changedPerson = { ...personFound, number: newNumber }
        phonebookService
          .update(personFound.id, changedPerson)
          .then((response) => {
            setErrorMessage({
              message: `Person ${response.name} number changed in ${response.number}`,
              color: "success",
            })
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(
              persons.map((n) => (n.id !== personFound.id ? n : response))
            )
          })
          .catch((error) => {
            setPersons(persons.filter((n) => n.id !== personFound.id))
            setErrorMessage({
              message: `person '${personFound.name}' was already deleted from server`,
              color: "error",
            })
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      phonebookService.create(newPerson).then((response) => {
        setErrorMessage({
          message: `Added ${response.name}`,
          color: "success",
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.concat(response))
      })
    }
    setNewName("")
    setNewNumber("")
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookService.deleteObject(person.id).then((response) => {
        const newPersonList = persons.filter((value) => value.id !== person.id)
        setErrorMessage({
          message: `Person ${person.name} deleted successful`,
          color: "success",
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(newPersonList)
      })
    }
  }

  const personsToShow =
    search === ""
      ? persons
      : persons.filter((value) =>
          value.name.toLowerCase().includes(search.toLocaleLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter search={search} handle={handleSearchChange} />
      <h3>add new</h3>
      <PersonForm
        submit={addPerson}
        name={newName}
        handlePersonChange={handlePersonChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {personsToShow.map((value) => (
        <PersonList
          person={value}
          key={value.name}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default App
