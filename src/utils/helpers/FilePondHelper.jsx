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
  const pondRef = useRef(null);

  useEffect(() => {
    if (userDetails.license.path) {
      setIsLicense(true);
    } else setIsLicense(false);
  }, [userDetails]);

  const handleUploadClick = () => {
    if (pondRef.current) {
      pondRef.current.processFiles();
      setIsLicense(true);
      return true;
    } else {
      setIsLicense(false);
      return false;
    }
  };

  const handleDeleteClick = async () => {
    try {
      const userToUpdate = {
        ...userDetails,
        license: {
          filename: "",
          path: "",
          contentType: "",
        },
      };
      await axios.patch(`/users/update/${userDetails._id}`, userToUpdate);
      toast.error("הרישיון נמחק בהצלחה");
    } catch (err) {
      console.log("handleDelete error", err);
    }
  };
  return (
    <div>
      <FilePond
        ref={pondRef}
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        debug={true}
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
        name={fileType}
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
          onClick={handleDeleteClick}
          sx={{ width: 250 }}
        >
          הסר
        </Button>
      </Box>
    </div>
  );
};

export default FilePondHelper;
