import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import Form from './components/Form'
import PersonList from './components/PersonList'
import axios from 'axios'

const hook = (setPersons) => {
  console.log('effect')

  const eventHandler = response => {
    console.log('promise fulfilled')
    setPersons(response.data)
  }

  const promise = axios.get('http://localhost:3001/persons')
  promise.then(eventHandler)
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  
  useEffect(() => {
    hook(setPersons);
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  
  const addName = (event) => {
    event.preventDefault();
    const foundPerson = persons.find(person => person.name === newName);
    if (foundPerson) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };
  
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      
      <Form newName = {newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addName={addName}/>
      <PersonList filteredPersons={filteredPersons}/>

    </div>
  );
};

export default App;
