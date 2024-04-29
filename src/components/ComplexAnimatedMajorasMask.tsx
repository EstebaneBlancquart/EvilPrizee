import { useEffect, useState } from "react";
import { Vector3 } from "three";
import MajorasMask from "./MajorasMask";

export function ComplexAnimatedMajorasMask({
  startPosition,
  startRotation,
  animation,
  duration = 1000,
  loop = false,
}: {
  startPosition: Vector3;
  startRotation: number[];
  animation: {
    rotation: number[];
    position: Vector3;
  }[];
  duration?: number;
  loop?: boolean;
}) {
  const [maskPosition, setMaskPosition] = useState(startPosition);
  const [maskRotation, setMaskRotation] = useState(startRotation);

  const frequency = 10;

  const steps = Object.entries(animation).map(([key, value]) => {
    const percent = parseFloat(key.substring(0, key.length - 1));
    const durationKey = Math.round(((percent / 100) * duration) / frequency);

    return {
      frequency: durationKey,
      rotation: value.rotation,
      position: value.position,
    };
  });

  let coeff = 1;
  let intervalMaskAnimation: any = null;

  let currentDuration = 0;

  const stopAnimation = () => {
    if (intervalMaskAnimation) clearInterval(intervalMaskAnimation);
  };

  useEffect(() => {
    intervalMaskAnimation = setInterval(() => {
      let currentStep = steps[0];
      for (let i = 0; i < steps.length; i++) {
        if (steps[i].frequency <= currentDuration / frequency) {
          currentStep = steps[i];
        }
      }

      const nextStep = steps.find((step) => {
        if (step.frequency === currentDuration / frequency) return step;
        if (step.frequency > currentDuration / frequency) return step;
      });

      if (!nextStep) return;

      const durationBetweenSteps = nextStep.frequency - currentStep.frequency;
      if (durationBetweenSteps > 0) {
        setMaskPosition((maskPosition) => {
          maskPosition.set(
            maskPosition.x +
              (coeff * (nextStep.position.x - currentStep.position.x)) /
                durationBetweenSteps,
            maskPosition.y +
              (coeff * (nextStep.position.y - currentStep.position.y)) /
                durationBetweenSteps,
            maskPosition.z +
              (coeff * (nextStep.position.z - currentStep.position.z)) /
                durationBetweenSteps
          );

          return maskPosition.clone();
        });

        setMaskRotation((maskRotation) => {
          maskRotation[0] +=
            (nextStep.rotation[0] - currentStep.rotation[0]) /
            durationBetweenSteps;
          maskRotation[1] +=
            (nextStep.rotation[1] - currentStep.rotation[1]) /
            durationBetweenSteps;
          maskRotation[2] +=
            (nextStep.rotation[2] - currentStep.rotation[2]) /
            durationBetweenSteps;
          return [maskRotation[0], maskRotation[1], maskRotation[2]];
        });
      }

      currentDuration += frequency;

      if (currentDuration >= duration) {
        if (!loop) stopAnimation();
        else {
          currentDuration = 0;
        }
      }
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
