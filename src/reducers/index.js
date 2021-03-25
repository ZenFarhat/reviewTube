import {combineReducers} from 'redux'
import changePage from './changePage'

const allReducers = combineReducers({
    page: changePage
})


export default allReducers;