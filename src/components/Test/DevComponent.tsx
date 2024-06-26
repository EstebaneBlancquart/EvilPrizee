import { useState } from "react";
import {
  resetLocalStorage,
  setCurrentStep,
  setFirstOpening,
  setIsFinished,
} from "../../helpers/localstorage.helper";

export default function DevComponent({}: {}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <div
        className={`${
          isOpened ? "translate-x-0" : "-translate-x-full"
        } transition-all ease-in-out duration-300 overflow-hidden bg-black bg-opacity-20 h-full w-80 fixed top-0 left-0 text-white`}
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h1>Developer options</h1>
            <button
              onClick={() => setIsOpened(false)}
              className="bg-black pr-3 pl-4 pb-1 rounded-2xl"
            >
              close
            </button>
          </div>
          <button
            className="bg-white text-black pr-3 pl-4 pb-1 rounded-2xl my-4 transition-all duration-75 hover:bg-blue-200"
            onClick={() => {
              resetLocalStorage();
              window.location.reload();
            }}
          >
            Reset LocalStorage
          </button>
          <button
            className="bg-white text-black pr-3 pl-4 pb-1 rounded-2xl my-4 transition-all duration-75 hover:bg-blue-200"
            onClick={() => {
              setFirstOpening(false);
              window.location.reload();
            }}
          >
            Reset first opening
          </button>
          <button
            className="bg-white text-black pr-3 pl-4 pb-1 rounded-2xl my-4 transition-all duration-75 hover:bg-blue-200"
            onClick={() => {
              setCurrentStep(0);
              window.location.reload();
            }}
          >
            Reset steps
          </button>
          <button
            className="bg-white text-black pr-3 pl-4 pb-1 rounded-2xl my-4 transition-all duration-75 hover:bg-blue-200"
            onClick={() => {
              setIsFinished(false);
              window.location.reload();
            }}
          >
            Reset finished
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsOpened(true)}
        className={`${
          isOpened ? "hidden" : ""
        } text-white bg-black pr-3 pl-4 pb-1 rounded-2xl fixed top-4 left-2`}
      >
        open dev options
      </button>
    </>
  );
}
