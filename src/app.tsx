import { StackNavigator } from 'react-navigation'

import HomeScene from './scenes/home'
import CourseScene from './scenes/course'
import CourseContentScene from './scenes/course/course-content'
import SelectScene from './scenes/select'
import HomeworkScene from './scenes/homework'



const App = StackNavigator({
  HomeScene: { screen: HomeScene },
  CourseScene: { screen: CourseScene },
  SelectScene: { screen: SelectScene },
  CourseContentScene: { screen: CourseContentScene },
  HomeworkScene: { screen: HomeworkScene }
})

export default App

