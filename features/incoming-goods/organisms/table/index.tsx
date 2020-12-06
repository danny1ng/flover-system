import { Column, useTable } from 'react-table';
import { formatDate } from 'libs';
import { NexusGenFieldTypes } from 'nexus-typegen';

const columns: Column[] = [
  {
    Header: 'Товар',
    accessor: 'name',
  },
  {
    Header: 'Цена',
    accessor: 'price',
    Cell: ({ value }) => {
      return value + ' р.';
    },
  },
  {
    Header: 'Кол-во',
    accessor: 'count',
    Cell: ({ value }) => {
      return value + ' шт.';
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

export const Table = ({ data }: { data: NexusGenFieldTypes['Query']['incomingGoods'] }) => {
  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
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
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell, i) => {
                return (
                  <td key={i} {...cell.getCellProps()} className="px-6 py-4 whitespace-no-wrap">
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
