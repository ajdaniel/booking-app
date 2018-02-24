import { combineReducers } from 'redux';
import * as Types from './actionTypes';

const defaultEvents = {
    loading: false,
    byId: {}, // key the events by ID
    allIds: [] // Array of IDs
}

const events = (state = defaultEvents, action) => {
    switch(action.type) {
        case Types.FETCH_EVENTS_SUCCESS:
            const { byId } = state;
            action.events.forEach(event => {
                byId[event.id] = event;
            });
            return {
                ...state,
                byId,
                allIds: action.events.map(event => event.id)
            }
        default:
            return state;
    }
}

const reducers = combineReducers({
    events
});

export default reducers;