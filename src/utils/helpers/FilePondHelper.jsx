import { useState, useRef, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Button, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

registerPlugin(FilePondPluginImagePreview);

const FilePondHelper = ({
  serverUrl,
  allowMultiple,
  maxFiles,
  fileType,
  onUploadComplete,
  userDetails,
}) => {
  const [files, setFiles] = useState([]);
  const [isLicense, setIsLicense] = useState(false);
  const [imageId, setImageId] = useState("");

  const pondRef = useRef(null);

  useEffect(() => {
    if (userDetails.license.path) {
      setIsLicense(true);
    } else setIsLicense(false);
  }, [userDetails]);

  const handleUploadClick = () => {
    if (pondRef.current && !isLicense) {
      pondRef.current.processFiles();
      setIsLicense(true);
      //return true;
    } else {
      setIsLicense(false);
      //return false;
    }
  };

  const handleDeleteClick = (imageId) => {
    if (!imageId) {
      return console.log("no ImageId to delete");
    }
    if (!pondRef) {
      return console.log("no pondRef");
    }
    if (pondRef.current) {
      pondRef.current.removeFile(imageId);
    }
  };

  //console.log("userDetails", userDetails);

  return (
    <div>
      <FilePond
        ref={pondRef}
        files={files}
        name={fileType}
        onupdatefiles={setFiles}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        server={{
          url: serverUrl,
          process: {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
            onload: async (response) => {
              try {
                const foundUser = await axios.get(
                  `/users/${userDetails.userId}`
                );
                if (!foundUser) {
                  console.log("no user details");
                  return;
                }
                setImageId(response._id); // Assuming the response contains an _id field
                onUploadComplete(response);
              } catch (error) {
                console.error("Error processing uploaded file:", error);
                onUploadComplete(false);
              }
            },
            onerror: (error) => {
              console.error("Error uploading file:", error);
              onUploadComplete(false);
            },
            onprogress: (progress) => {
              console.log(`Upload progress: ${progress}%`);
            },
          },
          revert: async (load, error) => {
            ///console.log("load in helper", load);
            console.log("imageId", imageId);

            try {
              const deleteFile = await axios.delete(
                `images/deletelicense/${userDetails.userId}/${imageId}`,
                {
                  headers: {
                    "x-auth-token": localStorage.getItem("token"),
                  },
                }
              );

              //load(); // This function must be called to signal that the revert has been processed
            } catch (err) {
              console.error("Filepond revert error", err);
              error("Failed to delete file");
            }
          },
        }}
        instantUpload={false}
        labelIdle='גרור ושחרר תמונה כאן או <span class="filepond--label-action">בחר קובץ</span>'
      />
      <Box
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleUploadClick}
          sx={{ ml: 2, width: 250 }}
        >
          העלה תמונה
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={isLicense ? false : true}
          onClick={() => handleDeleteClick(imageId)}
          sx={{ width: 250 }}
        >
          הסר
        </Button>
      </Box>
    </div>
  );
};

export default FilePondHelper;
