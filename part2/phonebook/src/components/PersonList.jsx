
const FilteredPerson = ({ person }) => {
    return <div>{person.name} {person.number}</div>;
  };

const PersonList = ({filteredPersons}) => {
    //console.log(handleFilterChange)
    return(
        
      <div>
        <h2>Numbers</h2>
        {filteredPersons.map(person => (
          <FilteredPerson key={person.id} person={person} />
        ))}
      </div>
    )

}

export default PersonList