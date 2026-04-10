"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const data = [
  { name: "Mon", calories: 2100 },
  { name: "Tue", calories: 2300 },
  { name: "Wed", calories: 1950 },
  { name: "Thu", calories: 2500 },
  { name: "Fri", calories: 2400 },
  { name: "Sat", calories: 2800 },
  { name: "Sun", calories: 2150 },
];

export function WeeklyCaloriesChart() {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34C759" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#34C759" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "1rem",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="calories"
            stroke="#34C759"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorCalories)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
