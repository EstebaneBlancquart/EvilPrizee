import { useLoader } from "@react-three/fiber";
// @ts-ignore
import { Vector3 } from "three";
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export default function MajorasMask({ position }: { position: Vector3 }) {
  const gltf = useLoader(GLTFLoader, "/moon.glb");
  gltf.scene.scale.set(0.001, 0.001, 0.001);
  return <primitive object={gltf.scene} position={position} />;
}
