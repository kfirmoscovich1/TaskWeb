import React, { useState, useEffect } from "react";
import { fetchEvents } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/History.css";

interface Event {
  description: string;
}

interface DateInfo {
  day: number | null;
  month: number | null;
}

const History: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [date, setDate] = useState<DateInfo>({ day: null, month: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { events: eventsData, date } = await fetchEvents();
        setEvents(eventsData);
        setDate(date);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <div className="bg-dark text-white position-fixed bottom-0 w-100 d-flex align-items-center history-bar">
      <div className="px-3 fw-bold">{date.day}/{date.month}</div>

      <div className="marquee-container flex-grow-1">
        <div className="marquee-content">
          {events.map((event, index) => (
            <span key={index} className="px-3">
              {event.description}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;