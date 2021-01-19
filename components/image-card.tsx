import { useEffect, useRef, useState } from "react";
import styles from "./image-card.module.css";

export default function ImageCard({
  src,
  alt,
  height,
  width,
  children,
  className = "",
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current?.complete) setImageLoaded(true);
  }, []);

  const backgroundImage = imageLoaded ? `url(${src})` : null;
  const loadStyles = {
    transition: "opacity var(--transition-duration)",
    opacity: imageLoaded ? null : 0,
  };

  return (
    <div className={`${styles.card} ${className}`}>
      <div
        className={styles.backgroundImage}
        style={{
          ...loadStyles,
          backgroundImage,
        }}
      />
      <div className={styles.backgroundColor} />
      <div className={styles.content}>
        <img
          width={width}
          height={height}
          className={styles.image}
          ref={imageRef}
          src={src}
          alt={alt}
          style={{
            ...loadStyles,
          }}
          onLoad={() => {
            setImageLoaded(true);
          }}
        />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
