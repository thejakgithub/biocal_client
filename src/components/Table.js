import { useTable, usePagination, useGlobalFilter } from "react-table";
import GlobalFilter from "../components/GlobalFilter";
import { Link } from "react-router-dom";

export default function Table({
  columns,
  data,
  title,
  routeAdd,
  add,
  more,
  size,
}) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: size },
    },
    useGlobalFilter,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      {more ? (
        <div className=" container pt-2">
        <div className=" d-md-flex mt-3 mb-1  justify-content-between">
          <h2 className="mt-1">{title}</h2>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
          </div>
      ) : (
        <header className="bg-success   text-white  d-md-flex header-sidebar-manage d-block justify-content-between mb-3 ">
          <h4 className="ms-md-3 mt-1  ">{title}</h4>
          <div className="d-flex me-3">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            {add && (
              <Link to={routeAdd}>
                <button
                  className="btn btn-outline-light my-2 ms-3 btn-add"
                  type="button"
                >
                  เพิ่ม
                </button>
              </Link>
            )}
          </div>
        </header>
      )}
      <div className="table-responsive  mb-4">
        <table
          {...getTableProps()}
          className="table table-striped table-bordered w-100 text-center table-hover"
        >
          <thead className="bg-success text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
        <div className="pagination">
          <div className="btn-group" role="group" aria-label="Basic example">
            <button
              onClick={() => gotoPage(0)}
              className="btn btn-success me-1 "
              disabled={!canPreviousPage}
            >
              <i className="fas fa-step-backward"></i>
            </button>
            <button
              onClick={() => previousPage()}
              className="btn btn-success me-1 "
              disabled={!canPreviousPage}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => nextPage()}
              className="btn btn-success me-1  "
              disabled={!canNextPage}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              className="btn btn-success  me-1 "
              disabled={!canNextPage}
            >
              <i className="fas fa-step-forward"></i>
            </button>
          </div>
          <span className="mt-2 mx-2">
            Page
            <strong className="ms-1">
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <span className="mt-1 ">
            |<span className="mx-2">Go to page:</span>
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "4rem" }}
            />
          </span>
        </div>
      </div>
    </>
  );
}
