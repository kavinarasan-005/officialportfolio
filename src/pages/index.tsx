import Container from "@/components/Container";
import { useEffect, useRef, useState, Suspense } from "react";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";

// Removed heavy 3D library - using CSS-based animation instead
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
  Globe,
  Leaf,
  Brain,
  Satellite,
  Building,
  Users,
  MapPin,
  Mail,
  Phone,
  Linkedin,
  FileText,
  Upload,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Zap,
  Shield,
  Cpu,
  Database,
  Network,
  Cloud,
  Target,
  Lightbulb,
  BarChart3,
  Activity,
  Globe2,
  Smartphone,
  Server,
  Bot,
  BrainCircuit,
  Sparkles,
  Rocket,
  Award,
  Heart,
  Star,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
// Lazy load heavy dependencies
let VanillaTilt: typeof import("vanilla-tilt").default | null = null;
const loadVanillaTilt = async () => {
  if (!VanillaTilt) {
    VanillaTilt = (await import("vanilla-tilt")).default;
  }
  return VanillaTilt;
};

const aboutStats = [
  { label: "Years of Experience", value: "2+" },
  { label: "Projects Completed", value: "11+" },
  { label: "Certifications", value: "6+" },
];

const coreTechnologies = [
  {
    title: "Product Management",
    description: "Strategic roadmapping, PRD creation, A/B testing frameworks, and data-driven feature prioritization for measurable business growth.",
    icon: Target,
  },
  {
    title: "Data Analytics & BI",
    description: "Advanced SQL queries, Power BI dashboards, Python analysis, KPI frameworks, and executive reporting that transform data into insights.",
    icon: BarChart3,
  },
  {
    title: "Full-Stack Development",
    description: "Modern web applications using React, Node.js, MongoDB, C#, and .NET with focus on scalability and performance optimization.",
    icon: Code2,
  },
  {
    title: "UI/UX Design",
    description: "User-centered design with Figma, comprehensive user research, interactive prototyping, and customer journey mapping expertise.",
    icon: Frame,
  },
  {
    title: "Process Automation",
    description: "Workflow optimization, system integration, ERP module development, and automation solutions to improve operational efficiency.",
    icon: Zap,
  },
];

// Product & Strategy Projects
const productProjects = [
  {
    title: "CredPe",
    description: "Behavioral nudges for credit card payments using psychology. Improved task completion by 30% through A/B testing and user research.",
    image: "/assets/CredPe.webm",
    href: "https://www.canva.com/design/DAGn9qY0HQs/7z2XCFLIEHx_F-5r1V3mLA/edit",
    category: "Product Strategy",
  },
  {
    title: "WellNest",
    description: "Mental wellness MVP for professionals. Top 10 finalist out of 200+ teams in ProductSpace Sprint with retention analytics.",
    image: "/assets/WellNest.webm",
    href: "https://www.canva.com/design/DAGuMOy1lVs/cCjCNphb2ymp_ec1hxAaFQ/edit",
    category: "Product Design",
  },
  {
    title: "L'Oréal Challenge",
    description: "3-year inclusive sourcing roadmap with KPI design. Reached Quarter-Finals globally, modeled 3,000+ beneficiary growth.",
    image: "/assets/loreal-sustainability-challenge.webm",
    href: "https://www.canva.com/design/DAGw4g4SgQ0/qgY8XRsB5XXbOsOS88ZqNg/edit",
    category: "Business Strategy",
  },
];

// Development & Analytics Projects
const developmentProjects = [
  {
    title: "Messo",
    description: "MERN-based hostel mess management system for 500+ students. Reduced downtime by 30% with JWT auth and Redis caching.",
    image: "/assets/messo_w.webm",
    href: "https://github.com/krizto8/Messo/tree/main/Messo/Messo-main",
    category: "Full-Stack Development",
  },
  {
    title: "IMDb Analytics",
    description: "BI platform analyzing 9,000+ titles with Power BI dashboards. Processed Netflix/IMDb data for actionable business insights.",
    image: "/assets/PowerBI.webm",
    href: "https://github.com/kavinarasan-005/IMDB-Data-Analysis-and-Visualization",
    category: "Data Analytics",
  },
  {
    title: "Vendor Expiry System",
    description: "Windows Service in C# to monitor vendor contract expiries with automated email alerts. Improved SLA adherence and audit visibility.",
    image: "/assets/WindowsService.webm",
    href: "https://github.com/kavinarasan-005/Vendor-Expiry-Notification-System",
    category: "Process Automation",
  },
];

// Design & UI/UX Projects
const designProjects = [
  {
    title: "Food Delivery App",
    description: "UX redesign focusing on sign-up flows, dynamic home, and live order tracking. Optimized user journeys for better conversion.",
    image: "/assets/Foodapp.webm",
    href: "https://www.figma.com/design/u1NBlTGGgougpiGTePJGyn/Food-Delivery-App",
    category: "UI/UX Design",
  },
  {
    title: "Nike E-commerce",
    description: "Nike-themed e-commerce prototype with clean browsing and optimized checkout flows. Streamlined cart journeys and inline validation.",
    image: "/assets/NIKE.webm",
    href: "https://www.figma.com/design/L7RcwZoZiTPB72ibuS5HU0/Nike-Website-Prototype",
    category: "E-commerce Design",
  },
  {
    title: "LUMINTRIQAI Platform",
    description: "React.js landing page for AI/Blockchain consulting platform. Responsive design with component reusability and brand consistency.",
    image: "/assets/LUMINTRIQAI.webm",
    href: "https://www.figma.com/design/Wz2EkcZVY47SggKG6SnTMU/Actual-Page",
    category: "Frontend Development",
  },
];

const solutions = [
  {
    service: "Product Strategy & Roadmapping",
    description: "End-to-end product management from ideation to launch, with user research, PRDs, and feature prioritization frameworks.",
    icon: Target,
  },
  {
    service: "Data Analytics & BI",
    description: "Business intelligence dashboards, KPI frameworks, SQL analysis, and data visualization for actionable insights.",
    icon: BarChart3,
  },
  {
    service: "Full-Stack Development",
    description: "Modern web applications using React, Node.js, and cloud deployment with focus on scalability and performance.",
    icon: Code2,
  },
  {
    service: "UI/UX Design & Research",
    description: "User-centered design processes, prototyping, usability testing, and conversion optimization through behavioral insights.",
    icon: Frame,
  },
  {
    service: "Process Automation",
    description: "Workflow optimization, ERP module development, and system integration to reduce manual tasks and improve efficiency.",
    icon: Zap,
  },
];

// Removed unused technicalHighlights - content merged into coreTechnologies
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _technicalHighlights = [
  {
    title: "Product Management",
    description: "A/B testing, user research, roadmapping, and feature prioritization using data-driven frameworks and agile methodologies.",
    icon: Target,
  },
  {
    title: "Business Intelligence",
    description: "Power BI dashboards, SQL optimization, and KPI frameworks that turn complex data into actionable business insights.",
    icon: BarChart3,
  },
  {
    title: "MERN Stack Development",
    description: "Full-stack applications using MongoDB, Express, React, and Node.js with JWT authentication and Redis caching.",
    icon: Code2,
  },
  {
    title: "Process Automation",
    description: "C# .NET applications, Windows Services, and ERP modules that automate workflows and improve operational efficiency.",
    icon: Zap,
  },
  {
    title: "UX Research & Design",
    description: "User interviews, journey mapping, behavioral analysis, and Figma prototyping for conversion-focused experiences.",
    icon: Users,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _careerFocus = [
  {
    title: "Product Management",
    description: "Roadmapping, user research, A/B testing, and feature prioritization using data-driven frameworks for measurable business impact.",
    icon: Target,
  },
  {
    title: "Business Analytics",
    description: "SQL optimization, dashboard creation, KPI design, and cohort analysis to turn complex data into strategic insights.",
    icon: BarChart3,
  },
  {
    title: "Full-Stack Development",
    description: "Modern web applications using React, Node.js, and cloud deployment with focus on scalability and user experience.",
    icon: Code2,
  },
  {
    title: "UX Research & Design",
    description: "User interviews, behavioral analysis, prototyping, and conversion optimization through evidence-based design decisions.",
    icon: Frame,
  },
  {
    title: "Process Automation",
    description: "Workflow optimization, ERP development, and system integration to eliminate manual tasks and improve efficiency.",
    icon: Zap,
  },
  {
    title: "Data Visualization",
    description: "Power BI, Tableau, and Python-based dashboards that communicate complex insights through compelling visual narratives.",
    icon: Activity,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _contactInfo = [
  {
    city: "Dubai, UAE",
    address: "Available for Remote & On-site Work",
    email: "kavinarasan2019@gmail.com",
    icon: MapPin,
  },
  {
    city: "LinkedIn",
    address: "Professional Network & Updates",
    email: "linkedin.com/in/kavinarasan",
    icon: Linkedin,
  },
  {
    city: "GitHub",
    address: "Open Source Projects & Code",
    email: "github.com/kavinarasan-005",
    icon: Code2,
  },
  {
    city: "Resume",
    address: "Detailed Experience & Skills",
    email: "Download PDF Resume",
    icon: FileText,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _opportunities = [
  {
    title: "Product Management Intern",
    location: "Remote/Hybrid",
    requirement: "January 2026 onwards",
    experience: "Roadmapping, A/B testing, user research, and data-driven feature prioritization.",
    icon: Target,
  },
  {
    title: "Business Analytics Intern",
    location: "Remote/Hybrid",
    requirement: "January 2026 onwards",
    experience: "SQL, Power BI, dashboard creation, and KPI frameworks for business insights.",
    icon: BarChart3,
  },
  {
    title: "Software Development Intern",
    location: "Remote/Hybrid",
    requirement: "January 2026 onwards",
    experience: "React, Node.js, Python, C#, and full-stack application development.",
    icon: Code2,
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _workingPrinciples = [
  {
    title: "Data-Driven Decision Making",
    description: "I believe in letting data guide every decision. Whether it's A/B testing product features or analyzing user behavior, I use metrics and analytics to validate assumptions and optimize outcomes.",
    icon: BarChart3,
  },
  {
    title: "User-Centered Design Approach",
    description: "Every solution starts with understanding the user. Through interviews, journey mapping, and behavioral analysis, I ensure that products solve real problems and create meaningful experiences.",
    icon: Users,
  },
  {
    title: "Cross-Functional Collaboration",
    description: "Great products are built by great teams. I thrive in environments where business, design, and engineering work together, bringing diverse perspectives to solve complex challenges.",
    icon: Globe,
  },
  {
    title: "Continuous Learning & Growth",
    description: "Technology evolves rapidly, and so do I. I'm constantly exploring new frameworks, earning certifications, and staying updated with industry trends to deliver cutting-edge solutions.",
    icon: Lightbulb,
  },
  {
    title: "Process Optimization Focus",
    description: "I see inefficiencies as opportunities. From automating manual workflows to building scalable systems, I'm passionate about creating solutions that save time and improve productivity.",
    icon: Zap,
  },
  {
    title: "Quality & Attention to Detail",
    description: "Whether it's clean code, polished designs, or accurate analytics, I believe that attention to detail makes the difference between good and exceptional work.",
    icon: CheckCircle,
  },
  {
    title: "Impact-Driven Mindset",
    description: "I measure success by real business impact. Whether it's improving conversion rates, reducing operational costs, or enhancing user satisfaction, I focus on outcomes that matter.",
    icon: Heart,
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  // Carousel state - kept for potential future use (e.g., pagination indicators)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [current, setCurrent] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState<number>(0);
  const [isPageReady, setIsPageReady] = useState<boolean>(false);
  const [visibleVideos, setVisibleVideos] = useState<Set<string>>(new Set());

  // Mark page as ready after initial render
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPageReady(true);
    }
  }, []);

  // Aggressively optimized video loading - start loading immediately
  useEffect(() => {
    if (!isPageReady) return;

    // Prefetch first few videos immediately (above the fold)
    const allVideoSources = [
      ...productProjects.map(p => p.image),
      ...developmentProjects.map(p => p.image),
      ...designProjects.map(p => p.image),
    ].filter(src => src.endsWith('.webm'));

    // Prefetch first 3 videos immediately
    allVideoSources.slice(0, 3).forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = src;
      link.as = 'video';
      document.head.appendChild(link);
    });

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          const src = video.getAttribute('data-src');
          if (src && !visibleVideos.has(src)) {
            setVisibleVideos((prev) => new Set([...prev, src]));
            
            // Load video immediately when visible
            video.preload = 'auto';
            video.src = src;
            video.load();
            
            videoObserver.unobserve(video);
          }
        }
      });
    }, {
      rootMargin: '200px', // Start loading much earlier (200px before viewport)
      threshold: 0.01, // Trigger as soon as any part is visible
    });

    // Observe all videos with data-src attribute
    const videos = document.querySelectorAll('video[data-src]');
    videos.forEach((video) => videoObserver.observe(video));

    return () => {
      videos.forEach((video) => videoObserver.unobserve(video));
      videoObserver.disconnect();
    };
  }, [isPageReady, visibleVideos]);

  // Navigation highlighting on scroll
  useEffect(() => {
    if (!isPageReady) return;

    // Wait a bit for DOM to be fully ready
    const initNavigation = () => {
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-link");

      if (sections.length === 0 || navLinks.length === 0) {
        // Retry if sections aren't ready yet
        setTimeout(initNavigation, 100);
        return;
      }

      // Track which section is currently active
      let currentActiveSection = "";

      // Function to update active nav link
      const updateActiveNav = (sectionId: string) => {
        // Skip if already active
        if (sectionId === currentActiveSection) return;

        currentActiveSection = sectionId;

        // Update all navigation links
        navLinks.forEach((link) => {
          const href = link.getAttribute("href") ?? "";
          // Remove active class from all links
          link.classList.remove("nav-active");
          // Add active class to matching link
          if (href === `#${sectionId}`) {
            link.classList.add("nav-active");
          }
        });
      };

      // Function to find which section is currently in view - SIMPLIFIED AND RELIABLE
      const getCurrentSection = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const offset = 150; // Offset to account for navbar

        // If at very top, always show home
        if (scrollY < 50) {
          return "home";
        }

        // Find the section that's currently in view
        // Check sections in reverse order to catch the most recent one
        let currentSection = "home";

        // Loop through sections and find which one is currently at the top of viewport
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (!section) continue;

          const htmlSection = section as HTMLElement;
          const sectionId = section.getAttribute("id") ?? "";
          if (!sectionId) continue;

          const sectionTop = htmlSection.offsetTop;

          // If we've scrolled past this section's top (with offset), this is the active section
          if (scrollY + offset >= sectionTop) {
            currentSection = sectionId;
            break; // Found the section, stop checking
          }
        }

        return currentSection;
      };

      // Smooth scroll reveal animations - Chronicle style
      const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      };

      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      }, revealObserverOptions);

      // Observe all sections for reveal animations
      sections.forEach((section, index) => {
        revealObserver.observe(section);
        // Immediately add reveal class to first 2 sections (above fold) for instant visibility
        // Other sections will reveal on scroll for better performance
        if (index < 2) {
          section.classList.add('reveal');
        }
      });

      // Track scroll position for navbar background and nav highlighting
      const handleScroll = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        setIsScrolled(scrollY > 0);

        // Update active navigation based on current section
        const currentSection = getCurrentSection();
        if (currentSection) {
          updateActiveNav(currentSection);
        }
      };

      // Add scroll listener - use throttling for performance
      let ticking = false;
      function onScroll() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      }

      // Add scroll listener
      window.addEventListener("scroll", onScroll, { passive: true });

      // Also add resize listener in case sections move
      window.addEventListener("resize", handleScroll, { passive: true });

      // Set initial state immediately
      handleScroll();

      // Also set it after a short delay to ensure DOM is ready
      setTimeout(handleScroll, 100);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", handleScroll);
        revealObserver.disconnect();
      };
    };

    // Initialize navigation highlighting
    const cleanup = initNavigation();

    return cleanup;
  }, [isPageReady]);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect - defer initialization until page is ready
  useEffect(() => {
    if (!isPageReady) return;

    // Defer tilt initialization to not block initial render
    const initTilt = async () => {
      // Lazy load VanillaTilt
      const Tilt = await loadVanillaTilt();
      const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
      if (tilt.length > 0 && Tilt) {
        Tilt.init(tilt, {
          speed: 400, // Increased for smoother transitions
          glare: false,
          gyroscope: false,
          perspective: 1000, // Increased for more subtle effect
          scale: 1.02, // Slightly more noticeable scale
          transition: true,
          max: 5, // Increased tilt angle
          reset: true,
          easing: "cubic-bezier(.03,.98,.52,.99)", // Smooth easing
        });
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        void initTilt();
      }, { timeout: 2000 });
    } else {
      setTimeout(() => {
        void initTilt();
      }, 500);
    }
  }, [isPageReady]);

  return (
    <Container>
      <div>
        <Gradient />

        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex w-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 xl:flex-row xl:justify-between max-w-7xl mx-auto"
        >
          <div className={styles.intro}>
            <div className="flex flex-row flex-wrap items-center gap-1.5">
              <span className={styles.pill}>Product</span>
              <span className={styles.pill}>Analytics</span>
              <span className={styles.pill}>Development</span>
            </div>
            <div>
              <h1>
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hi, I&apos;m Kavin Arasan
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl">
                  Product & Data Analyst
                </span>
              </h1>
              <p className="mt-1 max-w-lg text-sm sm:text-base md:text-lg tracking-tight text-muted-foreground 2xl:text-xl">
                Passionate about turning data into decisions and insights into products. Building dashboards that uncover hidden trends and designing user experiences that drive behavior.
              </p>
            </div>
            <span className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-1.5 pt-6 w-full sm:w-auto">
              <Button onClick={() => scrollTo("#contact")} className="w-full sm:w-auto">
                Get in touch <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollTo("#about")}
                className="w-full sm:w-auto"
              >
                Learn More
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            id={styles["canvas-container"]}
            className="mt-8 sm:mt-12 md:mt-14 h-[300px] sm:h-[400px] md:h-[450px] w-full xl:mt-0 xl:h-[515px] relative overflow-hidden rounded-2xl"
          >
            {/* 3D Data Visualization - Pure CSS */}
            <div className="absolute inset-0 flex items-center justify-center perspective-1000 overflow-hidden">
              {/* Rotating Rings - Responsive sizing */}
              <div className="absolute w-[180px] h-[180px] xs:w-[220px] xs:h-[220px] sm:w-[280px] sm:h-[280px] md:w-[350px] md:h-[350px] animate-rotate-3d-slow preserve-3d">
                <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-primary/40 transform rotate-x-60 animate-pulse-slow"></div>
              </div>
              <div className="absolute w-[220px] h-[220px] xs:w-[260px] xs:h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] animate-rotate-3d-medium preserve-3d">
                <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-primary/30 transform rotate-y-45 animate-pulse-slower"></div>
              </div>
              <div className="absolute w-[260px] h-[260px] xs:w-[300px] xs:h-[300px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px] animate-rotate-3d-fast preserve-3d">
                <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-primary/20 transform rotate-x-45 rotate-y-45"></div>
              </div>

              {/* Central Data Node - Responsive */}
              <div className="absolute w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm border-2 border-primary/40 animate-pulse-gentle shadow-2xl shadow-primary/20">
                <div className="absolute inset-1 sm:inset-1.5 md:inset-2 rounded-full bg-gradient-to-tr from-primary/40 to-transparent animate-spin-slow"></div>
              </div>

              {/* Orbiting Nodes - Responsive */}
              <div className="absolute w-full h-full animate-spin-slower">
                <div className="absolute top-1/4 left-1/2 w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 -ml-1.25 xs:-ml-1.5 sm:-ml-2 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse-slow"></div>
                <div className="absolute top-3/4 left-1/4 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary shadow-lg shadow-secondary/50 animate-pulse-slower"></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-5 sm:h-5 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse-slow delay-1000"></div>
                <div className="absolute bottom-1/4 left-2/3 w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary shadow-lg shadow-secondary/50"></div>
              </div>

              {/* Connection Lines - Hidden on very small screens */}
              <svg className="absolute inset-0 w-full h-full opacity-10 xs:opacity-20 animate-pulse-gentle hidden xs:block" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
                <line x1="200" y1="200" x2="200" y2="100" stroke="url(#grad1)" strokeWidth="2" />
                <line x1="200" y1="200" x2="300" y2="200" stroke="url(#grad1)" strokeWidth="2" />
                <line x1="200" y1="200" x2="200" y2="300" stroke="url(#grad1)" strokeWidth="2" />
                <line x1="200" y1="200" x2="100" y2="200" stroke="url(#grad1)" strokeWidth="2" />
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#a78bfa', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
          <div className="flex max-w-6xl mx-auto flex-col justify-start space-y-8 sm:space-y-10">
            <h2 className="py-4 sm:py-8 pb-2 text-2xl sm:text-3xl md:text-4xl tracking-tighter leading-normal text-foreground xl:text-5xl">
              Currently pursuing B.Tech. in Computer Science at ABV-IIITM Gwalior and seeking internships in Product, Analytics, and Development starting January 2026. I enjoy collaborating across business and tech to make measurable impact through data-driven insights.
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-xs sm:text-sm text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Technologies */}
        <section id="technologies" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
          <div className="flex flex-col justify-start space-y-6 sm:space-y-8 max-w-7xl mx-auto">
            <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col justify-center py-6 xl:p-6">
                <h2 className="text-3xl sm:text-4xl tracking-tighter">
                  Core
                  <br />
                  <span className="text-gradient clash-grotesk">
                    Skills
                  </span>
                </h2>
                <p className="mt-2 text-sm sm:text-base tracking-tight text-secondary-foreground">
                  My expertise spans product management, data analytics, and full-stack development.
                </p>
              </div>
              {coreTechnologies.map((tech) => (
                <div
                  key={tech.title}
                  className="group flex flex-col items-start justify-between rounded-md bg-white/5 p-8 md:p-10 lg:p-12 shadow-md backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20"
                >
                  <div className="flex flex-col items-start w-full">
                    <tech.icon className="mb-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" size={24} />
                    <span className="text-lg sm:text-xl tracking-tighter text-foreground mb-3">
                      {tech.title}
                    </span>
                    <span className="text-sm sm:text-base tracking-tight text-muted-foreground leading-relaxed">
                      {tech.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
          <div className="mb-4 sm:mb-6 max-w-7xl mx-auto">
            <span className="text-gradient clash-grotesk text-xs sm:text-sm tracking-tighter">
              ✨ Recent Experience
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl tracking-tighter xl:text-6xl">
              Professional{" "}
              <span className="text-gradient clash-grotesk">Experience.</span>
            </h2>
            <p className="mt-1.5 text-sm sm:text-base tracking-tight text-muted-foreground xl:text-lg">
              Recent internships and freelance work in technology and product development.
            </p>

            <div className="mt-6 sm:mt-8 grid items-stretch gap-6 md:grid-cols-2">
              {/* IT Intern - Eros Group */}
              <div className="group flex flex-col items-start justify-between rounded-md bg-white/5 p-8 md:p-10 lg:p-12 shadow-md backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                <div className="flex flex-col items-start w-full">
                  <Building className="mb-6 text-primary transition-transform duration-300 group-hover:scale-110" size={24} />
                  <span className="text-lg sm:text-xl tracking-tighter text-foreground mb-2">
                    IT Intern — Eros Group
                  </span>
                  <span className="text-xs text-primary font-medium mb-4">
                    May 2025 – July 2025 | Dubai, UAE
                  </span>
                  <span className="text-sm sm:text-base tracking-tight text-muted-foreground leading-relaxed mb-4">
                    Led IT service desk analytics for 1,000+ requests, developing Power BI dashboards for senior leadership. Built 3 ERP modules using C# and .NET, collaborating with operations teams.
                  </span>
                </div>
                <div className="text-xs text-primary font-medium pt-2 border-t border-white/10 w-full">
                  Data Analytics • ERP Development • Process Automation
                </div>
              </div>

              {/* Frontend Developer - LUMINTRIQAI */}
              <Link href="https://www.figma.com/design/Wz2EkcZVY47SggKG6SnTMU/Actual-Page?node-id=0-1&t=hp6ZNFdTmxFTqoaL-1" target="_blank" className="group block h-full">
                <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-8 md:p-10 lg:p-12 shadow-md backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20 h-full">
                  <div className="flex flex-col items-start w-full">
                    <Code2 className="mb-6 text-primary transition-transform duration-300 group-hover:scale-110" size={24} />
                    <span className="text-lg sm:text-xl tracking-tighter text-foreground mb-2">
                      Frontend Developer — LUMINTRIQAI
                    </span>
                    <span className="text-xs text-primary font-medium mb-4">
                      Mar 2025 – Apr 2025 | Remote
                    </span>
                    <span className="text-sm sm:text-base tracking-tight text-muted-foreground leading-relaxed mb-4">
                      Developed and deployed a responsive React.js landing page for an AI consulting platform, integrating dynamic components and delivering pixel-perfect UI from Figma designs.
                    </span>
                  </div>
                  <div className="text-xs text-primary font-medium pt-2 border-t border-white/10 w-full flex items-center transition-transform duration-300 group-hover:translate-x-1">
                    View Project <ChevronRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div className="mb-4 sm:mb-6 max-w-7xl mx-auto">
            <span className="text-gradient clash-grotesk text-xs sm:text-sm tracking-tighter">
              ✨ Featured Projects
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl tracking-tighter xl:text-6xl">
              Product & Analytics Portfolio.
            </h2>
            <p className="mt-1.5 text-sm sm:text-base tracking-tight text-muted-foreground xl:text-lg">
              A showcase of my work in product management, data analytics, and full-stack development with measurable impact.
            </p>

            {/* Carousel */}
            <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-10">
              {/* Product & Strategy Projects */}
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl tracking-tighter text-foreground flex items-center">
                    <Target className="mr-2 text-primary" size={20} />
                    Product & Strategy
                  </h3>
                  {/* Mobile swipe indicator */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground sm:hidden animate-pulse">
                    <span>Swipe</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
                <Carousel setApi={setCarouselApi} className="w-full">
                  <CarouselContent>
                    {productProjects.map((project, index) => (
                      <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                        <Card id="tilt" className="group overflow-hidden">
                          <CardHeader className="p-0 relative">
                            <Link href={project.href} target="_blank" passHref>
                              {project.image.endsWith(".webm") ? (
                                <video
                                  data-src={project.image}
                                  src={visibleVideos.has(project.image) ? project.image : undefined}
                                  autoPlay={false}
                                  loop
                                  muted
                                  playsInline
                                  preload="none"
                                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover object-fill transition-transform duration-500 group-hover:scale-105"
                                  onMouseEnter={(e) => {
                                    const video = e.currentTarget;
                                    if (video.src && video.readyState >= 2) {
                                      video.play().catch(() => {
                                        // Silently handle play errors (e.g., user interaction required)
                                      });
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                  }}
                                />
                              ) : (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={600}
                                  height={300}
                                  quality={100}
                                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              )}
                              {/* Gradient overlay for better text readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                            </Link>
                          </CardHeader>
                          <CardContent className="absolute bottom-0 w-full bg-gradient-to-t from-background/90 via-background/60 to-transparent backdrop-blur-sm transition-all duration-300 group-hover:from-background/95">
                            <div className="p-2 sm:p-3">
                              <span className="text-[9px] sm:text-[10px] text-primary font-medium uppercase tracking-wide">{project.category}</span>
                              <CardTitle className="text-[10px] sm:text-xs font-normal tracking-tight leading-tight mt-0.5 line-clamp-2">
                                {project.description}
                              </CardTitle>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              {/* Development & Analytics Projects */}
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl tracking-tighter text-foreground flex items-center">
                    <Code2 className="mr-2 text-primary" size={20} />
                    Development & Analytics
                  </h3>
                  {/* Mobile swipe indicator */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground sm:hidden animate-pulse">
                    <span>Swipe</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
                <Carousel setApi={setCarouselApi} className="w-full">
                  <CarouselContent>
                    {developmentProjects.map((project, index) => (
                      <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                        <Card id="tilt" className="group overflow-hidden">
                          <CardHeader className="p-0 relative">
                            <Link href={project.href} target="_blank" passHref>
                              {project.image.endsWith(".webm") ? (
                                <video
                                  data-src={project.image}
                                  src={visibleVideos.has(project.image) ? project.image : undefined}
                                  autoPlay={false}
                                  loop
                                  muted
                                  playsInline
                                  preload="none"
                                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover object-fill transition-transform duration-500 group-hover:scale-105"
                                  onMouseEnter={(e) => {
                                    const video = e.currentTarget;
                                    if (video.src && video.readyState >= 2) {
                                      video.play().catch(() => {
                                        // Silently handle play errors (e.g., user interaction required)
                                      });
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                  }}
                                />
                              ) : (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={600}
                                  height={300}
                                  quality={100}
                                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              )}
                              {/* Gradient overlay for better text readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                            </Link>
                          </CardHeader>
                          <CardContent className="absolute bottom-0 w-full bg-gradient-to-t from-background/90 via-background/60 to-transparent backdrop-blur-sm transition-all duration-300 group-hover:from-background/95">
                            <div className="p-2 sm:p-3">
                              <span className="text-[9px] sm:text-[10px] text-primary font-medium uppercase tracking-wide">{project.category}</span>
                              <CardTitle className="text-[10px] sm:text-xs font-normal tracking-tight leading-tight mt-0.5 line-clamp-2">
                                {project.description}
                              </CardTitle>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              {/* Design & UI/UX Projects */}
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl tracking-tighter text-foreground flex items-center">
                    <Frame className="mr-2 text-primary" size={20} />
                    Design & UI/UX
                  </h3>
                  {/* Mobile swipe indicator */}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground sm:hidden animate-pulse">
                    <span>Swipe</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
                <Carousel setApi={setCarouselApi} className="w-full">
                  <CarouselContent>
                    {designProjects.map((project, index) => (
                      <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                        <Card id="tilt" className="group overflow-hidden">
                          <CardHeader className="p-0 relative">
                            <Link href={project.href} target="_blank" passHref>
                              {project.image.endsWith(".webm") ? (
                                <video
                                  data-src={project.image}
                                  src={visibleVideos.has(project.image) ? project.image : undefined}
                                  autoPlay={false}
                                  loop
                                  muted
                                  playsInline
                                  preload="none"
                                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover object-fill transition-transform duration-500 group-hover:scale-105"
                                  onMouseEnter={(e) => {
                                    const video = e.currentTarget;
                                    if (video.src && video.readyState >= 2) {
                                      video.play().catch(() => {
                                        // Silently handle play errors (e.g., user interaction required)
                                      });
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.pause();
                                  }}
                                />
                              ) : (
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  width={600}
                                  height={300}
                                  quality={100}
                                  className="aspect-video h-full w-full rounded-t-md bg-primary object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              )}
                              {/* Gradient overlay for better text readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                            </Link>
                          </CardHeader>
                          <CardContent className="absolute bottom-0 w-full bg-gradient-to-t from-background/90 via-background/60 to-transparent backdrop-blur-sm transition-all duration-300 group-hover:from-background/95">
                            <div className="p-2 sm:p-3">
                              <span className="text-[9px] sm:text-[10px] text-primary font-medium uppercase tracking-wide">{project.category}</span>
                              <CardTitle className="text-[10px] sm:text-xs font-normal tracking-tight leading-tight mt-0.5 line-clamp-2">
                                {project.description}
                              </CardTitle>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        {/* Expertise & Approach */}
        <section id="expertise" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
          <div className="flex flex-col justify-start space-y-6 sm:space-y-8 max-w-7xl mx-auto">
            <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="flex flex-col justify-center py-6 xl:p-6">
                <h2 className="text-3xl sm:text-4xl tracking-tighter">
                  Expertise &
                  <br />
                  <span className="text-gradient clash-grotesk">
                    Approach
                  </span>
                </h2>
                <p className="mt-2 text-sm sm:text-base tracking-tight text-secondary-foreground">
                  Combining technical skills with strategic thinking for measurable business impact.
                </p>
              </div>

              {/* Product Strategy & Data-Driven Approach */}
              <div className="group flex flex-col items-start justify-between rounded-md bg-white/5 p-8 md:p-10 lg:p-12 shadow-md backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                <div className="flex flex-col items-start w-full">
                  <Target className="mb-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-6" size={24} />
                  <span className="text-lg sm:text-xl tracking-tighter text-foreground mb-3">
                    Product Strategy & Data-Driven Approach
                  </span>
                  <span className="text-sm sm:text-base tracking-tight text-muted-foreground leading-relaxed mb-4">
                    A/B testing frameworks, user research, strategic roadmapping, and data-driven feature prioritization for measurable business growth.
                  </span>
                </div>
                <div className="text-xs text-primary font-medium pt-2 border-t border-white/10 w-full">
                  30% task completion improvement • Top 10 ProductSpace finalist
                </div>
              </div>

              {/* Data Analytics & Business Intelligence */}
              <div className="group flex flex-col items-start justify-between rounded-md bg-white/5 p-8 md:p-10 lg:p-12 shadow-md backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                <div className="flex flex-col items-start w-full">
                  <BarChart3 className="mb-6 text-primary transition-all duration-300 group-hover:scale-110" size={24} />
                  <span className="text-lg sm:text-xl tracking-tighter text-foreground mb-3">
                    Data Analytics & Business Intelligence
                  </span>
                  <span className="text-sm sm:text-base tracking-tight text-muted-foreground leading-relaxed mb-4">
                    Power BI dashboards, SQL optimization, KPI frameworks, and Python analysis that transform data into actionable business insights.
                  </span>
                </div>
                <div className="text-xs text-primary font-medium pt-2 border-t border-white/10 w-full">
                  9,000+ titles analyzed • 40% manual task reduction
                </div>
              </div>

              {/* Full-Stack Development */}
              <div className="group flex flex-col items-start justify-between rounded-md bg-white/5 p-8 md:p-10 lg:p-12 shadow-md backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                <div className="flex flex-col items-start w-full">
                  <Code2 className="mb-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3" size={24} />
                  <span className="text-lg sm:text-xl tracking-tighter text-foreground mb-3">
                    Full-Stack Development
                  </span>
                  <span className="text-sm sm:text-base tracking-tight text-muted-foreground leading-relaxed mb-4">
                    MERN stack applications, C# .NET solutions, and scalable systems with focus on performance optimization and user experience.
                  </span>
                </div>
                <div className="text-xs text-primary font-medium pt-2 border-t border-white/10 w-full">
                  500+ students served • JWT & Redis implementation
                </div>
              </div>

              {/* UX Design & Research */}
              <div className="group flex flex-col items-start justify-between rounded-md bg-white/5 p-8 md:p-10 lg:p-12 shadow-md backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                <div className="flex flex-col items-start w-full">
                  <Frame className="mb-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" size={24} />
                  <span className="text-lg sm:text-xl tracking-tighter text-foreground mb-3">
                    UX Design & Research
                  </span>
                  <span className="text-sm sm:text-base tracking-tight text-muted-foreground leading-relaxed mb-4">
                    User interviews, journey mapping, behavioral analysis, and Figma prototyping for conversion-focused digital experiences.
                  </span>
                </div>
                <div className="text-xs text-primary font-medium pt-2 border-t border-white/10 w-full">
                  Quarter-Finals L&apos;Oréal Challenge • Conversion optimization
                </div>
              </div>

              {/* Collaborative Leadership */}
              <div className="group flex flex-col items-start justify-between rounded-md bg-white/5 p-8 md:p-10 lg:p-12 shadow-md backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-xl hover:shadow-primary/10 border border-transparent hover:border-primary/20">
                <div className="flex flex-col items-start w-full">
                  <Globe className="mb-6 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" size={24} />
                  <span className="text-lg sm:text-xl tracking-tighter text-foreground mb-3">
                    Collaborative Leadership
                  </span>
                  <span className="text-sm sm:text-base tracking-tight text-muted-foreground leading-relaxed mb-4">
                    Bridging business, design, and engineering teams. Thriving in cross-functional environments to solve complex challenges with diverse perspectives.
                  </span>
                </div>
                <div className="text-xs text-primary font-medium pt-2 border-t border-white/10 w-full">
                  Led 26-member design team • 30+ communications & 25+ digital assets delivered
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
          <div className="flex flex-col items-center justify-center space-y-12 sm:space-y-16 max-w-5xl mx-auto">
            {/* Header - Centered */}
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="text-gradient clash-grotesk text-sm sm:text-base tracking-tighter font-medium">
                Let&apos;s Connect
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-tight">
                Ready to create{" "}
                <span className="text-gradient clash-grotesk">impact?</span>
              </h2>
              <p className="text-base sm:text-lg tracking-tight text-muted-foreground max-w-2xl">
                Available for Product Management, Analytics & Development opportunities
                <span className="block mt-1 text-primary font-medium">Starting January 2026</span>
              </p>
            </div>

            {/* Logo-based Contact Cards - Clean & Minimal */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full">
              {/* Email */}
              <Link href="mailto:kavinarasan2019@gmail.com" className="group block">
                <div className="flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 aspect-square">
                  <Mail className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary mb-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
                  <span className="text-sm sm:text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                    Email
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">Contact</span>
                </div>
              </Link>

              {/* LinkedIn */}
              <Link href="https://linkedin.com/in/kavinarasan" target="_blank" className="group block">
                <div className="flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 aspect-square">
                  <Linkedin className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary mb-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-6" />
                  <span className="text-sm sm:text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                    LinkedIn
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">Network</span>
                </div>
              </Link>

              {/* GitHub */}
              <Link href="https://github.com/kavinarasan-005" target="_blank" className="group block">
                <div className="flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 aspect-square">
                  <Code2 className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary mb-4 transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6" />
                  <span className="text-sm sm:text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                    GitHub
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">Projects</span>
                </div>
              </Link>

              {/* Resume */}
              <Link href="https://drive.google.com/file/d/14HQoHIGPDlGffvKBwOrx6YKhjW8W4j9o/view?usp=sharing" target="_blank" className="group block">
                <div className="flex flex-col items-center justify-center p-8 sm:p-10 md:p-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/20 aspect-square">
                  <FileText className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary mb-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-3" />
                  <span className="text-sm sm:text-base font-medium text-foreground transition-colors duration-300 group-hover:text-primary">
                    Resume
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">Download</span>
                </div>
              </Link>
            </div>

            {/* Additional Info - Clean */}
            <div className="flex flex-col items-center text-center space-y-2 pt-4">
              <p className="text-sm text-muted-foreground">
                Based in <span className="text-foreground font-medium">Dubai, UAE</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Open to Remote • Hybrid • On-site opportunities
              </p>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
