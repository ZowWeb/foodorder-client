import { useContext } from 'react'
import { Card } from 'antd'
import { EditOutlined, EllipsisOutlined, ShoppingCartOutlined } from '@ant-design/icons'

import { GlobalContext } from '../context/GlobalState'

const { Meta } = Card

const Food = ({ restaurant, hideCart }) => {
  const { addToCart } = useContext(GlobalContext)
  const { name, food, place, image, id } = restaurant

  const handleCart = e => {
    e.preventDefault()
    addToCart(id)
  }

  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src={image}
        />
      }
      actions={[
        <ShoppingCartOutlined key="cart" onClick={handleCart} />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        title={food}
        description={`${name} is located at ${place}`}
      />
    </Card>
  )
}

export default Food
