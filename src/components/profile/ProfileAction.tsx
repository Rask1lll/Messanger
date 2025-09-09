export type Color = "blue" | "red" | "green" | "yellow";
export default function ProfileActions({
  em = "",
  content,
  color,
}: {
  em: string;
  content: string;
  color: Color;
}) {
  return (
    <div
      className={`min-w-50 hover:scale-105 hover:cursor-pointer transition-all duration-150 ${
        "bg-" +
        color +
        "-400" +
        " ring-" +
        color +
        "-700" +
        " inset-shadow-" +
        color +
        "-700"
      } rounded-2xl p-5 inset-shadow-xs  ring-2 w-full`}
    >
      <div className="text-white text-xl font-semibold flex gap-3 items-center">
        <p className="text-2xl">{em}</p>
        <p>{content}</p>
      </div>
    </div>
  );
}
