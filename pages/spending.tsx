import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';
import styles from '../styles/Spending.module.css';
import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

type CategorySpending = {
  [key: string]: number;
};

const dynamicColors = () => {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
};

export const getServerSideProps = async () => {
  // Fetch data from external API
  const res = await axios.get('http://localhost:3000/api/transactions');
  const data = res.data;

  const monthlySpending: number[] = new Array(12).fill(0);
  const categorySpending: CategorySpending = {};
  for (const transaction of data) {
    const date = new Date(transaction.date);
    monthlySpending[date.getMonth()] += transaction.amount;
    if (!categorySpending[transaction.category[0]])
      categorySpending[transaction.category[0]] = 0;
    categorySpending[transaction.category[0]] += transaction.amount;
  }

  console.log(categorySpending);

  return { props: { monthlySpending, categorySpending } };
};

export default function Page({
  monthlySpending,
  categorySpending,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Spending</h1>
      <div className={styles.row}>
        <div className={styles.monthly}>
          <Line
            options={{
              responsive: true,
            }}
            datasetIdKey="id"
            data={{
              labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ],
              datasets: [
                {
                  label: 'Monthly Spending',
                  data: monthlySpending,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
          />
        </div>
        <div className={styles.category}>
          <Pie
            options={{
              responsive: true,
            }}
            data={{
              labels: Object.keys(categorySpending),
              datasets: [
                {
                  label: 'amount',
                  data: Object.values(categorySpending),
                  backgroundColor: Object.keys(categorySpending).map((x) =>
                    dynamicColors()
                  ),
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
