
const Form = ({newName, handleNameChange, newNumber, handleNumberChange, addName}) => {
    //console.log(handleFilterChange)
    return(
        
        <form>
            <h2>Add a new</h2>
            <div>
            name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
            <button type="submit" onClick={addName}>add</button>
            </div>
      </form>
    )

}

export default Form