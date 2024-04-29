import { useState } from "react";
import ArrowButton from "./Common/ArrowButton";
import Modal from "./Common/Modal";
import Icon from "./Icons/Icon";

export default function ChallengeInputModal({
  code,
  onSuccess,
}: {
  code: string;
  onSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [tryCode, setTryCode] = useState("");

  const handleValidateCode = () => {
    console.log(
      "Trying to validate code : ",
      tryCode,
      "and real code is ",
      code
    );
    if (tryCode === code) {
      console.log("Code is correct");
      onSuccess();
    } else {
      console.log("Code is incorrect");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="w-full">
        <h1 className="text-center">Veuillez entrer le code :</h1>
        <div className="px-8 my-12 grid grid-rows-2 grid-flow-col">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
            .sort(() => 0.5 - Math.random())
            .map((number, index) => (
              <button
                key={index}
                className="bg-black text-2xl border text-white aspect-square"
                onClick={() => setTryCode(tryCode + number.toString())}
              >
                {number}
              </button>
            ))}
        </div>
        <div className="flex justify-around">
          <p>Code : </p>
          <p className="grow text-center">{tryCode}</p>
          <button
            onClick={() => {
              setTryCode((code) => {
                return code.slice(0, -1);
              });
            }}
          >
            <Icon name="erase" width={24} height={24} />
          </button>
        </div>
        <div className="flex justify-center mt-8 pl-8">
          <ArrowButton text="Valider" onClick={handleValidateCode} />
        </div>
      </div>
    </Modal>
  );
}
