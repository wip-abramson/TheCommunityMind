/**
 * Created by will on 14/11/17.
 */
import { browserHistory } from 'react-router'


export const unauthorizedErrorNotification = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Unauthorized!',
  message: 'Login to access this feature',
  position: 'tr',
  autoDismiss: 0,
  action: {
    label: 'Login',
    callback: () => browserHistory.push('/login')
  }
};

export const loginFailedNotification = {
  title: 'Login Failed',
  message: 'Do you need to register?',
  position: 'tc',
  autoDismiss: 3,
  action: {
    label: 'Register',
    callback: () => browserHistory.push('/register')
  }
}

