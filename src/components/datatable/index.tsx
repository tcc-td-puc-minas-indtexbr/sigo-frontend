import React from 'react';
import BTable from 'react-bootstrap/Table';
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 576px) {
    display: block;

    .table-pagination {
      margin-bottom: 1em
    }
  }
`;

const Table: React.FC<{ columns: any, data: any }> = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  )

  return (
    <>
      <BTable className="table table-bordered table-striped table-hover" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </BTable>
      <Pagination>
        <div className="table-pagination">
          <div className="btn-group" role="group" aria-label="pagination">
            <button type="button" className="btn btn-outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </button>
          </div>
          <span>
            {' '}Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
        </div>
        <div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-sm" style={{ color: '#212529' }}>
                <strong>Go to page:</strong>
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
            />
            <select className="custom-select"
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Pagination>
    </>
  )
}

export default Table;
