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
    const mobile = width <= 768; // Mobile threshold
    setDimension({ width, height });
    setIsMobile(mobile);

    // On mobile: skip word animation, just show "Hello"
    // On desktop: cycle through words but faster
    if (!mobile) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < words.length - 1) {
          currentIndex++;
          setIndex(currentIndex);
        } else {
          clearInterval(interval);
        }
      }, currentIndex === 0 ? 300 : 80); // Faster: 300ms first, 80ms each
      
      return () => clearInterval(interval);
    }
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

  // Dynamically import variants only when needed
  const opacity = {
    initial: { opacity: 0 },
    enter: { opacity: 0.75, transition: { duration: 0.3, delay: 0.05 } },
  };

  const slideUp = {
    initial: { top: 0 },
    exit: { top: "-100vh", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 } },
  };

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: { d: initialPath, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: targetPath, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
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
