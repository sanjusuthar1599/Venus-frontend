import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "./PageHero.jsx";
import SectionHeading from "./ui/SectionHeading.jsx";
import CtaBanner from "./ui/CtaBanner.jsx";
import Reveal from "./Reveal.jsx";
import { blogPosts } from "../config/content.js";
import { API_BASE_URL, uploadFileUrl } from "../config/api.js";

function formatDate(value) {
  const d = value ? new Date(value) : null;
  if (!d || Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

const Blog = () => {
  const [apiPosts, setApiPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/blogs`);
        const data = await res.json().catch(() => []);
        if (!alive) return;
        setApiPosts(Array.isArray(data) ? data : []);
      } catch {
        if (!alive) return;
        setApiPosts([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const posts = useMemo(() => {
    if (apiPosts.length > 0) {
      return apiPosts.map((post) => ({
        id: post._id,
        slug: post.slug || post._id,
        title: post.title,
        excerpt: post.excerpt,
        image: post.cover_image ? uploadFileUrl("images", post.cover_image) : "/about.png",
        date: formatDate(post.published_at || post.createdAt),
      }));
    }
    return blogPosts;
  }, [apiPosts]);

  return (
    <div className="min-h-screen bg-venus-cream text-venus-text">
      <PageHero
        title="Our Latest Insights And Inspirations."
        breadcrumbLabel="Blog"
        imageSrc="/venus_about_photo.png"
        size="tall"
      />

      <section className="venus-section">
        <div className="venus-container">
          <Reveal>
            <SectionHeading
              label="Journal"
              title="Ideas For Beautiful Living"
              description="Design tips, trend insights, and project stories from the Venus Interiors studio."
            />
          </Reveal>

          <ul className="blog-list mt-14 space-y-10 lg:mt-16 lg:space-y-12">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 70} variant="up">
                <li>
                  <article className="blog-card grid min-h-[260px] overflow-hidden rounded-sm lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:min-h-[320px]">
                    <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[320px]">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex min-h-full flex-col justify-center p-6 sm:p-8 lg:p-10">
                      <p className="venus-label">{post.date}</p>
                      <h3 className="venus-title mt-3 text-[1.35rem] sm:text-[1.5rem] lg:text-[1.65rem]">
                        {post.title}
                      </h3>
                      <p className="venus-desc mt-4 line-clamp-3 text-venus-grey">{post.excerpt}</p>
                      <Link
                        to="/contact"
                        className="mt-auto pt-6 inline-flex w-fit items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-venus-gold transition hover:text-venus-tan-dark"
                      >
                        Read More
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                </li>
              </Reveal>
            ))}
          </ul>
          {!loading && posts.length === 0 ? (
            <p className="mt-10 text-center text-sm text-venus-grey">No blog posts yet.</p>
          ) : null}
        </div>
      </section>

      <CtaBanner
        title="Let's Create Something Beautiful Together"
        description="Whether you're renovating, building new, or refreshing a single room — we'd love to hear about your project."
        buttonText="Book a Consultation"
        imageSrc="/chooesimage.png"
      />
    </div>
  );
};

export default Blog;
