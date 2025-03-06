import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import YouthAcademy from '../pages/YouthAcademy';
import AdultLeague from '../pages/AdultLeague';
import PrivateTraining from '../pages/PrivateTraining';
import SummerCamp from '../pages/SummerCamp';
import image1 from '../images/carousel1.jpeg';
import image2 from '../images/adultleague.jpg';
import image3 from '../images/privatetraining.jpg';
import image4 from '../images/carousel3.jpeg';
import image5 from '../images/playersuccess.jpg';




const programs = [
  {
    id: 1,
    title: "Youth Academy Program",
    description: "Master the fundamentals of futsal with our comprehensive youth program. Perfect for ages 7-12, focusing on ball control, passing, and game understanding.",
    features: ["2 sessions per week", "Small group training", "Monthly progress reports"],
    price: 199,
    Link: "/youth-academy",
    Image:image1
  },
  {
    id: 2,
    title: "Adult League ",
    description: "Advanced training for competitive players aged 13-17. Develop technical excellence and tactical awareness through intensive training sessions.",
    features: ["2 sessions per week", "18+ age", "Competitive matches"],
    price: 160,
    Link: "/adult-league",
    Image:image2
  },
  {
    id: 3,
    title: "Private Training",
    description: "Elite program for aspiring professional players. Personalized coaching, advanced tactics, and regular competitive play.",
    features: ["4 sessions per week", "1-on-1 coaching", "Professional pathway guidance"],
    price: 399,
    Link: "/private-training",
    Image:image3

  },
  {
    id: 4,
    title: "Summer Camp",
    description: "Specialized training focusing on all aspects of modern goalkeeping. From basics to advanced techniques.",
    features: ["5 times a week", "Reaction drills", "Group practice"],
    price: 200,
    Link: "/summer-camp",
    Image:image4

  },
  {
    id: 5,
    title: "Player Success Program",
    description: "Intensive 2-week program combining training, matches, and tactical workshops. The ultimate futsal experience.",
    features: ["Mentoring", "Success Plans", "Professional coaching"],
    price: 399,
    Image:image5

  }
];

const ProgramCarousel = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const handleRegisterClick = (programLink) => {
    // Navigate to the program page
    navigate(programLink);
    
    // After navigation, scroll to the options section with smooth behavior
    setTimeout(() => {
      const optionsSection = document.getElementById('program-options');
      if (optionsSection) {
        optionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Small delay to ensure navigation completes
  };

  const addToCart = (program) => {
    setCart([...cart, program]);
    // You would typically integrate with a cart management system here
    alert(`${program.title} added to cart!`);
  };

  return (
    <section className="program-carousel">
      <h2>Our Programs</h2>
      <div className="carousel-container">
        <div className="program-cards">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-image">
                <img src={program.Image} style={{ width: '100%', height: '200px', objectFit: 'cover' }}/>
              </div>
              <div className="program-info">
                <h3>{program.title}</h3>
                <p className="program-description">{program.description}</p>
                <ul className="program-features">
                  {program.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="program-price">${program.price}/month</div>
              
                <button 
                  onClick={() => handleRegisterClick(program.Link)} 
                  className="add-to-cart-btn"
                >
                  Register Now
                </button>

                 
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramCarousel;
