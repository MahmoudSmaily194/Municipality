import type { FC } from "react";
import style from "./uploade_image.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import { useRef, useCallback, useEffect, useMemo, useState } from "react";

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
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image.");
        return;
      }
      setUploadImage(file);
    },
    [setUploadImage]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
        e.target.value = ""; // ✅ Reset input to allow selecting the same file again
      }
    },
    [handleFile]
  );

  const handleDeleteClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation(); // ✅ Prevent file dialog from opening
      setDeleteDialog(true);
    },
    [setDeleteDialog]
  );

  const imagePreviewUrl = useMemo(() => {
    return uploadImage ? URL.createObjectURL(uploadImage) : null;
  }, [uploadImage]);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  return (
    <div
      className={`${style.news_upload_image} ${dragging ? style.dragging : ""}`}
      role="button"
      tabIndex={0}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => {
        if (!uploadImage) {
          fileInputRef.current?.click(); // ✅ Only open dialog if no image is selected
        }
      }}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !uploadImage) {
          fileInputRef.current?.click();
        }
      }}
    >
      {uploadImage && imagePreviewUrl ? (
        <div className={style.image_cont}>
          <div onClick={handleDeleteClick}>
            <TiDeleteOutline className={style.x_icon} />
          </div>
          <img
            className={style.uploaded_img}
            src={imagePreviewUrl}
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
