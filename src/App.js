import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import './App.css'

import PrivateRoute from './components/PrivateRoute'

import LayoutWithAuth from './components/Layout'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Foods from './components/Foods'
import Cart from './components/Cart'
import { GlobalProvider } from './context/GlobalState'

const { Footer } = Layout

function App() {
  return (
    <GlobalProvider>
      <Router>
        <LayoutWithAuth>
          <Navbar />
          <div className="site-layout-content">
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/foods" component={Foods} />
            <Switch>
              <PrivateRoute exact path="/cart" component={Cart} />
            </Switch>
          </div>
          <Footer style={{ textAlign: 'center' }}>Zohaib Khan ©2021</Footer>
      </LayoutWithAuth>
    </Router>
  </GlobalProvider>
  )
}

export default App
