import { useState } from "react";
// import Sidebar from "./Sidebar";

export default function ProcessTable({
  onSubmitVisualization,
  onSubmitRUN,
  selectedAlgorithm,
}) {
  const [processes, setProcesses] = useState([
    { id: 0, arrival: "10", burst: "2", priority: "0" },
    { id: 1, arrival: "3", burst: "1", priority: "1" },
    { id: 2, arrival: "4", burst: "2", priority: "2" },
    { id: 3, arrival: "8", burst: "3", priority: "1" },
  ]);

  const [open, setOpen] = useState(false);

  const isPriorityAlgorithm = selectedAlgorithm.includes("Priority");

  const addProcess = () => {
    const nextId = processes.length;
    setProcesses([
      ...processes,
      {
        id: nextId,
        arrival: "",
        burst: "",
        priority: "0", // Default priority
      },
    ]);
  };

  const deleteProcess = () => {
    if (processes.length > 1)
      setProcesses(processes.slice(0, processes.length - 1));
  };

  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = value;
    setProcesses(updated);
  };

  const handleRun = () => {
    const finalProcesses = processes.map((p) => ({
      id: p.id,
      arrival_time: parseInt(p.arrival),
      burst_time: parseInt(p.burst),
      ...(isPriorityAlgorithm && { priority: parseInt(p.priority) }), // Conditionally add priority
    }));
    onSubmitRUN(finalProcesses);
  };

  const handleVisualize = () => {
    const finalProcesses = processes.map((p) => ({
      id: p.id,
      arrival_time: parseInt(p.arrival),
      burst_time: parseInt(p.burst),
      ...(isPriorityAlgorithm && { priority: parseInt(p.priority) }), // Conditionally add priority
    }));
    onSubmitVisualization(finalProcesses);
  };

  return (
    <div className="relative p-4 w-full flex flex-col lg:flex-row justify-between items-start gap-8 overflow-x-auto bg-amber-100">
      {/* ===== TABLE (Left) ===== */}
      <div className="flex-1 overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-700 text-white text-center">
              <th className="px-4 sm:px-6 py-2">Process</th>
              <th className="px-4 sm:px-6 py-2">Arriving Time</th>
              <th className="px-4 sm:px-6 py-2">CPU Burst</th>
              {isPriorityAlgorithm && (
                <th className="px-4 sm:px-6 py-2">Priority</th>
              )}
            </tr>
          </thead>
          <tbody>
            {processes.map((p, idx) => (
              <tr
                key={p.id}
                className="bg-yellow-100 text-center border-b border-gray-200 hover:bg-yellow-200 transition"
              >
                <td className="py-2 font-semibold">P{p.id}</td>
                <td className="py-2">
                  <input
                    type="number"
                    placeholder="edit"
                    value={p.arrival}
                    onChange={(e) =>
                      handleChange(idx, "arrival", e.target.value)
                    }
                    className="bg-transparent text-blue-600 text-center outline-none w-16 sm:w-20"
                  />
                </td>
                <td className="py-2">
                  <input
                    type="number"
                    placeholder="edit"
                    value={p.burst}
                    onChange={(e) => handleChange(idx, "burst", e.target.value)}
                    className="bg-transparent text-blue-600 text-center outline-none w-16 sm:w-20"
                  />
                </td>
                {isPriorityAlgorithm && (
                  <td className="py-2">
                    <input
                      type="number"
                      placeholder="0"
                      value={p.priority}
                      onChange={(e) =>
                        handleChange(idx, "priority", e.target.value)
                      }
                      className="bg-transparent text-blue-600 text-center outline-none w-16 sm:w-20"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== BUTTONS (Right) ===== */}
      <div className="flex flex-col items-center justify-start gap-4 w-full lg:w-48">
        <button
          onClick={addProcess}
          className="bg-green-600 text-white w-full px-5 py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          + Add Process
        </button>
        <button
          onClick={deleteProcess}
          className="bg-red-600 text-white w-full px-5 py-2 rounded-full font-semibold hover:bg-red-700 transition"
        >
          🚮 Del Process
        </button>
        <button
          onClick={handleRun}
          className="bg-blue-600 text-white w-full px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          🏃‍➡️ Run Algorithm
        </button>
        <button
          onClick={handleVisualize}
          className="bg-yellow-400 text-white w-full px-5 py-2 rounded-full font-semibold hover:bg-yellow-600 transition"
        >
          🧐 Visualize It
        </button>
      </div>
    </div>
  );
}
