import React from 'react';
import { motion } from 'framer-motion';
import { useCollection } from '../hooks/useCollection';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { 
  FaReact, FaMobileAlt, FaGlobe, FaCode, FaDatabase, FaCloud, 
  FaPaintBrush, FaBrain, FaShieldAlt, FaServer, FaDesktop, 
  FaRocket, FaTools, FaShoppingCart, FaChartLine, FaUsers, 
  FaPython, FaNodeJs, FaGamepad, FaRobot 
} from 'react-icons/fa';

// Icon Map for dynamic rendering
const iconMap = {
  FaReact: <FaReact size={32} />,
  FaMobileAlt: <FaMobileAlt size={32} />,
  FaGlobe: <FaGlobe size={32} />,
  FaCode: <FaCode size={32} />,
  FaDatabase: <FaDatabase size={32} />,
  FaCloud: <FaCloud size={32} />,
  FaPaintBrush: <FaPaintBrush size={32} />,
  FaBrain: <FaBrain size={32} />,
  FaShieldAlt: <FaShieldAlt size={32} />,
  FaServer: <FaServer size={32} />,
  FaDesktop: <FaDesktop size={32} />,
  FaRocket: <FaRocket size={32} />,
  FaTools: <FaTools size={32} />,
  FaShoppingCart: <FaShoppingCart size={32} />,
  FaChartLine: <FaChartLine size={32} />,
  FaUsers: <FaUsers size={32} />,
  FaPython: <FaPython size={32} />,
  FaNodeJs: <FaNodeJs size={32} />,
  FaGamepad: <FaGamepad size={32} />,
  FaRobot: <FaRobot size={32} />
};

const ServicesSection = () => {
    const { data: services, loading } = useCollection('services');

    if (loading) return null;
    if (!services || services.length === 0) return null;

    return (
        <section id="services" style={{ padding: '80px 10%', background: 'var(--bg-color)' }}>
            <div className="section-header-premium" style={{ marginBottom: '60px' }}>
                <span className="section-subtitle-premium">Offerings & Capabilities</span>
                <h2 className="section-title-premium">
                    <span className="section-title-accent">CLIENT</span> 
                    <span className="section-title-stroke">SERVICES</span>
                </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                {services.map((service, idx) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, borderColor: 'var(--accent-primary)' }}
                        style={{
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '24px',
                            padding: '30px',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Icon / Image */}
                        <div style={{ marginBottom: '24px', color: 'var(--accent-primary)' }}>
                            {service.icon && iconMap[service.icon] ? (
                                <div style={{ 
                                    width: '56px', height: '56px', 
                                    background: 'rgba(255,107,0,0.1)', 
                                    borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {iconMap[service.icon]}
                                </div>
                            ) : service.imageUrl ? (
                                <img src={service.imageUrl} alt={service.title} style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
                            ) : (
                                <div style={{ 
                                    width: '56px', height: '56px', 
                                    background: 'var(--accent-primary)', 
                                    borderRadius: '14px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'black' }}>{service.title?.[0]}</span>
                                </div>
                            )}
                        </div>

                        <h3 style={{ 
                            fontFamily: 'Anton', 
                            fontSize: '1.5rem', 
                            color: 'var(--text-primary)', 
                            marginBottom: '12px',
                            lineHeight: 1.1,
                            textTransform: 'uppercase'
                        }}>
                            {service.title}
                        </h3>

                        <p style={{ 
                            fontFamily: "'Manrope', sans-serif", 
                            color: 'var(--text-secondary)', 
                            fontSize: '0.9rem', 
                            lineHeight: 1.6,
                            marginBottom: '24px',
                            flex: 1,
                            opacity: 0.8
                        }}>
                            {service.desc}
                        </p>

                        {service.features && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                                {service.features.split(',').map((feature, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <CheckCircle2 size={14} color="var(--accent-primary)" />
                                        <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                            {feature.trim()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ 
                            marginTop: 'auto', 
                            borderTop: '1px solid var(--border-color)', 
                            paddingTop: '20px',
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center' 
                        }}>
                            {service.price && (
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: "'Oswald', sans-serif", letterSpacing: '1px' }}>STARTING AT</span>
                                    <div style={{ fontSize: '1.25rem', fontFamily: 'Anton', color: 'white' }}>{service.price}</div>
                                </div>
                            )}
                            <a href="#contact" style={{ 
                                width: '40px', 
                                height: '40px', 
                                borderRadius: '50%', 
                                background: 'rgba(255,107,0,0.1)', 
                                border: '1px solid var(--accent-primary)',
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                color: 'var(--accent-primary)',
                                transition: 'all 0.3s ease'
                            }}>
                                <ArrowUpRight size={20} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection;
