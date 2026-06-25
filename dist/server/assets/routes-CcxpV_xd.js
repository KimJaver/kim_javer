import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/assets/golivra-preview.jpg
var golivra_preview_default = "/assets/golivra-preview-DUrD1Zdl.jpg";
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var SECTIONS = [
	"Identité",
	"Manifeste",
	"GoLivra",
	"Stack & Parcours",
	"Contact"
];
function Portfolio() {
	const scrollerRef = useRef(null);
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
			const max = horizontal ? el.scrollWidth - el.clientWidth : el.scrollHeight - el.clientHeight;
			const pos = horizontal ? el.scrollLeft : el.scrollTop;
			setProgress(max > 0 ? pos / max : 0);
			const center = horizontal ? el.scrollLeft + el.clientWidth / 2 : el.scrollTop + el.clientHeight / 2;
			const children = Array.from(el.children);
			let nearest = 0;
			let bestDist = Infinity;
			children.forEach((child, i) => {
				const c = horizontal ? child.offsetLeft + child.offsetWidth / 2 : child.offsetTop + child.offsetHeight / 2;
				const d = Math.abs(center - c);
				if (d < bestDist) {
					bestDist = d;
					nearest = i;
				}
			});
			setActiveSection(nearest);
		};
		el.addEventListener("scroll", onScroll, { passive: true });
		const onWheel = (e) => {
			if (isMobile) return;
			if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
				el.scrollLeft += e.deltaY;
				e.preventDefault();
			}
		};
		el.addEventListener("wheel", onWheel, { passive: false });
		const onKey = (e) => {
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
	}, [activeSection, isMobile]);
	const scrollToSection = (idx) => {
		const el = scrollerRef.current;
		if (!el) return;
		const target = el.children[idx];
		if (!target) return;
		if (isMobile) el.scrollTo({
			top: target.offsetTop,
			behavior: "smooth"
		});
		else el.scrollTo({
			left: target.offsetLeft,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "h-screen w-screen overflow-hidden bg-canvas text-ink selection:bg-ink selection:text-canvas",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "fixed top-4 md:top-6 left-4 md:left-8 right-4 md:right-8 flex justify-between items-end z-50 mix-blend-difference text-canvas/90 font-mono text-[10px] uppercase tracking-widest pointer-events-none",
				children: [
					/* @__PURE__ */ jsx("span", { children: "Brazzaville / CG" }),
					/* @__PURE__ */ jsx("div", {
						className: "h-px flex-1 mx-4 md:mx-8 bg-canvas/20 mb-1.5 relative overflow-hidden",
						children: /* @__PURE__ */ jsx("div", {
							className: "absolute inset-y-0 left-0 bg-canvas/80 transition-[width] duration-150",
							style: { width: `${progress * 100}%` }
						})
					}),
					/* @__PURE__ */ jsxs("span", {
						className: "hidden sm:inline",
						children: [
							String(activeSection + 1).padStart(2, "0"),
							" / ",
							String(SECTIONS.length).padStart(2, "0"),
							" — ",
							SECTIONS[activeSection]
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("main", {
				ref: scrollerRef,
				className: "flex flex-col md:flex-row md:flex-nowrap overflow-y-auto md:overflow-y-hidden md:overflow-x-auto snap-y md:snap-x snap-mandatory h-screen no-scrollbar scroll-smooth",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "flex-none w-screen h-screen md:h-full snap-start flex flex-col justify-end p-6 md:p-12 pb-24 md:pb-24 relative overflow-hidden",
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute -top-32 -right-20 opacity-[0.04] pointer-events-none select-none hidden md:block",
							children: /* @__PURE__ */ jsx("span", {
								className: "font-serif italic",
								style: {
									fontSize: "60rem",
									lineHeight: 1
								},
								children: "K"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "font-mono text-[10px] md:text-xs mb-6 md:mb-8 flex items-center gap-3",
									children: [/* @__PURE__ */ jsx("span", { className: "size-2 bg-accent rounded-full animate-pulse" }), "DISPONIBLE POUR PROJETS 2025"]
								}),
								/* @__PURE__ */ jsxs("h1", {
									className: "font-serif italic -ml-1 md:-ml-2 mb-6 md:mb-8 text-balance leading-[0.85] text-[22vw] md:text-[14vw]",
									children: ["Kim ", /* @__PURE__ */ jsx("span", {
										className: "not-italic font-sans font-semibold",
										children: "Javer"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col lg:flex-row items-start gap-8 lg:gap-24",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-lg md:text-xl max-w-[35ch] text-pretty leading-relaxed",
										children: "Développeur Web & Mobile façonnant des architectures numériques à Brazzaville. Spécialiste React, React Native & Node.js."
									}), /* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1 font-mono text-xs md:text-sm opacity-60",
										children: [
											/* @__PURE__ */ jsx("span", { children: "+242 06 781 14 62" }),
											/* @__PURE__ */ jsx("a", {
												href: "mailto:kimjaver7@gmail.com",
												className: "hover:text-accent transition-colors",
												children: "kimjaver7@gmail.com"
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "mt-3 text-[10px] uppercase tracking-widest",
												children: [
													"→ ",
													isMobile ? "scroll vertical" : "scroll / flèches",
													" pour naviguer"
												]
											})
										]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("section", {
						className: "flex-none w-screen md:w-[80vw] h-screen md:h-full snap-start bg-ink text-canvas flex items-center p-8 md:p-24",
						children: /* @__PURE__ */ jsxs("div", {
							className: "w-full max-w-5xl",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-mono text-canvas/60 text-xs md:text-sm mb-4 md:mb-6 block",
									children: "01 / MANIFESTE"
								}),
								/* @__PURE__ */ jsxs("h2", {
									className: "text-3xl md:text-5xl lg:text-7xl font-medium leading-tight text-balance mb-8 md:mb-12",
									children: [
										"Concevoir des solutions qui",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "italic font-serif",
											children: "résonnent"
										}),
										" localement."
									]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-base md:text-lg lg:text-xl max-w-[48ch] text-pretty opacity-80 mb-8 md:mb-12",
									children: "Ma pratique repose sur l'équilibre entre performance technique et pertinence contextuelle. Je ne construis pas que du code, je bâtis des ponts entre les entreprises congolaises et leurs utilisateurs."
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap gap-x-8 gap-y-3 md:gap-x-12 md:gap-y-4 opacity-50 font-mono text-[10px] md:text-xs uppercase",
									children: [
										/* @__PURE__ */ jsx("span", { children: "Architecture Client-Serveur" }),
										/* @__PURE__ */ jsx("span", { children: "Déploiement Cloud" }),
										/* @__PURE__ */ jsx("span", { children: "Mobile Cross-Platform" }),
										/* @__PURE__ */ jsx("span", { children: "REST API" })
									]
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("section", {
						className: "flex-none w-screen md:w-[120vw] h-auto min-h-screen md:h-full snap-start flex items-center p-6 py-20 md:p-24 bg-canvas",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-12 gap-6 md:gap-16 items-center w-full",
							children: [/* @__PURE__ */ jsx("div", {
								className: "col-span-12 md:col-span-6",
								children: /* @__PURE__ */ jsx("img", {
									src: golivra_preview_default,
									alt: "Trois écrans de l'application mobile GoLivra : onboarding, accueil marketplace, suivi de commande à Brazzaville",
									width: 1536,
									height: 1024,
									loading: "lazy",
									className: "w-full object-contain"
								})
							}), /* @__PURE__ */ jsxs("div", {
								className: "col-span-12 md:col-span-6",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "font-mono text-[10px] md:text-xs opacity-50 mb-3 md:mb-4 block tracking-widest",
										children: "PROJET PHARE — 2024 / 2025"
									}),
									/* @__PURE__ */ jsxs("h3", {
										className: "text-5xl md:text-8xl font-serif italic mb-6 md:mb-8",
										children: [/* @__PURE__ */ jsx("span", {
											style: { color: "oklch(0.42 0.09 155)" },
											children: "Go"
										}), /* @__PURE__ */ jsx("span", {
											style: { color: "oklch(0.72 0.16 60)" },
											children: "Livra"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "max-w-[52ch] space-y-6 md:space-y-8",
										children: [
											/* @__PURE__ */ jsxs("p", {
												className: "text-lg md:text-2xl leading-snug text-pretty",
												children: [
													"La marketplace de livraison qui connecte commerçants, particuliers et livreurs à Brazzaville. ",
													/* @__PURE__ */ jsx("span", {
														className: "font-mono text-sm md:text-base bg-ink text-canvas px-2 py-0.5",
														children: "100% React Native"
													}),
													" côté mobile, backend Node.js & PostgreSQL."
												]
											}),
											/* @__PURE__ */ jsx("ul", {
												className: "space-y-3 md:space-y-4 border-l border-ink/15 pl-5 md:pl-6",
												children: [
													"Application mobile native iOS & Android — React Native",
													"Dashboard web admin & espace commerçant — React JS",
													"API REST Node.js / Express, authentification & paiement",
													"Base de données PostgreSQL hébergée sur Supabase",
													"Suivi de commande temps réel & géolocalisation livreurs"
												].map((item) => /* @__PURE__ */ jsxs("li", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ jsx("svg", {
														className: "size-4 shrink-0 text-accent mt-1",
														fill: "none",
														viewBox: "0 0 24 24",
														stroke: "currentColor",
														children: /* @__PURE__ */ jsx("path", {
															strokeLinecap: "round",
															strokeLinejoin: "round",
															strokeWidth: 2,
															d: "M5 13l4 4L19 7"
														})
													}), /* @__PURE__ */ jsx("span", {
														className: "text-sm md:text-base font-medium",
														children: item
													})]
												}, item))
											}),
											/* @__PURE__ */ jsx("div", {
												className: "flex flex-wrap gap-2 pt-2",
												children: [
													"React Native",
													"React JS",
													"Node.js",
													"Express",
													"PostgreSQL",
													"Supabase"
												].map((t) => /* @__PURE__ */ jsx("span", {
													className: "px-3 py-1 ring-1 ring-ink/20 text-[10px] md:text-xs font-mono uppercase tracking-wider",
													children: t
												}, t))
											})
										]
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ jsx("section", {
						className: "flex-none w-screen md:w-[90vw] h-auto min-h-screen md:h-full snap-start p-6 py-20 md:p-24 flex flex-col justify-center bg-white/40 border-l border-ink/5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
								className: "font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8 md:mb-12 opacity-40",
								children: "Expertise Technique"
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-8 md:space-y-10",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-ink/50 uppercase tracking-widest",
										children: "Frontend"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xl md:text-3xl font-medium tracking-tight",
										children: "React JS, React Native, TypeScript, HTML5, CSS3"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-ink/50 uppercase tracking-widest",
										children: "Backend"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xl md:text-3xl font-medium tracking-tight",
										children: "Node.js, Express.js, Laravel"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-ink/50 uppercase tracking-widest",
										children: "Database"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xl md:text-3xl font-medium tracking-tight",
										children: "PostgreSQL, MySQL, Supabase"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
										className: "text-[10px] md:text-xs font-mono mb-2 md:mb-3 text-ink/50 uppercase tracking-widest",
										children: "Outils"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xl md:text-3xl font-medium tracking-tight",
										children: "Git, Linux, REST API"
									})] })
								]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col justify-between gap-10 md:gap-12",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
									className: "font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-8 md:mb-12 opacity-40",
									children: "Parcours"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-6 md:space-y-8",
									children: [/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("p", {
											className: "font-mono text-xs opacity-40",
											children: "2022 — Janvier 2026"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-lg md:text-xl font-medium mt-1",
											children: "AGS IT — Formateur & Développeur Web"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm opacity-60 mt-2 max-w-[40ch]",
											children: "Formation d'étudiants et professionnels, conception et développement d'applications web, support technique."
										})
									] }), /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("p", {
											className: "font-mono text-xs opacity-40",
											children: "Juillet 2025"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-lg md:text-xl font-medium mt-1",
											children: "Licence en Génie Logiciel"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm opacity-60 mt-2 max-w-[40ch]",
											children: "Génie logiciel, architecture, analyse et conception des systèmes d'information."
										})
									] })]
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "pt-8 md:pt-12 border-t border-ink/5 grid grid-cols-2 gap-8",
									children: [/* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-[10px] font-mono opacity-40 uppercase mb-2",
											children: "Langues"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium",
											children: "FR — Courant"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium",
											children: "EN — Technique"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium",
											children: "IT — A2"
										})
									] }), /* @__PURE__ */ jsxs("div", { children: [
										/* @__PURE__ */ jsx("p", {
											className: "text-[10px] font-mono opacity-40 uppercase mb-2",
											children: "Localisation"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium",
											children: "Brazzaville, Congo"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm font-medium",
											children: "UTC +1"
										})
									] })]
								})]
							})]
						})
					}),
					/* @__PURE__ */ jsx("section", {
						className: "flex-none w-screen h-screen md:h-full snap-start flex items-center justify-center bg-ink text-canvas p-6 md:p-12",
						children: /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "font-mono text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-widest opacity-60",
									children: "Prêt pour le prochain chapitre"
								}),
								/* @__PURE__ */ jsxs("h2", {
									className: "font-serif italic leading-none mb-8 md:mb-12",
									style: { fontSize: "clamp(2.5rem, 10vw, 12rem)" },
									children: [
										"Construisons ",
										/* @__PURE__ */ jsx("br", {}),
										" ensemble"
									]
								}),
								/* @__PURE__ */ jsx("a", {
									href: "mailto:kimjaver7@gmail.com",
									className: "inline-block text-xl md:text-3xl font-sans border-b-2 border-canvas/40 pb-2 hover:border-canvas transition-colors break-all",
									children: "kimjaver7@gmail.com"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-6 md:mt-8 font-mono text-[10px] md:text-xs opacity-60 tracking-widest",
									children: "+242 06 781 14 62 — BRAZZAVILLE / CG"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-10 md:mt-12",
									children: /* @__PURE__ */ jsxs("a", {
										href: "/cv.pdf",
										download: "CV_Kim_Javer.pdf",
										className: "inline-flex items-center gap-3 px-6 py-3 border-2 border-canvas/40 hover:border-canvas hover:bg-canvas/10 rounded-md font-medium text-base md:text-lg transition-all duration-200",
										children: [/* @__PURE__ */ jsx("svg", {
											className: "size-5",
											fill: "none",
											viewBox: "0 0 24 24",
											stroke: "currentColor",
											children: /* @__PURE__ */ jsx("path", {
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeWidth: 2,
												d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
											})
										}), "Télécharger mon CV"]
									})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 md:gap-4 z-50",
				children: SECTIONS.map((s, i) => {
					const onDark = activeSection === 1 || activeSection === 4;
					return /* @__PURE__ */ jsx("button", {
						onClick: () => scrollToSection(i),
						"aria-label": `Aller à ${s}`,
						className: `size-1.5 rounded-full transition-all ${activeSection === i ? onDark ? "bg-canvas w-6" : "bg-ink w-6" : onDark ? "bg-canvas/30" : "bg-ink/20"}`
					}, s);
				})
			})
		]
	});
}
//#endregion
export { Portfolio as component };
