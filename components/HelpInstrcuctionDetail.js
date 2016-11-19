import React, { Component } from 'react';
import {
    StyleSheet,
    WebView
} from 'react-native';

class HelpInstructionDetail extends Component {
    render() {
        return (
            <WebView style={styles.container}
                source={{uri: this.props.url}}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        marginTop: 64
    }
});
module.exports = HelpInstructionDetail;