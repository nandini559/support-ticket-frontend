// components/StatsDashboard.tsx
import {useEffect, useState} from "react";
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

  return (<div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
    <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg space-y-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800">📊 System Stats</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 text-blue-700 p-4 rounded-xl text-center">
          <p className="text-sm">Total Tickets</p>
          <p className="text-xl font-bold">{stats.total_tickets}</p>
        </div>

        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl text-center">
          <p className="text-sm">Open Tickets</p>
          <p className="text-xl font-bold">{stats.open_tickets}</p>
        </div>

        <div className="bg-green-100 text-green-700 p-4 rounded-xl text-center">
          <p className="text-sm">Avg / Day</p>
          <p className="text-xl font-bold">{stats.avg_tickets_per_day}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Bar Chart */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-semibold mb-2 text-gray-600">
            Priority Distribution
          </h3>

          <BarChart width={300} height={250} data={priorityData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]}/>
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-sm flex flex-col items-center">
          <h3 className="text-sm font-semibold mb-2 text-gray-600">
            Category Distribution
          </h3>

          <PieChart width={300} height={250}>
            <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80}>
              {
                categoryData.map((_, index) => {
                  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];
                  return (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>);
                })
              }
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  </div>);
};

export default StatsDashboard;
