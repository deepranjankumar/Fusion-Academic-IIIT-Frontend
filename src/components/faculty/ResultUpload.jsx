const MIME_TYPES = {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    csv: "text/csv",
  };
  

import { useState } from "react";
import { Dropzone} from "@mantine/dropzone";


import { Table, Button, Text } from "@mantine/core";
import * as XLSX from "xlsx";

export default function FacultyResultUpload() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (file) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    console.log("Submitting Data:", data);
    alert("Result Uploaded Successfully!");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Dropzone
        onDrop={(files) => handleFileUpload(files[0])}
        accept={[MIME_TYPES.xlsx, MIME_TYPES.csv]}
        maxSize={5 * 1024 ** 2}
      >
        <Text align="center">Drag & Drop or Click to Upload Excel File</Text>
      </Dropzone>

      {fileName && <Text mt={10}>Uploaded File: {fileName}</Text>}

      {data.length > 0 && (
        <Table mt={20} striped>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((value, j) => (
                  <td key={j}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {data.length > 0 && (
        <Button mt={20} fullWidth onClick={handleSubmit}>
          Submit Results
        </Button>
      )}
    </div>
  );
}
