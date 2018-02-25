export const allEvents = state => state.events.allIds.map(id => state.events.byId[id]);
export const isLoadingEvents = state => state.events.loading;

export const userEvents = state => state.events.userEventsIds.map(id => state.events.byId[id]);