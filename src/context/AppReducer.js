const appReducer = (state, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      }
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isLoggedIn: action.payload?.id,
        user: action.payload,
        error: null,
      }
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        user: {},
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [
          ...state.cart,
          action.payload
        ],
      }
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      }
    case 'GET_ERRORS':
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default appReducer
