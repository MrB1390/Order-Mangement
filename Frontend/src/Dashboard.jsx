import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  BarElement,
  ArcElement,
  DoughnutController,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { countData } from "../utils/Api";



const Dashboard = () => {
  const dispatch = useDispatch();
  const countDataVal = useSelector((state) => state.val.data.data);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
    BarElement,
    ArcElement,
    DoughnutController
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await dispatch(countData());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Construct your chart data here
    if (countDataVal) {
      const labels = ["Order", "Product", "Category", "Customer"];
      const datasets = [
        {
          label: "My First Dataset",
          backgroundColor: ["blue", "green", "red", "yellow"], // Example colors, replace with desired colors
          data: [
            countDataVal.userCount,
            countDataVal.productCount,
            countDataVal.categoryCount,
            countDataVal.orderCount,
          ],
        },
      ];

      // Set the chart data state
      setChartData({ labels, datasets });
    }
  }, [countDataVal]);

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: "black",
      },
    },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // This sets the step size to 1
        },
      },
    },
  };
  
  const pieOptions = {
    plugins: {
      datalabels:{
        display: true,
        color: "black"
      }
    },
    maintainAspectRatio: false,
    legend: {
      position: "right"
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="container">
        <h1 className="text-center" style={{backgroundColor:"#fcba03"}}>Statistical Data</h1>
        <div className="row mt-4">
          <div className="col-md-6">
            <h3 style={{backgroundColor:"#fcba03"}}>Bar Chart</h3>
            <div style={{ maxWidth: "650px",backgroundColor:"#dad3f6" }}>
              {chartData && (
                <Bar data={chartData} options={options} height={400} />
              )}
            </div>
          </div>
          <div className="col-md-6">
            <h3 style={{backgroundColor:"#fcba03"}}>Line Chart</h3>
            <div style={{ maxWidth: "650px",backgroundColor:"#dad3f6" }}>
              {chartData && (
                <Line data={chartData} options={options} height={400} />
              )}
            </div>
          </div>
        </div>
        <h3 className="text-center mt-4" style={{backgroundColor:"#fcba03"}}>Pie Chart</h3>
        <div className="d-flex justify-content-center">
          <div style={{maxWidth: "600px",backgroundColor:"#dad3f6"}}>
            {chartData && <Pie
            data={chartData}
            options={pieOptions}
            height={400}
            />}
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Dashboard;
