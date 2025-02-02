export interface Event {
    description: string;
    year: string;
}

export interface EventsResponse {
    events: Event[];
    date: { day: number; month: number };
}

export const fetchEvents = async (): Promise<EventsResponse> => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const url = `https://byabbe.se/on-this-day/${month}/${day}/events.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return { events: data.events, date: { day, month } };
    } catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
};
