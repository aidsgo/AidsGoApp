import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'

import {Actions} from 'react-native-router-flux'
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {exactTime} from './../helper/Utils';

class IncidentReview extends Component {
    constructor(props) {
        super(props);
    }

    images() {
        if (this.props.incident.images && this.props.incident.images.length > 0) {
            return (
                <View style={styles.photosPanel}>
                    {
                        (this.props.incident.images || []).map((image) => {
                            return <Image source={image} style={styles.photo}/>
                        })
                    }
                </View>
            )
        }
    }

    render() {
        console.log(this.props.incident);
        return (
            <View style={{position: 'relative'}}>
                <View style={styles.success}>
                    <FAIcon style={{color: '#FFFFFF'}} name='check' size={26}/>
                    <Text style={{color: '#FFFFFF', fontSize: 24, marginLeft: 15, fontWeight: 'bold'}}>帮助成功</Text>
                </View>
                <View style={styles.info}>
                    <View style={styles.row}>
                        <Text style={styles.infoText}>被救助人:</Text>
                        <Text style={styles.infoText}>{this.props.incident.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoText}>救助时间:</Text>
                        <Text style={styles.infoText}>{exactTime(this.props.incident.time)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.infoText}>救助地点:</Text>
                        <Text style={styles.infoText}>天谷八路</Text>
                    </View>
                </View>
                {this.images()}
                <TouchableOpacity style={styles.backToList} onPress={() => Actions.incidentListContainer()}>
                    <Text style={{color: '#FFFFFF', fontSize: 20}}>查看附近</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    success: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#54BF8D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        marginTop: 30,
        marginBottom: 30,
        marginLeft: 30,
        marginRight: 30,
    },
    infoText: {
        fontSize: 16,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
    },
    photosPanel: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop: 2,
        paddingBottom: 2,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 60,
        backgroundColor: '#ECEDEE',
    },
    photo: {
        marginLeft: 2,
        marginRight: 2,
        marginTop: 4,
        marginBottom: 4,
        width: (deviceWidth - 76) / 3,
        height: (deviceWidth - 76) * 0.75 / 3,
    },
    backToList: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#EE8380',
        borderRadius: 30,
    }
});

module.exports = IncidentReview;