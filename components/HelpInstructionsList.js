import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';
import HelpInstructionDescription from './HelpInstructionDescription'

class HelpInstructionsList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchHelpInstructions()
    }

    getHelpInstructions(){
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ds.cloneWithRows(this.props.helpInstructions);
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView style={styles.listContainer}
                    dataSource={this.getHelpInstructions()}
                    renderRow={(help) => <HelpInstructionDescription help={help}></HelpInstructionDescription>}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        marginTop: 64
    },
    listContainer : {
        marginTop: 10
    }

});

module.exports = HelpInstructionsList;