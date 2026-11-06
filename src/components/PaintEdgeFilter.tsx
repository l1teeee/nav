type PaintEdgeFilterProps = {
  id: string;
  seed: number;
  frame: number;
};

export default function PaintEdgeFilter({ id, seed, frame }: PaintEdgeFilterProps) {
  // Three passes: a slow wobble makes the outline look hand-painted; a fine grit frays it like a dry brush; a small last shift, different in every frame, makes the finished edge quiver. Frames of one lobe share the first two seeds, so only that last shift changes between them.
  return (
    <filter
      id={id}
      x="-5%"
      y="-5%"
      width="110%"
      height="110%"
      colorInterpolationFilters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.011"
        numOctaves={2}
        seed={3 + seed * 11}
        result="wobble"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="wobble"
        scale={30}
        xChannelSelector="R"
        yChannelSelector="G"
        result="wobbled"
      />
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.22"
        numOctaves={3}
        seed={5 + seed * 17}
        result="grit"
      />
      <feDisplacementMap
        in="wobbled"
        in2="grit"
        scale={12}
        xChannelSelector="R"
        yChannelSelector="G"
        result="gritted"
      />
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.03"
        numOctaves={2}
        seed={7 + seed * 13 + frame * 29}
        result="boil"
      />
      <feDisplacementMap
        in="gritted"
        in2="boil"
        scale={5}
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  );
}
