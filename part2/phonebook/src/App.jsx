import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonList from './components/PersonList'
import personService from './services/persons'
//import create from './services/persons'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='add'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [addMessage, setAddMessage] = useState(null)


  useEffect(() => {
    const fetchData = async () => {
    
      const fetchedPersons = await personService.getAll();
      console.log("Fetched Persons:", fetchedPersons);
      //if (Array.isArray(fetchedPersons)) {
        setPersons(fetchedPersons);
      //}
    };
    fetchData();
  }, []);

  const deleteFromList = (id) => {
    setPersons(persons.filter(person => person.id != id))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  
  const addName = (event) => {
    event.preventDefault();
    const foundPerson = persons.find(person => person.name === newName);
    // if (foundPerson) {
    //   alert(`${newName} is already added to phonebook`);
    //   return;
    // }
    const newPerson = { name: newName, number: newNumber, id: (persons.length + 1).toString() };
    for(let i in persons){
      console.log("ana hena ya jhone", persons[i].name, newPerson.name)
      console.log(persons[i].name == newName)
      if(persons[i].name == newName){
        if (window.confirm(newName + ' is already added to phonebook, do you want to replace old number with the new one?')) {

        
          const newData = { name: newName, number: newNumber, id: persons[i].id };
          personService.update(newData.id, newData)
          //flag = 0
          var updatedData = persons.filter(person => person.id != persons[i].id)
          setPersons([...updatedData, newData]);
        }
        return
      }
    }
    //pooooooooooooooost
    personService.create(newPerson)
    
    setPersons([...persons, newPerson]);
    
    
    
    setNewName('');
    setNewNumber('');
    setAddMessage('Added ' + newName)
    setTimeout(() => {
      setAddMessage(null)
    }, 5000)
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
      <Notification message={addMessage} />
      <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
      
      <Form newName = {newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addName={addName} />
      <PersonList filteredPersons={filteredPersons} deletePerson = {deleteFromList} setAddMessage={setAddMessage}/>

    </div>
  );
};

export default App;
