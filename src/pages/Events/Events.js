import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Event from './Event';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

class Events extends Component {

    componentDidMount() {
        // Do this every time? we may navigate back here
        // Depends on the API speed/booking data volatility/environment
        this.props.actions.fetchEvents();
    }

    handleBooking = (eventId, seats) => {
        this.props.actions.bookSeats(eventId, seats);
    }

    render() {
        const { events, isLoading, match } = this.props;

        // if there is a match.params.id, there is an ID in the url,
        // show that instead!

        const event = match.params.id && events.find(event => event.id === parseInt(match.params.id, 10));

        return (
            <section>
                { isLoading && <p>loading...</p>}
                { event ? 
                    ( <Event event={event} onBook={seats => this.handleBooking(event.id, seats)} />) :
                    (<div>
                        <h1>Upcoming events</h1>
                        <ul>
                            { events && events.map(event => (
                                <li key={event.id}>
                                    <span>{event.name} - ({event.seatsBooked.length}% booked)</span>
                                    <Link to={`/events/${event.id}`}>book</Link>
                                </li>
                            ))}
                        </ul>
                    </div>)
                }
            </section>
        )
    }
}

export default connect(
    (state) => ({
        events: selectors.allEvents(state),
        isLoading: selectors.isLoadingEvents(state)
    }),
    (dispatch) => ({ actions: bindActionCreators(actions, dispatch)})
)(Events);