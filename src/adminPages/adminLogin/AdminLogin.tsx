import style from "./adminLogin.module.css";
import img from "../../assets/istockphoto.png";
const AdminLogin = () => {
  return (
    <div className={style.admin_login_page}>
      <div className={style.admin_login_form_con}>
        <div className={style.admin_login_header}>
          <img src={img} alt="Logo" />
          <h1>Municipality of Sawirah</h1>
          <h2>Log in</h2>
        </div>
        <form>
          <div>
            <label htmlFor="email">Your email</label>
            <input id="email" type="email" />
          </div>
          <div>
            <label htmlFor="password">Your password</label>
            <input id="password" type="password" />
          </div>
          <a> Forget your password?</a>
          <button>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
