import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Atom, Globe, Wind, Palette, Terminal, Cpu, Code2, 
  Server, Database, Zap, Container, Cloud, ShieldCheck
} from 'lucide-react';
import { useCollection } from '../hooks/useCollection';

const TechExpertise = () => {
    const { data: skillsData, loading } = useCollection('skills');

    const ecosystemData = skillsData?.find(s => s.detailedDesc || s.systemTitle);
    const dynamicDesc = ecosystemData?.detailedDesc || "The visual map above represents the core neural pathways of my technical stack. Each node is a specialized cluster of expertise, from high-performance React architectures to robust Node.js backends and complex architectural design.";
    const dynamicTitle = ecosystemData?.systemTitle || "INDUSTRIAL ECOSYSTEM";

    // Helper to find data for a specific node name
    const findNodeData = (name) => skillsData?.find(s => s.name?.toLowerCase() === name.toLowerCase());

    const nodes = [
        // Group 1: Frontend (x=15)
        { id: 1, name: 'React', x: 15, y: 20, icon: <Atom size={26} />, color: '#61dafb' },
        { id: 2, name: 'Next.js', x: 15, y: 50, icon: <Globe size={26} />, color: '#ff6b00' }, 
        { id: 3, name: 'Tailwind', x: 15, y: 75, icon: <Wind size={26} />, color: '#38bdf8' },
        { id: 4, name: 'HTML / CSS', x: 15, y: 92, icon: <Palette size={26} />, color: '#e34f26' },
        
        // Group 2: Logic (x=40)
        { id: 5, name: 'Python', x: 40, y: 20, icon: <Terminal size={26} />, color: '#3776ab' },
        { id: 6, name: 'Node.js', x: 40, y: 50, icon: <Cpu size={26} />, color: '#339933' }, 
        { id: 7, name: 'Typescript', x: 40, y: 80, icon: <Code2 size={26} />, color: '#3178c6' },
        
        // Group 3: Data (x=65)
        { id: 8, name: 'MongoDB', x: 65, y: 30, icon: <Server size={26} />, color: '#47a248' },
        { id: 9, name: 'MySQL', x: 65, y: 50, icon: <Database size={26} />, color: '#4479a1' }, 
        { id: 10, name: 'Firebase', x: 65, y: 70, icon: <Zap size={26} />, color: '#ffca28' },
        
        // Group 4: Cloud (x=90)
        { id: 11, name: 'Docker', x: 90, y: 20, icon: <Container size={26} />, color: '#2496ed' },
        { id: 12, name: 'Cloud Ops', x: 90, y: 50, icon: <Cloud size={26} />, color: '#0ea5e9' }, 
        { id: 13, name: 'Linux Env', x: 90, y: 80, icon: <ShieldCheck size={26} />, color: '#fcc624' },
    ];

    const connections = [
        { d: 'M 15 20 L 15 92', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 40 20 L 40 80', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 65 30 L 65 70', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 90 20 L 90 80', color: 'rgba(255, 107, 0, 0.4)', isTrunk: false },
        { d: 'M 15 50 L 90 50', color: 'var(--text-primary)', isTrunk: true }, 
    ];

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

            <div style={{ position: 'relative', width: '100%', height: '800px', zIndex: 1 }}>
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
                <div style={{ 
                    fontSize: '0.7rem', 
                    color: 'var(--accent-primary)', 
                    fontWeight: 900, 
                    letterSpacing: '4px', 
                    marginBottom: '20px',
                    textAlign: 'center',
                    textTransform: 'uppercase'
                }}>
                    Technological Capability Registry
                </div>

                {skillsData?.map((skill, idx) => {
                    const seniority = parseInt(skill.level) > 90 ? 'ARCHITECT' : parseInt(skill.level) > 70 ? 'SENIOR' : 'EXPERT';
                    
                    return (
                        <motion.div 
                            key={skill.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '250px', flexShrink: 0 }}>
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '10px', 
                                    background: 'var(--accent-primary)', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: 'white', 
                                    fontSize: '1.2rem', 
                                    fontWeight: 900,
                                    fontFamily: 'Anton'
                                }}>
                                    &
                                </div>
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
                            <div style={{ flex: 1, borderLeft: '1px solid var(--border-color)', paddingLeft: '40px' }}>
                                <p style={{ 
                                    fontSize: '0.9rem', 
                                    color: 'var(--text-secondary)', 
                                    lineHeight: 1.6, 
                                    margin: 0, 
                                    fontWeight: 300,
                                    maxWidth: '800px',
                                    opacity: 0.8
                                }}>
                                    {skill.detailedDesc || `Integration and deployment of ${skill.name} architectures within complex industrial environments, ensuring maximum system integrity and architectural scalability.`}
                                </p>
                            </div>

                            {/* Right: Status & Waveform */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexShrink: 0 }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.6rem', color: 'var(--accent-primary)', fontWeight: 900, letterSpacing: '2px', marginBottom: '4px' }}>SYSTEM STATUS</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
                                        <motion.div 
                                            animate={{ opacity: [1, 0.4, 1] }} 
                                            transition={{ duration: 2, repeat: Infinity }}
                                            style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} 
                                        />
                                        <div style={{ fontSize: '1.1rem', fontFamily: 'Anton', color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '1px' }}>
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
            
            <style>{`
                @media (max-width: 1100px) {
                    div[style*="display: flex"] { 
                        flex-direction: column !important; 
                        align-items: flex-start !important;
                        gap: 15px !important;
                        padding: 30px !important;
                    }
                    div[style*="border-left"] { 
                        border-left: none !important; 
                        border-top: 1px solid var(--border-color) !important;
                        padding-left: 0 !important;
                        padding-top: 15px !important;
                        flex: none !important;
                        width: 100% !important;
                    }
                    div[style*="width: 250px"] {
                        width: 100% !important;
                    }
                }
                @media (max-width: 900px) {
                    .tech-expertise-container { min-height: fit-content !important; padding-bottom: 60px !important; }
                }
            `}</style>
        </div>
    );
};


export default TechExpertise;
