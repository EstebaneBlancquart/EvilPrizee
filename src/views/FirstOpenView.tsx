import { useState } from "react";
import { setFirstOpening } from "../helpers/localstorage.helper";

const GenericView = ({
  texts,
  onOk,
  onCancel,
}: {
  texts: string[];
  onOk?: () => void;
  onCancel?: () => void;
}) => {
  return (
    <div className=" h-full w-full bg-black flex flex-col items-center justify-center gap-8">
      {texts.map((text, index) => (
        <p key={index} className="text-white">
          {text}
        </p>
      ))}
      {(onOk || onCancel) && (
        <div className="flex gap-4 justify-center">
          {onOk && (
            <button
              onClick={onOk}
              className="bg-green-400 text-black p-2 rounded w-48 transition-all duration-50 hover:bg-green-600"
            >
              Oui.
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="bg-red-400 text-black p-2 rounded w-48 transition-all duration-50 hover:bg-red-600"
            >
              Non, j'ai peur.
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const SimpleView = ({ text }: { text: string }) => {
  return (
    <div className=" h-full w-full bg-black flex flex-col items-center justify-center gap-8">
      <p className="text-white">{text}</p>
    </div>
  );
};

export default function FirstOpenView() {
  const [currentView, setCurrentView] = useState("first");

  switch (currentView) {
    case "first":
      return (
        <GenericView
          onOk={() => setCurrentView("second")}
          onCancel={() => setCurrentView("afraid")}
          texts={[
            "Bonjour.",
            "Vous êtes sur le point d'entrer dans EvilPrizee.",
            "Êtes-vous certain de vouloir continuer ?",
          ]}
        />
      );
    case "second":
      return (
        <GenericView
          onOk={() => setCurrentView("third")}
          onCancel={() => setCurrentView("afraid")}
          texts={[
            "Le site que vous allez voir peut s'avérer dangereux pour un public non initié.",
            "Êtes-vous vraiment certain de vouloir continuer ?",
          ]}
        />
      );
    case "third":
      return (
        <GenericView
          onOk={() => setCurrentView("fourth")}
          onCancel={() => setCurrentView("afraid")}
          texts={[
            "S'il venait à vous arriver quoi que ce soit en continuant, nous ne pourrions être tenus responsables.",
            "Etant donné que vous ne connaissez pas ce qui va suivre, nous vous conseillons de ne pas continuer.",
            "Êtes-vous vraiment vraiment certain de vouloir continuer ?",
          ]}
        />
      );
    case "fourth":
      return (
        <GenericView
          onOk={() => setCurrentView("fifth")}
          onCancel={() => setCurrentView("afraid")}
          texts={[
            "A votre place je ne cliquerais pas sur le bouton vert.",
            "Voulez-vous vraiment cliquer sur ce bouton ?",
          ]}
        />
      );
    case "fifth":
      return (
        <GenericView
          onOk={() => setCurrentView("sixth")}
          onCancel={() => setCurrentView("afraid")}
          texts={[
            "Pour être bien certain de votre certitude, nous vous demandons une dernière fois :",
            "Voulez-vous entrer sur le site ?",
          ]}
        />
      );
    case "sixth":
      return (
        <GenericView
          onOk={() => setCurrentView("wrong-button")}
          onCancel={() => {
            setFirstOpening();
            window.location.reload();
          }}
          texts={[
            "Vous êtes sur le point d'entrer. Aucun retour en arrière ne sera possible.",
            "Pour continuer, cliquer sur le bouton rouge.",
          ]}
        />
      );
    case "wrong-button":
      return (
        <GenericView
          texts={[
            "Vous avez cliqué sur le bouton vert alors que nous vous avions stipulé de cliquer sur le bouton rouge.",
            "Lisez les consignes bordel.",
          ]}
        />
      );
    case "afraid":
      return <GenericView texts={["Tarlouze."]} />;

    default:
      return <SimpleView text="Oups." />;
  }
}
