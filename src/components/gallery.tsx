"use client";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X, Expand } from "lucide-react";
import type { GalleryItem } from "@/types";
import { Photo } from "./ui";
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("Semua");
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const filtered = items.filter(
    (item) => category === "Semua" || item.category === category,
  );
  const current = filtered[index];
  const close = () => {
    dialog.current?.close();
    setIsOpen(false);
    opener.current?.focus();
  };
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
  return (
    <>
      <div
        className="filter-bar"
        role="group"
        aria-label="Filter kategori foto"
      >
        {["Semua", ...new Set(items.map((item) => item.category))].map(
          (item) => (
            <button
              key={item}
              aria-pressed={item === category}
              onClick={() => {
                setCategory(item);
                setIndex(0);
              }}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <p className="sr-only" role="status">
        {filtered.length} foto ditampilkan
      </p>
      <div className="gallery-grid">
        {filtered.map((item, i) => (
          <figure key={item.id}>
            <button
              className="gallery-open"
              aria-label={`Perbesar foto: ${item.title}`}
              onClick={(event) => {
                opener.current = event.currentTarget;
                setIndex(i);
                setIsOpen(true);
                dialog.current?.showModal();
              }}
            >
              <Photo image={item.image} />
              <span className="expand">
                <Expand size={19} />
              </span>
            </button>
            <figcaption>
              <span>{item.category}</span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Pratinjau foto"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight")
            setIndex((index + 1) % filtered.length);
          if (event.key === "ArrowLeft")
            setIndex((index - 1 + filtered.length) % filtered.length);
        }}
      >
        <button
          autoFocus
          className="icon-button lightbox-close"
          aria-label="Tutup foto"
          onClick={close}
        >
          <X />
        </button>
        {current && (
          <div className="lightbox-content">
            <Photo image={current.image} sizes="90vw" />
            <div className="lightbox-caption" aria-live="polite">
              <h2>{current.title}</h2>
              <p>{current.description}</p>
              <a
                href={current.image.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Foto: {current.image.credit}
              </a>
            </div>
            <div className="lightbox-controls">
              <button
                className="icon-button"
                aria-label="Foto sebelumnya"
                onClick={() =>
                  setIndex((index - 1 + filtered.length) % filtered.length)
                }
              >
                <ArrowLeft />
              </button>
              <span>
                {index + 1} / {filtered.length}
              </span>
              <button
                className="icon-button"
                aria-label="Foto selanjutnya"
                onClick={() => setIndex((index + 1) % filtered.length)}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
