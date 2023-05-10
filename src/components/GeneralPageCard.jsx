// Importing necessary dependencies
import { useEffect, useState, useRef } from "react";
import PostPreviewCol from "./widgets/postPreview/PostPreviewCol";



const GeneralPageCard = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    /* Setting up intersection observer to
    detect when the component is
    visible in the viewport */
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(cardRef.current);
          }
        }, { threshold: 0.20 });
    
        if (cardRef.current) {
          observer.observe(cardRef.current);
        }
    
        return () => {
          if (cardRef.current) {
            observer.unobserve(cardRef.current);
          }
        };
      }, []);



     
      /* Creating a dynamic class name based on the isVisible state */
      /* Rendering the component with the PostPreviewCol component as a child */
      return (
        <div ref={cardRef} className={`general-card ${isVisible ? "general-card--visible" : ""}`}>
            <PostPreviewCol hideDescription={true} {...{post:props}}/>
        </div>
    )
}

export default GeneralPageCard