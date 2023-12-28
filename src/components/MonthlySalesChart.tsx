import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import axios from "../common/axios";

type MontlySalesDto = {
  date: string;
  salesCount: number;
};

interface Props {
  vendorId?: string;
}

export default function MonthlySalesChart({ vendorId }: Props) {
  const [data, setData] = useState<MontlySalesDto[]>([]);

  useEffect(() => {
    if (vendorId) {
      axios.get<MontlySalesDto[]>(`/monthlySales/${vendorId}`).then((res) => {
        setData(res.data);
      });
    }
  }, [vendorId]);

  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="salesCount" stroke="#82ca9d" />
    </LineChart>
  );
}
