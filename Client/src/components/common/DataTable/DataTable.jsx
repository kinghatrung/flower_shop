import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import { Skeleton } from '~/components/ui/skeleton'

function DataTable({ columns = [], data = [], isLoading = false, limit = 5, actions = null }) {
  return (
    <div className='border rounded-lg'>
      <Table>
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className={col.className || ''}>
                {col.title}
              </TableHead>
            ))}
            {actions && <TableHead className='w-[50px]' />}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: limit }).map((_, index) => (
              <TableRow key={index}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton
                      className={`h-4 w-20 ${col.skeletonClassName ? col.skeletonClassName : ''}`}
                    />
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <Skeleton className='h-4 w-10' />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className='text-center text-muted-foreground'
              >
                Không tìm thấy dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={row.id || rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex}>
                    {col.render ? col.render(row, rowIndex) : row[col.key]}
                  </TableCell>
                ))}
                {actions && <TableCell>{actions(row, rowIndex)}</TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DataTable
