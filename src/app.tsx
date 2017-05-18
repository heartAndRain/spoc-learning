import { StackNavigator } from 'react-navigation'

import HomeScene from './scenes/home'
import CourseScene from './scenes/course'
import CourseContentScene from './scenes/course/course-content'
import SelectScene from './scenes/select'

const App = StackNavigator({
  HomeScene: { screen: HomeScene },
  CourseScene: { screen: CourseScene },
  SelectScene: { screen: SelectScene },
  CourseContentScene: { screen: CourseContentScene }
})

export default App

