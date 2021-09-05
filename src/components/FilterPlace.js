import { Select } from 'antd'

import origRestaurants from '../utils/restaurants'

const { Option } = Select

const FilterPlace = ({ restaurants, setRestaurants }) => {
  function onChange(value) {
    console.log(`selected ${value}`)
    const filteredByPlace = restaurants.filter(({ place }) => place === value)
    setRestaurants(filteredByPlace)
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
      placeholder="Select by location"
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
      {restaurants.map((restaurant, i) => <Option value={restaurant.place}>{restaurant.place}</Option>)}
    </Select>
  )
}

export default FilterPlace
