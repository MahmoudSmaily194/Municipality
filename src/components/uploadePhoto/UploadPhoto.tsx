import type { FC } from "react";
import style from "./uploade_image.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import { useRef } from "react";

type Props = {
  setUploadImage: React.Dispatch<React.SetStateAction<File | null>>;
  uploadImage: File | null;
  setDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadPhoto: FC<Props> = ({
  setUploadImage,
  uploadImage,
  setDeleteDialog,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }
    setUploadImage(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={style.news_upload_image}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
    >
      {uploadImage ? (
        <div className={style.image_cont}>
          <div
            onClick={(e) => {
              e.stopPropagation(); // لتجنب فتح الملف عند الضغط على X
              setDeleteDialog(true);
            }}
          >
            <TiDeleteOutline className={style.x_icon} />
          </div>
          <img
            className={style.uploaded_img}
            src={URL.createObjectURL(uploadImage)}
            alt="Uploaded Preview"
          />
        </div>
      ) : (
        <>
          <h3>Upload Image</h3>
          <p>Drag and drop or browse to upload</p>
          <label htmlFor="file">Upload</label>
          <input
            type="file"
            accept="image/*"
            hidden
            id="file"
            ref={fileInputRef}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
};

export default UploadPhoto;


