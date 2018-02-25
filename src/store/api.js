// I would use Axios which is nice and lovely

const delay = () => {
    return new Promise((resolve, reject) => {
        // small random delay
        const timeout = Math.random() * 1000;
        setTimeout(resolve, timeout);
    });
}

let events = [
    {
        id: 1,
        name: 'January Event',
        date: '1/1/18',
        seatsBooked: [
            { seat: 'A1', name: 'Andrew', email: 'andrewjd1@gmail.com' }
        ]
    }
];

export const fetchEvents = () => {
    return delay().then(() => {
        return events;
    });
}

export const bookSeats = (eventId, seats) => {
    return delay().then(() => {
        // update the cache with the new seat bookings,
        // probably do some validation here, but this is a mock api
        events = events.map(event => {
            if (event.id === eventId) {
                return {
                    ...event,
                    seatsBooked: [...event.seatsBooked, ...seats.map(({id, name, email}) => ({seat: id, name, email}))]
                }
            } else {
                return event;
            }
        });

        // return the updated events
        return events;
    });
}