// components/LazyImage.tsx
import { useEffect, useRef, useState } from "react";
import placeholderImg from "../assets/Placeholder.png";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  style,
}) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (imgRef.current) observer.unobserve(imgRef.current);
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* صورة placeholder تظهر قبل تحميل الصورة الحقيقية */}
      {!loaded && (
        <img
          src={placeholderImg}
          alt="placeholder"
          style={{
            width: "100%",
            height: "100%",
            filter: "blur(10px)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}

      {/* الصورة الحقيقية */}
      <img
        ref={imgRef}
        src={isVisible ? src : undefined}
        alt={alt}
        loading="lazy" // تحسين التحميل الكسول الافتراضي للمتصفح
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          position: "relative",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default LazyImage;
