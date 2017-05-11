import { StackNavigator } from 'react-navigation'

import HomeScene from './scenes/home'
import CourseScene from './scenes/course'

const App = StackNavigator({
  HomeScene: { screen: HomeScene },
  CourseScene: { screen: CourseScene }
})

export default App

