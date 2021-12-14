import { useEffect, useRef, useState } from "react";

export default function ImageCard({
  src,
  alt,
  height,
  width,
  children,
  header = null,
  footer = null,
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
    <div
      className={`p-4 relative overflow-hidden rounded-xl text-white ${className}`}
    >
      <div
        className="w-full h-full absolute top-0 left-0 bg-cover bg-center bg-no-repeat scale-150 pointer-events-none opacity-50 blur"
        style={{
          ...loadStyles,
          backgroundImage,
        }}
      />
      <div className="w-full h-full absolute top-0 left-0 bg-[#0008]" />
      <div className="relative z-10">
        {header}
        <div className="flex flex-col md:flex-row md:items-center">
          <img
            width={width}
            height={height}
            className="mb-2 md:mb-0 mr-4 overflow-hidden flex-shrink-0 rounded-xl shadow-xl"
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
          <div className="w-full overflow-hidden">{children}</div>
        </div>
        {footer}
      </div>
    </div>
  );
}
