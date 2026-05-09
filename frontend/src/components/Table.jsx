export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="w-full text-left">

        <thead className="border-b">
          <tr>
            {columns.map((col) => (
              <th key={col} className="p-3 text-sm font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {row.map((cell, idx) => (
                <td key={idx} className="p-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}