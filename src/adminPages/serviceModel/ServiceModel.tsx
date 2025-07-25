import { useState } from "react";
import DeleteDialog from "../../components/deleteDialog/DeleteDialog";
import UploadPhoto from "../../components/uploadePhoto/UploadPhoto";
import style from "./serviceModel.module.css";
const ServiceModel = () => {
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [delteDialog, setDeleteDialog] = useState(false);
  return (
    <>
      <div className={style.serviceModel_page}>
        <div className={style.serviceModel}>
          <div className={style.serviceModel_header}>
            <h1>Add new Service</h1>
          </div>
          <div className={style.serviceModel_form_con}>
            <form>
              <div className={style.serviceModel_inpts_con}>
                <label htmlFor="tite">Service name</label>
                <input id="title" type="text" placeholder="Enter Service name" />

                <label htmlFor="descri">Description</label>
                <textarea id="descri" />
                <label htmlFor="categ">Category</label>
                <select id="categ">
                  <option value="">sdrwer</option>
                  <option value="">sdrwer</option>
                  <option value="">sdrwer</option>
                </select>
                <div className={style.serviceModel_status_btns}>
                    <button>Active</button>
                    <button>Inactive</button>
                </div>
                <div className={style.serviceModel_upload_photo}>
                  <UploadPhoto
                    setUploadImage={setUploadImage}
                    uploadImage={uploadImage}
                    setDeleteDialog={setDeleteDialog}
                  />
                </div>
              </div>
              <div className={style.serviceModel_form_btns}>
                <button className={style.serviceModel_addService_btn}>
                  Add Service
                </button>
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

export default ServiceModel;
