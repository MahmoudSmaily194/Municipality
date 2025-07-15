import style from "./contactform.module.css";
const ContactForm = () => {
  return (
    <div className={style.contact_con}>
        <div className={style.container}>
      <div className={style.black_bg}>
        <div className={style.text_content}>
          <h1>Contact us for more information</h1>
          <p>
            Have a question or need assistance? We're here to help with
            services, permits, and local info. Contact us by phone, email, or
            visit in person. Your input helps us serve you better.
          </p>
        </div>
          
      </div>
      <div className={style.form_con}>
        <form action="#">
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Mobile Number " />
          <input type="text" placeholder="Email" />
          <textarea placeholder="Message" />
          <div className={style.chech_box_con}>
            <input type="checkbox" id="checkbox" />
            <p>
              Accept <a>Terms And Conditions</a>
            </p>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;
