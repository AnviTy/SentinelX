function StatusBadge({ status }) {

  let color = "";

  if (status === "Open") {
    color = "bg-red-500/20 text-red-400";
  }
  else if (status === "Investigating") {
    color = "bg-yellow-500/20 text-yellow-400";
  }
  else if (status === "Closed") {
    color = "bg-green-500/20 text-green-400";
  }
  else {
    color = "bg-slate-500/20 text-slate-300";
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;