import { Column, useTable } from 'react-table';
import { NexusGenFieldTypes } from 'nexus-typegen';

const columns: Column[] = [
  {
    Header: 'Товар',
    accessor: 'product.name', // accessor is the "key" in the data
  },
  {
    Header: 'Кол-во',
    accessor: 'count',
    Cell: ({ value }) => {
      return value + ' шт.';
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
    Header: 'Примечание',
    accessor: 'note',
  },
];

export const Table = ({ data }: { data: NexusGenFieldTypes['Query']['sales'] }) => {
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
        <tr>
          <td className="px-6 py-4 whitespace-no-wrap font-bold">Касса</td>
          <td className="px-6 py-4 whitespace-no-wrap" />
          <td className="px-6 py-4 whitespace-no-wrap">2340</td>
          <td className="px-6 py-4 whitespace-no-wrap" />
          <td className="px-6 py-4 whitespace-no-wrap" />
        </tr>
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
