import * as Types from './actionTypes';
export const fetchEvents = () => ({ type: Types.FETCH_EVENTS });
export const fetchEventsSuccess = (events) => ({type: Types.FETCH_EVENTS_SUCCESS, events});