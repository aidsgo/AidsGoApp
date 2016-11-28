import React, {Component} from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {connect, Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import IncidentListContainer from './containers/IncidentListContainer';
import IncidentDetailsContainer from './containers/IncidentDetailsContainer';
import IncidentReviewContainer from './containers/IncidentReviewContainer';
import HelpInstructionsContainer from './containers/HelpInstructionsListContainer';
import Logo from './components/Logo';
import UserContainer from './containers/UserContainer';
import HelpInstructionDetail from './components/HelpInstrcuctionDetail'

const RouterWithRedux = connect()(Router);
import reducers from './reducers/Index';
const middleware = [thunkMiddleware];
const store = compose(
    applyMiddleware(...middleware)
)(createStore)(reducers);

import wilddog from 'wilddog';

var usersConfig = {
    authDomain: "bestaidsgo.wilddog.com",
    syncURL: "https://bestaidsgo.wilddogio.com/data/activeUsers"
};

wilddog.initializeApp(usersConfig);
let usersRef = wilddog.sync().ref();

class App extends Component {
    componentDidMount() {
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(position => {
                usersRef.child(`${store.getState().user.id}`).set({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })
            }, error => {
                console.log(JSON.stringify(error));
            }, {enableHighAccuracy: true, timeout: 20000});
        }, 3000);
    }

    render() {
        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key="root">
                        <Scene key="logo" component={Logo} initial={true} hideNavBar={true}/>

                        <Scene key="aigsGoLogin" component={UserContainer} hideNavBar={true}/>

                        <Scene key="incidentListContainer" component={IncidentListContainer} type={'reset'}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0, height: 60}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title="Incidents nearby" hideNavBar={false}/>

                        <Scene key="incidentDetailsContainer" component={IncidentDetailsContainer} hideNavBar={true}/>
                        <Scene key="incidentReview" component={IncidentReviewContainer} hideNavBar={true}/>

                        <Scene key="helpInstructionsList" component={HelpInstructionsContainer}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0}}
                               hideBackImage={true}
                               backTitle={<Icon style={{color: '#FFFFFF', width: 40, height: 40}} name={'ios-arrow-back'} size={25} />}
                               onBack={() => {Actions.pop()}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title="HelpInstructions" hideNavBar={false}/>

                        <Scene key="helpInstructionsDetail" component={HelpInstructionDetail}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0}}
                               hideBackImage={true}
                               backTitle={<Icon style={{color: '#FFFFFF', width: 40, height: 40}} name={'ios-arrow-back'} size={25} />}
                               onBack={() => {Actions.pop()}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title="救援帮助" hideNavBar={false}/>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

export default App;