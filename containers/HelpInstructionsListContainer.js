import {connect} from 'react-redux'
import {fetchHelpInstructions} from '../actions/HelpInstructions'
import HelpInstructionsList from '../components/HelpInstructionsList'

const mapStateToProps = (state, ownProps) => {

    const helpInstructionHash = state.helpInstructions.items;

    let helpInstructions = [];

    for(let key in helpInstructionHash){
        helpInstructions.push(helpInstructionHash[key])
    }

    return {
        helpInstructions: helpInstructions
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchHelpInstructions: () => {
            dispatch(fetchHelpInstructions())
        }
    }
};

const HelpInstructionsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HelpInstructionsList);

export default HelpInstructionsContainer
