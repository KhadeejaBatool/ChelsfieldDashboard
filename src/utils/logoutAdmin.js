import axios from 'axios';
import { logoutAdminUrl } from './apiRoutes';

export default function logoutAdmin(navigate) {
  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true;
    axios.get(logoutAdminUrl)
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem('valid');
          localStorage.removeItem('token');
          navigate('/auth/signin'); // Navigate to login after successful logout
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        console.error('Logout failed', error);
        resolve(false); // Resolve as false if an error occurred during logout
      });
  });
}
