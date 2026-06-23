import { Link } from "react-router-dom";

export default function CtaBanner({
  title = "Ready To Start Your Project?",
  description = "Let's design a space you'll love.",
  buttonText = "Book a Consultation",
  buttonTo = "/contact",
  imageSrc = "/Living-room.avif",
}) {
  return (
    <section className="cta-banner" aria-labelledby="cta-banner-title">
      <div className="cta-banner__inner">
        <div className="cta-banner__copy">
          <h2 id="cta-banner-title" className="cta-banner__title">
            {title}
          </h2>
          {description ? <p className="cta-banner__desc">{description}</p> : null}
          <Link to={buttonTo} className="cta-banner__btn">
            {buttonText}
          </Link>
        </div>

        {imageSrc ? (
          <div className="cta-banner__media" aria-hidden>
            <img src={imageSrc} alt="" loading="lazy" />
            <div className="cta-banner__media-fade" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
