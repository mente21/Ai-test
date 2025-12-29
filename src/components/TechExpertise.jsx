import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaReact, FaHtml5, FaPython, FaNodeJs, FaDocker, FaLinux, FaCloud, FaAws, FaGitAlt 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiMysql, SiFirebase, 
  SiPostgresql, SiRedis, SiGraphql, SiNestjs, SiKubernetes 
} from 'react-icons/si';
import { useCollection } from '../hooks/useCollection';

const TechExpertise = () => {
    const { data: skillsData, loading } = useCollection('skills');
    const [expandedSkills, setExpandedSkills] = useState({});

    const toggleSkill = (id) => {
        setExpandedSkills(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const ecosystemData = skillsData?.find(s => s.detailedDesc || s.systemTitle);
    const dynamicDesc = ecosystemData?.detailedDesc || "The visual map above represents the core neural pathways of my technical stack. Each node is a specialized cluster of expertise, from high-performance React architectures to robust Node.js backends and complex architectural design.";
    const dynamicTitle = ecosystemData?.systemTitle || "INDUSTRIAL ECOSYSTEM";

    // Helper to find data for a specific node name
    const findNodeData = (name) => skillsData?.find(s => s.name?.toLowerCase() === name.toLowerCase());

    const nodes = [
        // Group 1: Frontend & Mobile (x=15)
        { id: 1, name: 'React', x: 15, y: 15, icon: <FaReact size={26} />, color: '#61dafb' },
        { id: 2, name: 'Next.js', x: 15, y: 32, icon: <SiNextdotjs size={26} />, color: '#ffffff' }, 
        { id: 3, name: 'React Native', x: 15, y: 50, icon: <FaReact size={26} />, color: '#61dafb' }, // Mobile Expert
        { id: 4, name: 'Tailwind', x: 15, y: 68, icon: <SiTailwindcss size={26} />, color: '#38bdf8' },
        { id: 5, name: 'HTML / CSS', x: 15, y: 86, icon: <FaHtml5 size={26} />, color: '#e34f26' },
        
        // Group 2: Logic & Backend (x=40)
        { id: 6, name: 'Python', x: 40, y: 15, icon: <FaPython size={26} />, color: '#3776ab' },
        { id: 7, name: 'Node.js', x: 40, y: 32, icon: <FaNodeJs size={26} />, color: '#339933' }, 
        { id: 8, name: 'NestJS', x: 40, y: 50, icon: <SiNestjs size={26} />, color: '#e0234e' }, // Architect Logic
        { id: 9, name: 'GraphQL', x: 40, y: 68, icon: <SiGraphql size={26} />, color: '#e10098' },
        { id: 10, name: 'Typescript', x: 40, y: 86, icon: <SiTypescript size={26} />, color: '#3178c6' },
        
        // Group 3: Data (x=65)
        { id: 11, name: 'PostgreSQL', x: 65, y: 15, icon: <SiPostgresql size={26} />, color: '#336791' },
        { id: 12, name: 'MongoDB', x: 65, y: 32, icon: <SiMongodb size={26} />, color: '#47a248' },
        { id: 13, name: 'MySQL', x: 65, y: 50, icon: <SiMysql size={26} />, color: '#4479a1' }, 
        { id: 14, name: 'Redis', x: 65, y: 68, icon: <SiRedis size={26} />, color: '#dc382d' },
        { id: 15, name: 'Firebase', x: 65, y: 86, icon: <SiFirebase size={26} />, color: '#ffca28' },
        
        // Group 4: Cloud & DevOps (x=90)
        { id: 16, name: 'AWS', x: 90, y: 15, icon: <FaAws size={26} />, color: '#ff9900' },
        { id: 17, name: 'Docker', x: 90, y: 32, icon: <FaDocker size={26} />, color: '#2496ed' },
        { id: 18, name: 'Kubernetes', x: 90, y: 50, icon: <SiKubernetes size={26} />, color: '#326ce5' }, // Orchestration
        { id: 19, name: 'Linux Env', x: 90, y: 68, icon: <FaLinux size={26} />, color: '#fcc624' },
        { id: 20, name: 'Git / CI', x: 90, y: 86, icon: <FaGitAlt size={26} />, color: '#f05032' },
    ];

    const connections = [
        { d: 'M 15 20 L 15 92', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 40 20 L 40 80', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 65 30 L 65 70', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 90 20 L 90 80', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 15 50 L 90 50', color: 'var(--text-primary)', isTrunk: true }, 
    ];

    // Helper to get icon for registry list
    const getSkillIcon = (name) => {
        const node = nodes.find(n => n.name.toLowerCase() === name?.toLowerCase() || name?.toLowerCase().includes(n.name.toLowerCase()));
        if (node) return { icon: node.icon, color: node.color };
        return { icon: <span style={{ fontFamily: 'Anton' }}>&</span>, color: 'var(--accent-primary)' };
    };

    if (loading) return null;

    return (
        <div className="tech-expertise-container" style={{
            position: 'relative',
            width: '100%',
            background: 'var(--card-bg)',
            borderRadius: '60px',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            margin: '80px 0',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Grid Pattern Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                zIndex: 0,
                opacity: 0.1
            }} />

            {/* Desktop Ecosystem Map */}
            <div className="ecosystem-summary" style={{ position: 'relative', width: '100%', padding: '60px 40px', zIndex: 1, borderBottom: '1px solid var(--border-color)' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    {dynamicDesc}
                </p>
            </div>

            <div className="tech-ecosystem-map" style={{ position: 'relative', width: '100%', height: '800px', zIndex: 1, borderBottom: '1px solid var(--border-color)' }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}>
                    {connections.map((conn, i) => (
                        <motion.path
                            key={i}
                            d={conn.d}
                            stroke={conn.color}
                            strokeWidth={conn.isTrunk ? "1" : "0.3"}
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 0.8 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                    ))}

                    <motion.circle
                        r="1.2"
                        fill="var(--accent-primary)" 
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        style={{ 
                            offsetPath: `path("M 15 50 L 90 50 L 90 20 L 90 80 L 90 50 L 15 50 L 15 20 L 15 92 L 15 50 Z")`,
                            filter: 'drop-shadow(0 0 15px var(--accent-primary))'
                        }}
                    />
                </svg>

                {nodes.map((node, idx) => {
                    const dbSkill = findNodeData(node.name);
                    const seniority = dbSkill ? (parseInt(dbSkill.level) > 90 ? 'ARCHITECT' : parseInt(dbSkill.level) > 70 ? 'SENIOR' : 'EXPERT') : null;

                    return (
                        <div
                            key={node.id}
                            style={{
                                position: 'absolute',
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                zIndex: 2,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <motion.div 
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ scale: 1.1, boxShadow: `0 0 40px ${node.color}88` }}
                                style={{
                                    width: '64px',
                                    height: '64px',
                                    background: 'var(--node-bg)', 
                                    border: `2px solid ${node.color}`,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: node.color,
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(20px)',
                                    position: 'relative',
                                    marginBottom: '40px'
                                }}
                            >
                                <div style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}>
                                    {node.icon}
                                </div>
                                {seniority && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-15px',
                                        right: '-15px',
                                        background: 'var(--accent-primary)',
                                        color: 'white',
                                        fontSize: '0.55rem',
                                        fontWeight: 900,
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        boxShadow: '0 5px 10px rgba(0,0,0,0.3)',
                                        letterSpacing: '1px'
                                    }}>
                                        {seniority}
                                    </div>
                                )}
                            </motion.div>

                            <span style={{ 
                                position: 'absolute',
                                top: '100%',
                                fontSize: '0.75rem', 
                                color: 'var(--text-primary)', 
                                fontWeight: 900, 
                                letterSpacing: '2px', 
                                textTransform: 'uppercase',
                                background: 'var(--card-bg)',
                                padding: '6px 14px',
                                borderRadius: '4px',
                                border: `1px solid ${node.color}44`,
                                marginTop: '-12px',
                                whiteSpace: 'nowrap',
                                boxShadow: 'var(--card-shadow, 0 10px 20px rgba(0,0,0,0.5))'
                            }}>{node.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* Neural Capability Registry - Dynamic List of All Skills */}
            <div style={{
                position: 'relative',
                width: '100%',
                padding: '40px',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <div className="registry-header" style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--accent-primary)', 
                    fontWeight: 600, 
                    fontFamily: "'Oswald', sans-serif",
                    letterSpacing: '4px', 
                    marginBottom: '20px',
                    textAlign: 'center',
                    textTransform: 'uppercase'
                }}>
                    Technological Capability Registry
                </div>

                <div className="skills-scroll-container scrollbar-enhanced" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    maxHeight: skillsData?.length > 4 
                        ? (window.innerWidth < 768 ? '450px' : '580px') 
                        : 'none',
                    overflowY: skillsData?.length > 4 ? 'auto' : 'visible',
                    paddingRight: (skillsData?.length > 4 && window.innerWidth > 768) ? '15px' : '5px'
                }}>
                    {skillsData?.map((skill, idx) => {
                        const seniority = parseInt(skill.level) > 90 ? 'ARCHITECT' : parseInt(skill.level) > 70 ? 'SENIOR' : 'EXPERT';
                        
                        return (
                            <motion.div 
                                key={skill.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="registry-card"
                                style={{
                                    background: 'var(--card-bg)',
                                    backdropFilter: 'blur(30px)',
                                    borderRadius: '24px',
                                    border: '1px solid var(--border-color)',
                                    padding: '20px 40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '40px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    minHeight: '120px'
                                }}
                            >
                                {/* Left Side: Brand & Title */}
                                <div className="registry-brand" style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '250px', flexShrink: 0 }}>
                                    {(() => {
                                        const { icon, color } = getSkillIcon(skill.name);
                                        return (
                                            <div style={{ 
                                                width: '48px', 
                                                height: '48px', 
                                                borderRadius: '14px', 
                                                background: 'var(--node-bg)', 
                                                border: `2px solid ${color}`,
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                justifyContent: 'center', 
                                                color: color, 
                                                fontSize: '1.4rem',
                                                flexShrink: 0,
                                                boxShadow: `0 0 15px ${color}33`,
                                                position: 'relative'
                                            }}>
                                                <div style={{ filter: `drop-shadow(0 0 5px ${color}88)`, display: 'flex' }}>
                                                    {icon}
                                                </div>
                                            </div>
                                        );
                                    })()}
                                    <h4 style={{ 
                                        fontSize: '1.1rem', 
                                        fontFamily: 'Anton', 
                                        color: 'var(--text-primary)', 
                                        margin: 0, 
                                        lineHeight: 1, 
                                        letterSpacing: '1px', 
                                        textTransform: 'uppercase',
                                    }}>
                                        {skill.systemTitle || skill.name}
                                    </h4>
                                </div>

                                {/* Middle: Description */}
                                <div className="registry-desc" style={{ flex: 1, borderLeft: '1px solid var(--border-color)', paddingLeft: '40px' }}>
                                    <p className={`description-text ${expandedSkills[skill.id] ? 'expanded' : ''}`} style={{ 
                                        fontSize: '0.9rem', 
                                        color: 'var(--text-secondary)', 
                                        lineHeight: 1.6, 
                                        margin: 0, 
                                        fontWeight: 400,
                                        fontFamily: "'Manrope', sans-serif",
                                        maxWidth: '800px',
                                        opacity: 0.8,
                                        display: '-webkit-box',
                                        WebkitLineClamp: expandedSkills[skill.id] ? 'unset' : undefined,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {skill.detailedDesc || `Integration and deployment of ${skill.name} architectures within complex industrial environments, ensuring maximum system integrity and architectural scalability.`}
                                    </p>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleSkill(skill.id);
                                        }}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--accent-primary)',
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            fontFamily: "'Oswald', sans-serif",
                                            letterSpacing: '1px',
                                            cursor: 'pointer',
                                            padding: 0,
                                            marginTop: '10px',
                                            textTransform: 'uppercase',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        {expandedSkills[skill.id] ? 'See Less' : 'See More'}
                                        <span style={{ fontSize: '1rem' }}>{expandedSkills[skill.id] ? '−' : '+'}</span>
                                    </button>
                                </div>

                                {/* Right: Status & Waveform */}
                                <div className="registry-status" style={{ display: 'flex', alignItems: 'center', gap: '30px', flexShrink: 0 }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', fontWeight: 600, fontFamily: "'Oswald', sans-serif", letterSpacing: '2px', marginBottom: '4px', textTransform: 'uppercase' }}>SYSTEM STATUS</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                                            <motion.div 
                                                animate={{ opacity: [1, 0.4, 1] }} 
                                                transition={{ duration: 2, repeat: Infinity }}
                                                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} 
                                            />
                                            <div className="seniority-text" style={{ fontSize: '1.1rem', fontFamily: 'Anton', color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '1px' }}>
                                                {seniority}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ width: '80px', height: '32px', background: 'rgba(255,107,0,0.05)', borderRadius: '6px', border: '1px solid rgba(255,107,0,0.1)', overflow: 'hidden' }}>
                                        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
                                            <motion.path
                                                d="M 0 20 Q 5 10 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20 T 70 20 T 80 20 T 90 20 T 100 20"
                                                fill="none"
                                                stroke="var(--accent-primary)"
                                                strokeWidth="2"
                                                animate={{ 
                                                    d: [
                                                        "M 0 20 Q 5 5 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20 T 70 20 T 80 20 T 90 20 T 100 20",
                                                        "M 0 20 Q 5 35 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20 T 70 20 T 80 20 T 90 20 T 100 20",
                                                        "M 0 20 Q 5 5 10 20 T 20 20 T 30 20 T 40 20 T 50 20 T 60 20 T 70 20 T 80 20 T 90 20 T 100 20"
                                                    ]
                                                }}
                                                transition={{ duration: 2 + (idx * 0.5), repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            <style>{`
                .tech-expertise-container {
                    border-radius: 60px !important;
                }
                
                @media (max-width: 1024px) {
                    .tech-ecosystem-map, .ecosystem-summary {
                        display: none !important;
                    }
                    .tech-expertise-container {
                        border-radius: 20px !important;
                        margin: 20px 0 !important;
                        padding: 0 !important;
                        border: none !important;
                        background: transparent !important;
                    }
                    .skills-scroll-container {
                        padding: 0 !important;
                    }
                    .registry-card { 
                        flex-direction: column !important; 
                        align-items: flex-start !important;
                        gap: 15px !important;
                        padding: 24px 20px !important;
                        border-radius: 20px !important;
                        background: var(--card-bg) !important;
                        margin-bottom: 5px !important;
                        min-height: 180px !important; /* Fixed height to prevent squashing */
                        flex-shrink: 0 !important; /* Crucial: prevents cards from shrinking */
                        width: 100% !important;
                    }
                    .registry-brand {
                        width: 100% !important;
                        gap: 15px !important;
                    }
                    .registry-desc { 
                        border-left: none !important; 
                        border-top: 1px solid var(--border-color) !important;
                        padding-left: 0 !important;
                        padding-top: 15px !important;
                        flex: none !important;
                        width: 100% !important;
                        display: block !important;
                    }
                    .description-text {
                        display: -webkit-box !important;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical !important;
                        overflow: hidden !important;
                        opacity: 0.9 !important;
                        font-size: 0.85rem !important;
                        line-height: 1.5 !important;
                    }
                    /* Allow expansion on mobile */
                    .description-text.expanded {
                        -webkit-line-clamp: unset !important;
                    }
                    .registry-status {
                        width: 100% !important;
                        justify-content: flex-end !important;
                        border-top: 1px solid var(--border-color) !important;
                        padding-top: 12px !important;
                        margin-top: 5px !important;
                    }
                    /* Hide frequency animation on mobile */
                    .registry-status div[style*="width: 80px"] {
                        display: none !important;
                    }
                    /* Remove redundant labels on mobile to move content left most */
                    .registry-header {
                        display: none !important;
                    }
                    .registry-status div[style*="fontSize: 0.6rem"] {
                        display: none !important;
                    }
                    .registry-status .seniority-text {
                        font-size: 0.9rem !important;
                    }
                    /* Enhance icon distinction */
                    .registry-brand div[style*="width: 48px"] {
                        width: 50px !important;
                        height: 50px !important;
                        box-shadow: 0 0 20px rgba(0,0,0,0.5) !important;
                    }
                }

                @media (min-width: 1025px) {
                    .description-text {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }

                @media (max-width: 480px) {
                    .registry-card {
                        padding: 20px 14px !important;
                    }
                    .registry-brand h4 {
                        font-size: 1.1rem !important;
                    }
                }

                /* Custom Scrollbar */
                .skills-scroll-container::-webkit-scrollbar {
                    width: 6px;
                }
                .skills-scroll-container::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .skills-scroll-container::-webkit-scrollbar-thumb {
                    background: var(--accent-primary);
                    border-radius: 10px;
                    border: 1px solid rgba(0,0,0,0.2);
                }
                
                /* Ensure touch scrolling is smooth on mobile */
                .skills-scroll-container {
                    -webkit-overflow-scrolling: touch;
                }
            `}</style>
        </div>
    );
};


export default TechExpertise;
