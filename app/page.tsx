"use client"

import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Code2,
  Download,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Terminal,
  Zap,
  Globe,
  Star,
} from "lucide-react"

const profileImage = "/profile.jpg"

const socialLinks = [
  { label: "GitHub", href: "https://github.com/SejalKhedekar2000", short: "Github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sejalkhedekar/", short: "LinkedIn" },
  { label: "Email", href: "mailto:khedekar.sejal02@gmail.com", short: "Email" },
]

const aboutCards = [
  {
    title: "Industry Experience",
    text: "Built enterprise healthcare platforms at TCS with a focus on API integration, React migration, and production reliability.",
    icon: <Briefcase className="h-5 w-5" />,
    color: "#22d3ee",
  },
  {
    title: "Academic Depth",
    text: "MS in Software Engineering at Arizona State University with applied work across full stack development.",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "#818cf8",
  },
  {
    title: "Execution Style",
    text: "I care about product quality, maintainability, performance, and software that feels polished and dependable in real use.",
    icon: <Sparkles className="h-5 w-5" />,
    color: "#34d399",
  },
]

const skillGroups = [
  {
    title: "Frontend",
    accent: "#22d3ee",
    items: ["React", "Next.js", "TypeScript", "Vue", "HTML", "CSS"],
  },
  {
    title: "Backend",
    accent: "#818cf8",
    items: ["Java", "Spring Boot", ".NET", "Node.js", "REST APIs", "GraphQL"],
  },
  {
    title: "Cloud & DevOps",
    accent: "#34d399",
    items: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Jenkins"],
  },
]

const projects = [
  {
    title: "Auto BIM Route AI",
    tag: "AI / Automation",
    color: "#22d3ee",
    text: "AI powered Revit assistant for BIM querying, troubleshooting, and workflow support inside Autodesk Revit.",
    metrics: ["Revit API", "REST Integration", "AI Workflow"],
  },
  {
    title: "Protocol Racer",
    tag: "Performance / DevOps",
    color: "#818cf8",
    text: "Benchmarking platform for HTTP/2 and HTTP/3 with microservices, visual metrics, and containerized testing.",
    metrics: ["HTTP/3", "Microservices", "Docker"],
  },
]

const timeline = [
  {
    role: "Teaching Aide",
    org: "Arizona State University",
    period: "2025 – Present",
    color: "#22d3ee",
    text: "Built Python based grading workflows on AWS and improved faculty assessment speed across 100+ students.",
    skills: ["Python", "AWS", "Automation"],
  },
  {
    role: "Full Stack Software Engineer",
    org: "Tata Consultancy Services",
    period: "2022 – 2024",
    color: "#818cf8",
    text: "Delivered enterprise software for healthcare systems with focus on reliability, APIs, React migration, and CI/CD.",
    skills: ["React", "Java", "APIs", "CI/CD"],
  },
  {
    role: "Software Engineering Intern",
    org: "APSIT Skills",
    period: "2020 – 2021",
    color: "#34d399",
    text: "Built Java full stack applications with Spring Boot, MySQL, testing, and Linux based workflows.",
    skills: ["Java", "Spring Boot", "MySQL"],
  },
]

const certifications = [
  {
    title: "Google Cloud Associate Cloud Engineer",
    issuer: "Google Cloud",
    color: "#22d3ee",
  },
  {
    title: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    color: "#818cf8",
  },
]

function useMagneticCursor() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 20 })
  const springY = useSpring(y, { stiffness: 180, damping: 20 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 12)
      y.set(e.clientY - 12)
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [x, y])

  return { springX, springY }
}

function useTypewriter(words: string[], speed = 75) {
  const [display, setDisplay] = useState("")
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIndex + 1)
        setDisplay(next)
        if (next.length === current.length) {
          setTimeout(() => setDeleting(true), 1200)
        } else {
          setCharIndex((c) => c + 1)
        }
      } else {
        const next = current.slice(0, charIndex - 1)
        setDisplay(next)
        if (next.length === 0) {
          setDeleting(false)
          setWordIndex((w) => w + 1)
          setCharIndex(0)
        } else {
          setCharIndex((c) => c - 1)
        }
      }
    }, deleting ? speed / 2 : speed)

    return () => clearTimeout(timer)
  }, [charIndex, deleting, speed, wordIndex, words])

  return display
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

function scaleIn(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.92 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

function CustomCursor({ springX, springY }: { springX: any; springY: any }) {
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-6 w-6 rounded-full border border-cyan-300/40 bg-cyan-300/10 md:block"
      style={{ x: springX, y: springY }}
    />
  )
}

function Noise() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <motion.div {...fadeUp()} className="mb-3 flex items-center gap-3">
      <span className="h-px w-10 bg-cyan-400/40" />
      <span className="font-mono text-xs uppercase tracking-[0.28em] text-cyan-300/75">{text}</span>
    </motion.div>
  )
}



export default function Page() {
  const { springX, springY } = useMagneticCursor()
  const heroRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const typeText = useTypewriter(
    ["Full Stack Engineer", "Software Problem Solver"],
    70
  )

  const navItems = useMemo(
    () => [
      ["Home", "#home"],
      ["About", "#about"],
      ["Experience", "#experience"],
      ["Skills", "#skills"],
      ["Projects", "#projects"],
      ["Contact", "#contact"],
    ],
    []
  )

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06080f] text-white">
      <Noise />
      <CustomCursor springX={springX} springY={springY} />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-5rem] top-[12rem] h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-6rem] right-[-2rem] h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.08),transparent_26%)]"
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#06080f]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <motion.a
            href="#home"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-semibold tracking-tight text-white"
          >
           
          </motion.a>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map(([label, href], index) => (
              <motion.a
                key={label}
                href={href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
              >
                {label}
              </motion.a>
            ))}
          </nav>

          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -2, boxShadow: "0 0 22px rgba(34,211,238,0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="hidden items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-[#06080f] md:flex"
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </motion.a>
        </div>
      </header>

      <section
        id="home"
        ref={heroRef}
        className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-28 md:px-8"
      >
        <motion.div style={{ y: heroY }} className="grid w-full gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-emerald-300">Open to software engineering roles</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-[clamp(3rem,8vw,6.4rem)] font-bold leading-[0.92] tracking-tight text-white"
              >
                Sejal
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Khedekar
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 flex items-center gap-3"
            >
              <span className="font-mono text-lg font-medium text-slate-300 md:text-xl">
                {typeText}
                <span className="ml-1 inline-block h-5 w-px animate-[blink_1s_step-end_infinite] bg-cyan-400 align-middle" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.6 }}
              className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg"
            >
             I take challenge problems and make them disappear. Whether it's a slow backend, a brittle API, a frontend that hurts to use, or an AI feature that needs to actually work in production. I build systems that hold up under pressure and feel effortless to the people using them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.72 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              {socialLinks.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: 0.8 + index * 0.06 }}
                  className="flex h-15 w-20 items-center justify-center rounded-full border border-cyan-400/25 bg-[#0b101a] text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400 hover:text-[#06080f]"
                  aria-label={item.label}
                >
                  {item.short}
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.92 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03, y: -3, boxShadow: "0 0 26px rgba(34,211,238,0.35)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-full bg-cyan-400 px-7 py-4 text-sm font-bold text-[#06080f]"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 rounded-full border border-white/[0.09] bg-white/[0.03] px-7 py-4 text-sm font-semibold text-white"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 1.02 }}
              className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[2.2rem] bg-cyan-400/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-[#0c111c] p-4 shadow-[0_0_60px_rgba(34,211,238,0.12)]">
                <div className="relative h-[450px] w-[310px] overflow-hidden rounded-[1.6rem] md:h-[450px] md:w-[380px]">
                  <img src={profileImage} alt="Sejal Khedekar" className="h-full w-full object-cover" height="1000px"/>
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(6,8,15,0.75),transparent_42%)]" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.65 }}
                  className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/[0.08] bg-[#06080f]/70 p-4 backdrop-blur-xl"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-300">Based in USA · Open to relocation</p>
                  <p className="mt-2 text-lg font-semibold text-white">Engineer. Builder. Problem Solver.</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Focused on strong systems, clean execution, and practical impact.</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="text-center">
          <SectionLabel text="About" />
        </div>
        <motion.h2 {...fadeUp(0.05)} className="mx-auto max-w-4xl text-center font-serif text-4xl font-bold text-white md:text-5xl">
          A builder who ships product quality and engineering depth
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="mx-auto mt-5 max-w-2xl text-center text-slate-400">
         I work across enterprise software, cloud systems, frontend modernization, and AI-powered workflows.
        </motion.p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {aboutCards.map((card, index) => (
            <motion.div
              key={card.title}
              {...scaleIn(index * 0.08)}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${card.color}15`, color: card.color }}>
                {card.icon}
              </div>
              <h3 className="mt-5 text-xl font-bold text-white">{card.title}</h3>
              <p className="mt-3 text-sm leading-[1.8] text-slate-400">{card.text}</p>
              <motion.div className="absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: `${card.color}22` }} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <motion.div
  {...fadeUp(0.2)}
  className="rounded-2xl border border-white/[0.07] bg-[#0d1219] p-7"
>
  <div className="flex items-center justify-between gap-3">
    <h3 className="text-xl font-bold text-white">Certificates</h3>
  </div>

  <div className="mt-4 flex gap-3">
  {certifications.map((item, index) => (
    <motion.div
      key={item.title}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      whileHover={{ x: 6, scale: 1.01 }}
      className="flex flex-1 items-center justify-between gap-4 rounded-xl border px-4 py-4 text-sm transition"
      style={{
        borderColor: `${item.color}22`,
        background: `${item.color}10`,
        color: item.color,
      }}
    >
      <div>
        <div className="font-semibold">{item.title}</div>
        <div className="mt-1 text-xs text-slate-400">{item.issuer}</div>
      </div>
    </motion.a>
  ))}
</div>
</motion.div>
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="text-center">
          <SectionLabel text="Experience" />
        </div>
        <motion.h2 {...fadeUp(0.05)} className="mb-16 text-center font-serif text-4xl font-bold text-white md:text-5xl">
          Career Timeline
        </motion.h2>

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-0 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-cyan-400/40 via-indigo-400/20 to-transparent md:block"
            style={{ left: "179px" }}
          />

          <div className="space-y-7">
            {timeline.map((item, i) => (
              <motion.div
                key={item.role}
                {...fadeUp(i * 0.12)}
                whileHover={{ x: 6 }}
                className="group relative grid gap-6 rounded-2xl border border-white/[0.07] bg-[#0d1219] p-6 md:grid-cols-[180px_1fr] md:items-start"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.35, type: "spring" }}
                  className="absolute left-[-6px] top-7 hidden h-3 w-3 rounded-full border-2 border-[#06080f] md:block"
                  style={{ background: item.color, left: "174px", boxShadow: `0 0 12px ${item.color}` }}
                />

                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.period}</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{item.role}</h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: item.color }}>{item.org}</p>
                  <p className="mt-3 text-sm leading-[1.8] text-slate-400">{item.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span key={skill} className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}25` }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.div className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: `inset 0 0 40px ${item.color}10` }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="text-center">
          <SectionLabel text="Skills" />
        </div>
        <motion.h2 {...fadeUp(0.05)} className="mb-14 text-center font-serif text-4xl font-bold text-white md:text-5xl">
          Technologies I Work With
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              {...scaleIn(index * 0.08)}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${group.accent}12`, color: group.accent }}>
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{group.title}</h3>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.28, delay: idx * 0.04 }}
                    whileHover={{ scale: 1.06 }}
                    className="rounded-full px-3 py-2 text-sm font-medium"
                    style={{ background: `${group.accent}10`, color: group.accent, border: `1px solid ${group.accent}22` }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="text-center">
          <SectionLabel text="Projects" />
        </div>
        <motion.h2 {...fadeUp(0.05)} className="mb-14 text-center font-serif text-4xl font-bold text-white md:text-5xl">
          Selected Work
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              {...scaleIn(index * 0.08)}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] p-6"
            >
              <div className="mb-5 inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}22` }}>
                {project.tag}
              </div>

              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <p className="mt-3 text-sm leading-[1.8] text-slate-400">{project.text}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.metrics.map((m) => (
                  <span key={m} className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-400" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {m}
                  </span>
                ))}
              </div>

              <motion.a href="#contact" whileHover={{ x: 6 }} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: project.color }}>
                Discuss this project
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>

              <motion.div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: `${project.color}20` }} />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-28 md:px-8">
        <motion.div {...fadeUp()} className="relative overflow-hidden rounded-[2.4rem] border border-white/[0.07] bg-[#0d1219] p-10 md:p-16">
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-60 w-60 rounded-full bg-indigo-400/6 blur-3xl" />

          <div className="relative text-center">
            <SectionLabel text="Contact" />
            <motion.h2 {...fadeUp(0.06)} className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">
              Let&apos;s build something <span className="text-cyan-400">meaningful</span>
            </motion.h2>
            <motion.p {...fadeUp(0.12)} className="mx-auto mt-5 max-w-xl text-slate-400">
              I&apos;m open to software engineering opportunities where I can contribute across full stack development, cloud systems, APIs, and user focused product work.
            </motion.p>
          </div>

          <motion.div {...fadeUp(0.18)} className="relative mt-12 grid gap-4 md:grid-cols-3">
            {[
              { icon: <Mail className="h-4 w-4" />, label: "Email", value: "khedekar.sejal02@gmail.com", href: "mailto:khedekar.sejal02@gmail.com" },
              { icon: <Phone className="h-4 w-4" />, label: "Phone", value: "623 759 2095", href: "tel:6237592095" },
              { icon: <MapPin className="h-4 w-4" />, label: "Location", value: "Tempe, Arizona", href: "#" },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/12 text-cyan-300">
                  {item.icon}
                </div>
                <p className="mt-4 text-sm font-medium text-slate-400">{item.label}</p>
                <p className="mt-2 text-base font-semibold text-white">{item.value}</p>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
