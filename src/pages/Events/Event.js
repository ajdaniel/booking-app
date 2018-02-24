import React, { Component } from 'react';
import times from 'lodash/times';
import PropTypes from 'prop-types';

import './Event.css';

// cheap way
const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

class Event extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seatsChosen: []
        }
    }

    handleSeatBooked = (seatId) => {
        this.setState({
            seatsChosen: [...this.state.seatsChosen, seatId]
        });
    }

    render() {
        const { event } = this.props;
        const { seatsChosen } = this.state;

        const rows = 10;
        const cols = 10;

        return (
            <section>
                <h1>{event.name}</h1>
                <h3>{event.date}</h3>
                <p>This event is {event.seatsBooked.length}% booked</p>

                <h2>Book a seat</h2>

                <div className="booking">
                <div className="booking--seats">
                    { times(rows, rowNum => {
                        const rowLetter = rowLetters[rowNum];
                        const row = times(cols, colNum => {
                            const col = colNum + 1;
                            const seatId = `${rowLetter}${col}`;
                            // is this efficient? depends on the API and the Reducer State I guess...
                            const isBooked = event.seatsBooked.some(booking => booking.seat === seatId);
                            return (
                            <button 
                                className="seat"
                                key={seatId}
                                onClick={() => this.handleSeatBooked(seatId)}
                                disabled={isBooked} 
                                title={isBooked ? 'Booked' : 'Available'}>
                                {seatId}
                            </button>
                            )
                        })
                        return <div key={rowLetter}>{row}</div>;
                    }) }
                </div>
                { !!seatsChosen.length && (
                    <aside className="booking--info">
                        <p>You have chosen {seatsChosen.length} seats</p>
                        <ul>
                            {seatsChosen.map(seat => (
                                <li>{seat}</li>
                            ))}
                        </ul>
                    </aside>
                )}
                </div>

            </section>
        )
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired
}

export default Event;