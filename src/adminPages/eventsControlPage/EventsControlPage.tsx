import style from "./eventsControlPage.module.css";

const EventsControlPage = () => {
  return (
    <div className={style.events_control_page_con}>
      <div className={style.events_control_page}>
        <div className={style.events_control_page_header}>
          <h1>Events Management</h1> <button>Add Event</button>
        </div>
        <p>Manage and create events for the city of Springfield</p>
        <h3>Existing Events</h3>
        <div className={style.events_control_table_con}>
            <div>
          <table>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td style={{ color: "black" }}>Community Cleanup</td>
              <td>2024-07-15</td>
              <td>Central Park</td>
              <td>
                <div>
                  <p>Edit</p> <p> |</p> <p>Delete</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ color: "black" }}>Summer Concert Series</td>
              <td>2024-07-15</td>
              <td>Central Park</td>
              <td>
                <div>
                  <p>Edit</p> <p> |</p> <p>Delete</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ color: "black" }}>Community Cleanup</td>
              <td>2024-07-15</td>
              <td>Central Park</td>
              <td>
                <div>
                  <p>Edit</p> <p> |</p> <p>Delete</p>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ color: "black" }}>Community Cleanup</td>
              <td>2024-07-15</td>
              <td>Central Park</td>
              <td>
                <div>
                  <p>Edit</p> <p> |</p> <p>Delete</p>
                </div>
              </td>
            </tr>
          </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsControlPage;
