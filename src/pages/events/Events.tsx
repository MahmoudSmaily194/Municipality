import style from "./events.module.css";
import { events } from "../../data/events";
import LazyImage from "../../LazyLoader/LazyImg";
const Events = () => {
  return (
    <div className={style.events_page}>
      <div className={style.events_con}>
        <h2>Upcoming Events</h2>
        <p>
          Stay informed about the latest happenings in our community. Explore a
          variety of events, from cultural festivals to community workshops,
          designed to engage and connect residents.
        </p>
        <div className={style.events}>
          {events.map((event, index) => {
            return (
              <div key={index} className={style.event}>
                <div className={style.event_text_con}>
                  <h4>{event.title}</h4>
                  <p>{event.details}</p>
                  <p className={style.date}>
                    <strong>Date:</strong>
                    &nbsp;&nbsp;
                    {event.date}
                  </p>
                  <p style={{color:"black"}}>
                    <strong>Location:</strong>
                    &nbsp; &nbsp;
                    {event.location}
                  </p>
                  <button>View Details</button>
                </div>
                <LazyImage src={event.url} alt={event.url} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Events;
