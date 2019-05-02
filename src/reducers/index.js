import { combineReducers } from 'redux'
import todos from './todos'
import filters from './filters'
import logs from './logs'

export default combineReducers({
  todos,
  filters,
  logs
})