import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import golivraPreview from "@/assets/golivra-preview.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kim Javer — Développeur Web & Mobile / Brazzaville" },
      {
        name: "description",
        content:
          "Portfolio de Kim Javer, développeur web & mobile basé à Brazzaville. React, React Native, Node.js, PostgreSQL. Créateur de GoLivra.",
      },
      { property: "og:title", content: "Kim Javer — Développeur Web & Mobile" },
      {
        property: "og:description",
        content:
          "Architectures numériques, applications React / React Native et plateformes marketplace. Disponible pour projets 2025.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Portfolio,
});

const SECTIONS = ["Identité", "Manifeste", "GoLivra", "Stack & Parcours", "Contact"];

function Portfolio() {
  const scrollerRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const horizontal = !isMobile;
      const max = horizontal
        ? el.scrollWidth - el.clientWidth
        : el.scrollHeight - el.clientHeight;
      const pos = horizontal ? el.scrollLeft : el.scrollTop;
      const p = max > 0 ? pos / max : 0;
      setProgress(p);
      const center = horizontal
        ? el.scrollLeft + el.clientWidth / 2
        : el.scrollTop + el.clientHeight / 2;
      const children = Array.from(el.children) as HTMLElement[];
      let nearest = 0;
      let bestDist = Infinity;
      children.forEach((child, i) => {
        const c = horizontal
          ? child.offsetLeft + child.offsetWidth / 2
          : child.offsetTop + child.offsetHeight / 2;
        const d = Math.abs(center - c);
        if (d < bestDist) {
          bestDist = d;
          nearest = i;
        }
      });
      setActiveSection(nearest);
    };

    el.addEventListener("scroll", onScroll, { passive: true });

    const onWheel = (e: WheelEvent) => {
      if (isMobile) return;
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });

    const onKey = (e: KeyboardEvent) => {
      const next = e.key === "ArrowRight" || e.key === "PageDown" || e.key === "ArrowDown";
      const prev = e.key === "ArrowLeft" || e.key === "PageUp" || e.key === "ArrowUp";
      if (next) {
        e.preventDefault();
        scrollToSection(Math.min(activeSection + 1, SECTIONS.length - 1));
      } else if (prev) {
        e.preventDefault();
        scrollToSection(Math.max(activeSection - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);

    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, isMobile]);

  const scrollToSection = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.children[idx] as HTMLElement | undefined;
    if (!target) return;
    if (isMobile) {
      el.scrollTo({ top: target.offsetTop, behavior: "smooth" });
    } else {
      el.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-canvas text-ink selection:bg-ink selection:text-canvas">
      {/* Top progress bar */}
      <div className="fixed top-4 md:top-6 left-4 md:left-8 right-4 md:right-8 flex justify-between items-end z-50 mix-blend-difference text-canvas/90 font-mono text-[10px] uppercase tracking-widest pointer-events-none">
        <span>Brazzaville / CG</span>
        <div className="h-px flex-1 mx-4 md:mx-8 bg-canvas/20 mb-1.5 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-canvas/80 transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="hidden sm:inline">
          {String(activeSection + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")} — {SECTIONS[activeSection]}
        </span>
      </div>

      <main
        ref={scrollerRef}
        className="flex flex-col md:flex-row md:flex-nowrap overflow-y-auto md:overflow-y-hidden md:overflow-x-auto snap-y md:snap-x snap-mandatory h-screen no-scrollbar scroll-smooth"
      >
        {/* 01 — Identity */}
        <section className="flex-none w-screen h-screen md:h-full snap-start flex flex-col justify-end p-6 md:p-12 pb-24 md:pb-24 relative overflow-hidden">
          <div className="absolute -top-32 -right-20 opacity-[0.04] pointer-events-none select-none hidden md:block">
            <span className="font-serif italic" style={{ fontSize: "60rem", lineHeight: 1 }}>
              K
            </span>
          </div>
          <div className="relative z-10">
            <p className="font-mono text-[10px] md:text-xs mb-6 md:mb-8 flex items-center gap-3">
              <span className="size-2 bg-accent rounded-full animate-pulse" />
              DISPONIBLE POUR PROJETS 2025
            </p>
            <h1 className="font-serif italic -ml-1 md:-ml-2 mb-6 md:mb-8 text-balance leading-[0.85] text-[22vw] md:text-[14vw]">
              Kim <span className="not-italic font-sans font-semibold">Javer</span>
            </h1>
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-24">
              <p className="text-lg md:text-xl max-w-[35ch] text-pretty leading-relaxed">
                Développeur Web & Mobile façonnant des architectures numériques à Brazzaville.
                Spécialiste React, React Native & Node.js.
              </p>
              <div className="flex flex-col gap-1 font-mono text-xs md:text-sm opacity-60">
                <span>+242 06 781 14 62</span>
                <a href="mailto:kimjaver7@gmail.com" className="hover:text-accent transition-colors">
                  kimjaver7@gmail.com
                </a>
                <span className="mt-3 text-[10px] uppercase tracking-widest">
                  → {isMobile ? "scroll vertical" : "scroll / flèches"} pour naviguer
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Manifesto */}
        <section className="flex-none w-screen md:w-[80vw] h-screen md:h-full snap-start bg-ink text-canvas flex items-center p-8 md:p-24">
          <div className="w-full max-w-5xl">
            <span className="font-mono text-canvas/60 text-xs md:text-sm mb-4 md:mb-6 block">
              01 / MANIFESTE
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium leading-tight text-balance mb-8 md:mb-12">
              Concevoir des solutions qui{" "}
              <span className="italic font-serif">résonnent</span> localement.
            </h2>
            <p className="text-base md:text-lg lg:text-xl max-w-[48ch] text-pretty opacity-80 mb-8 md:mb-12">
              Ma pratique repose sur l'équilibre entre performance technique et pertinence
              contextuelle. Je ne construis pas que du code, je bâtis des ponts entre les
              entreprises congolaises et leurs utilisateurs.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 md:gap-x-12 md:gap-y-4 opacity-50 font-mono text-[10px] md:text-xs uppercase">
              <span>Architecture Client-Serveur</span>
              <span>Déploiement Cloud</span>
              <span>Mobile Cross-Platform</span>
              <span>REST API</span>
            </div>
          </div>
        </section>

        {/* 03 — GoLivra */}
        <section className="flex-none w-screen md:w-[120vw] h-auto min-h-screen md:h-full snap-start flex items-center p-6 py-20 md:p-24 bg-canvas">
          <div className="grid grid-cols-12 gap-6 md:gap-16 items-center w-full">
            <div className="col-span-12 md:col-span-6">
              <img
                src={golivraPreview}
                alt="Trois écrans de l'application mobile GoLivra : onboarding, accueil marketplace, suivi de commande à Brazzaville"
                width={1536}
                height={1024}
                loading="lazy"
                className="w-full object-contain"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <span className="font-mono text-[10px] md:text-xs opacity-50 mb-3 md:mb-4 block tracking-widest">
                PROJET PHARE — 2024 / 2025
              </span>
              <h3 className="text-5xl md:text-8xl font-serif italic mb-6 md:mb-8">
                <span style={{ color: "oklch(0.42 0.09 155)" }}>Go</span>
                <span style={{ color: "oklch(0.72 0.16 60)" }}>Livra</span>
              </h3>
              <div className="max-w-[52ch] space-y-6 md:space-y-8">
                <p className="text-lg md:text-2xl leading-snug text-pretty">
                  La marketplace de livraison qui connecte commerçants, particuliers et livreurs
                  à Brazzaville. <span className="font-mono text-sm md:text-base bg-ink text-canvas px-2 py-0.5">100% React Native</span> côté mobile, backend Node.js & PostgreSQL.
                </p>
                <ul className="space-y-3 md:space-y-4 border-l border-ink/15 pl-5 md:pl-6">
                  {[
                    "Application mobile native iOS & Android — React Native",
                    "Dashboard web admin & espace commerçant — React JS",
                    "API REST Node.js / Express, authentification & paiement",
                    "Base de données PostgreSQL hébergée sur Supabase",
                    "Suivi de commande temps réel & géolocalisation livreurs",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg
                        className="size-4 shrink-0 text-accent mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm md:text-base font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["React Native", "React JS", "Node.js", "Express", "PostgreSQL", "Supabase"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 ring-1 ring-ink/20 text-[10px] md:text-xs font-mono uppercase tracking-wider"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Stack & Parcours */}
        <section className="flex-none w-screen md:w-[90vw] h-auto min-h-screen md:h-full snap-start p-6 py-20 md:p-24 flex flex-col justify-center bg-white/40 border-l border-ink/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32">
            <div>
              <h4 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8 md:mb-12 opacity-40">
                Expertise Technique
              </h4>
              <div className="space-y-8 md:space-y-10">
                <div>
                  <p className="text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-ink/50 uppercase tracking-widest">Frontend</p>
                  <p className="text-xl md:text-3xl font-medium tracking-tight">
                    React JS, React Native, TypeScript, HTML5, CSS3
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-ink/50 uppercase tracking-widest">Backend</p>
                  <p className="text-xl md:text-3xl font-medium tracking-tight">
                    Node.js, Express.js, Laravel
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-ink/50 uppercase tracking-widest">Database</p>
                  <p className="text-xl md:text-3xl font-medium tracking-tight">
                    PostgreSQL, MySQL, Supabase
                  </p>
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-ink/50 uppercase tracking-widest">Outils</p>
                  <p className="text-xl md:text-3xl font-medium tracking-tight">
                    Git, Linux, REST API
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-10 md:gap-12">
              <div>
                <h4 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8 md:mb-12 opacity-40">
                  Parcours
                </h4>
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <p className="font-mono text-xs opacity-40">2022 — Janvier 2026</p>
                    <p className="text-lg md:text-xl font-medium mt-1">
                      AGS IT — Formateur & Développeur Web
                    </p>
                    <p className="text-sm opacity-60 mt-2 max-w-[40ch]">
                      Formation d'étudiants et professionnels, conception et développement
                      d'applications web, support technique.
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-xs opacity-40">Juillet 2025</p>
                    <p className="text-lg md:text-xl font-medium mt-1">Licence en Génie Logiciel</p>
                    <p className="text-sm opacity-60 mt-2 max-w-[40ch]">
                      Génie logiciel, architecture, analyse et conception des systèmes
                      d'information.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 md:pt-12 border-t border-ink/5 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-mono opacity-40 uppercase mb-2">Langues</p>
                  <p className="text-sm font-medium">FR — Courant</p>
                  <p className="text-sm font-medium">EN — Technique</p>
                  <p className="text-sm font-medium">IT — A2</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono opacity-40 uppercase mb-2">Localisation</p>
                  <p className="text-sm font-medium">Brazzaville, Congo</p>
                  <p className="text-sm font-medium">UTC +1</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 — Contact */}
        <section className="flex-none w-screen h-screen md:h-full snap-start flex items-center justify-center bg-ink text-canvas p-6 md:p-12">
          <div className="text-center">
            <p className="font-mono text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-widest opacity-60">
              Prêt pour le prochain chapitre
            </p>
            <h2
              className="font-serif italic leading-none mb-8 md:mb-12"
              style={{ fontSize: "clamp(2.5rem, 10vw, 12rem)" }}
            >
              Construisons <br /> ensemble
            </h2>
            <a
              href="mailto:kimjaver7@gmail.com"
              className="inline-block text-xl md:text-3xl font-sans border-b-2 border-canvas/40 pb-2 hover:border-canvas transition-colors break-all"
            >
              kimjaver7@gmail.com
            </a>
            <div className="mt-6 md:mt-8 font-mono text-[10px] md:text-xs opacity-60 tracking-widest">
              +242 06 781 14 62 — BRAZZAVILLE / CG
            </div>
            <div className="mt-10 md:mt-12">
              <a
                href="/cv.pdf"
                download="CV_Kim_Javer.pdf"
                className="inline-flex items-center gap-3 px-6 py-3 border-2 border-canvas/40 hover:border-canvas hover:bg-canvas/10 rounded-md font-medium text-base md:text-lg transition-all duration-200"
              >
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Télécharger mon CV
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Navigation Dots */}
      <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-50">
        {SECTIONS.map((s, i) => {
          const onDark = activeSection === 1 || activeSection === 4;
          return (
            <button
              key={s}
              onClick={() => scrollToSection(i)}
              aria-label={`Aller à ${s}`}
              className={`size-1.5 rounded-full transition-all ${
                activeSection === i
                  ? onDark
                    ? "bg-canvas w-6"
                    : "bg-ink w-6"
                  : onDark
                    ? "bg-canvas/30"
                    : "bg-ink/20"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
