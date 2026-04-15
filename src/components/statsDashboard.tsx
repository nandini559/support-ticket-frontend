// components/StatsDashboard.tsx
import React, {useEffect, useState} from "react";
import {getStats} from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

const StatsDashboard = ({refresh} : any) => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    console.log("Fetching stats 🔄");
    fetchStats();
  }, [refresh]);

  const fetchStats = async () => {
    try {
      const res = await getStats();
      console.log("Stats API:", res.data); // 👈 DEBUG
      setStats(res.data);
    } catch (err) {
      console.error("Stats error ❌", err);
    }
  };

  if (!stats) 
    return <div>Loading...</div>;
  
  const priorityData = Object.entries(stats.priority_breakdown).map(([key, value]) => ({name: key, value}));

  const categoryData = Object.entries(stats.category_breakdown).map(([key, value]) => ({name: key, value}));

  return (<div className="bg-white p-4 rounded shadow w-full">
    <h2 className="text-lg font-semibold mb-4">System Stats</h2>

    <div className="flex justify-between mb-4">
      <p>Total: {stats.total_tickets}</p>
      <p>Open: {stats.open_tickets}</p>
      <p>Avg/day: {stats.avg_tickets_per_day}</p>
    </div>

    <BarChart width={250} height={200} data={priorityData}>
      <XAxis dataKey="name"/>
      <YAxis/>
      <Bar dataKey="value"/>
    </BarChart>

    <PieChart width={250} height={200}>
      <Pie data={categoryData} dataKey="value" nameKey="name"/>
    </PieChart>
  </div>);
};

export default StatsDashboard;
