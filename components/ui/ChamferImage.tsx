"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  src: string;
  alt?: string;
  /** Which edge gets the chamfered corners. */
  side: "left" | "right";
  /** Size of each 45° corner cut, in px. */
  cut?: number;
  /** Image size relative to the box (0–1). */
  scale?: number;
  /** Darken + multiply — for artwork that is itself green and would vanish on the accent. */
  blend?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Accent-filled image box with chamfered corners on one side. The artwork
 * floats gently; the accent fill runs edge to edge.
 */
export default function ChamferImage({
  src,
  alt = "",
  side,
  cut = 40,
  scale = 0.72,
  blend = false,
  priority,
  className = "",
}: Props) {
  const c = `${cut}px`;
  const clip =
    side === "right"
      ? `polygon(0 0, calc(100% - ${c}) 0, 100% ${c}, 100% calc(100% - ${c}), calc(100% - ${c}) 100%, 0 100%)`
      : `polygon(${c} 0, 100% 0, 100% 100%, ${c} 100%, 0 calc(100% - ${c}), 0 ${c})`;

  return (
    <div
      className={`relative aspect-[5/4] w-full bg-accent overflow-hidden ${className}`}
      style={{ clipPath: clip }}
    >
      {/* Soft vignette gives the flat accent some depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.18)_100%)]" />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={900}
          priority={priority}
          className="h-auto object-contain select-none pointer-events-none drop-shadow-[0_24px_30px_rgba(0,0,0,0.25)]"
          style={{ width: `${scale * 100}%`, maxHeight: `${scale * 100}%`, mixBlendMode: blend ? "multiply" : undefined, filter: blend ? "brightness(0.55) contrast(1.45) saturate(1.15)" : undefined }}
        />
      </motion.div>

      {/* Hairline along the chamfered edge */}
      <div className={`absolute top-0 bottom-0 ${side === "right" ? "right-0" : "left-0"} w-px bg-black/20`} />
    </div>
  );
}
