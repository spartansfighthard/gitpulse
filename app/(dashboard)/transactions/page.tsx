'use client';

import { useTransactionHistory } from '@/lib/hooks/useTransactionHistory';
import { useTransactionStatus } from '@/lib/hooks/useTransactionStatus';
import { formatDate } from '@/lib/utils/date';

export default function TransactionsPage() {
  const { data: transactions, isLoading } = useTransactionHistory();

  if (isLoading) {
    return <div>Loading transactions...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
      <div className="space-y-4">
        {transactions?.map((tx: any) => (
          <TransactionCard key={tx.signature} transaction={tx} />
        ))}
      </div>
    </div>
  );
}

function TransactionCard({ transaction }: { transaction: any }) {
  const { data: status } = useTransactionStatus(transaction.signature);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{transaction.planType} Subscription</h3>
          <p className="text-sm text-gray-500">
            {formatDate(transaction.timestamp)}
          </p>
        </div>
        <div className="text-right">
          <p className="font-medium">{transaction.amount} SOL</p>
          <p className={`text-sm ${
            status?.status === 'confirmed' ? 'text-green-500' : 'text-yellow-500'
          }`}>
            {status?.status === 'confirmed' ? 'Confirmed' : 'Pending'}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs text-gray-500 font-mono break-all">
          {transaction.signature}
        </p>
      </div>
    </div>
  );
} 