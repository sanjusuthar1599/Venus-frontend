import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const linkBase =
  "rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/10 hover:-translate-y-px active:translate-y-0";

const navigation = [
  { name: "Home", to: "/", end: true },
  { name: "Services", to: "/services" },
  { name: "Portfolio", to: "/portfolio" },
  { name: "About", to: "/about" },
  { name: "Contact", to: "/contact" },
  { name: "Admin", to: "/admin" },
];

const ACTIVE_THRESHOLD = 150;
const ACTIVE_TWO_THRESHOLD = 600;
const ACTIVE_THREE_MAX_SCROLL = 500;


const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scroll = window.scrollY;
      const isScrollingUp = scroll < lastScrollRef.current;

      if (scroll >= ACTIVE_TWO_THRESHOLD) {
        setActive(true);
        setActiveTwo(true);
      } else if (scroll >= ACTIVE_THRESHOLD) {
        setActive(true);
        setActiveTwo(false);
      } else {
        setActive(false);
        setActiveTwo(false);
      }

      if (isScrollingUp && scroll <= ACTIVE_THREE_MAX_SCROLL) {
        setActiveThree(true);
        setActiveTwo(false);
      }

      if (isScrollingUp && scroll === 0) {
        setActive(false);
        setActiveTwo(false);
        setActiveThree(false);
      }

      if (!isScrollingUp && scroll > ACTIVE_THREE_MAX_SCROLL) {
        setActiveThree(false);
      }

      lastScrollRef.current = scroll;
    };

    lastScrollRef.current = window.scrollY;
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  const solidBar = active || mobileOpen;

  return (
    <nav
      className={`absolute inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] ${
        activeTwo || mobileOpen
          ? "border-white/10 bg-black/95 shadow-2xl shadow-black/35 backdrop-blur-sm !fixed -mt-[0px] transition-all duration-500 ease-out"
          : solidBar
            ? `border-white/10 bg-black/85 shadow-lg shadow-black/20 !fixed -mt-[130px] transition-all ${
                activeThree ? "duration-500" : "duration-700"
              } ease-out`
            : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-21 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
          <Link to="/">
            <img src="/venus_logo.png" alt="Venus Logo" className="h-[192px] mt-4 max-[550px]:ml-[-30px]" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) =>
              item.to ? (
  <NavLink
                key={item.name}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `group relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? "text-amber-400"
                      : "text-white hover:text-amber-400"
                  }`
                }
              >
                {item.name}

                <span
                  className="
                    absolute
                    left-1/2
                    bottom-0
                    h-[2px]
                    w-0
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-amber-400
                    to-yellow-300
                    transition-all
                    duration-300
                    group-hover:w-3/4
                  "
                />
              </NavLink>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${linkBase} text-white/90 hover:text-white`}
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-white hover:text-white/80 focus:outline-none"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <span className="text-2xl">✖</span>
            ) : (
              <span className="text-2xl">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black px-2 pb-3 pt-2 md:hidden">
          {navigation.map((item) => (
            item.to ? (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-white/10 text-amber-400"
                      : "text-white hover:bg-white/10"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium uppercase tracking-wide text-white/90 hover:bg-white/10 hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            )
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;










// import { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";

// const navigation = [
//   { name: "Home", to: "/", end: true },
//   { name: "Services", to: "/services" },
//   { name: "Portfolio", to: "/portfolio" },
//   { name: "About", to: "/about" },
//   { name: "Contact", to: "/contact" },
//   { name: "Admin", to: "/admin" },
// ];

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 80);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <nav
//       className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
//         scrolled ? "py-3" : "py-5"
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div
//           className={`flex h-20 items-center justify-between rounded-2xl px-6 transition-all duration-500 ${
//             scrolled || mobileOpen
//               ? "border border-white/10 bg-black/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
//               : "bg-black/20 backdrop-blur-md"
//           }`}
//         >
//           {/* Logo */}
//           <Link to="/">
//             <img
//               src="/venus_logo.png"
//               alt="Venus Logo"
//               className="h-[140px] transition-transform duration-300 hover:scale-105"
//             />
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-2">
//             {navigation.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.to}
//                 end={item.end}
//                 className={({ isActive }) =>
//                   `group relative px-4 py-2 text-sm font-medium uppercase tracking-wider transition-all duration-300 ${
//                     isActive
//                       ? "text-amber-400"
//                       : "text-white hover:text-amber-400"
//                   }`
//                 }
//               >
//                 {item.name}

//                 <span
//                   className="
//                     absolute
//                     left-1/2
//                     bottom-0
//                     h-[2px]
//                     w-0
//                     -translate-x-1/2
//                     bg-gradient-to-r
//                     from-amber-400
//                     to-yellow-300
//                     transition-all
//                     duration-300
//                     group-hover:w-3/4
//                   "
//                 />
//               </NavLink>
//             ))}
//           </div>

//           {/* Mobile Toggle */}
//           <button
//             type="button"
//             onClick={() => setMobileOpen((v) => !v)}
//             className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md"
//           >
//             {mobileOpen ? (
//               <span className="text-xl">✕</span>
//             ) : (
//               <span className="text-xl">☰</span>
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`overflow-hidden transition-all duration-500 md:hidden ${
//             mobileOpen
//               ? "mt-3 max-h-[500px] opacity-100"
//               : "max-h-0 opacity-0"
//           }`}
//         >
//           <div className="rounded-2xl border border-white/10 bg-black/70 p-3 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
//             {navigation.map((item) => (
//               <NavLink
//                 key={item.name}
//                 to={item.to}
//                 end={item.end}
//                 onClick={() => setMobileOpen(false)}
//                 className={({ isActive }) =>
//                   `block rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-wider transition-all ${
//                     isActive
//                       ? "bg-white/10 text-amber-400"
//                       : "text-white hover:bg-white/10"
//                   }`
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;