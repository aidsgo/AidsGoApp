import React, {Component} from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IncidentListContainer from './containers/IncidentListContainer';
import IncidentDetailsContainer from './containers/IncidentDetailsContainer';
import Logo from './components/Logo';
import Login from './components/Login';
import HelpInstructionsList from './components/helpInstructionsList'
import HelpInstructionDetail from './components/helpInstrcuctionDetail'

const RouterWithRedux = connect()(Router);
import reducers from './reducers/Index';
const middleware = [thunkMiddleware];
const store = compose(
    applyMiddleware(...middleware)
)(createStore)(reducers);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="root">
                        <Scene key="logo" component={Logo} initial={true}/>

                        <Scene key="aigsGoLogin" component={Login} />

                        <Scene key="incidentListContainer" component={IncidentListContainer}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title="Incidents nearby"/>

                        <Scene key="incidentDetailsContainer" component={IncidentDetailsContainer}
                               navigationBarStyle={{backgroundColor: 'rgb(250,250,250)'}}
                               titleStyle={{color: '#333', fontWeight: 'bold', fontSize: 16}}
                               title="Incident Details"
                               hideBackImage={true}
                               backTitle={<Icon style={{color: '#333'}} name={'ios-arrow-back'} size={25} />}
                               onBack={() => {Actions.pop()}}/>


                        <Scene key="helpInstructionsList" component={HelpInstructionsList}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title="HelpInstructions"/>

                        <Scene key="helpInstructionsDetail" component={HelpInstructionDetail}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title="救援帮助"/>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

export default App;