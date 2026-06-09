import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const services = [
  {
    title: "Modular Interiors",
    desc: "Functional kitchens, wardrobes, and smart storage planned around daily use.",
    image: "/MODULAR_KITCHEN.avif",
    href: "/services",
  },
  {
    title: "Full Home Interiors",
    desc: "Turnkey design and execution for homes with one clear design language.",
    image: "/Living-room.avif",
    href: "/services",
  },
  {
    title: "Luxury Interiors",
    desc: "Tailored finishes, lighting, and detailing for elegant premium spaces.",
    image: "/Bedroom.avif",
    href: "/portfolio",
  },
  {
    title: "Renovations",
    desc: "Upgrade existing spaces with better layouts, materials, and storage.",
    image: "/3BHK.jpg",
    href: "/services",
  },
  {
    title: "Bedroom Designs",
    desc: "Warm, restful bedrooms with storage, lighting, and comfort handled together.",
    image: "/Bedroom.avif",
    href: "/portfolio",
  },
  {
    title: "Living Room Design",
    desc: "Balanced living spaces for family time, hosting, and everyday comfort.",
    image: "/Living-room.avif",
    href: "/portfolio",
  },
  {
    title: "Kitchen Design",
    desc: "Smart modular kitchens with practical workflow and durable finishes.",
    image: "/MODULAR_KITCHEN.avif",
    href: "/services",
  },
  {
    title: "Office Interiors",
    desc: "Focused workspaces, cabins, and meeting areas built for productivity.",
    image: "/EXECUTIVE_CABINS.jpg",
    href: "/services",
  },
  {
    title: "Conference Rooms",
    desc: "Meeting rooms with lighting, AV walls, and professional finishes.",
    image: "/CONFERENC_ROOMS.avif",
    href: "/services",
  },
  {
    title: "Children Rooms",
    desc: "Playful, safe, and organized rooms that grow with your child.",
    image: "/Children-room.jpg",
    href: "/portfolio",
  },
];

const Interior_Solutions = () => {
  return (
    <section className="relative overflow-hidden border-t border-neutral-200/80 bg-gradient-to-b from-neutral-50 to-white py-16 sm:py-20 lg:py-16">
      <div
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#f27f26]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-16 h-72 w-72 rounded-full bg-amber-300/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full border border-[#f27f26]/20 bg-[#f27f26]/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#ea580c] sm:text-[11px]">
            Interior solutions
          </span>
          <h2 className="text-2xl font-semibold uppercase tracking-[0.12em] text-neutral-900 sm:text-3xl lg:text-4xl">
            Venus Destination For{" "}
            <span className="bg-gradient-to-r from-[#f27f26] to-amber-500 bg-clip-text text-transparent">
              End-to-End
            </span>{" "}
            Interior Solutions
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-relaxed text-neutral-600 sm:text-base lg:text-lg">
            Venus Interior provides complete design solutions for homes, offices,
            and commercial spaces, keeping planning, materials, execution, and
            finishing under one thoughtful process.
          </p>
        </div>

        <div className="interior-solutions-slider mt-10 sm:mt-12 lg:mt-16">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={18}
            loop={true}
            speed={750}
            observer={true}
            observeParents={true}
            autoplay={{
              delay: 1200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".interior-solutions-prev",
              nextEl: ".interior-solutions-next",
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 22,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
          >
            {services.map((item, index) => (
              <SwiperSlide key={item.title}>
                <Link
                  to={item.href}
                  className="group flex h-full min-h-[390px] flex-col overflow-hidden rounded-[1.5rem] border border-neutral-200/90 bg-white shadow-[0_18px_48px_-30px_rgba(15,23,42,0.28)] transition duration-500 hover:-translate-y-1.5 hover:border-[#f27f26]/25 hover:shadow-[0_26px_64px_-30px_rgba(242,127,38,0.26)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f27f26] sm:min-h-[410px]"
                >
                  <div className="relative h-48 overflow-hidden bg-neutral-200 sm:h-52">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.07]"
                      loading={index < 4 ? "eager" : "lazy"}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-70 transition group-hover:opacity-90"
                      aria-hidden
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-6 text-center sm:px-6">
                    <h3 className="text-lg font-semibold leading-tight tracking-tight text-neutral-900 sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                      {item.desc}
                    </p>

                    <span className="mx-auto mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#f27f26]/20 bg-[#f27f26]/10 text-[#f27f26] transition duration-300 group-hover:translate-x-1 group-hover:border-[#f27f26]/35 group-hover:bg-[#f27f26] group-hover:text-white">
                      <FaArrowRight size={15} aria-hidden />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .interior-solutions-slider .swiper {
          overflow: hidden;
          padding: 0.25rem 0.25rem 3rem;
        }

        .interior-solutions-slider .swiper-slide {
          height: auto;
        }

        .interior-solutions-slider .swiper-wrapper {
          align-items: stretch;
        }

        .interior-solutions-prev,
        .interior-solutions-next {
          font-size: 2rem;
          line-height: 1;
        }

        .interior-solutions-prev.swiper-button-disabled,
        .interior-solutions-next.swiper-button-disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }

        .interior-solutions-slider .swiper-pagination {
          bottom: 0;
        }

        .interior-solutions-slider .swiper-pagination-bullet {
          width: 0.55rem;
          height: 0.55rem;
          background: #d4d4d4;
          opacity: 1;
          transition:
            width 220ms ease,
            background-color 220ms ease;
        }

        .interior-solutions-slider .swiper-pagination-bullet-active {
          width: 1.55rem;
          border-radius: 9999px;
          background: #f27f26;
        }

        @media (max-width: 640px) {
          .interior-solutions-slider .swiper {
            padding-inline: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Interior_Solutions;