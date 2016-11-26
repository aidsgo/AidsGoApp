import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native'


class ActionButton extends Component {
    constructor(props) {
        super(props);
    }

    isTakenByMe(incident, userId) {
        return !!incident.taken.find(volunteerId => volunteerId === userId)
    }

    isResolved(incident) {
        return incident.resolved;
    }

    render() {
        const {incident, user, onResolveBtnPressed, onIncidentAccept} = this.props;
        if (this.isTakenByMe(incident, user.profile.id) && !this.isResolved(incident)) {
            return (
                <TouchableOpacity style={styles.btn}
                                  onPress={() => {onResolveBtnPressed();}}>
                    <Text style={styles.btnText}>Resolve</Text>
                </TouchableOpacity>
            )
        } else if (!this.isTakenByMe(incident, user.profile.id) && !this.isResolved(incident)) {
            return (
                <TouchableOpacity style={styles.btn}
                                  onPress={() => {onIncidentAccept(incident.id, user.profile.id, user.profile.token);}}>
                    <Text style={styles.btnText}>Volunteer</Text>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }
}

let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        width: deviceWidth - 85,
        right: 40,
        bottom: 20,
        height: 42,
        backgroundColor: '#EE8380',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

module.exports = ActionButton;