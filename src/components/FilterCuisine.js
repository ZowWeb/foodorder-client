import { Select } from 'antd'

import origRestaurants from '../utils/restaurants'

const { Option } = Select

const FilterCuisine = ({ restaurants, setRestaurants }) => {
  function onChange(value) {
    console.log(`selected ${value}`)
    const filterByCuisine = restaurants.filter(({ food }) => food === value)
    setRestaurants(filterByCuisine)
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
      placeholder="Filter by cuisine"
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
      {restaurants.map((restaurant, i) => <Option value={restaurant.food}>{restaurant.food}</Option>)}
    </Select>
  )
}

export default FilterCuisine
