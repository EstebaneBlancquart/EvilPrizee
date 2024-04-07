import Coupon from "./Coupon";
export default function Icon({
  name,
  width = 50,
  height = 50,
  color = "currentColor",
}: {
  name: string;
  width?: number;
  height?: number;
  color?: string;
}) {
  switch (name) {
    case "coupon":
      return <Coupon color={color} width={width} height={height} />;
    default:
      return null;
  }
}
