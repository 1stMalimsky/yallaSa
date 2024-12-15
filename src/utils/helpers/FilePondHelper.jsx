import { useState, useRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Button } from "@mui/material";

registerPlugin(FilePondPluginImagePreview);

const FilePondHelper = ({ serverUrl, allowMultiple, maxFiles, fileType }) => {
  const [files, setFiles] = useState([]);
  const pondRef = useRef(null);

  const handleUploadClick = () => {
    if (pondRef.current) {
      pondRef.current.processFiles();
    }
  };
  return (
    <div>
      <FilePond
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
            onload: (response) => console.log("File uploaded", response),
            onerror: (error) => console.error("Error uploading", error),
            onprogress: (progress) => console.log("Upload progress", progress),
          },
        }}
        name={fileType}
        instantUpload={false}
        labelIdle='גרור ושחרר תמונה כאן או <span class="filepond--label-action">בחר קובץ</span>'
      />
      <Button variant="contained" onClick={handleUploadClick}>
        העלה תמונה
      </Button>
    </div>
  );
};

export default FilePondHelper;
