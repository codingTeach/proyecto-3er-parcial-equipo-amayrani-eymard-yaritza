import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart } from 'react-chartjs-2';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement, 
  MatrixController, 
  MatrixElement
);

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://backend-students.onrender.com/students?skip=0&limit=10', {
          headers: { Authorization: Bearer ${token} },
        });
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  // Gráfico de barras: Promedio de calificaciones por tipo de clase
  const barChartData = {
    labels: [...new Set(data.map((d) => d.classType))],
    datasets: [
      {
        label: 'Promedio de calificaciones',
        data: [...new Set(data.map((d) => d.classType))].map((type) => {
          const filtered = data.filter((d) => d.classType === type);
          const average =
            filtered.reduce((acc, cur) => acc + cur.gradePercentage, 0) /
            filtered.length;
          return average;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Gráfico de pastel: Proporción de estudiantes por tipo de clase
  const pieChartData = {
    labels: [...new Set(data.map((d) => d.classType))],
    datasets: [
      {
        data: [...new Set(data.map((d) => d.classType))].map((type) =>
          data.filter((d) => d.classType === type).length
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  // Gráfico de líneas: Tendencia de calificaciones promedio por nivel escolar
  const lineChartData = {
    labels: [...new Set(data.map((d) => d.gradeLevel))],
    datasets: [
      {
        label: 'Promedio por nivel escolar',
        data: [...new Set(data.map((d) => d.gradeLevel))].map((level) => {
          const filtered = data.filter((d) => d.gradeLevel === level);
          const average =
            filtered.reduce((acc, cur) => acc + cur.gradePercentage, 0) /
            filtered.length;
          return average;
        }),
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Datos para el heatmap
  const heatmapData = {
    datasets: [
      {
        label: 'Correlaciones',
        data: data.map((student) => ({
          x: student.gradeLevel,
          y: student.classType,
          v: student.gradePercentage,
        })),
        backgroundColor: (context) => {
          const entry = context.dataset.data[context.dataIndex];
          if (!entry || !entry.v) {
            return 'rgba(200, 200, 200, 0.5)'; 
          }
          const alpha = Math.min(1, entry / 2000); 
          return rgba(255, 99, 132, ${alpha});
        },
        borderWidth: 1,
        width: ({ chart }) => chart.scales.x.width / 8,
        height: ({ chart }) => chart.scales.y.height / 8,
      },
    ],
  };

  const heatmapOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        labels: [...new Set(data.map((d) => d.gradeLevel))],
        title: {
          display: true,
          text: 'Nivel Escolar',
        },
      },
      y: {
        type: 'category',
        labels: [...new Set(data.map((d) => d.classType))],
        title: {
          display: true,
          text: 'Tipo de Clase',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => Valor: ${tooltipItem.raw.v},
        },
      },
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <nav className="space-y-4">
          <a href="http://localhost:5173" className="block py-2 px-4 rounded hover:bg-blue-500">
            Inicio
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6">Resumen de Datos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gráfico de Barras */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Promedio de calificaciones por tipo de clase
            </h3>
            <Bar data={barChartData} />
          </div>

          {/* Gráfico de Pastel */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Proporción de estudiantes por tipo de clase
            </h3>
            <Pie data={pieChartData} />
          </div>

          {/* Gráfico de Líneas */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Tendencia de calificaciones promedio por nivel escolar
            </h3>
            <Line data={lineChartData} />
          </div>

          {/* Heatmap */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Correlaciones entre variables clave (Mapa de Calor)
            </h3>
            <div className="h-64">
              <Chart type="matrix" data={heatmapData} options={heatmapOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;