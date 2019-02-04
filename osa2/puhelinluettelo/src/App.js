import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filterName, setFilterName] = useState('')
	const personsHandler = (event) => {
		event.preventDefault()
		if (persons.find(person => person.name === newName) === undefined) {
			setPersons(persons.concat({ name: newName, id: persons.length + 1, phone: newNumber }))
		} else {
			alert("ALARM ALARM")
		}
		setNewName('')
		setNewNumber('')
	}
	const filterHandler = (event) =>
		setFilterName(event.target.value.toLowerCase())

	const numberHandler = (event) =>
		setNewNumber(event.target.value)

	const nameHandler = (event) =>
		setNewName(event.target.value)

	const hook = () => {
		console.log('effect')
		axios.get('http://localhost:3001/persons')
			.then(response => {
				console.log('lupaus toteutettu')
				setPersons(response.data)
			})
	}

	useEffect(hook, [])

	return (
		<div>
			<h2>Puhelinluettelo</h2>
			<Filter string={filterName} handler={filterHandler} />
			<Form name={newName} number={newNumber} nameHandler={nameHandler} numberHandler={numberHandler} personsHandler={personsHandler} />
			<h2>Numerot</h2>
			<Listing persons={persons.filter(person => person.name.toLowerCase().startsWith(filterName))} />
		</div>
	)

}

const Listing = ({ persons }) => {
	return (
		<ul>
			{persons.map(henkilo => <li key={henkilo.id}>{henkilo.name} {henkilo.phone}</li>)}
		</ul>
	)
}

const Form = ({ name, number, nameHandler, numberHandler, personsHandler }) => {
	return (
		<form onSubmit={personsHandler}>
			<div>
				nimi: <input value={name} onChange={nameHandler} />
			</div>
			<div>numero: <input value={number} onChange={numberHandler} /></div>
			<div>
				<button type="submit">lisää</button>
			</div>
		</form>
	)
}

const Filter = ({ string, handler }) => {

	return (
		<div>
			<div>rajaa näytettäviä</div>
			<input value={string} onChange={handler} />
		</div>
	)
}

export default App