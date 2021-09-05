import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { Typography, Button, Empty, Divider, notification } from 'antd'

import Food from './Food'
import { GlobalContext } from '../context/GlobalState'
import restaurants from '../utils/restaurants'

const { Title } = Typography

const Cart = () => {
  const [ message, setMessage ] = useState(null)
  const { cart, user, placeOrder } = useContext(GlobalContext)

  const handleOrder = async e => {
    e.preventDefault()
    await placeOrder(cart, user)
    if(user?.id) setMessage('Order successful')
  }

  let renderEmptyCart = (
    cart.length > 0 ? (
      <>
        <div className="foods-wrapper">
          {restaurants.filter(item => cart.includes(item.id)).map((item, i) =>
            <Food key={`${item.name}-${i}`} restaurant={item} hideCart />
          )}
        </div>
        {message && notification.success({ message })}
        <Button className="place-order" type="primary" onClick={handleOrder}>
          Place order
        </Button>
      </>
    ) : (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
            Feeling hungry...
          </span>
        }
      >
        <Button type="primary">
          <Link to="/foods">Show me food</Link>
        </Button>
      </Empty>
    )
  )

  return (
    <>
      <Divider><Title level={2}>Best cuisines to enjoy</Title></Divider>
      {renderEmptyCart}
    </>
  )
}

export default Cart
