import { useEffect, useRef, useState } from "react";
import styles from "./imageCarousel.module.css";
import img1 from "../../../assets/carousel.jpg";
import img2 from "../../../assets/Carousel2.jpg";
import img3 from "../../../assets/carousel3.png";
import img4 from "../../../assets/carousel4.jpg";
import img5 from "../../../assets/carousel5.jpg";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
const images = [img1, img2, img3, img4, img5];

const ImageCarousel = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(2);
  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev == 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev == images.length - 1 ? 0 : prev + 1));
  };
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const mapImages = () => {
    return images.map((src, index) => {
      let className = styles.image;

      if (index === currentIndex) {
        className += ` ${styles.active}`;
      } else if (index === (currentIndex - 1 + images.length) % images.length) {
        className += ` ${styles.leftImage}`;
      } else if (index === (currentIndex - 2 + images.length) % images.length) {
        className += ` ${styles.leftFarImage}`;
      } else if (index === (currentIndex + 1) % images.length) {
        className += ` ${styles.rightImage}`;
      } else if (index === (currentIndex + 2) % images.length) {
        className += ` ${styles.rightFarImage}`;
      }

      return (
        <div
          className={className}
          key={index}
          style={{ backgroundImage: `url(${src})` }}
        />
      );
    });
  };
  return (
    <div className={styles.carouselWrapper}>
      <h2>Explore Our Town</h2>
      <div className={styles.carousel}>
        <div
          className={styles.carouselImages}
          onMouseEnter={stopAutoSlide}
          onMouseLeave={startAutoSlide}
        >
          {mapImages()}
        </div>
        <div className={styles.dots}>
          <FaAngleLeft onClick={goToPrev} className={styles.arrow} />
          {images.map((_, index) => (
            <span
              key={index}
              className={
                index === currentIndex
                  ? `${styles.dot} ${styles.active}`
                  : styles.dot
              }
              onClick={() => goToIndex(index)}
            />
          ))}
          <FaAngleRight onClick={goToNext} className={styles.arrow} />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
