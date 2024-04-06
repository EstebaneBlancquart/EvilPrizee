import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// @ts-ignore
import { Vector3 } from "three";
import MajorasMask from "../components/MajorasMask";
import ChallengeText from "../components/ChallengeText";
import { getBaseUrl } from "../helpers/import.helper";

export default function EvilView() {
  const texts = ["Bonjour LePab,", "Bienvenue dans la simulation."];
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
        <MajorasMask position={new Vector3(0, 0, 2)} />
        <OrbitControls makeDefault />
      </Canvas>
      <ChallengeText texts={texts} />
    </div>
  );
}
