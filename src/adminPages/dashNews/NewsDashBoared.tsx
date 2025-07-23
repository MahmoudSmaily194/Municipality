import { useState } from "react";
import UploadPhoto from "../../components/uploadePhoto/UploadPhoto";
import style from "./news_dashboard.module.css";
import DeleteDialog from "../../components/deleteDialog/DeleteDialog";
const NewsDashBoared = () => {
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [delteDialog, setDeleteDialog] = useState(false);
  return (
    <>
      <div className={style.news_dashboard_page_con}>
        <div className={style.news_dashboard_page}>
          <h1>News</h1>
          <div className={style.news_table_con}>
            <table className={style.news_table}>
              <tr>
                <th>Title</th> <th>Date</th> <th>Visibility</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td style={{ color: "black" }}>Local Park Expansion</td>
                <td>2024-03-15</td>
                <td>
                  <button>Public</button>
                </td>
                <td>
                  <div>
                    <p>Edit</p>
                    <p>|</p>
                    <p>Delete</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ color: "black" }}>Local Park Expansion</td>{" "}
                <td>2024-03-15</td>
                <td>
                  <button>Public</button>
                </td>
                <td>
                  <div>
                    <p>Edit</p>
                    <p>|</p>
                    <p>Delete</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ color: "black" }}>Local Park Expansion</td>
                <td>2024-03-15</td>
                <td>
                  <button>Public</button>
                </td>
                <td>
                  <div>
                    <p>Edit</p>
                    <p>|</p>
                    <p>Delete</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={style.AddNews_Con}>
          <div className={style.AddNews}>
            <h1>Add News</h1>
            <input type="text" placeholder="Title" />
            <textarea />
            <div className={style.visibility_con}>
              <p>Visibility</p>
              <input className={style.checkbox} type="checkbox" />
            </div>

            <UploadPhoto
              setUploadImage={setUploadImage}
              uploadImage={uploadImage}
              setDeleteDialog={setDeleteDialog}
            />
            <button className={style.publish_news}>Publish</button>
          </div>
        </div>
      </div>
      {delteDialog && (
        <DeleteDialog
          setDeleteUploadedImage={setDeleteDialog}
          setUploadedImage={setUploadImage}
        />
      )}
    </>
  );
};

export default NewsDashBoared;
