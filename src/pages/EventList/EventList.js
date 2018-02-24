import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';

class EventList extends Component {

    componentDidMount() {
        this.props.actions.fetchEvents();
    }

    render() {
        return (
            <h1>Event List here</h1>
        )
    }
}

export default connect(
    (state) => ({ events: state.events }),
    (dispatch) => ({ actions: bindActionCreators(actions, dispatch)})
)(EventList);