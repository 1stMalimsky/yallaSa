import React, { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);

const ImageUploadComponent = ({
  indexNumber,
  sendUpFunc,
  handleRemovePhoto,
}) => {
  const [files, setFiles] = useState([]);
  const [base64Data, setBase64Data] = useState(null);

  const handleRemoveClick = () => {
    handleRemovePhoto();
  };
  const getBase64Data = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      callback(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!base64Data) {
      return;
    }
    ///console.log("base64Data", base64Data);
    getBase64Data(base64Data, (base64Data) => {
      sendUpFunc(base64Data, indexNumber);
    });
  }, [base64Data]);
  //console.log("files", files);

  return (
    <div>
      <FilePond
        files={files}
        allowMultiple={false}
        onaddfile={(error, fileItem) => {
          if (error) {
            console.error("Error adding file:", error);
            return;
          }
          //console.log("fileItem", fileItem);

          setBase64Data(fileItem.file);
        }}
        onremovefile={handleRemoveClick}
        onupdatefiles={setFiles}
        instantUpload={false}
        imagePreviewHeight={170}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        acceptedFileTypes={["image/*"]}
      />
    </div>
  );
};

export default ImageUploadComponent;
