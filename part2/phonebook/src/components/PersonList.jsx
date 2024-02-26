import personService from '../services/persons'


const FilteredPerson = ({ person , deletePerson}) => {
    return <div>{person.name} {person.number}<button onClick={() => {
      if (window.confirm("Do you really want to delete?")) {
        personService.deletePerson(person.id)
        deletePerson(person.id)
      }
    
    }}>remove</button></div>;
  };

const PersonList = ({filteredPersons, deletePerson}) => {
    //console.log(handleFilterChange)
    return(
        
      <div>
        <h2>Numbers</h2>
        {filteredPersons.map(person => (
          <FilteredPerson key={person.id} person={person} deletePerson = {deletePerson}/>
        ))}
      </div>
    )

}

export default PersonList