

const Person = ({person, onClick}) => {
    return (
    <div>
        <li>{person.name} {person.number}</li>
        <button onClick={() => onClick(person)}>delete</button>
    </div>
    )
}


export default Person