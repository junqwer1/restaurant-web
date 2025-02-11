import RestaurantContainer from './restaurant/containers/RestaurantContainer'
import { MainTitle } from './global/components/StyledTitle'
import { MainContentBox } from './global/components/ContentBox'

const MainPage = () => {
  return (
    <MainContentBox max={1000} min={650}>
      <MainTitle>식당 검색</MainTitle>
      <RestaurantContainer />
    </MainContentBox>
  )
}

export default MainPage
