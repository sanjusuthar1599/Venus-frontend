import HeroScene3D from "./HeroScene3D.jsx";

/**
 * Shared mouse-follow particles + spotlight for hero sections.
 */
export default function HeroMouseLayer({ containerRef, particleCount = 44 }) {
  return (
    <>
      <HeroScene3D containerRef={containerRef} particleCount={particleCount} />
      <div className="home-hero-spotlight" aria-hidden />
    </>
  );
}
