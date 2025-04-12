const Persons = ({ persons, handleRemove }) => (
  <div>
    {persons.map(person => (
      <div  key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleRemove(person.id)} >remove</button>
      </div>
    ))}
  </div>
)

export default Persons