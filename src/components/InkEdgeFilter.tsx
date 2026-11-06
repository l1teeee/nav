type InkEdgeFilterProps = {
  id: string;
};

export default function InkEdgeFilter({ id }: InkEdgeFilterProps) {
  // Edges roughen at stroke scale, then a blur and an alpha ramp re-sharpen them like ink that bled into paper;
  // a fine grain then lifts specks of ink as a stamp does. Pixel-scale noise made small text look broken.
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
        baseFrequency="0.35"
        numOctaves={2}
        seed={7}
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={1.5}
        xChannelSelector="R"
        yChannelSelector="G"
        result="rough"
      />
      <feGaussianBlur in="rough" stdDeviation={0.45} result="soft" />
      <feComponentTransfer in="soft" result="bled">
        <feFuncA type="linear" slope={2.2} intercept={-0.6} />
      </feComponentTransfer>
      <feTurbulence
        type="fractalNoise"
        baseFrequency="1.1"
        numOctaves={2}
        seed={3}
        result="grain"
      />
      <feColorMatrix
        in="grain"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -0.6"
        result="grainMask"
      />
      <feComposite in="bled" in2="grainMask" operator="in" />
    </filter>
  );
}
