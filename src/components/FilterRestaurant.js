import { Select } from 'antd'

import origRestaurants from '../utils/restaurants'

const { Option } = Select

const FilterRestaurant = ({ restaurants, setRestaurants }) => {
  function onChange(value) {
    console.log(`selected ${value}`)
    const filteredByNames = restaurants.filter(({ name }) => name === value)
    setRestaurants(filteredByNames)
    if(value === 'all') setRestaurants(origRestaurants)
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Pick a restaurant"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    > 
      <Option value="all">Show all</Option>
      {restaurants.map((restaurant, i) => <Option value={restaurant.name}>{restaurant.name}</Option>)}
    </Select>
  )
}

export default FilterRestaurant
