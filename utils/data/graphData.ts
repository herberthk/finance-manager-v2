import type { GraphData } from "@/types";

interface ReturnType {
  pieData: GraphData;
  donutdDta: GraphData;
  lineData: GraphData;
}

export const useData = (): ReturnType => {
  // const { sales } = useTypedSelector((state) => state.sales);
  // const { cashBal, bankBal, totalCapital, salesBal, purchases, stockValue } =
  //   useAccountBalance();

  const pieData: GraphData = {
    labels: ["Capital", "Cash", "Bank"],
    datasets: [
      {
        data: [50000000, 3200000, 17000000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["magenta", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const donutdDta: GraphData = {
    labels: ["Sales", "Purchase", "Available stock value"],
    datasets: [
      {
        data: [5000000, 120000, 700000],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["teal", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const monthstr =
    "January February March April May June July August September October November December";
  const months = monthstr.split(" ");

  const lineData: GraphData = {
    labels: months,
    datasets: [
      {
        label: "Sales",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "orangered",
        borderColor: "rgba(75,192,192,1)",
        // borderCapStyle: "butt",
        // borderDash: [],
        borderDashOffset: 0.0,
        // borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          1500000, 2000000, 3500000, 400000, 700000, 600000, 0, 0, 0, 0, 0, 0,
        ],
      },
    ],
  };

  return { pieData, donutdDta, lineData };
};
