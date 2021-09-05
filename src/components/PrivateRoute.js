import { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalState'

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('coming to PrivateRoute')
  const { user } = useContext(GlobalContext)

  return (
    <Route
      {...rest}
      render={routeProps => 
        user?.id ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
}

export default PrivateRoute
