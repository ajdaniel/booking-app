import React, { Component } from 'react';
import times from 'lodash/times';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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
        // Only allow 4 bookings
        if (this.state.seatsChosen.length >= 4) {
            return;
        }
        // if the seat is already chosen, remove it
        if (this.state.seatsChosen.some(seat => seat.id === seatId)) {
            this.setState({
                seatsChosen: this.state.seatsChosen.filter(seat => seat.id !== seatId)
            });
        } else {
            this.setState({
                seatsChosen: [...this.state.seatsChosen, {
                    id: seatId,
                    email: '',
                    name: '',
                    emailInvalidText: '',
                    nameInvalidText: ''
                }]
            });
        }
    }

    setEmail = (seatId, email) => {
        const seatsChosen = this.state.seatsChosen.map(seat => {
            if (seat.id === seatId) {
                // perhaps do this via the server?
                let isEmailUsed = this.props.event.seatsBooked.some(booking => booking.email === email);
                // compare other emails used in the booking
                isEmailUsed = isEmailUsed || this.state.seatsChosen.some(booking => booking.id !== seatId && booking.email === email);
                let emailInvalidText;
                if (isEmailUsed) {
                    emailInvalidText = 'This email has already been used for a booking, please provide another';
                } else {
                    emailInvalidText = '';
                }
                return {...seat, email, emailInvalidText};
            } else {
                return seat;
            }
        });
        this.setState({seatsChosen});
    }

    setName = (seatId, name) => {
        const seatsChosen = this.state.seatsChosen.map(seat => {
            if (seat.id === seatId) {
                // perhaps do this via the server?
                const isNameUsed = this.props.event.seatsBooked.some(booking => booking.name === name);
                // compare against other names in the booking
                isNameUsed = isNameUsed || this.state.seatsChosen.some(booking => booking.id !== seatId && booking.name === name);
                let nameInvalidText;
                if (isNameUsed) {
                    nameInvalidText = 'This name has already been used for a booking, please provide another';
                } else {
                    nameInvalidText = '';
                }
                return {...seat, name, nameInvalidText};
            } else {
                return seat;
            }
        });
        this.setState({seatsChosen});
    }

    handleBookingClicked = () => {
        this.props.onBook(this.state.seatsChosen);
    }

    render() {
        const { event } = this.props;
        const { seatsChosen } = this.state;

        const rows = 10;
        const cols = 10;

        const bookingInvalid = seatsChosen.some(seat => {
            return seat.emailInvalidText || seat.nameInvalidText || !seat.email || !seat.name
        });

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
                            const chosen = seatsChosen.some(seat => seat === seatId);
                            return (
                            <button 
                                className={classNames('seat', {chosen, booked: isBooked})}
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
                                <li key={'chosen_'+seat.id}>
                                    <span>{seat.id}</span>
                                    <input type="email" placeholder="email" value={seat.email} onChange={(e) => this.setEmail(seat.id, e.target.value)} className={classNames({invalid: seat.emailInvalidText})} />
                                    <input type="text" placeholder="name" value={seat.name} onChange={(e) => this.setName(seat.id, e.target.value)} className={classNames({invalid: seat.nameInvalidText})} />
                                    <p>{seat.emailInvalidText}</p>
                                    <p>{seat.nameInvalidText}</p>
                                </li>
                            ))}
                        </ul>
                        <button disabled={bookingInvalid} onClick={() => this.handleBookingClicked()}>Book selected seats</button>
                    </aside>
                )}
                </div>

            </section>
        )
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
    onBook: PropTypes.func.isRequired
}

export default Event;