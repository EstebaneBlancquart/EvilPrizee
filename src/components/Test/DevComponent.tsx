import { useState } from "react";
import { resetLocalStorage } from "../../helpers/localstorage.helper";
import Toggle from "./Toggle";

export default function DevComponent({
  handleAddTextChanged,
}: {
  handleAddTextChanged: (checked: boolean) => void;
}) {
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
          <Toggle onChange={handleAddTextChanged} text={"Add text?"} />
          <button
            className="bg-white text-black pr-3 pl-4 pb-1 rounded-2xl my-4 transition-all duration-75 hover:bg-blue-200"
            onClick={() => {
              resetLocalStorage();
              window.location.reload();
            }}
          >
            Reset LocalStorage
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
