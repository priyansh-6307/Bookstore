import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';

// Slide images
const slideImages = [
  {
    url: 'https://www.bookswagon.com/bannerimages/31_inr.jpg?v=2.2',
  },
  {
    url: 'https://www.bookswagon.com/bannerimages/79_inr.jpg?v=2.2',
  },
  {
    url: 'https://www.bookswagon.com/bannerimages/85_inr.jpg?v=2.2',
  },
  {
    url: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1733804657699_spotlight-fearless.png',
  },
];

// Default style for slideshow container
const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '500px', // Default height for large screens
  position: 'relative', // Allow positioning of arrows inside the container
};

// Style for navigation arrows
const arrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10, // Make sure arrows are on top of images
  fontSize: '2rem',
  color: 'white',
  cursor: 'pointer',
};

const Slideshow = () => {
  return (
    <div className="slideshow-container">
      {/* Left Arrow */}
      <div
        style={{
          ...arrowStyle,
          left: '10px', // Position left arrow
        }}
      >
        &lt;
      </div>
      {/* Right Arrow */}
      <div
        style={{
          ...arrowStyle,
          right: '10px', // Position right arrow
        }}
      >
        &gt;
      </div>

      {/* Fade Slideshow */}
      <Fade>
        {slideImages.map((image, index) => (
          <div key={index}>
            <div style={divStyle}>
              <img
                src={image.url}
                alt={`slide-${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain', 
                }}
              />
            </div>
          </div>
        ))}
      </Fade>

      {/* Injecting Media Query for responsiveness */}
      <style>
        {`
          @media (max-width: 768px) {
            .slideshow-container div {
              height: 300px; /* Reduced height for medium devices */
            }
            .slideshow-container img {
              object-fit: contain; /* Ensure image fits without cropping */
              width: 100%; /* Image fills the container */
              height: 100%; /* Ensure the height adapts to the container */
            }
          }
        `}
      </style>
    </div>
  );
};

export default Slideshow;
