import { useState } from "react";
import LocationSelector from "../../components/municipalityMap/LocationSelector";
import style from "./report.module.css";
const Report = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const hanldeUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };
  const handleSaveLocation = (coords: [number, number]) => {
    console.log(coords);
  };
  const handleSubmit =( e: React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();

















setUploadedImage(null);
  }
  return (
    <div className={style.report_page_con}>
      <div className={style.report_page}>
        <h1>Report an Issue</h1>
        <div className={style.report_form}>
          <form   onSubmit={ (e)=>{handleSubmit(e) }}>
            <div className={style.name_phoNb_inpts}>
              <div>
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Please write your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNb">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  required
                  placeholder="Enter your phone nb"
                />
              </div>
            </div>
            <label htmlFor="issueType">Issue Type</label>
            <select id="issueType">
              <option value="">kjaoiduq</option>
              <option value="">djksaufd</option>
              <option value="">ahfiqwe</option>
            </select>
            <label htmlFor="description">Description</label>
            <textarea id="description" />
            <div className={style.uploadImg_con}>
              {uploadedImage ? (
                <img
                  className={style.uploaded_img}
                  src={URL.createObjectURL(uploadedImage)}
                />
              ) : (
                <>
                
                  <h4>Upload Photo</h4>
                  <p>Add a photo to help us understand the issue better.</p>
                  <label htmlFor="upload" className={style.upload_photo}>
                    Upload Photo
                  </label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.tiff,.heif,.heic,.raw,.cr2,.nef,.arw,.jp2,.jpf"
                    hidden
                    id="upload"
                    onChange={(e) => {
                      hanldeUploadImage(e);
                    }}
                  />
                </>
              )}
            </div>
            <LocationSelector onSave={handleSaveLocation} />
            <button type="submit">Submit Report</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Report;
