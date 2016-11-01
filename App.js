import React, {Component} from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IncidentListContainer from './containers/IncidentListContainer';
import IncidentDetailsContainer from './containers/IncidentDetailsContainer';

const RouterWithRedux = connect()(Router);
import reducers from './reducers';
const middleware = [/* ...your middleware (i.e. thunk) */];
const store = compose(
    applyMiddleware(...middleware)
)(createStore)(reducers);


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="root">
                        <Scene key="incidentListContainer" component={IncidentListContainer}
                               navigationBarStyle={{backgroundColor: 'rgb(250,250,250)'}}
                               titleStyle={{color: '#333', fontWeight: 'bold', fontSize: 16}}
                               title="Open Incidents" initial={true}/>

                        <Scene key="incidentDetailsContainer" component={IncidentDetailsContainer}
                               navigationBarStyle={{backgroundColor: 'rgb(250,250,250)'}}
                               titleStyle={{color: '#333', fontWeight: 'bold', fontSize: 16}}
                               title="Incident Details"
                               hideBackImage={true}
                               backTitle={<Icon style={{color: '#333'}} name={'ios-arrow-back'} size={25} />}
                               onBack={() => {Actions.pop()}}/>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

export default App;