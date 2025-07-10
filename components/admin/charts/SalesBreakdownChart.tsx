import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { StripeTransaction, StripeProduct, ShopProduct } from '../../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SalesBreakdownChartProps {
  transactions: StripeTransaction[];
  stripeProducts: StripeProduct[];
  shopProducts: ShopProduct[];
}

const SalesBreakdownChart: React.FC<SalesBreakdownChartProps> = ({ transactions, stripeProducts, shopProducts }) => {

  const salesByProduct = useMemo(() => {
    const productSalesByName: Record<string, number> = {};
    
    const productMap = new Map<string, string>();
    stripeProducts.forEach(p => productMap.set(p.id, p.name));
    shopProducts.forEach(p => productMap.set(p.id, p.title));

    transactions.forEach(txn => {
        if (txn.productId && txn.status === 'succeeded') {
            const name = productMap.get(txn.productId) || "Other";
            if (!productSalesByName[name]) {
                productSalesByName[name] = 0;
            }
            productSalesByName[name] += txn.amount / 100;
        } else if (txn.status === 'succeeded') { // For transactions without a product ID
            if (!productSalesByName['Other Sales']) {
                productSalesByName['Other Sales'] = 0;
            }
            productSalesByName['Other Sales'] += txn.amount / 100;
        }
    });

    return productSalesByName;
  }, [transactions, stripeProducts, shopProducts]);

  const chartData = {
    labels: Object.keys(salesByProduct),
    datasets: [
      {
        label: 'Sales',
        data: Object.values(salesByProduct),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
            boxWidth: 20
        }
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default SalesBreakdownChart;