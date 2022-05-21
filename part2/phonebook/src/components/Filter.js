const Filter = ({ search, handle }) => (
  <div>
    filter shown with: <input value={search} onChange={handle} />
  </div>
)

export default Filter
