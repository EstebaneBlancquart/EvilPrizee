import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// @ts-ignore
import { Vector3 } from "three";
import ConfettiExplosion from "react-confetti-explosion";
import Confetti from "react-confetti";
import { getBaseUrl } from "../helpers/import.helper";
import {
  getCurrentStep,
  getIsFinished,
  setCurrentStep,
  setIsFinished,
} from "../helpers/localstorage.helper";
import MajorasMask from "../components/MajorasMask";
import ChallengeText from "../components/ChallengeText";
import LayerInfos from "../components/LayerInfos";
import DevComponent from "../components/Test/DevComponent";
import { AnimatedMajorasMask } from "../components/AnimatedMajorasMask";
import steps from "../steps.json";
import ChallengeInputModal from "../components/ChallengeInputModal";
import { ComplexAnimatedMajorasMask } from "../components/ComplexAnimatedMajorasMask";

enum Status {
  APPEARING = "appearing",
  SPEAKING = "speaking",
  PRESENT = "present",
  DISAPPEARING = "disappearing",
  NOT_PRESENT = "not_present",
}

export default function EvilView() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const storageStep = getCurrentStep();
  const storageFinished = getIsFinished();

  const [status, setStatus] = useState(Status.APPEARING);
  const [step, setStep] = useState(storageStep);
  const [isExploding, setIsExploding] = useState(false);
  const [finished, setFinished] = useState(storageFinished);

  const [isChalllengeInputOpen, setIsChallengeInputOpen] = useState(false);

  const [currentParagraph, setCurrentParagraph] = useState(0);

  const currentDate = new Date();
  const targetDate = new Date("2024-05-12T00:00:00");
  const diff = targetDate.getTime() - currentDate.getTime();

  const [money, setMoney] = useState(0);

  const handleOpenChallengeInput = () => {
    setIsChallengeInputOpen(true);
  };

  useEffect(() => {
    setMoney(step * 50);
    setCurrentParagraph(0);
    setStatus(Status.APPEARING);
  }, [step]);

  useEffect(() => {
    if (status === Status.DISAPPEARING) {
      const timeout = setTimeout(() => {
        setStatus(Status.NOT_PRESENT);
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (status === Status.APPEARING) {
      const timeout = setTimeout(() => {
        setStatus(Status.SPEAKING);
      }, 2500);
      return () => clearTimeout(timeout);
    }

    if (status === Status.SPEAKING) {
      console.log(steps[step].paragraphs[currentParagraph]);
      const textSize = steps[step].paragraphs[currentParagraph].reduce(
        (acc, text) => acc + text.length,
        0
      );

      console.log(textSize, steps[step].paragraphs[currentParagraph]);
      const timeout = setTimeout(() => {
        setStatus(Status.PRESENT);
      }, textSize * 100 + 1000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleNextStep = () => {
    setIsChallengeInputOpen(false);
    setIsExploding(true);

    setTimeout(() => {
      setIsExploding(false);
      if (step < steps.length - 1) {
        setStep(step + 1);
        setCurrentStep(step + 1);
      } else {
        setFinished(true);
        setIsFinished(true);
      }
    }, 1000);
  };

  const animationSpeaking = {
    "0%": {
      rotation: [0, 0, 0],
      position: new Vector3(0, 0.5, 0),
    },
    "20%": {
      rotation: [-Math.PI / 100, -Math.PI / 100, 0],
      position: new Vector3(0, 0.5, 0),
    },
    "60%": {
      rotation: [Math.PI / 100, Math.PI / 100, 0],
      position: new Vector3(0, 0.5, 0),
    },
    "75%": {
      rotation: [-Math.PI / 100, Math.PI / 100, 0],
      position: new Vector3(0, 0.5, 0),
    },
    "100%": {
      rotation: [0, 0, 0],
      position: new Vector3(0, 0.5, 0),
    },
  };

  return (
    <div className=" h-full flex flex-col">
      <img
        className="-z-10 absolute h-full w-full object-cover"
        src={getBaseUrl() + "/background.jpg"}
        alt="background"
      />

      {!finished && (
        <Canvas>
          <directionalLight
            position={[3.3, 1.0, 4.4]}
            castShadow
            intensity={Math.PI * 2}
          />

          {status === Status.APPEARING && (
            <AnimatedMajorasMask
              startPosition={new Vector3(95.6, 0.5, -191)}
              startRotation={[0, 3 * Math.PI, 0]}
              endPosition={new Vector3(0, 0.5, 0)}
              endRotation={[0, 0, 0]}
              delayBeforeAnimation={100}
              duration={1000}
            />
          )}

          {status === Status.PRESENT && (
            <MajorasMask position={new Vector3(0, 0.5, 0)} />
          )}

          {status === Status.SPEAKING && (
            <ComplexAnimatedMajorasMask
              startPosition={new Vector3(0, 0.5, 0)}
              startRotation={[0, 0, 0]}
              duration={1000}
              animation={animationSpeaking}
              loop
            />
          )}

          {status === Status.DISAPPEARING && (
            <AnimatedMajorasMask
              startPosition={new Vector3(0, 0.5, 0)}
              startRotation={[0, 0, 0]}
              endPosition={new Vector3(95.6, 0.5, -191)}
              endRotation={[0, 3 * Math.PI, 0]}
              duration={1000}
            />
          )}

          {status === Status.NOT_PRESENT && (
            <MajorasMask
              position={new Vector3(95.6, 0.5, -191)}
              rotation={[0, 3 * Math.PI, 0]}
            />
          )}

          <OrbitControls makeDefault />
        </Canvas>
      )}

      {!finished &&
        (status === Status.SPEAKING || status === Status.PRESENT) && (
          <ChallengeText
            texts={steps[step].paragraphs[currentParagraph]}
            onNext={() => {
              if (currentParagraph < steps[step].paragraphs.length - 1) {
                setStatus(Status.SPEAKING);
                setCurrentParagraph(currentParagraph + 1);
              } else {
                setStatus(Status.DISAPPEARING);
              }
            }}
          />
        )}
      {!finished && status === Status.NOT_PRESENT && (
        <LayerInfos
          money={money}
          texts={steps[step].recap}
          handleOpenChallengeInput={handleOpenChallengeInput}
        />
      )}

      <DevComponent />

      {!finished && isChalllengeInputOpen && (
        <ChallengeInputModal
          code={steps[step].code}
          onSuccess={handleNextStep}
        />
      )}

      {!finished && isExploding && (
        <div className="absolute top-1/2 left-1/2 w-96 h-96">
          <ConfettiExplosion />
        </div>
      )}

      {finished && (
        <>
          <Confetti width={width} height={height} />
          <div className=" text-center flex flex-col gap-4 absolute text-white text-md md:text-2xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p>Bravo.</p>
            {diff > 0 && <p>Le RIB sera disponible à partir de 00h00.</p>}
            {diff < 0 && <p>FR76 0514 2051 8185 1351 4200 000</p>}
          </div>
        </>
      )}
    </div>
  );
}
