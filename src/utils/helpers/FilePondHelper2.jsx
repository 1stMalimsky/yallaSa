import React, { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";

registerPlugin(FilePondPluginImagePreview);

const ImageUploadComponent = ({
  indexNumber,
  sendUpFunc,
  handleRemovePhoto,
  uploadTrigger,
  serverUrl,
  allowMultiple,
  maxFiles,
  fileType,
  onUploadComplete,
  userDetails,
}) => {
  const [files, setFiles] = useState([]);
  const [base64Data, setBase64Data] = useState(null);
  const [isUpload, setIsUpload] = useState(false);

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
        server={{
          url: serverUrl,
          process: {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
            onload: async (response) => {
              const updatedUserDetails = await axios.get(
                `/users/${userDetails._id}`
              );
              if (!updatedUserDetails) return console.log("no user details");
              onUploadComplete(response);
            },
            onerror: (error) => {
              console.error("Error uploading file:", error);
              onUploadComplete(false);
            },
            onprogress: (progress) =>
              console.log(`Upload progress: ${progress}%`),
          },
          revert: (source, load, error) => {
            axios
              .patch(`images/resetlicense/${userDetails._id}`, {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              })
              .then((response) => {
                console.log("File deleted successfully", response.data);
                load();
                // Notify FilePond of successful deletion
              })
              .catch((err) => {
                console.error("Error deleting file:", err);
                error("Failed to delete file");
              });
          },
        }}
        allowMultiple={allowMultiple}
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
