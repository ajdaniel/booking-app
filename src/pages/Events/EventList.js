import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

class EventList extends Component {

    componentDidMount() {
        // Do this every time? we may navigate back here
        // Depends on the API speed/booking data volatility/environment
        this.props.actions.fetchEvents();
    }

    render() {
        const { events, match } = this.props;

        // if there is a match.params.id, there is an ID in the url,
        // show that instead!

        return (
            <section>
                <h1>Event List here</h1>
                <ul>
                    { events && events.map(event => (
                        <li key={event.id}>
                            <Link to={`/events/${event.id}`}>{event.name} - ({event.seatsBooked.length}% booked)</Link>
                        </li>
                    ))}
                </ul>
            </section>
        )
    }
}

export default connect(
    (state) => ({ events: selectors.allEvents(state) }),
    (dispatch) => ({ actions: bindActionCreators(actions, dispatch)})
)(EventList);