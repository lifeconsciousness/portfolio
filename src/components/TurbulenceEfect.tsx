function TurbulenceEffect() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <filter
            id="turbulenceEffectForIcon"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005"
              numOctaves="2" // 1000 also works pretty well
              result="noise"
              seed="0"
            >
              <animate
                id="noiseAnimate"
                attributeName="seed"
                attributeType="XML"
                from="0"
                to="10"
                dur="1.6s"
                //   to="5"
                //   dur="1s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter
            id="turbulenceEffectForText"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005"
              numOctaves="2"
              result="noise"
              seed="0"
            >
              <animate
                id="noiseAnimate"
                attributeName="seed"
                attributeType="XML"
                from="0"
                to="5"
                dur="1s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter
            id="turbulenceEffectForMe"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.005"
              numOctaves="2"
              result="noise"
              seed="0"
            >
              <animate
                id="noiseAnimate"
                attributeName="seed"
                attributeType="XML"
                from="0"
                to="5"
                dur="1s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="100"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter
            id="turbulenceEffectForBackground"
            x="0"
            y="0"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.4"
              numOctaves="2"
              result="noise"
              seed="0"
            ></feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="400"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <svg>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            stitchTiles="stitch"
          />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
        </filter>
      </svg>
    </>
  );
}

export default TurbulenceEffect;
