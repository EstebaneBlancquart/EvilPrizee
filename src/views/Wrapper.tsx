// @ts-ignore
import useSound from "use-sound";
import EvilView from "./EvilView";
import FirstOpenView from "./FirstOpenView";
import { isFirstOpening } from "../helpers/localstorage.helper";
import music from "../music.mp3";

export default function Wrapper() {
  const second = 1000;
  const [play] = useSound(music, {
    interrupt: true,
    sprite: {
      main: [32 * second, 5 * 60 * second],
    },
    onend: () => {
      play({ id: "main" });
    },
  });

  return (
    <div className="h-full w-full" onMouseEnter={() => play({ id: "main" })}>
      {isFirstOpening() ? <FirstOpenView /> : <EvilView />}
    </div>
  );
}
