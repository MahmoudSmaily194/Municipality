import style from "./IssueTypeModal.module.css";
import { BiSolidTrash } from "react-icons/bi";

const IssueTypeModal = () => {
  return (
    <div className={style.issueTypeModal_page_con}>
      <div className={style.issueTypeModal_page}>
        <div className={style.issueTypeModal_header}>
          <h1>Add Issue Type</h1>
        </div>

        <div className={style.issueTypeModal_body}>
          <div className={style.issueTypeModal_inpts}>
            <label htmlFor="title">Issue Type</label>
            <div>
              <input
                type="text"
                placeholder="Please add Issue Type"
                id="title"
              />
              <button>Add</button>
            </div>
          </div>
          <div className={style.issueTypeModal_issues}>
            <h4>Issues</h4>
            <div className={style.issueTypeModal_issue}>
              <div>
                <p>Damaged Roads</p>
              </div>
              <BiSolidTrash className={style.issueTypeModal_trash_icon} />
            </div>
            <div className={style.issueTypeModal_issue}>
              <div>
                <p>Damaged Roads</p>
              </div>
              <BiSolidTrash className={style.issueTypeModal_trash_icon} />
            </div>
            <div className={style.issueTypeModal_issue}>
              <div>
                <p>Damaged Roads</p>
              </div>
              <BiSolidTrash className={style.issueTypeModal_trash_icon} />
            </div>
            <div className={style.issueTypeModal_issue}>
              <div>
                <p>Damaged Roads</p>
              </div>
              <BiSolidTrash className={style.issueTypeModal_trash_icon} />
            </div>
            <div className={style.issueTypeModal_issue}>
              <div>
                <p>Damaged Roads</p>
              </div>
              <BiSolidTrash className={style.issueTypeModal_trash_icon} />
            </div>
            <div className={style.issueTypeModal_issue}>
              <div>
                <p>Damaged Roads</p>
              </div>
              <BiSolidTrash className={style.issueTypeModal_trash_icon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueTypeModal;
