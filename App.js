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
import ProfileContainer from './containers/ProfileContainer';
import HelpInstructionDetail from './components/HelpInstrcuctionDetail'
import I18n from './helper/I18n';

import ReactNative, {
    AsyncStorage,
} from 'react-native';


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

    _loadInitailUserState = async () => {
        try {
            const valueSting = await AsyncStorage.getItem('userProfile');
            const value = JSON.parse(valueSting);
            if (value !== null) {
                store.getState().user.profile = value;
                Actions.incidentListContainer()
            } else {
                Actions.aigsGoLogin()
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this._loadInitailUserState();
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(position => {
                if(store.getState().user.profile && store.getState().user.profile.id){
                    usersRef.child(`${store.getState().user.profile.id}`).set({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                }
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
                        <Scene key="profile" component={ProfileContainer} hideNavBar={true} />
                        <Scene key="incidentListContainer" component={IncidentListContainer} type={'reset'}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0, height: 60}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title={I18n.t('incidents_nearby')} hideNavBar={false}/>

                        <Scene key="incidentDetailsContainer" component={IncidentDetailsContainer} hideNavBar={true}/>
                        <Scene key="incidentReview" component={IncidentReviewContainer} hideNavBar={true}/>

                        <Scene key="helpInstructionsList" component={HelpInstructionsContainer}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0}}
                               hideBackImage={true}
                               backTitle={<Icon style={{color: '#FFFFFF', width: 40, height: 40}} name={'ios-arrow-back'} size={25} />}
                               onBack={() => {Actions.pop()}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title={I18n.t('help_tips')} hideNavBar={false}/>

                        <Scene key="helpInstructionsDetail" component={HelpInstructionDetail}
                               navigationBarStyle={{backgroundColor: '#EE8280', borderBottomWidth: 0}}
                               hideBackImage={true}
                               backTitle={<Icon style={{color: '#FFFFFF', width: 40, height: 40}} name={'ios-arrow-back'} size={25} />}
                               onBack={() => {Actions.pop()}}
                               titleStyle={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 22}}
                               title={I18n.t('help_tips')} hideNavBar={false}/>
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}

export default App;