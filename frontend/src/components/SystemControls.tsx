"use client";
import { useEffect, useState } from "react";
import { Play, Square, Settings, Activity, Brain } from "lucide-react";
import { toast } from "sonner";

export default function SystemControls() {
  const [systemStatus, setSystemStatus] = useState({ simulator: false, agent: false });

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/system/status");
      const data = await res.json();
      setSystemStatus(data);
    } catch (e) {}
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleSystem = async (target: "simulator" | "agent", action: "start" | "stop") => {
    const res = await fetch("/api/system/control", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target, action }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message);
      fetchStatus();
    } else {
      toast.error("Control error: " + data.error);
    }
  };

  return (
    <div className="mt-10 space-y-6 pt-6 border-t border-gray-800">
      <div className="flex items-center gap-2 px-2">
        <Settings size={14} className="text-gray-500" />
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">System Engine</span>
      </div>

      <div className="space-y-3">
        {/* Simulator Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] text-gray-400 font-medium">Simulator</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${systemStatus.simulator ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {systemStatus.simulator ? "ONLINE" : "OFFLINE"}
            </span>
          </div>
          <button 
            onClick={() => toggleSystem("simulator", systemStatus.simulator ? "stop" : "start")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              systemStatus.simulator 
              ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20" 
              : "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
            }`}
          >
            {systemStatus.simulator ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
            {systemStatus.simulator ? "Stop Simulator" : "Start Simulator"}
          </button>
        </div>

        {/* Agent Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2">
            <span className="text-[10px] text-gray-400 font-medium">AI Agent</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${systemStatus.agent ? 'bg-blue-500/10 text-blue-500' : 'bg-gray-500/10 text-gray-500'}`}>
              {systemStatus.agent ? "ACTIVE" : "IDLE"}
            </span>
          </div>
          <button 
            onClick={() => toggleSystem("agent", systemStatus.agent ? "stop" : "start")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
              systemStatus.agent 
              ? "bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20" 
              : "bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20"
            }`}
          >
            {systemStatus.agent ? <Square size={14} fill="currentColor" /> : <Brain size={14} />}
            {systemStatus.agent ? "Stop AI Agent" : "Start AI Agent"}
          </button>
        </div>
      </div>

      {/* Live Indicator Footer */}
      {(systemStatus.simulator || systemStatus.agent) && (
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-800">
            <Activity size={12} className="text-green-500 animate-pulse" />
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Processing Live Telemetry</span>
        </div>
      )}
    </div>
  );
}
