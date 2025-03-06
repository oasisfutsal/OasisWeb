import React, { useRef } from 'react';
import styles from './Staff.module.css';
import antoine from '../images/Antoine.jpg'
import marcus from '../images/marcus.jpeg'
import Yiffrank from '../images/yifrank.jpeg'
import Miguel from '../images/miguel.jpg'
const Staff = () => {
  const businessScrollRef = useRef(null);
  const coachesScrollRef = useRef(null);

  const businessStaff = [
    {
      id: 1,
      name: "Antoine Esbar",
      role: "Founder",
      bio: "Former professional player with 15 years of sports management experience. Leading our vision of revolutionizing futsal training.",
      icon: "👩‍💼",
      stats: [
        { value: "10+", label: "Years Experience" },
        { value: "MBA", label: "Sports Management" }
      ],
      picture: antoine,
    },
    {
      id: 2,
      name: "Marcus Martin",
      role: "Operations Director",
      bio: "Specialized in sports facility management and program development. Ensuring smooth operations across all locations.",
      icon: "👨‍💼",
      stats: [
        { value: "2+", label: "Years Experience" },
        { value: "4+", label: "Facilities Managed" }
      ],
      picture: marcus,

    },
    {
      id: 3,
      name: "Yiffrank Gonzalez",
      role: "Marketing Director",
      bio: "Digital marketing expert with a passion for sports. Creating innovative strategies to grow our futsal community.",
      icon: "👩‍💻",
      stats: [
        { value: "2+", label: "Years Experience" },
        { value: "25+", label: "Campaigns Led" }
      ],
      picture: Yiffrank,

    },
    {
      id: 4,
      name: "Miguel Restrepo",
      role: "Technology Director",
      bio: "Chartered accountant with extensive experience in sports business. Managing growth and sustainability of our programs.",
      icon: "👨‍💼",
      stats: [
        { value: "3+", label: "Years Experience" },
        { value: "Computer Science", label: "Bachelors of Science" }
      ],
      picture: Miguel,

    }
  ];

  const coaches = [
    {
      id: 1,
      name: "Carlos Santos",
      role: "Head Coach",
      bio: "Former Brazilian national team player with UEFA A License. Specializing in technical skill development and tactical awareness.",
      icon: "⚽",
      stats: [
        { value: "20+", label: "Years Experience" },
        { value: "150+", label: "Players Developed" }
      ]
    },
    {
      id: 2,
      name: "Maria Torres",
      role: "Youth Development Coach",
      bio: "Youth development specialist with focus on foundational skills. Creating future stars through structured progression.",
      icon: "🥅",
      stats: [
        { value: "12+", label: "Years Experience" },
        { value: "UEFA B", label: "License" }
      ]
    },
    {
      id: 3,
      name: "Alex Thompson",
      role: "Performance Coach",
      bio: "Sports science expert specializing in athletic development. Implementing cutting-edge training methodologies.",
      icon: "🏃‍♂️",
      stats: [
        { value: "10+", label: "Years Experience" },
        { value: "MSc", label: "Sports Science" }
      ]
    },
    {
      id: 4,
      name: "Lucas Silva",
      role: "Technical Coach",
      bio: "Former professional with expertise in individual skill development. Mastering the technical aspects of futsal.",
      icon: "⚽",
      stats: [
        { value: "15+", label: "Years Experience" },
        { value: "100+", label: "Players Coached" }
      ]
    }
  ];

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 340; // card width + gap
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderStaffSection = (title, staff, scrollRef) => (
    <div className={styles.staffCategory}>
      <div className={styles.categoryHeader}>
        <h3 className={styles.categoryTitle}>{title}</h3>
        <div className={styles.scrollButtons}>
          <button 
            className={styles.scrollButton}
            onClick={() => scroll(scrollRef, 'left')}
          >
            ←
          </button>
          <button 
            className={styles.scrollButton}
            onClick={() => scroll(scrollRef, 'right')}
          >
            →
          </button>
        </div>
      </div>
      <div className={styles.scrollContainer} ref={scrollRef}>
        <div className={styles.staffGrid}>
          {staff.map(member => (
            <div key={member.id} className={styles.staffCard}>
              <div className={styles.staffImage}>
               <img src={member.picture} alt={member.name} className={styles.memberPicture}/> 
              </div>
              <div className={styles.staffInfo}>
                <h4 className={styles.staffName}>{member.name}</h4>
                <p className={styles.staffRole}>{member.role}</p>
                <p className={styles.staffBio}>{member.bio}</p>
                <div className={styles.staffStats}>
                  {member.stats.map((stat, index) => (
                    <div key={index} className={styles.statItem}>
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className={styles.staffSection}>
      <div className={styles.staffContent}>
        <div className={styles.sectionHeader}>
          <h2>Our Team</h2>
          <div className={styles.headerLine}></div>
          <p className={styles.sectionSubtitle}>Meet the experts behind your success</p>
        </div>
        
        {renderStaffSection("Business Leadership", businessStaff, businessScrollRef)}
        {renderStaffSection("Expert Coaches", coaches, coachesScrollRef)}
      </div>
    </section>
  );
};

export default Staff;
