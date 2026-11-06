import Image from "next/image";
import { Children, type ReactNode } from "react";
import paperTexture from "@/assets/texturelabs-paper-292.jpg";
import PaintEdgeFilter from "@/components/PaintEdgeFilter";

type LobeStackProps = {
  children: ReactNode;
};

// The texture is not seamless, so tiles alternate upright and mirrored copies; six tiles cover the tallest expected stack, and the ink background shows below them if the stack ever grows past that.
const TEXTURE_TILE_COUNT = 6;

// Declared smaller than the rendered tile on purpose, so high-DPR screens stop at the 1920w variant; the texture is soft and upscaling does not show.
const TEXTURE_SIZES = "(max-width: 48rem) 640px, 960px";

const SHAPE_STAGGER_MS = 120;

function paintEdgeFilterId(lobeIndex: number): string {
  return `paint-edge-${lobeIndex}`;
}

export default function LobeStack({ children }: LobeStackProps) {
  const lobeCount = Children.count(children);
  const lobeIndexes = Array.from({ length: lobeCount }, (_, lobeIndex) => lobeIndex);
  const tileIndexes = Array.from({ length: TEXTURE_TILE_COUNT }, (_, tileIndex) => tileIndex);

  return (
    <div className="lobes">
      <svg className="lobes__filters" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {lobeIndexes.map((lobeIndex) => (
            <PaintEdgeFilter
              key={lobeIndex}
              id={paintEdgeFilterId(lobeIndex)}
              seed={lobeIndex}
            />
          ))}
        </defs>
      </svg>
      <div className="lobes__paint" aria-hidden="true">
        <div className="lobes__texture">
          {tileIndexes.map((tileIndex) => (
            <Image
              key={tileIndex}
              src={paperTexture}
              alt=""
              sizes={TEXTURE_SIZES}
              loading={tileIndex === 0 ? "eager" : "lazy"}
              fetchPriority={tileIndex === 0 ? "high" : "auto"}
              className={tileIndex % 2 === 0 ? "lobes__tile" : "lobes__tile lobes__tile--mirrored"}
            />
          ))}
        </div>
        <div className="lobes__shapes">
          {/* The filter goes in the inline style, not in CSS, so the fragment URL always resolves against the document. */}
          {lobeIndexes.map((lobeIndex) => (
            <div
              key={lobeIndex}
              className="lobes__shape"
              style={{
                filter: `url(#${paintEdgeFilterId(lobeIndex)})`,
                animationDelay: `${lobeIndex * SHAPE_STAGGER_MS}ms`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="lobes__content">{children}</div>
    </div>
  );
}
