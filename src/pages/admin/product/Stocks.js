import React from "react";
// import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import "./Stocks.css";

const data = [
  {
    name: "Product A",
    salesData: [
      { month: "Jan", sales: 50 },
      { month: "Feb", sales: 60 },
      { month: "Mar", sales: 70 },
      { month: "Apr", sales: 80 },
      { month: "May", sales: 90 },
      { month: "Jun", sales: 100 },
      { month: "Jul", sales: 110 },
      { month: "Aug", sales: 120 },
      { month: "Sep", sales: 130 },
      { month: "Oct", sales: 140 },
      { month: "Nov", sales: 150 },
      { month: "Dec", sales: 160 },
    ],
  },
  {
    name: "Product B",
    salesData: [
      { month: "Jan", sales: 60 },
      { month: "Feb", sales: 70 },
      { month: "Mar", sales: 80 },
      { month: "Apr", sales: 90 },
      { month: "May", sales: 100 },
      { month: "Jun", sales: 110 },
      { month: "Jul", sales: 120 },
      { month: "Aug", sales: 130 },
      { month: "Sep", sales: 140 },
      { month: "Oct", sales: 150 },
      { month: "Nov", sales: 160 },
      { month: "Dec", sales: 170 },
    ],
  },
  {
    name: "Product C",
    salesData: [
      { month: "Jan", sales: 40 },
      { month: "Feb", sales: 50 },
      { month: "Mar", sales: 60 },
      { month: "Apr", sales: 70 },
      { month: "May", sales: 80 },
      { month: "Jun", sales: 90 },
      { month: "Jul", sales: 100 },
      { month: "Aug", sales: 110 },
      { month: "Sep", sales: 120 },
      { month: "Oct", sales: 130 },
      { month: "Nov", sales: 140 },
      { month: "Dec", sales: 150 },
    ],
  },
  {
    name: "Product D",
    salesData: [
      { month: "Jan", sales: 70 },
      { month: "Feb", sales: 80 },
      { month: "Mar", sales: 90 },
      { month: "Apr", sales: 100 },
      { month: "May", sales: 110 },
      { month: "Jun", sales: 120 },
      { month: "Jul", sales: 130 },
      { month: "Aug", sales: 140 },
      { month: "Sep", sales: 150 },
      { month: "Oct", sales: 160 },
      { month: "Nov", sales: 170 },
      { month: "Dec", sales: 180 },
    ],
  },
];

export default function Stocks() {
  // const data = [
  //   {
  //     name: "Product A",
  //     totalQuantity: 100,
  //     sold: 70,
  //     remain: 30,
  //     lowestLevel: 10,
  //   },
  //   {
  //     name: "Product B",
  //     totalQuantity: 120,
  //     sold: 80,
  //     remain: 40,
  //     lowestLevel: 20,
  //   },
  //   {
  //     name: "Product C",
  //     totalQuantity: 80,
  //     sold: 60,
  //     remain: 20,
  //     lowestLevel: 5,
  //   },
  //   {
  //     name: "Product D",
  //     totalQuantity: 150,
  //     sold: 100,
  //     remain: 50,
  //     lowestLevel: 30,
  //   },
  // ];

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // You can customize colors

  return (
    <>
      {/* <div className="product-stock-pie-charts">
        {data.map((product, index) => (
          <div className="pie-chart" key={index}>
            <h3>{product.name}</h3>
            <PieChart width={200} height={200}>
              <Pie
                data={[
                  { name: "Sold", value: product.sold },
                  { name: "Remaining", value: product.remain },
                  { name: "Lowest Level", value: product.lowestLevel },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend align="center" verticalAlign="bottom" />
              <Tooltip />
            </PieChart>
          </div>
        ))}
      </div> */}
      <div className="product-sales-bar-charts">
        {data.map((product, index) => (
          <div className="bar-chart" key={index}>
            <h3>{product.name}</h3>
            <BarChart
              width={300}
              height={200}
              data={product.salesData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </div>
        ))}
      </div>
    </>
  );
}
