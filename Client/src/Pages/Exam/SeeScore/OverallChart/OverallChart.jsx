import { PieChart, Pie, Sector, Cell } from "recharts";
import { useState } from "react";

const OverallChart = (props) => {
  const [score, setScore] = useState(0);

  const data = [
    { name: "Group A", value: score },
    { name: "Group B", value: props.maxScore - score },
  ];

  const COLORS = [props.color, "#5e5ff5"];

  useState(() => {
    setTimeout(() => {
      setScore((prev) => {
        return props.score < 4 ? 4 : props.score;
      });

      setTimeout(() => {
        props.changeTotalScoreShown();
      }, 1600);
    }, 100);
  }, []);

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
