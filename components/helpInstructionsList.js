import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity
} from 'react-native';
import HelpInstructionDescription from './helpInstructionDescription'

class HelpInstructionsList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([
                {title:'心肺复苏',url:'http://mp.weixin.qq.com/s?src=3&timestamp=1479528283&ver=1&signature=IxOQ85fzXl3ryRzxN2Rzn4NSqhMZBJxkZcvhoC1nOp3Pm61xBuL*fKr*C3eMKiFZd-bqAXT8rHP3iOZyGzvh0EHahLfaGHD90gw2ml053nAdO28HGVR8ndcbf4bXSazSJwXfl8XD8cfdjDD*Nc95sOZXXT0sInWVnbd9a7We3Zs='},
                {title:'心血管救助',url:'http://mp.weixin.qq.com/s?src=3&timestamp=1479528414&ver=1&signature=k0p2mqj7zbakgPdE5VR5nsd9*mzzdDnvUbvR3aseEKAs*89EoVVuXF3mDnYvP69yegN0toLn-h9jQcxeDRjN3tpPuejRKzwsBkM1NQk22J33DFiUwd7Zn72Gjm4-lyGR*alRyE0hFCoMZg2QnJQmhFJBjt6HqyjXOILMvY1Mrk0='},
                {title:'外伤救助',url:'http://mp.weixin.qq.com/s?src=3&timestamp=1479528506&ver=1&signature=2f7BGdtxrno1wLVZrKw5seimsSrDNd0ZF-FOaiaAqTSHWy6icwcXGnQioolScs9L59dvMBrLgj1dBo75BDt2aonCHUwps43IJKVE99Q0BKZ3AcgGY5BOCdmv*zpIBmKbaeM0vIriceO10IPpGsJFZw=='}
            ])
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView style={styles.listContainer}
                    dataSource={this.state.dataSource}
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