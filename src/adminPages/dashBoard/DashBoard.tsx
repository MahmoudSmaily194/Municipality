import style from "./dashboard.module.css";
import { PiMegaphoneLight } from "react-icons/pi";
const DashBoard = () => {
  return (
    <div className={style.dashboard_page_con}>
      <div className={style.dashboard_page}>
        <h1>Dashboard</h1>
        <h2>Overview</h2>
        <div className={style.dashboard_notification_boxes_con}>
          <div>
            <h3>Total News Articles</h3>
            <h2>125</h2>
          </div>
          <div>
            <h3> Upcoming Events</h3>
            <h2>15</h2>
          </div>
          <div>
            <h3>Services Offered</h3>
            <h2>5</h2>
          </div>
          <div>
            <h3>Complaints Received</h3>
            <h2>25</h2>
          </div>
        </div>
        <h2>Recent Activity</h2>

        <div className={style.dashboard_recent_ac_cont}>
          <div className={style.dashboard_recent_ac}>
            <div className={style.icon}>
              <PiMegaphoneLight />
            </div>
            <div className={style.textCon}>
              <h5>Pothole on Main Street</h5>
              <p>Complaint ID: 2024-001</p>
            </div>
          </div>
           <div className={style.dashboard_recent_ac}>
            <div className={style.icon}>
              <PiMegaphoneLight />
            </div>
            <div className={style.textCon}>
              <h5>Pothole on Main Street</h5>
              <p>Complaint ID: 2024-001</p>
            </div>
          </div>
           <div className={style.dashboard_recent_ac}>
            <div className={style.icon}>
              <PiMegaphoneLight />
            </div>
            <div className={style.textCon}>
              <h5>Pothole on Main Street</h5>
              <p>Complaint ID: 2024-001</p>
            </div>
          </div>
          <div className={style.dashboard_recent_ac}>
            <div className={style.icon}>
              <PiMegaphoneLight />
            </div>
            <div className={style.textCon}>
              <h5>Pothole on Main Street</h5>
              <p>Complaint ID: 2024-001</p>
            </div>
          </div>
          <div className={style.dashboard_recent_ac}>
            <div className={style.icon}>
              <PiMegaphoneLight />
            </div>
            <div className={style.textCon}>
              <h5>Pothole on Main Street</h5>
              <p>Complaint ID: 2024-001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
