import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

class IncidentDescription extends Component {
    render() {
        const iconName = this.props.incident.resolved ? 'check' : 'exclamation';
        return (
            <TouchableOpacity style={styles.container}
                              onPress={() => Actions.incidentDetailsContainer({incident: this.props.incident})}>
                <View style={styles.indicator}>
                    <FAIcon style={{color: 'white'}} name={iconName} size={30}/>
                </View>
                <View style={styles.details}>
                    <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
                        <IonIcon style={{color: "#545960"}} name='md-time' size={25}/>
                        <Text style={{fontSize: 16, marginLeft: 10}}>{this.props.incident.time.toLocaleString()}</Text>
                    </View>
                    <View style={{paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{fontSize: 16}}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.incident.name}</Text>
                            <Text> need your help!</Text>
                        </Text>
                        <Text style={{marginTop: 5, fontSize: 16}}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.incident.distance}</Text>
                            <Text> meters away from you.</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.logo}>
                    <Image style={{width: 50, height: 50, resizeMode: 'contain'}}
                           source={require('../public/img/logo.png')}></Image>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#FFFFFF'
    },
    indicator: {
        width: 40,
        backgroundColor: '#F57D7A',
        justifyContent: 'center',
        alignItems: 'center'
    },
    details: {
        flex: 1,
        padding: 20,
        paddingRight: 10
    },
    logo: {
        width: 55,
        paddingTop: 10
    }
});

module.exports = IncidentDescription;
