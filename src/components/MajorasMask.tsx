import { useLoader } from "@react-three/fiber";
// @ts-ignore
import { Vector3 } from "three";
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

export default function MajorasMask() {
  const gltf = useLoader(GLTFLoader, "/moon.glb");
  gltf.scene.scale.set(0.001, 0.001, 0.001);
  return <primitive object={gltf.scene} position={new Vector3(0, 0, -1)} />;
}
