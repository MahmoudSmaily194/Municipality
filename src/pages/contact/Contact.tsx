import style from "./contact.module.css";
import { members } from "../../data/members";
const Contact = () => {
  return (
    <div className={style.contact_page}>
      <div className={style.contact}>
        <div className={style.header}>
          <h1>Contact Us</h1>
          <p>
            We're here to help. Reach out to us with any questions or concerns.
          </p>
        </div>
        <div className={style.general_inquiries}>
          <h3>General Inquiries</h3>
          <p>
            For general inquiries, please contact us using the information
            below:
          </p>
          <div className={style.info}>
            <div className={style.adress}>
              <h5>Address</h5>
              <p>123 Main Street, Willow Creek, CA 91234</p>
            </div>
            <div className={style.phone}>
              <h5>Phone</h5>
              <p>(555) 123-4567</p>
            </div>
            <div className={style.email}>
              <h5>Email</h5>
              <p>info@willowcreektown.gov</p>
            </div>
          </div>
        </div>
        <div className={style.council_members_con}>
          <h3>Council Members</h3>
          
          <div className={style.counsil_members}>
            {members.map((member, index) => {
              return (
                <div key={index} className={style.member}>
                  <img src={member.url} />
                  <h4>{member.name}</h4>
                  <p>{member.position}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
