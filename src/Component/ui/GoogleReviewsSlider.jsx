import { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { API_BASE_URL } from "../../config/api.js";
import { googleReviewsFallback } from "../../config/googleReviews.js";

import "swiper/css";
import "swiper/css/effect-fade";

function Stars({ rating }) {
  const count = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return (
    <div className="google-review-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < count ? "is-filled" : ""} aria-hidden>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="home-testimonial-card google-review-card w-full max-w-[270px] p-4 sm:max-w-[290px] sm:p-5">
      <div className="font-serif mb-3 text-[2.5rem] leading-none text-venus-gold sm:text-[2.75rem]" aria-hidden>
        &ldquo;
      </div>

      <Stars rating={review.rating} />

      <p className="google-review-text mb-5 mt-3 text-[13px] leading-[1.65] text-gray-300 sm:text-[14px]">
        {review.text}
      </p>

      <div className="flex items-center gap-3">
        <img
          src={review.author_photo}
          alt={review.author_name}
          className="h-10 w-10 rounded-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div>
          <h4 className="text-[14px] font-medium text-white">{review.author_name}</h4>
          <p className="text-[12px] text-gray-500">{review.author_role || "Google Review"}</p>
        </div>
      </div>
    </article>
  );
}

export default function GoogleReviewsSlider() {
  const [apiReviews, setApiReviews] = useState([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/reviews`);
        const data = await res.json().catch(() => []);
        if (!alive) return;
        setApiReviews(Array.isArray(data) ? data : []);
      } catch {
        if (!alive) return;
        setApiReviews([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const reviews = useMemo(() => {
    if (apiReviews.length > 0) return apiReviews.slice(0, 5);
    return googleReviewsFallback;
  }, [apiReviews]);

  if (!reviews.length) return null;

  return (
    <div className="google-reviews-slider w-full max-w-[290px]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={700}
        loop={reviews.length > 1}
        autoplay={{
          delay: 5200,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="google-reviews-swiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id || review.author_name}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
