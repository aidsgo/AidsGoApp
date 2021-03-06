import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import IncidentDescription from './IncidentDescription'
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from '../helper/I18n';

class IncidentList extends Component {
    constructor(props) {
        super(props);
        this.state = {currentTab: 'onGoing'};
    }

    onSwitchTab(tab) {
        this.setState({currentTab: tab});
    }

    _onRefresh() {
        const {id, token, location} = this.props.user.profile;
        if (this.state.currentTab == 'mine') {
            this.props.fetchMineIncidents(id, token);
        } else {
            this.props.fetchOngoingIncidents(id, token, location);
        }
    }

    refreshing() {
        return this.state.currentTab == 'mine' ? this.props.mineIncidentsFetching : this.props.onGoingIncidentsFetching
    }

    componentDidMount() {
        const {id, token, location} = this.props.user.profile;
        this.props.fetchOngoingIncidents(id, token, location);
        this.props.fetchMineIncidents(id, token);
    }

    visibleIncidents() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if (this.state.currentTab == "mine") {
            return ds.cloneWithRows(this.props.mineIncidents);
        } else if (this.state.currentTab == "onGoing") {
            return ds.cloneWithRows(this.props.onGoingIncidents);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tabRow}>
                    <TouchableOpacity onPress={() => Actions.profile()}>
                        <Image source={require('./../public/img/user.png')} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, styles.firstTab, this.state.currentTab=='onGoing'? styles.currentTab: {}]}
                        onPress={() => {this.onSwitchTab('onGoing')}}>
                        <Text style={styles.tabText}>{I18n.t('on_going')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, styles.lastTab, this.state.currentTab=='mine'? styles.currentTab: {}]}
                        onPress={() => {this.onSwitchTab('mine')}}>
                        <Text style={styles.tabText}>{I18n.t('mine')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.medKit}
                        onPress={() => Actions.helpInstructionsList()}>
                        <Icon style={{color: 'white'}} name={'ios-medkit'} size={30}/>
                    </TouchableOpacity>
                </View>
                <ListView style={styles.list}
                          refreshControl={<RefreshControl refreshing={this.refreshing()} onRefresh={this._onRefresh.bind(this)}/>}
                          dataSource={this.visibleIncidents()}
                          renderRow={(incident) => <IncidentDescription incident={incident} />}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        marginTop: 60
    },
    tabRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 10,
        backgroundColor: '#EE8280'
    },
    tab: {
        width: 100,
        height: 32,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
        padding: 2,
        justifyContent: 'center',
        alignItems: 'center'

    },
    icon: {
        position: 'absolute',
        top: 3,
        right: 38,
        resizeMode: 'stretch',
        width: 24,
        height: 24
    },
    medKit: {
        position: 'absolute',
        bottom: 10,
        right: 24
    },
    firstTab: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    lastTab: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderLeftWidth: 0
    },
    currentTab: {
        backgroundColor: '#F8CCCB'
    },
    tabText: {
        color: '#333f48',
        fontSize: 14
    },
    list: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        backgroundColor: "#F0F0F1"
    }
});

module.exports = IncidentList;