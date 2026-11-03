"use client";

import Image from "next/image";
import { X, ZoomIn } from "@/shared/icons";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import styles from "@/features/home/home.module.css";

type ScreenshotPreviewProps = {
  alt: string;
  className: string;
  height: number;
  src: string;
  title: string;
  width: number;
};

export function ScreenshotPreview({ alt, className, height, src, title, width }: ScreenshotPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const canUsePortal = typeof document !== "undefined";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        aria-label={`Abrir captura: ${title}`}
        className={`${className} ${styles.screenshotTrigger}`}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <Image src={src} alt={alt} width={width} height={height} />
        <span className={styles.zoomHint}>
          <ZoomIn size={16} />
        </span>
      </button>

      {isOpen && canUsePortal ? createPortal(
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button className={styles.lightboxBackdrop} aria-label="Cerrar visor" onClick={() => setIsOpen(false)} type="button" />
          <div className={styles.lightboxPanel}>
            <div className={styles.lightboxHeader}>
              <h3 id={titleId}>{title}</h3>
              <button aria-label="Cerrar visor" onClick={() => setIsOpen(false)} type="button">
                <X size={19} />
              </button>
            </div>
            <div className={styles.lightboxImage}>
              <Image src={src} alt={alt} width={width * 2} height={height * 2} sizes="min(1180px, 100vw)" priority />
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
