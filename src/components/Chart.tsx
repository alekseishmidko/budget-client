import React, { FC } from "react";
import { IChart } from "../types/types";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface IData {
	value: number;
	name: string;
}
const Chart: FC<IChart> = ({ totalExpence, totalIncome }) => {
	const COLORS = ["#00C49F", "#FFBB28"];
	const data = new Array<IData>(
		{ value: totalExpence, name: "Expence" },
		{ value: totalIncome, name: "Income" },
	);
	return (
		<>
			<PieChart width={240} height={240}>
				<Pie
					data={data}
					cx={"50%"}
					cy={"50%"}
					innerRadius={60}
					outerRadius={80}
					fill="#8884d8"
					paddingAngle={2}
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend />
				<Tooltip />
			</PieChart>
		</>
	);
};

export default Chart;
