import Icon from "./Icons/Icon";

export default function LayerInfos({ money }: { money: number }) {
  return (
    <div className="fixed w-full h-full top-0 left-0 -z-10 p-4">
      <div className="relative w-full h-full">
        {/* Money */}
        <div className="absolute top-0 right-0 text-white flex items-center">
          <p className="text-2xl">{money}</p>
          <div className="ml-2">
            <Icon name="coupon" width={60} height={60} />
          </div>
        </div>
      </div>
    </div>
  );
}
