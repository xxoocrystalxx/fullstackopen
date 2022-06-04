import { connect } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = (props) => {
  if (props.notification === null) {
    return null
  }

  return (
    <div className="container">
      {props.notification.info === 'success' ? (
        <Alert variant="success"> {props.notification.message}</Alert>
      ) : (
        <Alert variant="danger">{props.notification.message}</Alert>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
