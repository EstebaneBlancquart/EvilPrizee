import { useLoader } from "@react-three/fiber";
// @ts-ignore
import { Vector3 } from "three";
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { getBaseUrl } from "../helpers/import.helper";

export default function MajorasMask({
  position,
  rotation = [0, 0, 0],
}: {
  position: Vector3;
  rotation?: number[];
}) {
  const path = getBaseUrl() + "/moon.glb";
  const gltf = useLoader(GLTFLoader, path);
  gltf.scene.scale.set(0.001, 0.001, 0.001);
  return (
    <primitive object={gltf.scene} position={position} rotation={rotation} />
  );
}
