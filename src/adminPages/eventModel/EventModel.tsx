import { useState } from "react";
import UploadPhoto from "../../components/uploadePhoto/UploadPhoto";
import style from "./eventModel.module.css";
import DeleteDialog from "../../components/deleteDialog/DeleteDialog";
const EventModel = () => {
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [delteDialog, setDeleteDialog] = useState(false);
  return (
    <>
      <div className={style.eventModel_page}>
        <div className={style.eventModel}>
          <div className={style.eventModel_header}>
            <h1>Add new Event</h1>
          </div>
          <div className={style.eventModel_form_con}>
            <form>
              <div className={style.eventModel_inpts_con}>
                <div className={style.eventModel_form_title_date_inpts}>
                  <div>
                    <label htmlFor="tite">Title</label>
                    <input id="title" type="text" placeholder="Enter title" />
                  </div>
                  <div>
                    <label htmlFor="date">Date and time</label>
                    <input
                      style={{
                        paddingRight: "0.4rem",
                        width: "calc(100% - 1.4rem)",
                      }}
                      type="date"
                    />
                  </div>
                </div>
                <label htmlFor="descri">Description</label>
                <textarea id="descri" />
                <label htmlFor="loca">Location</label>
                <input id="loca" type="text" placeholder="Event  Location" />
                <div className={style.eventModel_upload_photo}>
                  <UploadPhoto
                    setUploadImage={setUploadImage}
                    uploadImage={uploadImage}
                    setDeleteDialog={setDeleteDialog}
                  />
                </div>
                <div className=""></div>
              </div>
              <div className={style.eventModel_form_btns}>
                <button className={style.eventModel_addEvent_btn}>
                  Add Event
                </button>
                <button>Close</button>
              </div>
            </form>
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

export default EventModel;
