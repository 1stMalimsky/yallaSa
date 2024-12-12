import React, { useState } from "react";
import "../../css/AccessibilityWidget.css";

const AccessibilityWidget = () => {
  const [textSize, setTextSize] = useState(16);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [isReadableFont, setIsReadableFont] = useState(false);
  const [animationsPaused, setAnimationsPaused] = useState(false);

  // Update root element's style dynamically
  const updateRootStyle = (property, value) => {
    document.documentElement.style.setProperty(property, value);
  };

  // Handlers
  const handleIncreaseText = () => {
    const newSize = textSize + 2;
    setTextSize(newSize);
    updateRootStyle("font-size", `${newSize}px`);
  };

  const handleDecreaseText = () => {
    const newSize = Math.max(12, textSize - 2); // Prevent size < 12px
    setTextSize(newSize);
    updateRootStyle("font-size", `${newSize}px`);
  };

  const handleResetText = () => {
    setTextSize(16);
    updateRootStyle("font-size", "");
  };

  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.body.classList.toggle("high-contrast", !isHighContrast);
  };

  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
    document.body.classList.toggle("grayscale", !isGrayscale);
  };

  const toggleReadableFont = () => {
    setIsReadableFont(!isReadableFont);
    document.body.classList.toggle("readable-font", !isReadableFont);
  };

  const togglePauseAnimations = () => {
    setAnimationsPaused(!animationsPaused);
    const animationState = animationsPaused ? "running" : "paused";
    updateRootStyle("animation-play-state", animationState);
    updateRootStyle("scroll-behavior", animationsPaused ? "smooth" : "auto");
  };

  return (
    <div className="accessibility-widget">
      <button onClick={handleIncreaseText}>Increase Text</button>
      <button onClick={handleDecreaseText}>Decrease Text</button>
      <button onClick={handleResetText}>Reset Text</button>
      <button onClick={toggleHighContrast}>High Contrast</button>
      <button onClick={toggleGrayscale}>Grayscale</button>
      <button onClick={toggleReadableFont}>Readable Font</button>
      <button onClick={togglePauseAnimations}>Pause Animations</button>
    </div>
  );
};

export default AccessibilityWidget;
