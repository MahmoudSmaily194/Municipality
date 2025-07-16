import style from "./services.module.css";
import { IoMdSearch } from "react-icons/io";
import sur1 from "../../assets/services1.png";
import sur2 from "../../assets/services2.png";
import sur3 from "../../assets/services3.png";
import sur4 from "../../assets/services4.png";
import sur5 from "../../assets//survices5.png";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const services = () => {
  const services = [
    {
      url: sur1,
      title: "Report a Pothole",
      details: "Report potholes on city streets for repair.",
    },
    {
      url: sur2,
      title: "Apply for a Building Permit",
      details:
        "Apply for building permits for construction or renovation projects.",
    },
    {
      url: sur3,
      title: "Pay Property Taxes",
      details: `Pay your property taxes online or in person. `,
    },
    {
      url: sur4,
      title: "Register for a Recreation Program",
      details: "Register for various recreation programs offered by the city.",
    },
    {
      url: sur5,
      title: "Request a Bulk Item Pickup",
      details:
        "Schedule a pickup for large items not covered by regular trash service.",
    },
    {
      url: sur1,
      title: "View Zoning Regulations",
      details: "View zoning regulations for different areas of the city.",
    },
    {
      url: sur2,
      title: "Access Financial Reports",
      details: "Access financial reports and budget information.",
    },
    {
      url: sur3,
      title: "Reserve a Park Facility",
      details: "Reserve facilities at city parks for events or gatherings.",
    },
    {
      url: sur4,
      title: "Submit a Service Request",
      details: "Submit service requests for various issues or concerns.",
    },
    {
      url: sur5,
      title: "Check Permit Status",
      details: "Check the status of your permit applications.",
    },
    {
      url: sur1,
      title: "Manage Utility Payments",
      details: "Manage your utility payments online.",
    },
    {
      url: sur2,
      title: "Explore Community Events",
      details: "Explore and register for community events and activities.",
    },
  ];
  const pages = [1, 2, 3, 4, 5];
  return (
    <div className={style.serv_page_con}>
      <div className={style.serv_page}>
        <div className={style.serv_page_title}>
          <h1>City Services</h1>
        </div>

        <div className={style.services_con}>
          <div className={style.filter_con}>
            <ul>
              <li>All Services</li> <li>Public Works</li> <li>Permits</li>
              <li>Finance</li> <li>Parks & Recreation</li>
            </ul>
            <select name="" id="">
              <option value="">All Services</option>
              <option value="">Public Works</option>
              <option value="">Permits</option>
              <option value="">Finance</option>
              <option value="">Parks & Recreation</option>
            </select>
            <div className={style.search_inp}>
              <IoMdSearch className={style.search_icon} /> <input type="text" />
            </div>
          </div>
          <div className={style.services}>
            {services.map((service, index) => {
              return (
                <div key={index} className={style.service}>
                  <img src={service.url} alt={service.url} />
                  <div className={style.serv_body}>
                    <h4>{service.title}</h4>
                    <p>{service.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={style.pagination_cont}>
            <div className={style.left_pag}>
              <FaAngleLeft className={style.pag_arrow} />
            </div>

            <div className={style.pag_page}>
              <p>1</p>
            </div>
            <div className={style.pag_page}>
              <p>2</p>
            </div>
            <div className={style.pag_dots}>
              <p>
                .&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;&nbsp;.
              </p>
            </div>
            <div className={style.pag_page}>
              <p>{pages.length - 2}</p>
            </div>
            <div className={style.pag_page}>
              <p>{pages.length - 1}</p>
            </div>
            <div className={style.right_pag}>
              <FaAngleRight className={style.pag_arrow} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default services;
