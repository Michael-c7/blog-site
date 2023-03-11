import { useEffect, useState, useRef } from 'react';
import PostPreviewCol from './widgets/postPreview/PostPreviewCol';



const GeneralPageCard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

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

      const cardClassName = `general-card ${isVisible ? 'general-card--visible' : ''}`;
      
      return (
        <div ref={cardRef} className={cardClassName}>
            <PostPreviewCol hideDescription={true}/>
        </div>
    )
}

export default GeneralPageCard