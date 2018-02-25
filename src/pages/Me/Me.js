import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

class Me extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userName: '',
            userEvents: []
        }
    }

    handleChangeEmail = userEmail => this.setState({ userEmail });
    handleChangeName= userName => this.setState({ userName });

    fetchEventsForUser = () => {
        this.props.actions.fetchUserEvents(this.state.userName, this.state.userEmail);
    }

    cancelBooking = (eventId) => {
        this.props.actions.cancelBooking(eventId, this.state.userName, this.state.userEmail);
    }

    render() {
        const { userEvents, isLoading } = this.props;
        const { userEmail, userName } = this.state;

        return (
            <section>
                <h1>Provide email for booking</h1>
                <div>
                    <input type="email" value={userEmail} onChange={e => this.handleChangeEmail(e.target.value)} placeholder="email" />
                </div>
                <div>
                    <input type="text" value={userName} onChange={e => this.handleChangeName(e.target.value)} placeholder="name" />
                </div>
                <button onClick={this.fetchEventsForUser}>Find Events</button>

                { isLoading ? <p>loading...</p> : (
                userEvents.length > 0 ? (
                    <div>
                        <h3>{userEvents.length} event(s) found</h3>
                        <ul>
                            {userEvents.map(event => (
                                <li key={event.id}>{event.name} <button onClick={() => this.cancelBooking(event.id)}>cancel booking</button></li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <h1>No user events found for user details</h1>
                ))}
            </section>
        )
    }

}

export default connect(
    (state) => ({
        userEvents: selectors.userEvents(state),
        isLoading: selectors.isLoadingEvents(state)
    }),
    (dispatch) => ({ actions: bindActionCreators(actions, dispatch)})
)(Me);