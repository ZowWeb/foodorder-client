import { useContext } from 'react'
import jwt_decode from 'jwt-decode'
import { Layout } from 'antd'

import { GlobalContext } from '../context/GlobalState'
import setAuthToken from '../utils/setAuthToken'

const LayoutWithAuth = ({ children }) => {
  const { setCurrentUser, logoutUser } = useContext(GlobalContext)
  
  // Check for token
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token to get user info and expire
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    setCurrentUser(decoded)
  
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      logoutUser()
      // Redirect to login
      window.location.href = '/login'
    }
  }

  return (
    <Layout className="layout">
      {children}
    </Layout>
  )
}

export default LayoutWithAuth
