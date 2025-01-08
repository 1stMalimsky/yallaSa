import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

const ImageGalleryComponent = ({ images }) => {
  const [normalizedData, setNormalizedData] = useState([]);

  const normalizeImages = (imageData) => {
    const normalizedData = imageData.map((image) => {
      const originalUrl = image.base64Data;
      const thumbnailUrl = originalUrl;
      return {
        original: originalUrl,
        thumbnail: thumbnailUrl,
        description: image.fileName,
      };
    });
    setNormalizedData(normalizedData);
  };
  //console.log("normalizeImages", normalizedData);

  useEffect(() => {
    if (!images) return;
    normalizeImages(images);
  }, [images]);

  const renderLeftNav = (onClick, disabled) => (
    <button
      className="image-gallery-custom-left-nav"
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      ◀
    </button>
  );

  const renderRightNav = (onClick, disabled) => (
    <button
      className="image-gallery-custom-right-nav"
      disabled={disabled}
      onClick={onClick}
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        zIndex: 1,
      }}
    >
      ▶
    </button>
  );
  const renderItem = (item) => (
    <img
      src={item.original}
      alt={item.description}
      style={{ height: "250px", width: "auto", objectFit: "cover" }}
    />
  );

  return (
    <ImageGallery
      showPlayButton={false}
      showThumbnails={false}
      isRTL={true}
      items={normalizedData.filter((item) => item.original !== "")}
      renderItem={renderItem}
      showFullscreenButton={false}
      /*  renderLeftNav={renderLeftNav}
      renderRightNav={renderRightNav} */
    />
  );
};

export default ImageGalleryComponent;
