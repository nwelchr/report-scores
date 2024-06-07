const getColorByPlacement = (placement) => {
  if (placement === 1) return "bg-emerald-600";
  if (placement === 2) return "bg-teal-600";
  if (placement === 3) return "bg-cyan-600";
  if (placement === 4) return "bg-indigo-600";
  if (placement === 5) return "bg-violet-600";
  if (placement === 7) return "bg-rose-600";
  if (placement >= 9 && placement <= 16) return "bg-red-800";
  if (placement >= 17 && placement <= 32) return "bg-red-950";
  return "bg-gray-800";
};

const Entrant = ({ standing }) => {
  return (
    <li
      className={`p-2 mb-2 rounded-md ${getColorByPlacement(
        standing.placement
      )}`}
    >
      {standing.placement}. {standing.entrant.name} (Seed{" "}
      {standing.entrant.seeds[0].seedNum})
    </li>
  );
};

export default Entrant;
