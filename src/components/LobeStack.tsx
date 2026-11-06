import Image from "next/image";
import { Children, type ReactNode } from "react";
import paperTexture from "@/assets/texturelabs-paper-292.jpg";
import InkEdgeFilter from "@/components/InkEdgeFilter";
import PaintEdgeFilter from "@/components/PaintEdgeFilter";

type LobeStackProps = {
  children: ReactNode;
};

// The texture is not seamless, so tiles alternate upright and mirrored copies; six tiles cover the tallest expected stack, and the ink background shows below them if the stack ever grows past that.
const TEXTURE_TILE_COUNT = 6;

// Declared smaller than the rendered tile on purpose, so high-DPR screens stop at the 1920w variant; the texture is soft and upscaling does not show.
const TEXTURE_SIZES = "(max-width: 48rem) 640px, 960px";

const INK_EDGE_FILTER_ID = "ink-edge";

// Every pill is painted this many times with different edge noise and one copy shows at a time; the boil-frame keyframes in globals.css show each copy for a quarter of the loop, so change both together.
const BOIL_FRAME_COUNT = 4;

function paintEdgeFilterId(lobeIndex: number, frameIndex: number): string {
  return `paint-edge-${lobeIndex}-${frameIndex}`;
}

export default function LobeStack({ children }: LobeStackProps) {
  const lobeCount = Children.count(children);
  const lobeIndexes = Array.from({ length: lobeCount }, (_, lobeIndex) => lobeIndex);
  const frameIndexes = Array.from({ length: BOIL_FRAME_COUNT }, (_, frameIndex) => frameIndex);
  const tileIndexes = Array.from({ length: TEXTURE_TILE_COUNT }, (_, tileIndex) => tileIndex);

  return (
    <div className="lobes">
      <svg className="lobes__filters" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          {lobeIndexes.flatMap((lobeIndex) =>
            frameIndexes.map((frameIndex) => (
              <PaintEdgeFilter
                key={paintEdgeFilterId(lobeIndex, frameIndex)}
                id={paintEdgeFilterId(lobeIndex, frameIndex)}
                seed={lobeIndex}
                frame={frameIndex}
              />
            )),
          )}
          <InkEdgeFilter id={INK_EDGE_FILTER_ID} />
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
            <div key={lobeIndex} className="lobes__shape">
              {frameIndexes.map((frameIndex) => (
                <div
                  key={frameIndex}
                  className="lobes__frame"
                  style={{
                    filter: `url(#${paintEdgeFilterId(lobeIndex, frameIndex)})`,
                    animationDelay: `calc(var(--boil-step) * ${frameIndex})`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Inline for the same reason as the shapes' filter. */}
      <div className="lobes__content" style={{ filter: `url(#${INK_EDGE_FILTER_ID})` }}>
        {Children.map(children, (child) => (
          <div className="lobes__slot">{child}</div>
        ))}
      </div>
    </div>
  );
}
