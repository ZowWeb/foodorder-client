import { useState } from 'react'
import { Typography, Divider, Space } from 'antd'

import Food from './Food'
import FilterRestaurant from './FilterRestaurant'
import FilterPlace from './FilterPlace'
import FilterCuisine from './FilterCuisine'
import restaurants from '../utils/restaurants'

const { Title } = Typography

const Foods = () => {
  const [ filteredRestaurants, setFilteredRestaurants ] = useState(restaurants)

  return (
    <>
    <Divider><Title level={2}>Best cuisines to enjoy</Title></Divider>
    <Title level={4}>Filter by</Title>
    <Space className="spacer-filter">
      <div className="filter">
        <Title level={5}>Restaurants</Title>
        <FilterRestaurant restaurants={filteredRestaurants} setRestaurants={setFilteredRestaurants} />
      </div>
      <div className="filter">
        <Title level={5}>Place</Title>
        <FilterPlace restaurants={filteredRestaurants} setRestaurants={setFilteredRestaurants} />
      </div>
      <div className="filter">
        <Title level={5}>Cuisine</Title>
        <FilterCuisine restaurants={filteredRestaurants} setRestaurants={setFilteredRestaurants} />
      </div>
    </Space>
    <div className="foods-wrapper">
      {filteredRestaurants.map((restaurant, i) => (
        <Food key={`${restaurant.name}-${i}`} {...{restaurant}} />
      ))}
    </div>
  </>
  )
}

export default Foods
