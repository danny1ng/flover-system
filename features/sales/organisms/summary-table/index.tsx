import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { Column, useTable } from 'react-table';
import { NexusGenFieldTypes } from 'nexus-typegen';

import { getDeductionsQuery } from 'features/deductions/api';
import { useStore } from 'features/store';

const columns: Column[] = [
  {
    Header: 'Итого',
    accessor: 'name',
  },
  {
    Header: 'Безнал.',
    accessor: 'wire',
    Cell: ({ value }) => {
      return value ? value + ' р.' : '-';
    },
  },
  {
    Header: 'Нал.',
    accessor: 'cash',
    Cell: ({ value }) => {
      return value ? value + ' р.' : '-';
    },
  },
  {
    Header: 'Сумма',
    accessor: 'summary',
    Cell: ({ value }) => {
      return value + ' р.';
    },
  },
];

export const SummaryTable = ({
  salesData,
  storeData,
}: {
  salesData: NexusGenFieldTypes['Query']['sales'];
  storeData: NexusGenFieldTypes['Query']['store'];
}) => {
  const { storeId } = useStore();
  const { data: deductionsData } = useQuery<{
    deductions: NexusGenFieldTypes['Query']['deductions'];
  }>([getDeductionsQuery, { storeId }]);
  const summarySales = useMemo(() => salesData.reduce((acc, item) => item.summary + acc, 0), [
    salesData,
  ]);
  const summaryDeductions = useMemo(
    () => deductionsData?.deductions.reduce((acc, item) => item.summary + acc, 0),
    [deductionsData?.deductions],
  );
  const summaryCashSales = useMemo(
    () => salesData.reduce((acc, item) => (item.payType === 'CASH' ? item.summary + acc : acc), 0),
    [salesData],
  );
  const summaryWireSales = useMemo(
    () => salesData.reduce((acc, item) => (item.payType === 'WIRE' ? item.summary + acc : acc), 0),
    [salesData],
  );

  const tableInstance = useTable({
    columns,
    data: [
      {
        name: 'Продажи',
        summary: summarySales,
        cash: summaryCashSales,
        wire: summaryWireSales,
      },
      { name: 'Вычеты', summary: -summaryDeductions },
      { name: 'Касса', summary: storeData.balance },
      { name: 'Всего', summary: summarySales + storeData.balance - summaryDeductions },
    ],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  return (
    <div className="mt-8">
      <div className="max-w-lg shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="w-full divide-y divide-gray-200" {...getTableProps()}>
          <thead className="bg-gray-100">
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-no-wrap"
                        style={{ width: 'auto' }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
