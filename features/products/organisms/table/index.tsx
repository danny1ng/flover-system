import { Column, useTable } from 'react-table';
import Link from 'next/link';
import { NexusGenFieldTypes } from 'nexus-typegen';
import { Icon } from 'ui';

const columns: Column[] = [
  {
    Header: 'Товар',
    accessor: 'name', // accessor is the "key" in the data
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
];

export const Table = ({ data }: { data: NexusGenFieldTypes['Query']['products'] }) => {
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
            <th />
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
              <td className="w-32">
                <Link href={`/products/edit/${(row.original as any).id}`} passHref>
                  <a className="outline-none p-2">
                    <Icon
                      name="edit"
                      className="-ml-1 mr-2 h-5 w-5 text-indigo-600 hover:text-indigo-900"
                    />
                  </a>
                </Link>
                <button className="outline-none p-2">
                  <Icon
                    name="delete"
                    className="-ml-1 mr-2 h-5 w-5 text-indigo-600 hover:text-indigo-900"
                  />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
