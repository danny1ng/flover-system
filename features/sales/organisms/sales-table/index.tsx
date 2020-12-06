import { Column, useTable } from 'react-table';
import { formatDate } from 'libs';
import { NexusGenFieldTypes } from 'nexus-typegen';

const columns: Column[] = [
  {
    Header: 'Товар',
    accessor: 'name',
  },
  {
    Header: 'Кол-во',
    accessor: 'count',
    Cell: ({ value }) => {
      return value + ' шт.';
    },
  },
  {
    Header: 'Цена',
    accessor: 'price',
    Cell: ({ value }) => {
      return value + ' р.';
    },
  },
  {
    Header: 'Сумма',
    accessor: 'summary',
    Cell: ({ value }) => {
      return value + ' р.';
    },
  },
  {
    Header: 'Скидка',
    accessor: 'discount',
    Cell: ({ value }) => {
      return value + ' р.';
    },
  },
  {
    Header: 'Вид оплаты',
    accessor: 'payType',
    Cell: ({ value }) => {
      return value === 'CASH' ? 'Нал.' : 'Безнал.';
    },
  },
  {
    Header: 'Примечание',
    accessor: 'note',
  },
  {
    Header: 'Время',
    accessor: 'createdAt',
    Cell: ({ value }) => {
      return formatDate(value);
    },
  },
];

export const SalesTable = ({
  data,
  storeData,
}: {
  data: NexusGenFieldTypes['Query']['sales'];
  storeData: NexusGenFieldTypes['Query']['store'];
}) => {
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
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
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap font-bold">Касса</td>
            <td className="px-6 py-4 whitespace-no-wrap" />
            <td className="px-6 py-4 whitespace-no-wrap" />
            <td className="px-6 py-4 whitespace-no-wrap">{storeData.balance} р.</td>
            <td className="px-6 py-4 whitespace-no-wrap" />
            <td className="px-6 py-4 whitespace-no-wrap" />
            <td className="px-6 py-4 whitespace-no-wrap" />
            <td className="px-6 py-4 whitespace-no-wrap" />
          </tr>
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
                      style={{ width: row.cells.length === index + 1 ? 160 : 'auto' }}
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
  );
};
