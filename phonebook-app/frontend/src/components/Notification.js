const Notification = ({ message, classForNotification='notification' }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classForNotification}>
      {message}
    </div>
  )
}

export default Notification