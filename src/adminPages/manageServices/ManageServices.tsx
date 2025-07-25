import style from "./manageServices.module.css";
import { useNavigate } from "react-router-dom";
const ManageServices = () => {
  const navigate = useNavigate();
  return (
    <div className={style.ManageServices_page_con}>
      <div className={style.manageServices_page}>
        <div className={style.manageServices_header}>
          <h1>Manage Services</h1>{" "}
          <button
            onClick={() => {
              navigate("../servicemodel");
            }}
          >
            Add Service
          </button>
        </div>
        <p>Manage and create services for the municipality of Sawirah</p>
        <h3>Existing Services</h3>
        <div className={style.manageServices_table_con}>
          <div>
            <table>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td style={{ color: "black" }}>Park Maintenance </td>
                <td>Parks and Recreation</td>
                <td> Active</td>
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

export default ManageServices;
