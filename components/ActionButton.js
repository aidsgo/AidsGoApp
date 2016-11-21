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
        if (this.isTakenByMe(this.props.incident, this.props.user.id) && !this.isResolved(this.props.incident)) {
            return (
                <TouchableOpacity style={styles.btn}
                                  onPress={() => {this.props.onResolveBtnPressed();}}>
                    <Text style={styles.btnText}>Resolve</Text>
                </TouchableOpacity>
            )
        } else if (!this.isTakenByMe(this.props.incident, this.props.user.id) && !this.isResolved(this.props.incident)) {
            return (
                <TouchableOpacity style={styles.btn}
                                  onPress={() => {this.props.onIncidentAccept(this.props.incident.id, this.props.user.id);}}>
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