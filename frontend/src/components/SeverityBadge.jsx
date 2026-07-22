function SeverityBadge({ severity }) {

  let color = "";

  if (severity === "Critical") {
    color = "bg-red-500/20 text-red-400";
  } 
  else if (severity === "High") {
    color = "bg-orange-500/20 text-orange-400";
  } 
  else if (severity === "Medium") {
    color = "bg-yellow-500/20 text-yellow-400";
  } 
  else {
    color = "bg-slate-500/20 text-slate-300";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}
    >
      {severity}
    </span>
  );
}

export default SeverityBadge;