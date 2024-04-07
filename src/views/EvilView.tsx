import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// @ts-ignore
import { Vector3 } from "three";
import { getBaseUrl } from "../helpers/import.helper";
import MajorasMask from "../components/MajorasMask";
import ChallengeText from "../components/ChallengeText";
import LayerInfos from "../components/LayerInfos";
import DevComponent from "../components/Test/DevComponent";

export default function EvilView() {
  const [texts, setTexts] = useState<string[]>([]);

  const devHandleAddTextChange = (checked: boolean) => {
    if (checked) {
      setTexts(["Bonjour LePab,", "Bienvenue dans la simulation."]);
    } else {
      setTexts([]);
    }
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
        <MajorasMask position={new Vector3(0, 0.5, 1)} />
        <OrbitControls makeDefault />
      </Canvas>

      {texts.length > 0 && <ChallengeText texts={texts} />}
      {texts.length === 0 && <LayerInfos money={0} />}

      <DevComponent handleAddTextChanged={devHandleAddTextChange} />
    </div>
  );
}
