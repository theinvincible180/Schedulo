import { data, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { runFCFSLive, FCFS } from '../algorithm/fcfs' // adjust path if needed
import { roundRobin , runRoundRobinLive} from '../algorithm/RR' // adjust path if needed
import { sjfNonPreemptive , runSJFLive} from '../algorithm/SjfNonPre' 
import { sjfPreemptive , runSRTFLive } from '../algorithm/SjfPremitive'
import { runPriorityNonPreemptiveLive , priorityNonPreemptive } from '../algorithm/Priority_non_preemptive'
import { runPriorityPreemptiveLive , priorityPreemptive } from '../algorithm/Priority_Preemptive'
import { ljfNonPreemptive , runLJFNonPreemptiveLive } from '../algorithm/Ljf_non_preemptive'
import { ljfPreemptive , runLJFPreemptiveLive } from '../algorithm/LJF_Preemptive'
import ProcessTable from '../components/processInput'
import ProcessOutputTable from '../components/processOutputTable'
import { useNavigate } from 'react-router-dom';

function TimeQuanta({ timeQuantaValue, setTimeQuantaValue }) {

  const handleTimeQuantaChange = (e) => {
    setTimeQuantaValue(Number(e.target.value));
  };

  return (
    <div className="mb-4 p-4 bg-gray-500 rounded shadow-md max-w-sm mx-auto">
      <label className="block text-gray-100 font-semibold mb-2">
        ⏱ Time Quantum
      </label>
      <input
        type="number"
        value={timeQuantaValue}
        min="1"
        onChange={handleTimeQuantaChange}
        className="bg-white w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <p className="mt-2 text-gray-100">
        Current Time Quantum: <span className="font-bold">{timeQuantaValue}</span>
      </p>
    </div>
  );
}



function AlgoPage() {

  const resultRef = useRef();
  const stopRef = useRef(null);
  const navigate = useNavigate();

  const [liveData, setLiveData] = useState(null)
  const [timeQuantaValue, setTimeQuantaValue] = useState(1);

  useEffect(() => {
    if (liveData && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [liveData]);
  const { state } = useLocation()
  const algoName = state?.name

  const [Data, setData] = useState(null)
  const [finished, setFinished] = useState(false);
  const [stop, setStop] = useState(false);
  const [disabled , setDisabled] = useState(false);


const SetDateChart =()=>{
   let dailyStats = JSON.parse(localStorage.getItem("dailyStats")) || {};
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-09-13"
  dailyStats[today] = (dailyStats[today] || 0) + 1;
  localStorage.setItem("dailyStats", JSON.stringify(dailyStats));

}
function SetAlgoHistory(algoName) {
  let stats = JSON.parse(localStorage.getItem("algoStats")) || {};
   stats[algoName] = (stats[algoName] || 0) + 1;
  localStorage.setItem("algoStats", JSON.stringify(stats));
}

  const handleProcessVisualization = (processes) => {
    setLiveData(null)
    setFinished(false)
    // setStop(false);

    if (algoName === 'FCFS') {
      const stopFn = runFCFSLive(
        processes,
        (data) => setLiveData(data),
        () => setFinished(true)
      )
      stopRef.current = stopFn;
    }

    else if(algoName === "Round Robin"){

      const stopFn = runRoundRobinLive(
        processes,
      timeQuantaValue,
        (data) => setLiveData(data),
        () => setFinished(true)
      )
      stopRef.current = stopFn;
    }
    else if(algoName === "SJF Non Preemptive"){

      const stopFn = runSJFLive(
        processes,
        (data) => setLiveData(data),
        () => setFinished(true)
      )
      stopRef.current = stopFn;
    }
    else if(algoName === "SJF Premitive"){

      const stopFn = runSRTFLive(
        processes,
        (data) => setLiveData(data),
        () => setFinished(true)
      )
      stopRef.current = stopFn;
    }
    else if(algoName === "Priority Non Preemptive"){

      const stopFn = runPriorityNonPreemptiveLive(
        processes,
        (data) => setLiveData(data),
        () => setFinished(true)
      )
      stopRef.current = stopFn;
    }
    else if(algoName === "Priority Preemptive"){

      const stopFn = runPriorityPreemptiveLive(
        processes,
        (data) => setLiveData(data),
        () => setFinished(true)
      )
      stopRef.current = stopFn;
    }
    else if(algoName === "LJF Non Preemptive"){

      const stopFn = runLJFNonPreemptiveLive(
        processes,
        (data) => setLiveData(data),
        () => setFinished(true)
      )
      stopRef.current = stopFn;
    }
    else if(algoName === "LJF Preemptive"){

      const stopFn = runLJFPreemptiveLive(
        processes,
        (data) => setLiveData(data),
        () => setFinished(true)
      )
      stopRef.current = stopFn;
    }
     SetAlgoHistory(algoName);
  SetDateChart();
    
  }

  const handleProcessRun = (processes) => {
    
    
    if (algoName === 'FCFS') {
      setData(FCFS(processes));
    }
    else if(algoName === "Round Robin"){
      setData(roundRobin(processes , timeQuantaValue));
    }
    else if(algoName === "SJF Non Preemptive"){
      setData(sjfNonPreemptive(processes));
    }
    else if(algoName === "SJF Premitive"){
      setData(sjfPreemptive(processes));
    }
    else if(algoName === "Priority Non Preemptive"){
      setData(priorityNonPreemptive(processes));
    }
    else if(algoName === "Priority Preemptive"){
      setData(priorityPreemptive(processes));
    } 
    else if(algoName === "LJF Non Preemptive"){
      setData(ljfNonPreemptive(processes));
    }
    else if(algoName === "LJF Preemptive"){
      setData(ljfPreemptive(processes));
    }
    SetAlgoHistory(algoName);

  SetDateChart();
  }

  const handleReset = () => {
    setLiveData(null);
    setData(null);
    setFinished(false);
  };



  return (
    <div className="relative min-h-screen bg-gradient-to-br from-yellow-50 to-purple-50 p-8">
      {/* Header */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-white/80 text-purple-700 font-semibold px-4 py-2 rounded-xl hover:bg-purple-100 transition-all shadow"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
        {algoName} Visualization
      </h1>

      <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-lg">
        <ProcessTable
          onSubmitVisualization={handleProcessVisualization}
          onSubmitRUN={handleProcessRun}
          selectedAlgorithm={algoName}
        />

        {algoName === "Round Robin" && (
          <TimeQuanta timeQuantaValue={timeQuantaValue} setTimeQuantaValue={setTimeQuantaValue} />
        )}

        {Data && (
          <ProcessOutputTable data={Data} />
        )}

        {liveData && (
          <>
            <h2 className="text-xl font-semibold mt-8 mb-3 text-purple-700">📊 Process Visualization</h2>
            <div ref={resultRef} className="bg-purple-50 border border-purple-200 rounded-2xl p-6 shadow-inner">
              <p className="text-lg font-semibold text-gray-700">⏱ Time: {liveData.time}</p>
              <p className="mt-2 text-gray-600">
                🟡 Ready Queue: {liveData.readyQueue.length > 0 ? liveData.readyQueue.map((p) => `P${p.id}`).join(', ') : 'Empty'}
              </p>
              <p className="mt-2 text-gray-600">
                🟢 CPU Running: {liveData.cpu ? `P${liveData.cpu.id}` : 'Idle'}
              </p>

              <div className="mt-4">
                <p className="font-semibold text-gray-700 mb-2">📊 Gantt Chart:</p>
                <div className="flex gap-2 flex-wrap">
                  {liveData.gantt.map((g, idx) => {
                    let duration = g.endTime - g.startTime;
                    duration = Math.max(1.5, duration);
                    return (
                      <div key={idx} style={{ width: `${duration * 3}%` }} className="text-center">
                        <div className={`${g.processId !== null ? 'bg-purple-500' : 'bg-gray-400'} text-white px-4 py-2 rounded-xl shadow`}>
                          {g.processId !== null ? `P${g.processId}` : 'Idle'}
                        </div>
                        <div className="text-xs text-gray-700 mt-1">{g.startTime} - {g.endTime}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  if (stopRef.current) stopRef.current();
                  setFinished(true);
                }}
                className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-5 rounded-xl shadow transition"
              >
                {finished === false ? '⏹ Stop Simulation' : '⏹ Stopped'}
              </button>
            </div>
          </>
        )}

        {finished && (
          <p className="mt-4 text-green-700 font-bold text-center">
            ✅ Simulation Complete
          </p>
        )}

        {(liveData || Data) && (
          <div className="text-center mt-6">
            <button
              onClick={() => {
                handleReset();
                if (stopRef.current) stopRef.current();
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl shadow transition"
            >
              🔄 Reset
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AlgoPage
