import Image from "next/image";

// Tilts and grows the tile when its card (a `group`) is hovered.
export const TILE_MOTION = "transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105";

/**
 * A 48px logo from public/. `tile` adds a background behind logos that need
 * one to stay visible in both themes (e.g. a white mark, a dark wordmark).
 */
export default function LogoTile({ src, tile = "" }: { src: string; tile?: string }) {
  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl ${tile} ${TILE_MOTION}`} aria-hidden="true">
      <Image src={src} alt="" width={48} height={48} unoptimized className="h-full w-full object-contain" />
    </span>
  );
}
