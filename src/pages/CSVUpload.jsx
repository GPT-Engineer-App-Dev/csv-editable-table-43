import React, { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CSVUpload = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        setHeaders(result.data[0]);
        setData(result.data.slice(1));
      },
      header: false,
    });
  };

  const addRow = () => {
    setData([...data, Array(headers.length).fill("")]);
  };

  const removeRow = (rowIndex) => {
    setData(data.filter((_, index) => index !== rowIndex));
  };

  const handleCellChange = (rowIndex, cellIndex, value) => {
    const updatedData = data.map((row, rIndex) =>
      rIndex === rowIndex ? row.map((cell, cIndex) => (cIndex === cellIndex ? value : cell)) : row
    );
    setData(updatedData);
  };

  const downloadCSV = () => {
    const csv = Papa.unparse([headers, ...data]);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "edited_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        <Button onClick={addRow} className="ml-2">Add Row</Button>
        <Button onClick={downloadCSV} className="ml-2">Download CSV</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex} contentEditable onBlur={(e) => handleCellChange(rowIndex, cellIndex, e.target.innerText)}>
                  {cell}
                </TableCell>
              ))}
              <TableCell>
                <Button variant="destructive" onClick={() => removeRow(rowIndex)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CSVUpload;