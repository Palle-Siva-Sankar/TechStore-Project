import { useState, useEffect } from "react";
import "./HeroSlider.css";

export default function HeroSlider({ heroSearch, onSearchChange, onSearchSubmit, suggestions, onSuggestionClick, t }) {
  const [current, setCurrent] = useState(0);

  const SLIDES = [
    {
      id: 1,
      title: t("hero_title_1"),
      desc: t("hero_desc_1"),
      image: "https://images.unsplash.com/photo-1550009158-9efff6c97348?w=1200&q=80",
      gradient: "rgba(232, 93, 44, 0.2)"
    },
    {
      id: 2,
      title: t("hero_title_2"),
      desc: t("hero_desc_2"),
      image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=1200&q=80",
      gradient: "rgba(112, 161, 255, 0.2)"
    },
    {
      id: 3,
      title: t("hero_title_3"),
      desc: t("hero_desc_3"),
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
      gradient: "rgba(255, 200, 87, 0.2)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [SLIDES.length]);

  const goToSlide = (idx) => setCurrent(idx);

  return (
    <>
      <div className="hero-slider-wrap">
      {SLIDES.map((slide, idx) => (
        <div 
          key={slide.id} 
          className={`hero-slide ${idx === current ? "active" : ""}`}
        >
          {/* Background Image and Overlays - wrapped to contain the 1.05 scale overflow */}
          <div className="hero-bg-wrapper">
            <div className="hero-slide-bg" style={{ backgroundImage: `url(${slide.image})` }}></div>
            <div className="hero-slide-overlay" style={{ background: `linear-gradient(to right, var(--bg-color) 0%, transparent 60%, var(--bg-color) 100%), linear-gradient(to top, var(--bg-color) 0%, transparent 60%), ${slide.gradient}` }}></div>
          </div>
          
          <div className="hero-content slider-content">
            <div className="slider-text">
              <h1 className="animate-slide-up">{slide.title}</h1>
              <p className="animate-slide-up delayed-1">{slide.desc}</p>
            </div>
            {/* Search bar removed from here to prevent sliding */}
            <div className="hero-search-placeholder desktop-only"></div>
          </div>
        </div>
      ))}



      {/* Dots and Navigation */}
      <div className="slider-controls">
        <div className="slider-dots">
          {SLIDES.map((_, idx) => (
            <button 
              key={idx} 
              className={`slider-dot ${idx === current ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
