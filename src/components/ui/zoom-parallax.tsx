import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

interface Image {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Scales - original values
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div ref={container} className="relative h-[150vh] md:h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];

          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center`}
            >
              <div
                className={`relative rounded-xl overflow-hidden shadow-xl [&_img]:object-cover ${
                  // Center image (index 0) - main focal point
                  index === 0 ? "w-[24vw] h-[24vh] min-w-[160px] min-h-[160px]" : ""
                } ${
                  // Top-left image (index 1) - clearly separated up and left
                  index === 1 ? "-top-[38vh] -left-[2vw] w-[30vw] h-[26vh] min-w-[180px] min-h-[140px]" : ""
                } ${
                  // Far left image (index 2) - clearly on the left side
                  index === 2 ? "-top-[5vh] -left-[34vw] w-[20vw] h-[38vh] min-w-[120px] min-h-[180px]" : ""
                } ${
                  // Far right image (index 3) - clearly on the right side
                  index === 3 ? "-top-[5vh] left-[34vw] w-[22vw] h-[24vh] min-w-[140px] min-h-[140px]" : ""
                } ${
                  // Bottom-right (index 4) - clearly below and right
                  index === 4 ? "top-[36vh] left-[10vw] w-[20vw] h-[22vh] min-w-[120px] min-h-[120px]" : ""
                } ${
                  // Bottom-left (index 5) - clearly below and left
                  index === 5 ? "top-[36vh] -left-[30vw] w-[24vw] h-[22vh] min-w-[140px] min-h-[120px]" : ""
                } ${
                  // Top-right corner (index 6) - clearly in top-right
                  index === 6 ? "-top-[34vh] left-[32vw] w-[14vw] h-[14vh] min-w-[90px] min-h-[90px]" : ""
                }`}
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt={alt || `Parallax image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
