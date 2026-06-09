import { Link } from "react-router-dom";

const Budget = () => {
  const cards = [
    {
      image:
        "1BHK.jpg",
      price: "Smart planning ₹3.2Lakh only",
      title: "1BHK",
      subtitle: "Compact homes with storage-first layouts.",
      query: "bhk=1BHK",
    },
    {
      image:
        "/2Bhk.mp4",
      price: "Most requested ₹4.8Lakh only",
      title: "2BHK",
      subtitle: "Balanced living, bedroom, kitchen and wardrobe scope.",
      query: "bhk=2BHK",
      video: true,
    },
    {
      image:
        "3BHK.jpg",
      price: "Family upgrade ₹6.5Lakh only",
      title: "3BHK",
      subtitle: "Layered rooms, premium materials and lighting.",
      query: "bhk=3BHK",
    },
    {
      image:
        "4BHK.jpg",
      price: "Luxury scope ₹9.8Lakh only",
      title: "4BHK",
      subtitle: "Large home concepts with full turnkey planning.",
      query: "bhk=4BHK",
    },
    {
      image: "/MODULAR_KITCHEN.avif",
      price: "Workflow ready ₹1.75Lakh only",
      title: "Kitchen",
      subtitle: "Modular kitchen, hardware and appliance planning.",
      query: "room=Kitchen",
    },
    {
      image:
        "Living-room.avif",
      price: "Family lounge ₹2.4Lakh only",
      title: "Living room",
      subtitle: "TV wall, sofa layout, ceiling and lighting mood.",
      query: "room=Living%20room",
    },
    {
      image:
        "Bedroom.avif",
      price: "Calm comfort ₹1.95Lakh only",
      title: "Bedroom",
      subtitle: "Bed back wall, storage, curtains and soft lighting.",
      query: "room=Bedroom",
    },
    {
      image:
        "Children-room.jpg",
      price: "Play + study ₹1.6Lakh only",
      title: "Children room",
      subtitle: "Safe furniture, study corners and playful storage.",
      query: "room=Children%20room",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/25 to-white px-5 py-16 sm:px-8 sm:py-20 sm:pt-0 lg:px-10">
      <div
        className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#f27f26]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
          <span
            className="mb-5 block h-1 w-14 rounded-full bg-gradient-to-r from-[#f27f26] to-amber-400"
            aria-hidden
          />
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#f27f26]">
            Budget friendly design
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Homes for every budget
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Choose your home type or room category and we will take you directly to
            the project planner with the right scope ready to refine.
          </p>
        </div>

          <Link
            to="/services#project-planner"
            className="inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#f27f26]/25 transition duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            Get free quote
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Link
              key={card.title}
              to={`/services?${card.query}#project-planner`}
              className={`group relative min-h-[260px] overflow-hidden rounded-[1.35rem] bg-neutral-950 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.4)] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1 hover:shadow-[0_26px_64px_-24px_rgba(242,127,38,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f27f26] ${
                index < 2 ? "lg:col-span-2" : ""
              }`}
            >
              {card.video ? (
                <video
                  src={card.image}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={card.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />

              <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-[#f27f26] to-amber-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-[#f27f26]/25">
                {card.price}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl font-semibold tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-amber-300">
  {card.budget}
</p>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/78">
                  {card.subtitle}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-amber-300 transition group-hover:gap-3">
                  Plan this scope
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-neutral-500 sm:text-sm">
          *Final budget depends on site size, material selection, civil work, and
          execution timeline. Use the planner to start a quick consultation brief.
        </p>
      </div>
    </section>
  );
};

export default Budget;