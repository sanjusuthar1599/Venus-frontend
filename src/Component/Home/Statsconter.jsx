import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    value: 12,
    suffix: "+",
    label: "YEARS SHAPING SPACES",
  },
  {
    value: 200,
    suffix: "+",
    label: "PROJECTS DELIVERED",
  },
  {
    value: 18,
    suffix: "",
    label: "COUNTRIES & CITIES",
  },
  {
    value: 100,
    suffix: "%",
    label: "CLIENT SATISFACTION",
  },
];

const Statsconter = () => {
  const [startCount, setStartCount] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.8,
    rootMargin: "0px 0px -120px 0px",
  });

  useEffect(() => {
    if (inView && !startCount) {
      setStartCount(true);
    }
  }, [inView, startCount]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 lg:py-28"
    >
      {/* Background */}
      <div
        className="absolute inset-0 animate-[slowZoom_18s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Orange Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,127,38,0.15),transparent_60%)]" />

      {/* Top Glow Line */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#f27f26]/70 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`
                group
                text-center
                transition-all
                duration-500
                hover:-translate-y-2
                ${
                  index > 0
                    ? "lg:border-l lg:border-white/10"
                    : ""
                }
              `}
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f27f26]/20 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

                <h3 className="relative text-4xl font-bold text-[#f27f26] sm:text-5xl lg:text-6xl">
                  {startCount ? (
                    <CountUp
                      start={0}
                      end={item.value}
                      duration={2.5}
                      suffix={item.suffix}
                    />
                  ) : (
                    `0${item.suffix}`
                  )}
                </h3>
              </div>

              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes slowZoom {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.08);
            }
          }
        `}
      </style>
    </section>
  );
};

export default Statsconter;