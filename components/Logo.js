import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';

class Logo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image style={styles.logo} source={require('./../public/img/logo.png')}/>
                    <Image style={styles.aidsgo} source={require('./../public/img/aidsgo.png')}/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    logo: {
        width: 80,
        height: 80
    },
    aidsgo: {
        marginLeft: 10,
        width: 60,
        height: 20
    }
});

export default Logo;

