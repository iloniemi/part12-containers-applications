const PersonForm = ({ onSubmit, fields }) => (
  <form onSubmit={onSubmit}>
    {fields.map(field => (
      <Field key={field.text} text={field.text} onChange={field.onChange} value={field.value} />
    ))}
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Field = ({ text, onChange, value }) => (
  <div>
    {text}: <input onChange={onChange} value={value} />
  </div>
)

export default PersonForm