import React, { useEffect, useState, useRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import getToken from "./getToken";
import { toast } from "react-toastify";

registerPlugin(FilePondPluginImagePreview);

const ImageUploadComponent = ({
  serverUrl,
  indexNumber,
  sendUpFunc,
  handleRemovePhoto,
  userId,
  uploadTrigger,
  imageTypeName,
}) => {
  const [files, setFiles] = useState([]);
  const [base64Data, setBase64Data] = useState(null);
  const [imageId, setImageId] = useState("");

  const pond = useRef(null);

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

  const onAdd = (file) => {
    console.log("File added", file.fileExtension);
    const fileExtension = file.fileExtension;
    if (!["jpg", "jpeg", "png"].includes(fileExtension.toLowerCase())) {
      toast.error("התמונה חייבת להיות בפורמט תמונה (jpg, jpeg, png)");
      if (pond.current) {
        pond.current.removeFile(file.id);
      }
      return false; // Stop further processing
    }
  };

  const uploadFiles = () => {
    if (!uploadTrigger) {
      return;
    }
    const fileToUpload = pond.current.getFiles();

    if (fileToUpload.length === 0) {
      return;
    } else {
      pond.current.processFile(fileToUpload.file);
    }
  };

  useEffect(() => {
    if (uploadTrigger) {
      console.log("trigger true");
      uploadFiles();
    }
  }, [uploadTrigger]);

  useEffect(() => {
    if (!base64Data) {
      return;
    }
    ///console.log("base64Data", base64Data);
    getBase64Data(base64Data, (base64Data) => {
      sendUpFunc(base64Data, indexNumber);
    });
  }, [base64Data]);

  return (
    <div>
      <FilePond
        onaddfilestart={onAdd}
        ref={pond}
        name={imageTypeName}
        files={files}
        server={{
          url: serverUrl,
          process: {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
            onload: async (response) => {
              const updatedUserDetails = await axios.get(`/users/${userId}`);
              if (!updatedUserDetails) return console.log("no user details");
              let resp = JSON.parse(response);
              //console.log("upload commplete", imageTypeName);
              //console.log("FilePond resp/_id", resp._id);

              setImageId(resp._id);
              return resp._id;
            },
            onerror: (error) => {
              console.error("Error during upload:", error);
              toast.error(
                "התמונה לא הועלתה",
                error.response.data.message || error
              );
            },
            onprogress: (progress) => {
              console.log(`Upload progress: ${progress}%`);
            },
          },
          revert: async (error) => {
            console.log("deleteAttempt");
            if (!imageId) {
              console.log("no image id");
            }

            try {
              console.log("deleting type", imageTypeName);

              const deleteTry = await axios.delete(
                `/images/removeimage/${imageTypeName}/${userId}/${imageId}`,
                {
                  headers: {
                    "x-auth-token": localStorage.getItem("token"),
                  },
                }
              );
            } catch (err) {
              console.error("Error deleting file:", err);
              error("Failed to delete file");
            }
          },
        }}
        allowMultiple={false}
        onaddfile={(error, fileItem) => {
          if (error) {
            console.error("Error adding file:", error);
            return;
          }
          console.log("trigger", uploadTrigger);

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
