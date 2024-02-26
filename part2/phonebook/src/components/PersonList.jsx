import personService from '../services/persons'


const FilteredPerson = ({ person , deletePerson, setAddMessage}) => {
    return <div>{person.name} {person.number}<button onClick={() => {
      if (window.confirm("Do you really want to delete?")) {
        const response = personService.deletePerson(person.id)
        deletePerson(person.id)
        if (response.status >= 200 && response.status < 300) {
          return response.data;
        } else {
          setAddMessage(person.name + ' is already removed from the list')
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        }
        
      }
    
    }}>remove</button></div>;
  };

const PersonList = ({filteredPersons, deletePerson, setAddMessage}) => {
    //console.log(handleFilterChange)
    return(
        
      <div>
        <h2>Numbers</h2>
        {filteredPersons.map(person => (
          <FilteredPerson key={person.id} person={person} deletePerson = {deletePerson} setAddMessage={setAddMessage}/>
        ))}
      </div>
    )

}

export default PersonList