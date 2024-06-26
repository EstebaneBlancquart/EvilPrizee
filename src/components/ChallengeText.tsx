import { useEffect, useState } from "react";
import ArrowButton from "./Common/ArrowButton";

const getSentences = (texts: string[], length: number) => {
  let currentLength = 0;
  const newTexts = [];

  for (const text of texts) {
    if (currentLength + text.length > length) {
      newTexts.push(text.substring(0, length - currentLength));
      break;
    }
    newTexts.push(text);
    currentLength += text.length;
  }
  return newTexts;
};

export default function ChallengeText({
  texts,
  onNext,
}: {
  texts: string[];
  onNext?: () => void;
}) {
  const [length, setLength] = useState(0);
  const [sentences, setSentences] = useState(getSentences(texts, length));

  const totalLength = texts.reduce((acc, text) => acc + text.length, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (length === totalLength) {
        clearInterval(interval);
        return;
      }
      setLength((length) => length + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSentences(getSentences(texts, length));
  }, [length]);

  return (
    <div className="p-4 absolute bottom-0 left-0 w-full">
      <div className="border-4 md:border-8 border-white bg-black max-w-5xl mx-auto  text-white h-44 ">
        <div className="h-full flex flex-col justify-center items-center text-md  text-center relative md:text-xl">
          {sentences.map((sentence, index) => (
            <p key={index}>{sentence}</p>
          ))}
          {onNext && (
            <ArrowButton
              className="absolute bottom-3 right-5 animate-pulse"
              onClick={() => {
                if (length < totalLength) {
                  setLength(totalLength);
                  return;
                }
                setLength(0);
                onNext();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
