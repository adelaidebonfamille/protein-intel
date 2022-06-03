import { PieChart, Pie, Sector, Cell } from "recharts";

const OverallChart = (props) => {
  const data = [
    { name: "Group A", value: props.score === 0 ? 5 : props.score },
    { name: "Group B", value: props.maxScore - props.score },
  ];

  const COLORS = [props.color, "#5e5ff5"];

  return (
    <PieChart width={200} height={150}>
      <Pie
        data={data}
        cx={95}
        cy={110}
        startAngle={175}
        endAngle={5}
        innerRadius={75}
        outerRadius={100}
        paddingAngle={1}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default OverallChart;
