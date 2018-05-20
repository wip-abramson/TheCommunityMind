/**
 * Created by will on 14/11/17.
 */
import { browserHistory } from 'react-router'


export const unauthorizedErrorNotification = {
  // uid: 'once-please', // you can specify your own uid if required
  title: 'Unauthorized!',
  message: 'Login to access this feature',
  position: 'tr',
  autoDismiss: 5,
  action: {
    label: 'Login',
    callback: () => browserHistory.push('/login')
  }
};

export const unableToNavPrevious = {
  message: 'Unable to navigate backwards. Please navigate forwards first',
  position: 'tc',
  autoDismiss: 3,
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

export const registerFailedNotification = {
  message: 'Please try again',
  position: 'tc',
  autoDismiss: 3,
}

