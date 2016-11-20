import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import HelpInstructionDescription from './HelpInstructionDescription'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
                <Image source={require('./../public/img/background_1.png')} style={styles.backgroundImage}>
                <ListView style={styles.listContainer}
                    dataSource={this.getHelpInstructions()}
                    renderRow={(help) => <HelpInstructionDescription help={help}></HelpInstructionDescription>}
                />
                </Image>
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
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        width:width,
        height:height
    },
    listContainer : {
        marginTop: 10
    }

});

module.exports = HelpInstructionsList;