import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Dynamically import Spline with no SSR
const Spline = dynamic(() => import("@splinetool/react-spline").then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <span className="text-muted-foreground">Loading 3D scene...</span>
    </div>
  )
});

// Error fallback component
const SplineError = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="text-center">
      <p className="text-muted-foreground mb-2">3D scene unavailable</p>
      <p className="text-xs text-muted-foreground/70">Please refresh the page</p>
    </div>
  </div>
);
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
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Years of Experience", value: "2+" },
  { label: "Projects Completed", value: "11+" },
  { label: "Certifications", value: "6+" },
];

const coreTechnologies = [
  {
    title: "Product Management",
    description: "Strategic roadmapping, PRD creation, A/B testing frameworks, and data-driven feature prioritization for maximum business impact.",
    icon: Target,
  },
  {
    title: "Data Analytics",
    description: "Advanced SQL queries, Power BI dashboards, Python analysis, and data visualization to transform raw data into actionable insights.",
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
    title: "Business Intelligence",
    description: "Executive dashboard creation, KPI framework design, metric definition, and strategic reporting for data-driven decision making.",
    icon: TrendingUp,
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

const technicalHighlights = [
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

const careerFocus = [
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

const contactInfo = [
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

const opportunities = [
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

const workingPrinciples = [
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
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [splineScene, setSplineScene] = useState<string>("/assets/scene.splinecode");

  // Set absolute URL for Spline scene in production
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSplineScene(`${window.location.origin}/assets/scene.splinecode`);
    }
  }, []);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let locomotiveInstance: any = null;
    let handleScrollCleanup: (() => void) | null = null;

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      const loco = new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
        multiplier: 0.7, // Reduced for smoother scrolling
        class: "is-revealed",
        scrollbarContainer: false,
        scrollbarClass: 'c-scrollbar',
        getDirection: true,
        getSpeed: true,
        lerp: 0.05, // Reduced for smoother transitions
        resetNativeScroll: true, // Added for better native scroll behavior
        smartphone: {
          smooth: true, // Enable smooth scroll on mobile
        },
        tablet: {
          smooth: true, // Enable smooth scroll on tablet
          breakpoint: 1024,
        },
      });
      
      locomotiveInstance = loco;
      // expose instance for external scroll actions (used by scrollTo helper)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as { locomotive?: any }).locomotive = loco;

      // Handle scroll event - use window scroll which works with locomotive
      function handleScroll() {
        // Get scroll position - try locomotive's scroll instance first, fallback to window
        let scrollY = window.scrollY || document.documentElement.scrollTop;
        
        // Try to get locomotive scroll position if available
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (locomotiveInstance?.scroll?.instance?.scroll?.y !== undefined) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          scrollY = locomotiveInstance.scroll.instance.scroll.y;
        }
        
        setIsScrolled(scrollY > 0);

        let current = "";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const navHeight = 80; // Navbar height offset
          // Check if we're at or past the section start (with some threshold)
          if (scrollY >= sectionTop - navHeight - 100) {
            current = section.getAttribute("id") ?? "";
          }
        });

        navLinks.forEach((li) => {
          li.classList.remove("nav-active");
          if (li.getAttribute("href") === `#${current}`) {
            li.classList.add("nav-active");
          }
        });
      }

      // Use requestAnimationFrame for smoother scroll tracking
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

      window.addEventListener("scroll", onScroll, { passive: true });
      
      // Store cleanup function
      handleScrollCleanup = () => {
        window.removeEventListener("scroll", onScroll);
      };
    }

    void getLocomotive();

    return () => {
      // cleanup scroll handlers
      if (handleScrollCleanup) {
        handleScrollCleanup();
      }
      
      // cleanup locomotive instance if created
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (typeof window !== 'undefined' && (window as { locomotive?: { destroy?: () => void } }).locomotive) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          (window as { locomotive?: { destroy?: () => void } }).locomotive?.destroy?.();
        } catch (e) {
          // ignore destroy errors
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as { locomotive?: any }).locomotive;
      }
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
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
  }, []);

  return (
    <Container>
      <div className="flex flex-col space-y-32">
        <div ref={refScrollContainer}>
          <Gradient />

          {/* Hero Section */}
          <section
            id="home"
            data-scroll-section
            className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
          >
            <div className={styles.intro}>
              <div className="flex flex-row items-center space-x-1.5">
                <span className={styles.pill}>Product</span>
                <span className={styles.pill}>Analytics</span>
                <span className={styles.pill}>Development</span>
              </div>
              <div>
                <h1>
                  <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                    Hi, I&apos;m Kavin Arasan
                    <br />
                  </span>
                  <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                    Product & Data Analyst
                  </span>
                </h1>
                <p className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl">
                  Passionate about turning data into decisions and insights into products. Building dashboards that uncover hidden trends and designing user experiences that drive behavior.
                </p>
              </div>
              <span className="flex flex-row items-center space-x-1.5 pt-6">
                <Button onClick={() => scrollTo("#contact")}>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollTo("#about")}
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
              className="mt-14 h-full w-full xl:mt-0"
            >
              <Suspense fallback={
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <span className="text-muted-foreground">Loading 3D scene...</span>
                </div>
              }>
                <ErrorBoundary fallback={<SplineError />}>
                  <Spline 
                    scene={splineScene}
                    onLoad={() => {
                      console.log("Spline scene loaded successfully");
                    }}
                    onError={(error) => {
                      console.error("Spline error:", error);
                      console.log("Attempting to load from:", splineScene);
                    }}
                  />
                </ErrorBoundary>
              </Suspense>
            </div>
          </section>

          {/* About */}
          <section id="about" data-scroll-section>
            <div className="my-8 flex max-w-6xl flex-col justify-start space-y-10">
              <h2 className="py-8 pb-2 text-4xl tracking-tighter leading-normal text-foreground xl:text-5xl">
                Currently pursuing B.Tech. in Computer Science at ABV-IIITM Gwalior and seeking internships in Product, Analytics, and Development starting January 2026. I enjoy collaborating across business and tech to make measurable impact through data-driven insights.
              </h2>
              <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center xl:items-start xl:text-start"
                  >
                    <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                      {stat.value}
                    </span>
                    <span className="tracking-tight text-muted-foreground xl:text-lg">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Core Technologies */}
          <section id="technologies" data-scroll-section>
            <div
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="my-4 flex flex-col justify-start space-y-6"
            >
              <div className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3">
                <div className="flex flex-col py-6 xl:p-6">
                  <h2 className="text-4xl tracking-tighter">
                    Core
                    <br />
                    <span className="text-gradient clash-grotesk">
                      Skills
                    </span>
                  </h2>
                  <p className="mt-2 tracking-tight text-secondary-foreground">
                    My expertise spans product management, data analytics, and full-stack development.
                  </p>
                </div>
                {coreTechnologies.map((tech) => (
                  <div
                    key={tech.title}
                    className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md min-h-[280px]"
                  >
                    <div className="flex flex-col items-start">
                      <tech.icon className="mb-6 text-primary" size={20} />
                      <span className="text-lg tracking-tighter text-foreground">
                        {tech.title}
                      </span>
                    </div>
                    <span className="mt-2 tracking-tight text-muted-foreground">
                      {tech.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience */}
          <section id="experience" data-scroll-section>
            <div
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="-mt-8 mb-2"
            >
              <span className="text-gradient clash-grotesk text-sm tracking-tighter">
                ✨ Recent Experience
              </span>
              <h2 className="mt-3 text-4xl tracking-tighter xl:text-6xl">
                Professional{" "}
                <span className="text-gradient clash-grotesk">Experience.</span>
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                Recent internships and freelance work in technology and product development.
              </p>

              <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
                {/* IT Intern - Eros Group */}
                <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                  <div className="flex flex-col items-start">
                    <Building className="mb-6 text-primary" size={20} />
                    <span className="text-lg tracking-tighter text-foreground">
                      IT Intern — Eros Group
                    </span>
                    <span className="mt-1 text-xs text-primary font-medium">
                      May 2025 – July 2025 | Dubai, UAE
                    </span>
                  </div>
                  <span className="mt-6 tracking-tight text-muted-foreground">
                    Led IT service desk analytics for 1,000+ requests, developing Power BI dashboards for senior leadership. Built 3 ERP modules using C# and .NET, collaborating with operations teams.
                  </span>
                  <div className="mt-6 text-xs text-primary font-medium">
                    Data Analytics • ERP Development • Process Automation
                  </div>
                </div>

                {/* Frontend Developer - LUMINTRIQAI */}
                <Link href="https://www.figma.com/design/Wz2EkcZVY47SggKG6SnTMU/Actual-Page?node-id=0-1&t=hp6ZNFdTmxFTqoaL-1" target="_blank" className="group">
                  <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                    <div className="flex flex-col items-start">
                      <Code2 className="mb-6 text-primary" size={20} />
                      <span className="text-lg tracking-tighter text-foreground">
                        Frontend Developer — LUMINTRIQAI
                      </span>
                      <span className="mt-1 text-xs text-primary font-medium">
                        Mar 2025 – Apr 2025 | Remote
                      </span>
                    </div>
                    <span className="mt-6 tracking-tight text-muted-foreground">
                      Developed and deployed a responsive React.js landing page for an AI consulting platform, integrating dynamic components and delivering pixel-perfect UI from Figma designs.
                    </span>
                    <div className="mt-6 text-xs text-primary font-medium flex items-center">
                      View Project <ChevronRight className="ml-1 h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" data-scroll-section>
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
            <div data-scroll data-scroll-speed=".4" className="-mt-8 mb-2">
              <span className="text-gradient clash-grotesk text-sm tracking-tighter">
                ✨ Featured Projects
              </span>
              <h2 className="mt-3 text-4xl tracking-tighter xl:text-6xl">
                Product & Analytics Portfolio.
              </h2>
              <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
                A showcase of my work in product management, data analytics, and full-stack development with measurable impact.
              </p>

              {/* Carousel */}
              <div className="mt-8 space-y-8">
                {/* Product & Strategy Projects */}
                <div>
                  <h3 className="text-xl tracking-tighter text-foreground mb-6 flex items-center">
                    <Target className="mr-2 text-primary" size={20} />
                    Product & Strategy
                  </h3>
                  <Carousel setApi={setCarouselApi} className="w-full">
                    <CarouselContent>
                      {productProjects.map((project, index) => (
                        <CarouselItem key={index} className="md:basis-1/3">
                          <Card id="tilt">
                            <CardHeader className="p-0">
                              <Link href={project.href} target="_blank" passHref>
                                {project.image.endsWith(".webm") ? (
                                  <video
                                    src={project.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="none"
                                    className="aspect-video h-full w-full rounded-t-md bg-primary object-cover object-fill"
                                  />
                                ) : (
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={300}
                                    quality={100}
                                    className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                  />
                                )}
                              </Link>
                            </CardHeader>
                            <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                              <div className="border-t border-white/5 p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-primary font-medium">{project.category}</span>
                                </div>
                                <CardTitle className="text-base font-normal tracking-tighter">
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
                  <h3 className="text-xl tracking-tighter text-foreground mb-6 flex items-center">
                    <Code2 className="mr-2 text-primary" size={20} />
                    Development & Analytics
                  </h3>
                  <Carousel setApi={setCarouselApi} className="w-full">
                    <CarouselContent>
                      {developmentProjects.map((project, index) => (
                        <CarouselItem key={index} className="md:basis-1/3">
                          <Card id="tilt">
                            <CardHeader className="p-0">
                              <Link href={project.href} target="_blank" passHref>
                                {project.image.endsWith(".webm") ? (
                                  <video
                                    src={project.image}
                                    autoPlay
                                    loop
                                    muted
                                    className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                  />
                                ) : (
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={300}
                                    quality={100}
                                    className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                  />
                                )}
                              </Link>
                            </CardHeader>
                            <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                              <div className="border-t border-white/5 p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-primary font-medium">{project.category}</span>
                                </div>
                                <CardTitle className="text-base font-normal tracking-tighter">
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
                  <h3 className="text-xl tracking-tighter text-foreground mb-6 flex items-center">
                    <Frame className="mr-2 text-primary" size={20} />
                    Design & UI/UX
                  </h3>
                  <Carousel setApi={setCarouselApi} className="w-full">
                    <CarouselContent>
                      {designProjects.map((project, index) => (
                        <CarouselItem key={index} className="md:basis-1/3">
                          <Card id="tilt">
                            <CardHeader className="p-0">
                              <Link href={project.href} target="_blank" passHref>
                                {project.image.endsWith(".webm") ? (
                                  <video
                                    src={project.image}
                                    autoPlay
                                    loop
                                    muted
                                    className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                  />
                                ) : (
                                  <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={300}
                                    quality={100}
                                    className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                                  />
                                )}
                              </Link>
                            </CardHeader>
                            <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                              <div className="border-t border-white/5 p-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-primary font-medium">{project.category}</span>
                                </div>
                                <CardTitle className="text-base font-normal tracking-tighter">
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
          <section id="expertise" data-scroll-section>
            <div
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="-mt-8 mb-2 flex flex-col justify-start space-y-6"
            >
              <div className="grid items-start gap-1.5 md:grid-cols-2 xl:grid-cols-3">
                <div className="flex flex-col py-6 xl:p-6">
                  <h2 className="text-4xl tracking-tighter">
                    Expertise &
                    <br />
                    <span className="text-gradient clash-grotesk">
                      Approach
                    </span>
                  </h2>
                  <p className="mt-2 tracking-tight text-secondary-foreground">
                    Combining technical skills with strategic thinking for measurable business impact.
                  </p>
                </div>
                
                {/* Product Strategy & Impact */}
                <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md h-[280px]">
                  <div className="flex flex-col items-start">
                    <Target className="mb-6 text-primary" size={20} />
                    <span className="text-lg tracking-tighter text-foreground">
                      Product Strategy & Impact
                    </span>
                  </div>
                  <span className="mt-2 tracking-tight text-muted-foreground flex-1">
                    A/B testing frameworks, user research, strategic roadmapping, and data-driven feature prioritization for measurable business growth.
                  </span>
                  <div className="mt-4 text-xs text-primary font-medium">
                    30% task completion improvement • Top 10 ProductSpace finalist
                  </div>
                </div>

                {/* Data Analytics & Intelligence */}
                <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md h-[280px]">
                  <div className="flex flex-col items-start">
                    <BarChart3 className="mb-6 text-primary" size={20} />
                    <span className="text-lg tracking-tighter text-foreground">
                      Data Analytics & Intelligence
                    </span>
                  </div>
                  <span className="mt-2 tracking-tight text-muted-foreground flex-1">
                    Power BI dashboards, SQL optimization, KPI frameworks, and Python analysis that transform complex data into actionable business insights.
                  </span>
                  <div className="mt-4 text-xs text-primary font-medium">
                    9,000+ titles analyzed • 40% manual task reduction
                  </div>
                </div>

                {/* Full-Stack Development */}
                <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md h-[280px]">
                  <div className="flex flex-col items-start">
                    <Code2 className="mb-6 text-primary" size={20} />
                    <span className="text-lg tracking-tighter text-foreground">
                      Full-Stack Development
                    </span>
                  </div>
                  <span className="mt-2 tracking-tight text-muted-foreground flex-1">
                    MERN stack applications, C# .NET solutions, and scalable systems with focus on performance optimization and user experience.
                  </span>
                  <div className="mt-4 text-xs text-primary font-medium">
                    500+ students served • JWT & Redis implementation
                  </div>
                </div>

                {/* UX Design & Research */}
                <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md h-[280px]">
                  <div className="flex flex-col items-start">
                    <Frame className="mb-6 text-primary" size={20} />
                    <span className="text-lg tracking-tighter text-foreground">
                      UX Design & Research
                    </span>
                  </div>
                  <span className="mt-2 tracking-tight text-muted-foreground flex-1">
                    User interviews, journey mapping, behavioral analysis, and Figma prototyping for conversion-focused digital experiences.
                  </span>
                  <div className="mt-4 text-xs text-primary font-medium">
                    Quarter-Finals L&apos;Oréal Challenge • Conversion optimization
                  </div>
                </div>

                {/* Data-Driven Decision Making */}
                <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md h-[280px]">
                  <div className="flex flex-col items-start">
                    <BarChart3 className="mb-6 text-primary" size={20} />
                    <span className="text-lg tracking-tighter text-foreground">
                      Data-Driven Methodology
                    </span>
                  </div>
                  <span className="mt-2 tracking-tight text-muted-foreground flex-1">
                    Every decision backed by metrics and analytics. Using A/B testing and user behavior analysis to validate assumptions and optimize outcomes.
                  </span>
                </div>

                {/* Cross-Functional Collaboration */}
                <div className="flex flex-col items-start justify-between rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md h-[280px]">
                  <div className="flex flex-col items-start">
                    <Globe className="mb-6 text-primary" size={20} />
                    <span className="text-lg tracking-tighter text-foreground">
                      Collaborative Leadership
                    </span>
                  </div>
                  <span className="mt-2 tracking-tight text-muted-foreground flex-1">
                    Bridging business, design, and engineering teams. Thriving in cross-functional environments to solve complex challenges with diverse perspectives.
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" data-scroll-section>
            <div
              data-scroll
              data-scroll-speed=".4"
              data-scroll-position="top"
              className="-mt-8 mb-8 flex flex-col justify-start space-y-12"
            >
              {/* Header */}
              <div className="flex flex-col items-start">
                <span className="text-gradient clash-grotesk text-sm tracking-tighter">
                  ✨ Let&apos;s Connect
                </span>
                <h2 className="mt-3 text-4xl tracking-tighter xl:text-6xl">
                  Ready to create{" "}
                  <span className="text-gradient clash-grotesk">impact?</span>
                </h2>
                <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg max-w-2xl">
                  Available for Product Management, Analytics, and Development internships starting January 2026. Let&apos;s build something amazing together.
                </p>
              </div>

              {/* Contact Grid */}
              <div className="grid items-stretch gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">

                {/* Let's Connect */}
                <Link href="mailto:kavinarasan2019@gmail.com" className="group block h-full">
                  <div className="flex h-full flex-col items-start justify-between rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                    <div className="flex flex-col items-start space-y-2">
                      <Mail className="text-primary" size={20} />
                      <span className="text-lg tracking-tighter text-foreground">
                        Let&apos;s Collaborate
                      </span>
                    </div>
                    <span className="mt-4 tracking-tight text-muted-foreground">
                      Open to discussing exciting projects, internship opportunities, freelance work, and collaborative ventures. Always ready for new challenges.
                    </span>
                    <div className="mt-6 text-xs text-primary font-medium">
                      kavinarasan2019@gmail.com • Professional inquiries
                    </div>
                  </div>
                </Link>

                {/* LinkedIn */}
                <Link href="https://linkedin.com/in/kavinarasan" target="_blank" className="group block h-full">
                  <div className="flex h-full flex-col items-start justify-between rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                    <div className="flex flex-col items-start space-y-2">
                      <Linkedin className="text-primary" size={20} />
                      <span className="text-lg tracking-tighter text-foreground">
                        Professional Network
                      </span>
                    </div>
                    <span className="mt-4 tracking-tight text-muted-foreground">
                      Connect on LinkedIn for professional networking, career updates, and industry insights. Let&apos;s build meaningful connections.
                    </span>
                    <div className="mt-6 text-xs text-primary font-medium">
                      linkedin.com/in/kavinarasan • Professional updates
                    </div>
                  </div>
                </Link>

                {/* GitHub */}
                <Link href="https://github.com/kavinarasan-005" target="_blank" className="group block h-full">
                  <div className="flex h-full flex-col items-start justify-between rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                    <div className="flex flex-col items-start space-y-2">
                      <Code2 className="text-primary" size={20} />
                      <span className="text-lg tracking-tighter text-foreground">
                        Code Repository
                      </span>
                    </div>
                    <span className="mt-4 tracking-tight text-muted-foreground">
                      Explore my open-source projects, contributions, and code samples. Dive into technical implementations and development journey.
                    </span>
                    <div className="mt-6 text-xs text-primary font-medium">
                      github.com/kavinarasan-005 • Open source projects
                    </div>
                  </div>
                </Link>

                {/* Resume */}
                            {/* Resume */}
                <Link href="https://drive.google.com/file/d/14HQoHIGPDlGffvKBwOrx6YKhjW8W4j9o/view?usp=sharing" target="_blank" className="group block h-full">
                  <div className="flex h-full flex-col items-start justify-between rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                    <div className="flex flex-col items-start space-y-2">
                      <FileText className="text-primary" size={20} />
                      <span className="text-lg tracking-tighter text-foreground">
                        Professional Resume
                      </span>
                    </div>
                    <span className="mt-4 tracking-tight text-muted-foreground">
                      Download detailed resume with complete work experience, projects, skills, and achievements. Comprehensive professional overview.
                    </span>
                    <div className="mt-6 text-xs text-primary font-medium">
                      PDF Download • Complete professional profile
                    </div>
                  </div>
                </Link>

                {/* Opportunities */}
                <div className="flex h-full flex-col items-start justify-between rounded-md bg-white/5 p-8 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md">
                  <div className="flex flex-col items-start space-y-2">
                    <Rocket className="text-primary" size={20} />
                    <span className="text-lg tracking-tighter text-foreground">
                      Current Availability
                    </span>
                  </div>
                  <span className="mt-4 tracking-tight text-muted-foreground">
                    Actively seeking Product Management, Business Analytics, and Software Development internship opportunities starting January 2026.
                  </span>
                  <div className="mt-6 text-xs text-primary font-medium">
                    Dubai, UAE • Remote/Hybrid • Full-time internships
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
