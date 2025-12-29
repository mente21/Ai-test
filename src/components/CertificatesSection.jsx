import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const staticCertificates = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Meta / Coursera",
    date: "Dec 2023",
    color: "#ff6b00",
    imageUrl: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=800",
    description: "Specialization in React, Node.js, and modern cloud deployment architectures."
  },
  {
    id: 2,
    title: "AI & Machine Learning",
    issuer: "Google Cloud",
    date: "Oct 2023",
    color: "#8b5cf6",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    description: "In-depth study of neural networks, TensorFlow, and large scale data processing."
  },
  {
    id: 3,
    title: "Cloud Architecture Professional",
    issuer: "AWS",
    date: "Aug 2023",
    color: "#0ea5e9",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    description: "Designing resilient, high-availability systems using AWS global infrastructure."
  }
];

const CertificatesSection = ({ onOpenDetail }) => {
  const { data: dbCertificates, loading } = useCollection('certificates');
  const [index, setIndex] = useState(0);

  const certificatesData = dbCertificates.length > 0 ? dbCertificates.map(c => ({
      ...c,
      color: c.color || ['#ff6b00', '#8b5cf6', '#0ea5e9', '#10b981'][Math.floor(Math.random() * 4)]
  })) : staticCertificates;

  useEffect(() => {
    if (certificatesData.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % certificatesData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [certificatesData.length]);

  if (loading) return null;

  const next = () => setIndex((prev) => (prev + 1) % certificatesData.length);
  const prev = () => setIndex((prev) => (prev - 1 + certificatesData.length) % certificatesData.length);

  return (
    <section id="certificates" className="certificates-section" style={{
      position: 'relative',
      padding: '100px 0',
      background: 'var(--bg-color)',
      overflow: 'hidden',
      minHeight: '800px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.5s ease'
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1000px',
        height: '1000px',
        background: `radial-gradient(circle, ${certificatesData[index].color}08 0%, transparent 70%)`,
        zIndex: 0,
        transition: 'background 1s ease'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '80px', zIndex: 2 }}
      >
        <h2 className="section-title-premium" style={{ marginBottom: '15px' }}>
          <span className="section-title-accent">CERTIFIED</span> 
          <span className="section-title-stroke">EXCELLENCE</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}>
          Validating the boundaries of technology
        </p>
      </motion.div>

      <div className="certificates-container" style={{ 
        position: 'relative',
        width: '100%',
        maxWidth: '1200px',
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1500px',
        zIndex: 2
      }}>
        {certificatesData.map((cert, i) => {
          let position = i - index;
          if (position < -1) position += certificatesData.length;
          if (position > 1) position -= certificatesData.length;

          const isFront = position === 0;
          const isLeft = position === -1;
          const isRight = position === 1;
          const isHidden = !isFront && !isLeft && !isRight;

          return (
            <motion.div
              key={cert.id}
              initial={false}
              animate={{
                x: isFront ? 0 : isLeft ? -450 : isRight ? 450 : 0,
                scale: isFront ? 1.1 : 0.75,
                opacity: isHidden ? 0 : isFront ? 1 : 0.5,
                zIndex: isFront ? 10 : 5,
                rotateY: isLeft ? 45 : isRight ? -45 : 0,
                filter: isFront ? 'blur(0px)' : 'blur(4px)'
              }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 24
              }}
              className={`cert-3d-card ${isFront ? 'active-front' : ''}`}
              style={{
                position: 'absolute',
                width: '400px',
                height: '550px',
                pointerEvents: isFront ? 'auto' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => isFront && onOpenDetail(cert)}
            >
              <div 
                className="certificate-card"
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'var(--card-bg)',
                  borderRadius: '32px',
                  border: `1.5px solid ${cert.color}44`,
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isFront ? `0 20px 40px rgba(0,0,0,0.3), 0 0 20px ${cert.color}22` : 'none'
                }}
              >
                <div className="cert-image-container" style={{ width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '25px', background: 'rgba(0,0,0,0.1)' }}>
                  <img src={cert.imageUrl} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                <div className="cert-content-wrapper" style={{ marginTop: '10px' }}>
                  <h3 className="cert-title" style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '8px', fontFamily: 'Anton', textTransform: 'uppercase', letterSpacing: '1px' }}>{cert.title}</h3>
                  <div className="cert-metadata" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: cert.color, fontWeight: 600, fontFamily: "'Oswald', sans-serif", fontSize: '0.9rem' }}>
                    <span>{cert.issuer}</span>
                    <span style={{ opacity: 0.3 }}>•</span>
                    <span>{cert.date}</span>
                  </div>
                </div>

                <p className="cert-description" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, fontFamily: "'Manrope', sans-serif", fontWeight: 400 }}>
                  {cert.description}
                </p>

                <div className="cert-button-container" style={{ marginTop: 'auto', display: 'flex', gap: '15px' }}>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenDetail(cert);
                    }}
                    style={{
                      flex: 1,
                      background: 'var(--text-primary)',
                      color: 'var(--bg-color)',
                      border: 'none',
                      padding: '15px',
                      borderRadius: '15px',
                      fontWeight: 600,
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: '0.8rem',
                      letterSpacing: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.5s ease'
                    }}
                  >
                    VIEW CREDENTIAL <ExternalLink size={16} />
                  </motion.button>
                </div>

                <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
                     <div style={{ width: '40px', height: '1px', background: cert.color, opacity: 0.3 }} />
                     <div style={{ width: '1px', height: '40px', background: cert.color, opacity: 0.3, position: 'absolute', bottom: 0, right: 0 }} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="carousel-nav" style={{ display: 'flex', gap: '30px', marginTop: '60px', zIndex: 3 }}>
        <motion.button 
          whileHover={{ scale: 1.1, background: 'var(--card-bg)' }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.5s ease'
          }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1, background: 'var(--card-bg)' }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '30px',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.5s ease'
          }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
        {certificatesData.map((_, i) => (
          <div 
            key={i}
            style={{
              width: i === index ? '30px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === index ? 'var(--accent-primary)' : 'var(--border-color)',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    <style>{`
        #certificates {
            transition: all 0.3s ease;
        }
        @media (max-width: 1200px) {
            #certificates { padding: 100px 5% !important; }
        }
        @media (max-width: 1024px) {
            .cert-3d-card:not(.active-front) {
                display: none !important;
            }
            .certificates-container {
                height: 550px !important;
            }
        }
        @media (max-width: 768px) {
            #certificates { 
                padding: 60px 20px !important; 
                min-height: auto !important; 
            }
            .section-title-premium {
                font-size: 2.2rem !important;
                text-align: left !important;
                margin-bottom: 40px !important;
            }
            .certificates-container { 
                height: auto !important;
                min-height: 550px !important;
                perspective: none !important;
                display: block !important;
            }
            .cert-3d-card {
                width: 100% !important;
                max-width: 380px !important;
                height: auto !important;
                position: relative !important;
                transform: none !important;
                left: 0 !important;
                top: 0 !important;
                margin: 0 auto !important;
            }
            .certificate-card {
                flex-direction: column !important;
                padding: 0 !important;
                gap: 0 !important;
                align-items: stretch !important;
                border-radius: 24px !important;
                overflow: visible !important;
                background: var(--card-bg) !important;
                height: auto !important;
                min-height: 580px !important;
                display: flex !important;
            }
            .cert-image-container {
                width: 100% !important;
                height: 220px !important;
                margin-bottom: 0 !important;
                border-radius: 24px 24px 0 0 !important;
                flex-shrink: 0 !important;
                display: block !important;
                background: linear-gradient(135deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 100%) !important;
                overflow: hidden !important;
            }
            .cert-image-container img {
                object-fit: cover !important;
                width: 100% !important;
                height: 100% !important;
                display: block !important;
            }
            .cert-content-wrapper {
                padding: 24px 24px 0 24px !important;
                margin-top: 0 !important;
                width: 100% !important;
                flex-shrink: 0 !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            .cert-title {
                font-size: 1.4rem !important;
                margin-bottom: 8px !important;
                text-align: left !important;
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                color: var(--text-primary) !important;
            }
            .cert-metadata {
                justify-content: flex-start !important;
                margin-bottom: 0 !important;
                font-size: 0.85rem !important;
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            .cert-description {
                padding: 16px 24px !important;
                font-size: 0.9rem !important;
                line-height: 1.6 !important;
                margin-top: 0 !important;
                margin-bottom: 0 !important;
                text-align: left !important;
                opacity: 0.8 !important;
                display: block !important;
                flex-grow: 1 !important;
                visibility: visible !important;
                color: var(--text-secondary) !important;
            }
            .cert-button-container {
                width: 100% !important;
                padding: 0 24px 24px !important;
                margin-top: auto !important;
                flex-shrink: 0 !important;
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            .cert-button-container button {
                width: 100% !important;
                padding: 15px !important;
                display: flex !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
        }
        @media (max-width: 480px) {
            .section-title-premium { font-size: 1.8rem !important; }
            .cert-3d-card { max-width: 100% !important; }
            .cert-image-container { height: 180px !important; }
            .cert-title { font-size: 1.25rem !important; }
            .cert-description { font-size: 0.85rem !important; }
        }
      `}</style>
    </section>
  );
};

export default CertificatesSection;
