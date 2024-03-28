import React, { useState, useEffect } from 'react';
import { getImageById } from '../../services/patient.service';
import './image.scss'

const ImageComponent = ({ userId}: { userId: string }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const imageBlob = await getImageById(userId); //Calling the server to get the appropriate image for the user
        const imageUrl = URL.createObjectURL(imageBlob); // Create image URL
        setImageSrc(imageUrl); //Update the local variable of the image
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    fetchData(); // Initial call to the server when loading the component

// Clean up the resources when the image is finished displaying
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [userId]); // Activating useEffect when the user ID variable changes

  if (!imageSrc) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={imageSrc} alt="patientProfile" className="image" />
    </div>
  );
};

export default ImageComponent;