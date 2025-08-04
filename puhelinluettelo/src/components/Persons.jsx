import Person from './Person'

const Persons = ({persons, onClick}) => {
  return (
    <ul>
        {persons.map(p => 
          <Person key={p.id} person={p} onClick={onClick} />
        )}
    </ul>
  )
}

export default Persons