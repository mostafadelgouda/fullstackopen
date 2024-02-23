import React, { useState } from 'react';
import Filter from './components/Filter'
import Form from './components/Form'
import PersonList from './components/PersonList'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  
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
      <h2>Numbers</h2>
      <PersonList filteredPersons={filteredPersons}/>

    </div>
  );
};

export default App;
