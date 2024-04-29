import ArrowButton from "./Common/ArrowButton";
import Icon from "./Icons/Icon";

export default function LayerInfos({
  money,
  texts,
  handleOpenChallengeInput,
}: {
  money: number;
  texts: string[];
  handleOpenChallengeInput: () => void;
}) {
  return (
    <div className="fixed w-full h-full top-0 left-0 p-4">
      <div className="relative w-full h-full">
        {/* Money */}
        <div className="absolute top-0 right-0 text-white flex items-center">
          <p className="text-2xl">{money}</p>
          <div className="ml-2">
            <Icon name="coupon" width={60} height={60} />
          </div>
        </div>

        {/* Recap Challenge Text */}
        {texts.length > 0 && (
          <div className="absolute bottom-0 left-0 w-full">
            <div className="relative bg-opacity-80 border-4 border-white bg-amber-800 max-w-5xl mx-auto  text-white h-44 ">
              <div className="h-full flex flex-col justify-center items-center text-md md:text-xl">
                {texts.map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
              <div className="absolute bottom-2 right-2">
                <ArrowButton
                  text="J'ai fini l'épreuve"
                  onClick={handleOpenChallengeInput}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
