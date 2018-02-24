import React, { Component } from 'react';
import times from 'lodash/times';
import PropTypes from 'prop-types';

// cheap way
const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

class Event extends Component {

    handleSeatBooked = (seatId) => {
        console.log(seatId, 'clicked');
    }

    render() {
        const { event } = this.props;

        const rows = 10;
        const cols = 10;

        return (
            <section>
                <h1>{event.name}</h1>
                <h3>{event.date}</h3>
                <p>This event is {event.seatsBooked.length}% booked</p>

                <h2>Book a seat</h2>

                { times(rows, rowNum => {
                    const rowLetter = rowLetters[rowNum];
                    const row = times(cols, colNum => {
                        const col = colNum + 1;
                        const seatId = `${rowLetter}${col}`;
                        // is this efficient? depends on the API and the Reducer State I guess...
                        const isBooked = event.seatsBooked.some(booking => booking.seat === seatId);
                        return (
                        <button key={seatId}onClick={() => this.handleSeatBooked(seatId)} disabled={isBooked}>
                            {seatId} {isBooked && 'BOOKED'}
                        </button>
                        )
                    })
                    return <div key={rowLetter}>{row}</div>;
                }) }

            </section>
        )
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired
}

export default Event;