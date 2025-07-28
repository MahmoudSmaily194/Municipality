import style from "./manageComplaints.module.css";
import { useNavigate } from "react-router-dom";
const ManageCompliants = () => {
  const navigate = useNavigate();
  return (
    <div className={style.ManageComplaints_page_con}>
      <div className={style.ManageComplaints_page}>
        <div className={style.ManageComplaints_header}>
          <h1>Complaints</h1>
          <button
            onClick={() => {
              navigate("../issuemodel");
            }}
          >
            Add issue type
          </button>
        </div>
        <p>Manage Compliants for the municipality of Sawirah</p>
        <h3>Existing Complaints</h3>
        <div className={style.ManageComplaints_table_con}>
          <div>
            <table>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Issue type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td style={{ color: "black" }}> Sarah Johnson </td>
                <td>2024-01-15</td>
                <td>Issue type</td>
                <td>
                  <div>
                    <p>Pending</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>View</p>
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

export default ManageCompliants;
