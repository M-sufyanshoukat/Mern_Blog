import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';

export default function DashChart() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers');
        const data = await res.json();
        if (res.ok) {
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  // Format data for CoreUI CChart
  const chartData = {
    labels: ['Total Users'],
    datasets: [
      {
        label: 'Total Users',
        backgroundColor: '#f87979',
        data: [totalUsers],
      },
    ],
  };

  // Define chart options
  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
      y: {
        grid: {
          color: getStyle('--cui-border-color-translucent'),
        },
        ticks: {
          color: getStyle('--cui-body-color'),
        },
      },
    },
  };

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <CChart type="bar" datasets={chartData.datasets} labels={chartData.labels} options={chartOptions} />
        </div>
        {/* You can similarly use CChart for other types of charts */}
      </div>
    </div>
  );
}
