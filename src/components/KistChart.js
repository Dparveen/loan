import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function KistChart({
  principal = 0,
  monthlyRate = 0.02,
  tenures = [3, 6, 12, 24, 36],
}) {
  if (!principal || principal <= 0) return null;

  const data = tenures.map((n) => {
    const total = principal * (1 + monthlyRate * n); // Simple interest total
    const monthly = total / n;
    const interest = total - principal;

    return {
      tenure: `${n} mo`,
      tenureNum: n,
      monthly: Math.round(monthly),
      total: Math.round(total),
      interest: Math.round(interest),
    };
  });

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-4">
      {/* ========= TITLE ========== */}
      <h4 className="text-xs text-slate-400">
        Estimated Kist with 2% Monthly Interest
      </h4>

      {/* ========== EMI TABLE ========== */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-slate-300 border border-slate-700 rounded-lg overflow-hidden">
          <thead className="bg-slate-700 text-slate-100">
            <tr>
              <th className="px-2 py-2 border-r border-slate-600">Tenure</th>
              <th className="px-2 py-2 border-r border-slate-600">Monthly EMI</th>
              <th className="px-2 py-2 border-r border-slate-600">Total</th>
              <th className="px-2 py-2">Interest</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr
                key={row.tenureNum}
                className="border-t border-slate-700 hover:bg-slate-700/40"
              >
                <td className="px-2 py-2 text-center">{row.tenure}</td>
                <td className="px-2 py-2 text-center text-emerald-300">
                  ₹{row.monthly.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-center">
                  ₹{row.total.toLocaleString()}
                </td>
                <td className="px-2 py-2 text-center text-red-300">
                  ₹{row.interest.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {/* ========== BAR CHART ========== */}
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="tenure" stroke="#cbd5e1" />
            <YAxis
              stroke="#cbd5e1"
              tickFormatter={(v) => `₹${v.toLocaleString()}`}
            />
            <Tooltip
              formatter={(v) => `₹${v.toLocaleString()}`}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#94a3b8" }}
              itemStyle={{ color: "#22c55e" }}
            />
            <Bar dataKey="monthly" fill="#22c55e" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
