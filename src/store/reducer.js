import { combineReducers } from 'redux';
import * as Types from './actionTypes';

const defaultEvents = {
    loading: false,
    byId: {}, // key the events by ID
    allIds: [], // Array of IDs
    userEventsIds: [] // Array of IDs of events for current user
}

const events = (state = defaultEvents, action) => {
    switch(action.type) {
        case Types.FETCH_USER_EVENTS_SUCCESS:
            const newById = state.byId;
            action.events.forEach(event => {
                newById[event.id] = event;
            });
            return {
                ...state,
                byId: newById,
                userEventsIds: action.events.map(event => event.id)
            }
        case Types.FETCH_EVENTS:
            return {
                ...state,
                loading: true,
                // we don't have to empty the store here
                byId: {},
                allIds: []
            }
        case Types.FETCH_EVENTS_SUCCESS:
            const { byId } = state;
            action.events.forEach(event => {
                byId[event.id] = event;
            });
            return {
                ...state, byId,
                allIds: action.events.map(event => event.id),
                loading: false
            }
        default:
            return state;
    }
}

const reducers = combineReducers({
    events
});

export default reducers;