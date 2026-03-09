"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE_LETTERS = [
  "W", "E", "L", "C", "O", "M", "E", "\u00A0", "I", "T", "Z", "F", "I", "Z", "Z",
];

const STATS = [
  { id: "box1", num: "58%", label: "Increase in pick up point use", color: "bg-[#def54f]", text: "text-[#111]", pos: "top-[5%] right-[30%]" },
  { id: "box2", num: "23%", label: "Decreased in customer phone calls", color: "bg-[#6ac9ff]", text: "text-[#111]", pos: "bottom-[5%] right-[35%]" },
  { id: "box3", num: "27%", label: "Increase in pick up point use", color: "bg-[#333]", text: "text-white", pos: "top-[5%] right-[10%]" },
  { id: "box4", num: "40%", label: "Decreased in customer phone calls", color: "bg-[#fa7328]", text: "text-[#111]", pos: "bottom-[5%] right-[12.5%]" },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const car = carRef.current;
      const trail = trailRef.current;
      const headlineWrap = headlineRef.current;
      if (!car || !trail || !headlineWrap) return;

      // --- Initial page-load intro animation ---
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Fade in the road area
      tl.from(".road", { opacity: 0, y: 20, duration: 0.8 });

      // Slide in the car from off-screen left
      tl.from(car, { x: -200, opacity: 0, duration: 0.7 }, "-=0.4");

      // --- End intro ---

      const letters = headlineWrap.querySelectorAll<HTMLSpanElement>(".value-letter");
      const headlineRect = headlineWrap.getBoundingClientRect();
      const letterOffsets = Array.from(letters).map((l) => l.offsetLeft);

      const roadWidth = window.innerWidth;
      const carWidth = 150;
      const endX = roadWidth - carWidth;

      // Car scroll animation - moves car across the road
      gsap.to(car, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: ".track",
        },
        x: endX,
        ease: "none",
        onUpdate() {
          const carX = gsap.getProperty(car, "x") as number + carWidth / 2;

          // Reveal letters as car passes
          letters.forEach((letter, i) => {
            const letterX = headlineRect.left + letterOffsets[i];
            letter.style.opacity = carX >= letterX ? "1" : "0";
          });

          // Extend green trail
          gsap.set(trail, { width: carX });
        },
      });

      // Stat boxes fade in at staggered scroll positions
      const boxOffsets = [400, 600, 800, 1000];
      STATS.forEach((stat, i) => {
        gsap.to(`#${stat.id}`, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${boxOffsets[i]} top`,
            end: `top+=${boxOffsets[i] + 200} top`,
            scrub: true,
          },
          opacity: 1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scroll-section">
      <div className="track">
        {/* Road with car animation */}
        <div className="road" id="road">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={carRef}
            src={`${basePath}/car-top-view.png`}
            alt="Car top view"
            className="car-img"
            draggable={false}
          />
          <div ref={trailRef} className="trail" />

          {/* Headline letters */}
          <div ref={headlineRef} className="headline-wrap">
            {HEADLINE_LETTERS.map((letter, i) => (
              <span key={i} className="value-letter">
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Stat boxes */}
        {STATS.map((stat) => (
          <div
            key={stat.id}
            id={stat.id}
            className={`stat-box ${stat.color} ${stat.text} ${stat.pos}`}
          >
            <span className="num">{stat.num}</span>
            <span className="label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
