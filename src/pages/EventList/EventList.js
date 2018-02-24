import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

class EventList extends Component {

    componentDidMount() {
        this.props.actions.fetchEvents();
    }

    render() {
        const { events } = this.props;

        return (
            <section>
                <h1>Event List here</h1>
                { events && events.map(event => (
                    <p key={event.id}>{event.name} - ({event.seatsBooked.length}% booked)</p>
                ))}
            </section>
        )
    }
}

export default connect(
    (state) => ({ events: selectors.allEvents(state) }),
    (dispatch) => ({ actions: bindActionCreators(actions, dispatch)})
)(EventList);