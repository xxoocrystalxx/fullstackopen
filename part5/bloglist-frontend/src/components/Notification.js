const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`user !== null && notification ${message.color} `}>
      {message.message}
    </div>
  )
}

export default Notification
