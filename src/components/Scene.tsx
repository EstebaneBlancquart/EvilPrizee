import { Canvas } from "@react-three/fiber";
import MajorasMask from "./MajorasMask";
import { OrbitControls } from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas>
      <directionalLight
        position={[3.3, 1.0, 4.4]}
        castShadow
        intensity={Math.PI * 2}
      />
      <MajorasMask />
      <OrbitControls makeDefault />
    </Canvas>
  );
}
