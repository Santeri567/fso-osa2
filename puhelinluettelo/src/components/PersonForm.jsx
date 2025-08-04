const PersonForm = (props) => {
    const {onSubmit, valueName, valueNumber, onChangeName, onChangeNumber} = props
    return (
        <div>
            <form onSubmit={onSubmit}>
                name: 
                <input value={valueName} onChange={onChangeName} />
                <br />
                number:
                <input value={valueNumber} onChange={onChangeNumber} />
                <br />
                <button type="submit">add</button>
            </form>
        </div>
    ) 
}

export default PersonForm