// I would use Axios which is nice and lovely

const delay = () => {
    return new Promise((resolve, reject) => {
        // small random delay
        const timeout = Math.random() * 1000;
        setTimeout(resolve, timeout);
    });
}

export const fetchEvents = () => {
    return delay().then(() => {
        return [
            {
                id: 1,
                name: 'January Event',
                date: '1/1/18',
                seatsBooked: [
                    { seat: 'A1', name: 'Andrew', email: 'andrewjd1@gmail.com' }
                ]
            }
        ];
    });
}