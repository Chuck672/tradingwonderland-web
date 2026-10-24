"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fillTemplate, useLanguage } from "@/components/language-provider";
import { productShotMeta, productShotWidths } from "@/lib/product-shot-meta";

const SIZES =
  "(min-width: 72rem) 68rem, (min-width: 64rem) calc(100vw - 4rem), (min-width: 40rem) calc(100vw - 3rem), calc(100vw - 2rem)";

type Slide = {
  id: keyof typeof productShotMeta;
  altKey: string;
  titleKey: string;
  bodyKey: string;
  captionKey: string;
  bulletKeys?: readonly string[];
};

const SLIDES: readonly Slide[] = [
  {
    id: "ai",
    altKey: "home.alt_ai",
    titleKey: "home.ai_title",
    bodyKey: "home.ai_body",
    captionKey: "home.ai_note",
    bulletKeys: ["home.ai_b1", "home.ai_b2", "home.ai_b3"],
  },
  {
    id: "chart",
    altKey: "home.alt_chart",
    titleKey: "home.chart_title",
    bodyKey: "home.chart_body",
    captionKey: "home.chart_cap",
    bulletKeys: ["home.chart_b1", "home.chart_b2", "home.chart_b3", "home.chart_b4"],
  },
  {
    id: "indicators",
    altKey: "home.alt_ind1",
    titleKey: "home.ind_title",
    bodyKey: "home.ind_body",
    captionKey: "home.ind_cap1",
  },
  {
    id: "range",
    altKey: "home.alt_range",
    titleKey: "home.range_title",
    bodyKey: "home.range_body",
    captionKey: "home.range_cap",
  },
  {
    id: "calendar",
    altKey: "home.alt_cal",
    titleKey: "home.cal_title",
    bodyKey: "home.cal_body",
    captionKey: "home.cal_cap",
  },
  {
    id: "alerts",
    altKey: "home.alt_alert",
    titleKey: "home.alert_title",
    bodyKey: "home.alert_body",
    captionKey: "home.alert_cap",
  },
  {
    id: "ticket",
    altKey: "home.alt_risk",
    titleKey: "home.risk_title",
    bodyKey: "home.risk_body",
    captionKey: "home.risk_cap",
  },
];

function srcSet(id: string, ext: "avif" | "webp" | "jpg") {
  return productShotWidths.map((width) => `/product/${id}-${width}.${ext} ${width}w`).join(", ");
}

function Shot({
  id,
  alt,
  priority,
}: {
  id: keyof typeof productShotMeta;
  alt: string;
  priority: boolean;
}) {
  const meta = productShotMeta[id];
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(id, "avif")} sizes={SIZES} />
      <source type="image/webp" srcSet={srcSet(id, "webp")} sizes={SIZES} />
      <img
        src={`/product/${id}-1280.jpg`}
        srcSet={srcSet(id, "jpg")}
        sizes={SIZES}
        width={meta.width}
        height={meta.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
        className="block w-full h-auto select-none"
      />
    </picture>
  );
}

export function ProductCarousel() {
  const { t } = useLanguage();
  const count = SLIDES.length;
  const slides = [SLIDES[count - 1], ...SLIDES, SLIDES[0]];
  const [index, setIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [reduce, setReduce] = useState(false);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduce(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (animate) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [animate]);

  const logical = index === 0 ? count - 1 : index === count + 1 ? 0 : index - 1;
  const active = SLIDES[logical];

  const step = useCallback(
    (direction: 1 | -1) => {
      if (reduce) {
        setAnimate(false);
        setIndex((current) => {
          const currentLogical = current === 0 ? count - 1 : current === count + 1 ? 0 : current - 1;
          return ((currentLogical + direction + count) % count) + 1;
        });
        return;
      }
      setAnimate(true);
      setIndex((current) => {
        const next = current + direction;
        if (next < 0 || next > count + 1) return current;
        return next;
      });
    },
    [count, reduce],
  );

  const goTo = useCallback(
    (nextLogical: number) => {
      setAnimate(!reduce);
      setIndex(nextLogical + 1);
    },
    [reduce],
  );

  function onTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== "transform" || event.target !== event.currentTarget) return;
    if (index === 0) {
      setAnimate(false);
      setIndex(count);
    } else if (index === count + 1) {
      setAnimate(false);
      setIndex(1);
    }
  }

  return (
    <figure
      className="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ff88] rounded-2xl"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label={t("home.carousel_label")}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          step(1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          step(-1);
        }
      }}
    >
      <p className="sr-only" aria-live="polite">
        {fillTemplate(t("home.carousel_status"), {
          n: String(logical + 1),
          total: String(count),
          title: t(active.titleKey),
        })}
      </p>
      <div className="relative">
        <div
          className="overflow-hidden rounded-2xl border border-white/10 bg-black touch-pan-y"
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            drag.current = { x: event.clientX, y: event.clientY };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={(event) => {
            const start = drag.current;
            drag.current = null;
            if (!start) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
            step(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          <div
            className="flex items-start"
            style={{
              transform: `translate3d(-${index * 100}%, 0, 0)`,
              transition: !reduce && animate ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {slides.map((slide, slideIndex) => {
              const shown = slideIndex === index;
              return (
                <div
                  key={`${slide.id}-${slideIndex}`}
                  className="w-full shrink-0 grow-0 basis-full"
                  aria-hidden={shown ? undefined : true}
                >
                  <Shot id={slide.id} alt={shown ? t(slide.altKey) : ""} priority={slideIndex === 1} />
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff88]"
          aria-label={t("home.carousel_prev")}
          onClick={() => step(-1)}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff88]"
          aria-label={t("home.carousel_next")}
          onClick={() => step(1)}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <figcaption className="mt-4 max-w-3xl">
        <h2 id="product-slide-title" className="text-xl font-semibold text-white md:text-2xl">
          {t(active.titleKey)}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-400 md:text-base">{t(active.bodyKey)}</p>
        {active.bulletKeys ? (
          <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {active.bulletKeys.map((key) => (
              <li key={key} className="text-sm leading-relaxed text-gray-400">
                {t(key)}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="mt-3 text-sm leading-relaxed text-gray-500">{t(active.captionKey)}</p>
      </figcaption>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {SLIDES.map((slide, slideIndex) => {
            const current = slideIndex === logical;
            return (
              <button
                key={slide.id}
                type="button"
                aria-label={t(slide.titleKey)}
                aria-current={current ? "true" : undefined}
                className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00ff88] ${
                  current ? "w-6 bg-[#00ff88]" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => goTo(slideIndex)}
              />
            );
          })}
        </div>
        <p className="text-xs tabular-nums text-gray-500">
          {logical + 1} / {count}
        </p>
      </div>
    </figure>
  );
}
