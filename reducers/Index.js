import {combineReducers} from 'redux'
import incidents from './Incidents'
import onGoingIncidents from './OnGoingIncidents'
import mineIncidents from './MineIncidents'
import helpInstructions from './HelpInstructions'
import user from './UserReducer'
import routes from './Routes';

const aidsGo = combineReducers({incidents, onGoingIncidents, mineIncidents, helpInstructions, user, routes});

export default aidsGo