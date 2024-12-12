import { useState } from "react";
import ImageGallery from "react-image-gallery";

const CaravanCardGallery = ({ caravanImgs, handleImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  return (
    <ImageGallery
      showPlayButton={false}
      showThumbnails={false}
      isRTL={true}
      items={caravanImgs}
      showFullscreenButton={false}
      onSlide={(index) => setCurrentIndex(index)} // Track the current index
      onClick={() => handleImageClick(currentIndex)} // Pass the current index when clicked
      renderItem={(item) => (
        <div className="image-gallery-custom-image-wrapper">
          <img
            src={item.thumbnail}
            alt={item.description}
            onClick={() => handleImageClick(currentIndex)}
            style={{
              width: "100%",
              /* height: isFullScreen.current ? "100%" : "250px", */
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
        </div>
      )}
      renderLeftNav={renderLeftNav}
      renderRightNav={renderRightNav}
    />
  );
};

export default CaravanCardGallery;
