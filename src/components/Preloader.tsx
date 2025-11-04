import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/Container.module.css";

// Lazy load framer-motion - only on desktop
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);
const MotionP = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.p),
  { ssr: false }
);
const MotionPath = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.path),
  { ssr: false }
);

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "नमस्ते",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const mobile = width <= 768;
    setDimension({ width, height });
    setIsMobile(mobile);

    // Smooth word cycling with proper timing
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex < words.length) {
        setIndex(currentIndex);
      } else {
        clearInterval(interval);
      }
    }, mobile ? 180 : 250); // 250ms per word on desktop, 180ms on mobile - smooth but not rushed
    
    return () => clearInterval(interval);
  }, []);

  // Mobile: simple fade animation, no complex SVG path
  if (isMobile && dimension.width > 0) {
    return (
      <div 
        className={styles.introduction} 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 9999, 
          backgroundColor: 'var(--background)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p style={{ 
          opacity: 0.75,
          fontSize: '2rem',
          fontWeight: 500
        }}>
          <span></span>
          Hello
        </p>
      </div>
    );
  }

  // Desktop: use framer-motion (lazy loaded)
  if (!dimension.width) return null;

  // Smooth animation variants
  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 0.85, transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] } },
  };

  const slideUp = {
    initial: { top: 0 },
    exit: { 
      top: "-100vh", 
      transition: { 
        duration: 0.8, 
        ease: [0.76, 0, 0.24, 1], 
        delay: 0.3 
      } 
    },
  };

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: { d: initialPath, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: targetPath, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } },
  };

  return (
    <MotionDiv
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      <MotionP variants={opacity} initial="initial" animate="enter">
        <span></span>
        {words[index]}
      </MotionP>
      <svg>
        <MotionPath variants={curve} initial="initial" exit="exit" />
      </svg>
    </MotionDiv>
  );
}
