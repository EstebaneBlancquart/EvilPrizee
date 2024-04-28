import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// @ts-ignore
import { Vector3 } from "three";
import { getBaseUrl } from "../helpers/import.helper";
import MajorasMask from "../components/MajorasMask";
import ChallengeText from "../components/ChallengeText";
import LayerInfos from "../components/LayerInfos";
import DevComponent from "../components/Test/DevComponent";
import Modal from "../components/Common/Modal";
import Icon from "../components/Icons/Icon";
import ArrowButton from "../components/Common/ArrowButton";

export default function EvilView() {
  const [texts, setTexts] = useState<string[]>([]);
  const [recapText, setRecapText] = useState<string[]>([
    "Première épreuve :",
    "Mange ta soupe",
  ]);
  const [isChalllengeInputOpen, setIsChallengeInputOpen] = useState(false);
  const [code, setCode] = useState("");

  const devHandleAddTextChange = (checked: boolean) => {
    if (checked) {
      setTexts(["Bonjour LePab,", "Bienvenue dans la simulation."]);
      setRecapText([]);
    } else {
      setTexts([]);
      setRecapText(["Première épreuve :", "Mange ta soupe"]);
    }
  };

  const handleOpenChallengeInput = () => {
    console.log("Finish Challenge");
    setIsChallengeInputOpen(true);
  };

  useEffect(() => {
    setCode("");
  }, [isChalllengeInputOpen]);

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
        <MajorasMask position={new Vector3(0, 0.5, 1)} />
        <OrbitControls makeDefault />
      </Canvas>

      {texts.length > 0 && <ChallengeText texts={texts} />}
      {texts.length === 0 && (
        <LayerInfos
          money={0}
          texts={recapText}
          handleOpenChallengeInput={handleOpenChallengeInput}
        />
      )}

      <DevComponent handleAddTextChanged={devHandleAddTextChange} />

      {isChalllengeInputOpen && (
        <Modal onClose={() => setIsChallengeInputOpen(false)}>
          <div className="w-96">
            <h1 className="text-center">Veuillez entrer le code :</h1>
            <div className="px-8 my-12 grid grid-rows-2 grid-flow-col">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
                .sort((a, b) => 0.5 - Math.random())
                .map((number, index) => (
                  <button
                    key={index}
                    className="bg-black text-2xl border text-white aspect-square"
                    onClick={() => setCode(code + number.toString())}
                  >
                    {number}
                  </button>
                ))}
            </div>
            <div className="flex justify-around">
              <p>Code : </p>
              <p className="grow text-center">{code}</p>
              <button
                onClick={() => {
                  setCode((code) => {
                    return code.slice(0, -1);
                  });
                }}
              >
                <Icon name="erase" width={24} height={24} />
              </button>
            </div>
            <div className="flex justify-center mt-8 pl-8">
              <ArrowButton
                text="Valider"
                onClick={() => {
                  setIsChallengeInputOpen(false);
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
