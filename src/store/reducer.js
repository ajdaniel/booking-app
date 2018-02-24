import { combineReducers } from 'redux';

const defaultEvents = {
    loading: false,
    byId: {}, // key the events by ID
    allIds: [] // Array of IDs
}

const events = (state = defaultEvents, action) => {
    return state;
}

const reducers = combineReducers({
    events
});

export default reducers;