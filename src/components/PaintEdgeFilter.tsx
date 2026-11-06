type PaintEdgeFilterProps = {
  id: string;
  seed: number;
};

export default function PaintEdgeFilter({ id, seed }: PaintEdgeFilterProps) {
  // Two passes: a slow wobble makes the outline look hand-painted; a fine grit frays it like a dry brush.
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
      />
    </filter>
  );
}
