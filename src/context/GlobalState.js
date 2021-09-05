import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import AppReducer from './AppReducer'
import setAuthToken from '../utils/setAuthToken'

axios.defaults.baseURL = 'http://localhost:5000'

// Initial State
const initialState = {
  isLoggedIn: false,
  user: {},
  error: null,
  cart: [],
}

// Create Context
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(AppReducer, initialState)

  // Actions
  async function getUser() {
    try {
      const res = await axios.get('/api/users/test')
      console.log(`getUser ~ res`, res)

      dispatch({
        type: 'LOG_IN',
        payload: res.data.data,
      })
    } catch (err) {
      dispatch({
        type: 'GET_ERRORS',
        payload: err?.response?.data,
      })
    }
  }

  async function registerUser(name, email, password) {
    try {
      await axios.post('/api/users/register', { name, email, password })
      window.location.href = '/login'
    } catch (err) {
      console.log(`registerUser ~ err`, err)
      dispatch({
        type: 'GET_ERRORS',
        payload: err?.response?.data,
      })
    }
  }

  async function loginUser(email, password) {
    try {
      const res = await axios.post('/api/users/login', { email, password })
      // Save to localStorage
      const { token } = res.data
      // Set token to ls
      localStorage.setItem("jwtToken", token)
      // Set token to Auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    } catch (err) {
      dispatch({
        type: 'GET_ERRORS',
        payload: err?.response?.data,
      })
    }
  }

  // Set logged in user
  const setCurrentUser = decoded => {
    return {
      type: 'SET_CURRENT_USER',
      payload: decoded
    }
  }

  // Log user out
  async function logoutUser() {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken')
    // Remove auth header for future requests
    setAuthToken(false)
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
  }

  const addToCart = id => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: id,
    })
  }

  async function placeOrder(cart, user) {
    try {
      await axios.post('/api/orders', { id: user.id, foods: cart })
      dispatch({
        type: 'CLEAR_CART',
      })
    } catch (err) {
      dispatch({
        type: 'GET_ERRORS',
        payload: err?.response?.data,
      })
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        error: state.error,
        user: state.user,
        cart: state.cart,
        registerUser,
        getUser,
        loginUser,
        setCurrentUser,
        logoutUser,
        addToCart,
        placeOrder,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}