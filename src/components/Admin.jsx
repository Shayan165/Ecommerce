import React, { useMemo, useState } from "react";
import { useAuth } from "../context/usercontext";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

function Admin() {
  let { products } = useAuth();
  const data = useMemo(() => products, []);

  /** @type import('@tanstack/react-table').ColumnDef<any> */

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Product Name",
      accessorKey: "productName",
    },
    {
      header: "Brand",
      accessorKey: "brand.brandName",
    },
    {
      header: "Category",
      accessorKey: "category.categoryName",
    },
    {
      header: "Price",
      accessorKey: "price",
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
  ];
  const itemsPerPage = 5;
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const slicedData = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [currentPage, data]);


  const table = useReactTable({
    data:slicedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="container mt-5">
      <div className="w3-container">
        <input
          className="w3-input  mb-3"
          style={{ width: "30%", paddingLeft: "30px" }}
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search"
        />
        <table className="w3-table-all">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {
                      { asc: "⬆️", desc: "⬇️" }[
                        header.column.getIsSorted() ?? null
                      ]
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))):(<tr>
              <td colSpan={columns.length}>
                No data found for the current search.
              </td>
            </tr>)}
          </tbody>
        </table>
        <div className="my-4 ms-2">
          <button
            className="w3-button w3-round-xxlarge w3-blue"
            onClick={() => setCurrentPage(0)}
          >
            First page
          </button>
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            className="w3-button w3-circle w3-blue mx-3"
          >
            -
          </button>
          <button
            disabled={currentPage === pageCount - 1}
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            className="w3-button w3-circle w3-blue"
          >
            +
          </button>
          <button
            className="w3-button w3-round-xxlarge w3-blue mx-3"
            onClick={() => setCurrentPage(pageCount - 1)}
          >
            Last page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;
