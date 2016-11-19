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

class HelpInstructionDescription extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.container}
                              onPress={() => Actions.helpInstructionsDetail({url: this.props.help.url})}>
                <View style={styles.indicator}>
                    <FAIcon style={{color: 'black'}} name={'ambulance'} size={30}/>
                </View>
                <View style={styles.details}>
                    <View style={{paddingLeft: 10, paddingRight: 10}}>
                        <Text style={{fontSize: 16}}>
                            <Text style={{fontWeight: 'bold'}}>{this.props.help.title}</Text>
                        </Text>
                    </View>
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

module.exports = HelpInstructionDescription;
