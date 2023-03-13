import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

const WithImageTransition = (WrappedComponent) => {
  const InsideComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [opacity, setOpacity] = useState(0);
    const [imageSrc, setImageSrc] = useState("");

    const handleLoad = () => {
      setIsLoading(false);
      setOpacity(1);
    };

    const handleTransitionEnd = () => {
      setTimeout(() => {
        setImageSrc(props.src);
        setIsLoading(true);
        setOpacity(0);
      }, 100);
    };

    return (
      <>
        {!isLoading && (
          <img
            key={props.src}
            src={imageSrc}
            alt={props.alt}
            style={{
              opacity: opacity,
              transition: "opacity 0.5s ease-in-out",
              width: "100%",
              maxWidth: "500px",
              height: "100%",
              filter: `drop-shadow(7px 7px 0px ${props.colorType1}) drop-shadow(-7px -7px 0px ${props.colorType2})`,
            }}
            onLoad={handleLoad}
            onTransitionEnd={handleTransitionEnd}
          />
        )}
        <WrappedComponent {...props} effect="opacity" />
      </>
    );
  };

  return InsideComponent;
};

const LazyLoadImageWithTransition = WithImageTransition(LazyLoadImage);

export default LazyLoadImageWithTransition;
