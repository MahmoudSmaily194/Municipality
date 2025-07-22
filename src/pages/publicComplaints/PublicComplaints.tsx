import style from "./compliants.module.css";
import { MdAddCircle } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { complaints } from "../../data/complaints";
import Pagination from "../../components/pagination/Pagination";
import { useNavigate } from "react-router-dom";
const PublicComplaints = () => {
  const setCurrentPage = () => {};
  const navigate=useNavigate();
  return (
    <div className={style.pub_compls_page}>
      <div className={style.pub_compls}>
        <div className={style.public_complaints_header}>
          <h2>Public Copmlaints</h2>
          <button onClick={()=>{navigate("/report")}}>
            Add Complaint
            <MdAddCircle className={style.addCompl_icon} />
          </button>
        </div>
        <div className={style.search_inp}>
          <input type="text" placeholder="Search" />
          <IoIosSearch className={style.search_icon} />
        </div>
        <div className={style.filter_compl_selects}>
          <select>
            <option value="">Issue Type </option>
            <option value="">Issue Type </option>
            <option value="">Issue Type </option>
          </select>
          <select>
            <option value="">Status </option>
            <option value="">Status </option>
            <option value="">Status </option>
          </select>
          <select>
            <option value="">Date</option>
            <option value="">Date</option>
            <option value="">Date</option>
          </select>
        </div>

        <div className={style.copmlaints}>
          {complaints.map((complaint, index) => {
            return (
              <div key={index} className={style.pub_complaint}>
                <div className={style.complaint_text_content}>
                  <p>Category: {complaint.category}</p>
                  <h3>{complaint.title}</h3>
                  <p>{complaint.body}</p>
                  <div className={style.comlplaint_btns}>
                    <button>View Details</button>
                    <button>{complaint.status}</button>
                  </div>
                </div>
                <img src={complaint.url} />
              </div>
            );
          })}
        </div>
        <Pagination
          NbOfPages={1}
          setCurrentPage={setCurrentPage}
          currentPage={4}
        />
      </div>
    </div>
  );
};

export default PublicComplaints;
