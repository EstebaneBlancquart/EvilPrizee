import { useEffect, useState } from "react";
import { Vector3 } from "three";
import MajorasMask from "./MajorasMask";

export function AnimatedMajorasMask({
  startPosition,
  startRotation,
  endPosition,
  endRotation,
  delayBeforeAnimation = 0,
  duration = 1000,
  loop = false,
}: {
  startPosition: Vector3;
  startRotation: number[];
  endPosition: Vector3;
  endRotation: number[];
  delayBeforeAnimation?: number;
  duration?: number;
  loop?: boolean;
}) {
  const [maskPosition, setMaskPosition] = useState(startPosition.clone());
  const [maskRotation, setMaskRotation] = useState(startRotation);
  let intervalMaskAnimation: any = null;

  let currentDuration = 0;

  const frequency = 10;

  const stopAnimation = () => {
    if (intervalMaskAnimation) clearInterval(intervalMaskAnimation);

    setTimeout(() => {
      setMaskPosition(endPosition);
      setMaskRotation(endRotation);
    }, frequency);
  };

  useEffect(() => {
    let delay = delayBeforeAnimation;
    let coeff = 1;
    intervalMaskAnimation = setInterval(() => {
      if (delay > 0) {
        delay -= 1;
        return;
      }

      currentDuration += frequency;

      if (currentDuration >= duration) {
        if (!loop) stopAnimation();
        else {
          currentDuration = 0;
          coeff *= -1;
        }
      }

      setMaskPosition((maskPosition) => {
        maskPosition.set(
          maskPosition.x +
            (coeff * (endPosition.x - startPosition.x)) /
              (duration / frequency),
          maskPosition.y +
            (coeff * (endPosition.y - startPosition.y)) /
              (duration / frequency),
          maskPosition.z +
            (coeff * (endPosition.z - startPosition.z)) / (duration / frequency)
        );
        return maskPosition.clone();
      });

      setMaskRotation((maskRotation) => {
        maskRotation[0] +=
          (coeff * (endRotation[0] - startRotation[0])) /
          (duration / frequency);
        maskRotation[1] +=
          (coeff * (endRotation[1] - startRotation[1])) /
          (duration / frequency);
        maskRotation[2] +=
          (coeff * (endRotation[2] - startRotation[2])) /
          (duration / frequency);
        return [maskRotation[0], maskRotation[1], maskRotation[2]];
      });
    }, frequency);

    return () => stopAnimation();
  }, []);

  return (
    <MajorasMask
      key={maskPosition + maskRotation.toString()}
      position={maskPosition}
      rotation={maskRotation}
    />
  );
}
