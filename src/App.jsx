import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./components/Reveal";
import {
  aboutPoints,
  destinations,
  footerLinks,
  navLinks,
  services,
  slides,
  stats,
  steps,
  testimonials,
} from "./data";

const field =
  "w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300";
const LEADS_WHATSAPP = "254113043315";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/barak_pathways_global?igsh=MThiazVlbXZtOHVyZA==",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1CaG9GpDRo/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.2-1.6 1.5-1.6H16V4.8c-.2 0-.9-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.4V11H8.5v3H11v7h2.5Z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@barak_pathways?_r=1&_t=ZS-95N105CusgZ",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M14.7 3c.2 1.6 1.1 3 2.5 3.8.9.6 2 .9 3.1.9v2.9c-1.5 0-3-.4-4.3-1.2v5.8c0 3.4-2.7 6.1-6.1 6.1S3.8 18.6 3.8 15.2s2.7-6.1 6.1-6.1c.3 0 .6 0 .9.1V12a3.2 3.2 0 0 0-.9-.1 3.3 3.3 0 1 0 3.3 3.3V3h1.5Z" />
      </svg>
    ),
  },
];

const marqueeItems = [
  { type: "chip", label: "Australia" },
  { type: "chip", label: "USA" },
  { type: "chip", label: "UK" },
  { type: "chip", label: "Canada" },
  { type: "chip", label: "Cyprus" },
  { type: "chip", label: "Spain" },
  { type: "chip", label: "Malta" },
  { type: "chip", label: "New Zealand" },
  { type: "message", label: "Expert application guidance for international admissions" },
  { type: "message", label: "Destination planning for Australia, the United States, the United Kingdom, and Canada" },
  { type: "message", label: "Scholarship support tailored to each student profile" },
  { type: "message", label: "Visa preparation with clear step-by-step direction" },
  { type: "message", label: "University matching across top destinations based on budget, goals, and fit" },
  { type: "message", label: "Pre-departure support that builds confidence before travel" },
  { type: "message", label: "Trusted guidance for families planning study abroad" },
  { type: "message", label: "Explore pathways to Europe, North America, and Oceania with expert support" },
];

function Header({ eyebrow, title, accent, text, light = false }) {
  return (
    <div className="max-w-3xl">
      <div
        className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.22em] sm:mb-5 sm:gap-3 sm:px-4 sm:text-[0.68rem] sm:tracking-[0.3em] ${
          light
            ? "border-white/15 bg-white/10 text-white/70"
            : "border-slate-200 bg-white text-slate-500"
        }`}
      >
        <span className={`h-2 w-2 rounded-full ${light ? "bg-cyan-300" : "bg-cyan-500"}`} />
        {eyebrow}
      </div>
      <h2
        className={`font-display text-[clamp(1.95rem,7.4vw,4.6rem)] font-black leading-[0.95] ${
          light ? "text-white" : "text-slate-950"
        }`}
      >
        {title} <span className={light ? "text-cyan-300" : "text-cyan-700"}>{accent}</span>
      </h2>
      <p className={`mt-4 max-w-2xl text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 ${light ? "text-slate-300" : "text-slate-600"}`}>
        {text}
      </p>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    age: "",
    location: "",
    phoneNumber: "",
    countryInterest: "",
    levelInterest: "",
  });
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return undefined;

    const tick = () => setSlideIndex((current) => (current + 1) % slides.length);
    const id = window.setInterval(() => {
      if (!document.hidden) tick();
    }, 4500);

    return () => window.clearInterval(id);
  }, []);

  const sliderStyle = useMemo(
    () => ({ transform: `translateX(-${slideIndex * 100}%)` }),
    [slideIndex]
  );

  const jump = (index) => setSlideIndex((index + slides.length) % slides.length);
  const updateLeadForm = (key) => (event) => {
    setLeadForm((current) => ({ ...current, [key]: event.target.value }));
  };

  const showToast = (message) => {
    setToastMessage(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const submit = () => {
    const requiredValues = Object.values(leadForm).every((value) => value.trim() !== "");

    if (!requiredValues) {
      window.alert("Please complete all enquiry fields before submitting.");
      return;
    }

    const message = [
      "New Lead Enquiry - Barak Pathways",
      `Name: ${leadForm.fullName}`,
      `Age: ${leadForm.age}`,
      `Location: ${leadForm.location}`,
      `Phone Number: ${leadForm.phoneNumber}`,
      `Country of Interest: ${leadForm.countryInterest}`,
      `Level of Study Interested In: ${leadForm.levelInterest}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${LEADS_WHATSAPP}?text=${encodeURIComponent(message)}`;
    showToast("Opening your enquiry...");
    const windowRef = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!windowRef) {
      // Some browsers block popups. In that case, fall back to same-tab navigation.
      window.location.href = whatsappUrl;
      return;
    }
    window.setTimeout(() => {
      showToast("Thank you. Tap Send to complete.");
    }, 900);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f7fb] text-slate-950">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,#d9eef9_0,transparent_34%),radial-gradient(circle_at_top_right,#f9e7d0_0,transparent_28%),linear-gradient(180deg,#f8fbff_0%,#eef4f9_46%,#f4f7fb_100%)]" />
      <nav className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-300 sm:px-4 ${scrolled ? "pt-3 sm:pt-4" : "pt-4 sm:pt-5"}`}>
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 ${
            scrolled
              ? "border-slate-200/80 bg-white/85 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              : "border-white/60 bg-white/70 backdrop-blur-md"
          }`}
        >
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/brand-logo.png"
              alt="Barak Pathways"
              className="h-8 w-auto sm:h-9"
            />
            <span className="sr-only">Barak Pathways</span>
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-slate-950">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-700 backdrop-blur-md transition hover:bg-white lg:hidden"
              aria-label="Open navigation menu"
              onClick={() => setMobileNavOpen(true)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <a
              href="#contact"
              className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-800 sm:px-5 sm:py-3 sm:text-sm"
            >
              Book
            </a>
          </div>
        </div>
      </nav>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-[60]">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            aria-label="Close navigation menu"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="absolute right-3 top-3 w-[min(22rem,calc(100%-1.5rem))] overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_28px_90px_rgba(15,23,42,0.18)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src="/brand-logo.png"
                  alt="Barak Pathways"
                  className="h-8 w-auto"
                />
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                aria-label="Close menu"
                onClick={() => setMobileNavOpen(false)}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="px-5 py-5">
              <div className="grid gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-white"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-4 block rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-cyan-800"
                onClick={() => setMobileNavOpen(false)}
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <main id="top">
        <section className="px-4 pb-14 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal className="relative overflow-hidden rounded-[2rem] bg-[#081120] px-5 pb-8 pt-8 text-white shadow-[0_30px_90px_rgba(8,17,32,0.18)] sm:px-8 sm:pb-10 sm:pt-10 lg:px-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.22),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(245,158,11,0.2),transparent_24%),linear-gradient(135deg,#081120_0%,#10233c_48%,#0f3c4f_100%)]" />
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-cyan-200">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                  Global admissions advisory
                </div>
                <h1 className="max-w-4xl font-display text-[clamp(2.2rem,8vw,6.5rem)] font-black leading-[0.94]">
                  From local ambition to <span className="text-amber-300">international admission</span>.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                  Barak Pathways helps students plan, apply, secure offers, and prepare for life abroad with the confidence of a guided process.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <a href="#contact" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-100 sm:px-7 sm:py-4">
                    Start Your Plan
                  </a>
                  <a href="#destinations" className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-cyan-300 hover:text-cyan-200 sm:px-7 sm:py-4">
                    View Destinations
                  </a>
                </div>
                <div className="mt-14 grid gap-4 md:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                      <div className="font-display text-5xl font-black text-white">
                        {stat.value.slice(0, -1)}
                        <span className="text-cyan-300">{stat.value.slice(-1)}</span>
                      </div>
                      <div className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140} className="grid gap-6">
              <div className="rounded-[2rem] border border-white/70 bg-white/85 p-7 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-cyan-700">Why families trust us</div>
                <div className="mt-5 space-y-5">
                  {aboutPoints.map((point) => (
                    <div key={point.title} className="rounded-[1.25rem] border border-slate-100 bg-slate-50/70 p-4">
                      <div className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-amber-600">{point.tag}</div>
                      <div className="mt-2 text-lg font-semibold text-slate-950">{point.title}</div>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{point.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-[2rem] bg-[#dff2fb] p-7 shadow-[0_25px_70px_rgba(15,23,42,0.08)]">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-cyan-800">Student route map</div>
                <div className="mt-3 text-3xl font-display font-black text-slate-950">Structured guidance from inquiry to takeoff.</div>
                <div className="mt-8 space-y-4">
                  {steps.map((step) => (
                    <div key={step.number} className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.25rem] bg-white/80 p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 font-display text-lg font-black text-white">
                        {step.number}
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-slate-950">{step.title}</div>
                        <p className="mt-1 text-sm leading-7 text-slate-600">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="social-proof" className="bg-[#081120] px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Header
                eyebrow="Real Departures"
                title="Visible proof that plans become"
                accent="real journeys."
                text="Departure imagery builds trust by showing that students are not just applying, they are actually leaving for the next stage of their education."
                light
              />
            </Reveal>
            <Reveal className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.25)] sm:p-4">
              <div className="overflow-hidden rounded-[1.5rem]">
                <div className="flex transition-transform duration-700 ease-out" style={sliderStyle}>
                  {slides.map((slide) => (
                    <figure key={slide.image} className="relative flex min-w-full items-center justify-center bg-[#0b1628] px-3 py-3 md:min-h-[38rem] md:px-4 md:py-4">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="max-h-[27rem] w-full rounded-[1.2rem] object-contain md:max-h-[36rem]"
                        style={{ objectPosition: slide.position }}
                      />
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081120] via-[#081120]/72 to-transparent px-5 pb-5 pt-20 text-white sm:px-8 sm:pb-8 sm:pt-24">
                        <p className="font-display text-xl font-black sm:text-3xl">{slide.title}</p>
                        <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-300 sm:mt-3 sm:text-sm sm:leading-8">{slide.text}</p>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 px-2 pb-2">
                <div className="flex items-center gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.image}
                      type="button"
                      onClick={() => jump(index)}
                      aria-label={`Show slide ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${
                        index === slideIndex ? "w-10 bg-cyan-300" : "w-2.5 bg-white/25"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button type="button" onClick={() => jump(slideIndex - 1)} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-cyan-300 hover:text-cyan-200">
                    Prev
                  </button>
                  <button type="button" onClick={() => jump(slideIndex + 1)} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-cyan-300 hover:text-cyan-200">
                    Next
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="testimonials" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-12 h-[28rem] w-[28rem] rounded-full bg-cyan-200/35 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full bg-amber-200/35 blur-3xl" />
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Header
                eyebrow="Student Stories"
                title="Confidence built through"
                accent="real outcomes."
                text="Proof matters. These stories help families see the impact of guided planning and a more structured admissions process."
              />
            </Reveal>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {testimonials.map((t, index) => (
                <Reveal key={t.name} delay={index * 60}>
                  <article className="h-full rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f3f7fb_100%)] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-8">
                    <div className="text-6xl font-display leading-none text-cyan-200">"</div>
                    <p className="mt-4 text-[0.98rem] italic leading-8 text-slate-700">{t.quote}</p>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 font-bold text-white">{t.initials}</div>
                      <div>
                        <div className="text-sm font-semibold text-slate-950">{t.name}</div>
                        <div className="text-sm text-slate-500">{t.school}</div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.05)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
              <span className="rounded-full bg-slate-950 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white">
                Live Updates
              </span>
              <span className="text-xs font-semibold text-slate-500 sm:text-sm">
                What students and families can expect from Barak Pathways
              </span>
            </div>
            <div className="marquee relative overflow-hidden py-4">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white via-white/90 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white via-white/90 to-transparent" />
              <div className="marquee-track flex w-max items-center gap-4 whitespace-nowrap px-6">
                {marqueeItems.concat(marqueeItems).map((item, index) =>
                  item.type === "chip" ? (
                    <div
                      key={`${item.label}-${index}`}
                      className="rounded-full bg-slate-950 px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-cyan-200"
                    >
                      {item.label}
                    </div>
                  ) : (
                    <div
                      key={`${item.label}-${index}`}
                      className="flex items-center gap-4 rounded-full border border-slate-200 bg-slate-50/80 px-5 py-3"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                      <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <Reveal>
              <div className="overflow-hidden rounded-[2rem] bg-[#0f172a] p-8 text-white shadow-[0_35px_100px_rgba(15,23,42,0.16)] sm:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-white/5 p-6">
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-cyan-300">Positioning</div>
                    <div className="mt-3 font-display text-4xl font-black">7+</div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">Years helping students move from uncertainty to a clear study-abroad pathway.</p>
                  </div>
                  <div className="rounded-[1.5rem] bg-cyan-400/10 p-6">
                    <div className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-cyan-300">Advisory style</div>
                    <div className="mt-3 text-lg font-semibold">High-touch, practical, transparent</div>
                    <p className="mt-3 text-sm leading-7 text-slate-300">We simplify decisions, documents, timelines, and expectations for both students and families.</p>
                  </div>
                  <div className="sm:col-span-2 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(245,158,11,0.12))] p-7">
                    <p className="font-display text-3xl font-black leading-tight">
                      Trusted guidance for ambitious students who want global opportunities without guesswork.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <Header
                eyebrow="About Barak Pathways"
                title="A consultancy built for"
                accent="clarity and momentum."
                text="Barak Pathways supports students and families to make strong international education decisions with expert guidance, better planning, and end-to-end support."
              />
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                We do more than recommend schools. We help students understand fit, strengthen their applications, navigate visa requirements, and prepare for the transition with fewer surprises.
              </p>
            </Reveal>
          </div>
        </section>

        <section id="destinations" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
                <Header
                  eyebrow="Destinations"
                  title="Popular study destinations,"
                  accent="presented with clarity."
                  text="We help students compare countries based on academic fit, budget, lifestyle, and future opportunity so the shortlist feels realistic and strategic."
                />
                <div className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-cyan-700">
                    How we guide destination choice
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1.1rem] bg-slate-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Academic fit</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">Programs, ranking, and progression options.</p>
                    </div>
                    <div className="rounded-[1.1rem] bg-slate-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Budget fit</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">Tuition, living costs, and funding possibilities.</p>
                    </div>
                    <div className="rounded-[1.1rem] bg-slate-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Lifestyle fit</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">City environment, student experience, and support.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-12 grid auto-rows-[minmax(240px,auto)] gap-4 xl:grid-cols-3">
              <Reveal className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] xl:col-span-2 xl:row-span-2">
                <article className="grid h-full xl:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[18rem] xl:min-h-full">
                    <img
                      src={destinations[0].image}
                      alt={`${destinations[0].name} study destination`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
                    <div className="absolute left-5 top-5 flex items-center gap-3">
                      <span className="rounded-full bg-white/90 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-950">
                        {destinations[0].code}
                      </span>
                      {destinations[0].accent ? (
                        <span className="rounded-full bg-cyan-300 px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-slate-950">
                          {destinations[0].accent}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-8">
                    <div>
                      <div className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-cyan-700">
                        Featured destination
                      </div>
                      <h3 className="mt-3 font-display text-4xl font-black text-slate-950">
                        {destinations[0].name}
                      </h3>
                      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500">
                        {destinations[0].detail}
                      </p>
                      <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
                        {destinations[0].blurb}
                      </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {destinations[0].highlights.map((item) => (
                        <span
                          key={item}
                          className="rounded-full bg-slate-100 px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-slate-700"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>

              {destinations.slice(1).map((d, index) => (
                <Reveal key={d.name} delay={index * 45}>
                  <article className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.06)] transition hover:-translate-y-1">
                    <div className="relative h-44 sm:h-48">
                      <img
                        src={d.image}
                        alt={`${d.name} study destination`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 to-transparent" />
                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-2 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-slate-950">
                        {d.code}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl font-black text-slate-950">{d.name}</h3>
                          <p className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-slate-500">
                            {d.detail}
                          </p>
                        </div>
                        {d.accent ? (
                          <span className="rounded-full bg-cyan-50 px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-cyan-700">
                            {d.accent}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-600">{d.blurb}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {d.highlights.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-slate-200 px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Header
                eyebrow="Services"
                title="Everything students need to"
                accent="move confidently."
                text="The service is designed as a full advisory pipeline, from course matching and applications through visas, funding guidance, and departure prep."
              />
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <Reveal key={service.number} delay={index * 50}>
                  <article className="h-full rounded-[1.75rem] border border-slate-200 bg-white/85 p-6 shadow-[0_22px_60px_rgba(15,23,42,0.06)] hover:-translate-y-1 hover:border-cyan-200 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-5xl font-black text-slate-200">{service.number}</span>
                      <span className="rounded-full bg-cyan-50 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-cyan-700">
                        {service.code}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl font-black text-slate-950">{service.title}</h3>
                    <p className="mt-4 text-sm leading-8 text-slate-600">{service.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="rounded-[2rem] bg-[linear-gradient(180deg,#ffffff_0%,#eaf3fb_100%)] p-8 shadow-[0_28px_90px_rgba(15,23,42,0.08)] sm:p-10">
                <Header
                  eyebrow="Contact"
                  title="Plan your next"
                  accent="academic move."
                  text="Our first consultation is free. We'll review your goals, destination interests, and the best next steps for your application journey."
                />
                <div className="mt-8 space-y-4 text-sm text-slate-600">
                  {[
                    ["Support", "Worldwide support + in-person by appointment (Kenya offices)"],
                    ["Phone / WhatsApp", "0113 043 315"],
                    ["Email", "barakpathways@gmail.com"],
                    ["Offices", (
                      <div className="mt-1 space-y-1">
                        <div>Sirgoi Plaza, Oginga Odinga Street, Eldoret</div>
                        <div>Westlands, Nairobi</div>
                      </div>
                    )],
                    ["Working Hours", "Mon - Fri: 8am - 6pm | Sat: 9am - 2pm"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[1.25rem] border border-slate-200 bg-white/80 p-4">
                      <strong className="block text-slate-950">{label}</strong>
                      {value}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,0.16)] sm:p-10">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-cyan-300">Free consultation form</div>
                <div className="mt-3 font-display text-3xl font-black sm:text-4xl">Tell us where you want to go.</div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={field}
                      value={leadForm.fullName}
                      onChange={updateLeadForm("fullName")}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Age</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="10"
                    max="80"
                    placeholder="18"
                    className={field}
                    value={leadForm.age}
                    onChange={updateLeadForm("age")}
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Location</label>
                  <input
                    type="text"
                    placeholder="City, Country"
                    className={field}
                    value={leadForm.location}
                    onChange={updateLeadForm("location")}
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    className={field}
                    value={leadForm.phoneNumber}
                    onChange={updateLeadForm("phoneNumber")}
                  />
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Country of Interest</label>
                  <select
                    className={field}
                    value={leadForm.countryInterest}
                    onChange={updateLeadForm("countryInterest")}
                  >
                    <option className="text-slate-950" value="">Select a country...</option>
                    {["Australia", "United States", "United Kingdom", "Canada", "Cyprus", "Spain", "Malta", "New Zealand", "Other"].map((item) => (
                      <option key={item} className="text-slate-950">{item}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Level of Study Interested In</label>
                  <select
                    className={field}
                    value={leadForm.levelInterest}
                    onChange={updateLeadForm("levelInterest")}
                  >
                    <option className="text-slate-950" value="">Select level of study...</option>
                    {["Certificate", "Diploma", "Undergraduate", "Postgraduate", "Masters", "PhD", "Not Sure Yet"].map((item) => (
                      <option key={item} className="text-slate-950">{item}</option>
                    ))}
                  </select>
                </div>
                <button type="button" onClick={submit} className="mt-6 w-full rounded-full bg-cyan-300 px-6 py-4 text-sm font-bold text-slate-950 hover:bg-cyan-200">
                  Submit Enquiry
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#082032_0%,#12344a_52%,#1d5c63_100%)] px-6 py-10 text-white shadow-[0_30px_90px_rgba(8,32,50,0.18)] sm:px-12 sm:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-cyan-200">Final call to action</div>
                <h2 className="mt-4 font-display text-[clamp(2rem,6.4vw,4.8rem)] font-black leading-[0.95]">
                  Your global future can start with a better plan.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">
                  Join students who have turned study-abroad ambition into real movement with structured guidance from Barak Pathways.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-950 hover:bg-cyan-100">
                  Book Free Consultation
                </a>
                <a href="tel:+254113043315" className="rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white hover:border-cyan-300 hover:text-cyan-200">
                  Call Us Now
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 px-4 pb-10 pt-12 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 xl:grid-cols-[1.8fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/brand-logo.png"
                alt="Barak Pathways"
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-4 max-w-md text-sm leading-8 text-slate-600">
              A study abroad consultancy helping families access international education opportunities with a more structured and supportive process.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Quick Links</h5>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {footerLinks.quick.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-slate-950">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Services</h5>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-slate-950">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Contact</h5>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>Worldwide support + Kenya offices</p>
              <p>0113 043 315</p>
              <p>barakpathways@gmail.com</p>
              <p>Sirgoi Plaza, Oginga Odinga Street, Eldoret</p>
              <p>Westlands, Nairobi</p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} Barak Pathways. All rights reserved.</span>
          <div className="flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-cyan-300 hover:text-cyan-700"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {toastMessage ? (
        <div className="fixed inset-x-3 bottom-4 z-[70] flex justify-center">
          <div
            role="status"
            aria-live="polite"
            className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 text-sm font-semibold text-slate-800 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl"
          >
            {toastMessage}
          </div>
        </div>
      ) : null}
    </div>
  );
}
