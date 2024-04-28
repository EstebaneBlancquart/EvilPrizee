import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// @ts-ignore
import { Vector3 } from "three";
import { getBaseUrl } from "../helpers/import.helper";
import {
  isFirstMaskOpening,
  setFirstMaskOpening,
} from "../helpers/localstorage.helper";
import MajorasMask from "../components/MajorasMask";
import ChallengeText from "../components/ChallengeText";
import LayerInfos from "../components/LayerInfos";
import DevComponent from "../components/Test/DevComponent";
import Modal from "../components/Common/Modal";
import Icon from "../components/Icons/Icon";
import ArrowButton from "../components/Common/ArrowButton";
import { AnimatedMajorasMask } from "../components/AnimatedMajorasMask";
import steps from "../steps.json";
import ChallengeInputModal from "../components/ChallengeInputModal";

enum Status {
  APPEARING = "appearing",
  PRESENT = "present",
  DISAPPEARING = "disappearing",
  NOT_PRESENT = "not_present",
}

export default function EvilView() {
  const firstOpen = isFirstMaskOpening();
  if (firstOpen) setFirstMaskOpening(false);

  const [status, setStatus] = useState(Status.APPEARING);
  const [step, setStep] = useState(0);

  const [isChalllengeInputOpen, setIsChallengeInputOpen] = useState(false);
  const [code, setCode] = useState("");

  const [currentParagraph, setCurrentParagraph] = useState(0);

  const handleOpenChallengeInput = () => {
    console.log("Finish Challenge");
    setIsChallengeInputOpen(true);
  };

  useEffect(() => {
    setCode("");
  }, [isChalllengeInputOpen]);

  useEffect(() => {
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
        setStatus(Status.PRESENT);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleNextStep = () => {
    setIsChallengeInputOpen(false);

    if (step === steps.length - 1) {
      console.log("End of the game");
      return;
    }

    setStep(step + 1);
  };

  return (
    <div className=" h-full flex flex-col">
      <img
        className="-z-10 absolute h-full w-full object-cover"
        src={getBaseUrl() + "/background.jpg"}
        alt="background"
      />

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

        {status === Status.DISAPPEARING && (
          <AnimatedMajorasMask
            startPosition={new Vector3(0, 0.5, 0)}
            startRotation={[0, 0, 0]}
            endPosition={new Vector3(95.6, 0.5, -191)}
            endRotation={[0, 3 * Math.PI, 0]}
            delayBeforeAnimation={0}
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

      {status === Status.PRESENT && (
        <ChallengeText
          texts={steps[step].paragraphs[currentParagraph]}
          onNext={() => {
            if (currentParagraph < steps[step].paragraphs.length - 1) {
              setCurrentParagraph(currentParagraph + 1);
            } else {
              setStatus(Status.DISAPPEARING);
            }
          }}
        />
      )}
      {status === Status.NOT_PRESENT && (
        <LayerInfos
          money={0}
          texts={steps[step].recap}
          handleOpenChallengeInput={handleOpenChallengeInput}
        />
      )}

      <DevComponent />

      {isChalllengeInputOpen && (
        <ChallengeInputModal
          code={steps[step].code}
          onSuccess={handleNextStep}
        />
      )}
    </div>
  );
}
