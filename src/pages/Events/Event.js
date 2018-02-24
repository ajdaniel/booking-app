import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Event extends Component {

    render() {
        const { event } = this.props;
        return (
            <section>
                <h1>{event.name}</h1>
                <h3>{event.date}</h3>
                <p>This event is {event.seatsBooked.length}% booked</p>
            </section>
        )
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired
}

export default Event;