import { useContext } from 'react'
import { Layout, Menu, Badge } from 'antd'
import { Link } from "react-router-dom"

import { GlobalContext } from '../context/GlobalState'

const { Header } = Layout

const Navbar = () => {
  const { cart, user, logoutUser } = useContext(GlobalContext)

  const logoutHandle = async e => {
    e.preventDefault()
    await logoutUser()
  }

  return (
    <Header>
      <div className="logo">
        <img src="https://library.kissclipart.com/20180829/hhq/kissclipart-food-love-icon-png-clipart-eating-computer-icons-f-4550b6056bc1b361.png" alt="logo" />
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']}>
        {!user?.id && (
          <>
            <Menu.Item key="login">
              <Link to="/login">Log In</Link>
            </Menu.Item>
            <Menu.Item key="register">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        )}
        <Menu.Item key="cart">
          <Link to="/cart">Cart</Link><Badge count={cart.length} />
        </Menu.Item>
        {user?.id && (
          <>
            <Menu.Item key="logout">
            <a href="#!" onClick={logoutHandle}>Logout</a>
          </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  )
}

export default Navbar
