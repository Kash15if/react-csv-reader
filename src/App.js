import "./App.css";
import { useState } from "react";
const csv = require("csvtojson");

function App() {
  // const [fileName, setFileName] = useState("");
  // const [file, setFile] = useState("");
  const [columns, setColumns] = useState();
  const [data, setData] = useState();

  const onFileChange = (e) => {
    // console.log(e.target.files[0]);
    // console.log(e.target);
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function (e) {
      const csv = e.target.result;

      const dataRowWise = csv.toString().split("\r");

      const cols = dataRowWise.shift().replace(/['"]+/g, "").split(",");
      console.log(cols);

      const importedData = dataRowWise.map((dataRow) => {
        console.log(dataRow);
        return dataRow
          .replace(/^\(\)\{\}\[\],"':;+/g, "")
          .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      });

      console.log(importedData);
      setColumns(cols);
      setData(importedData);
    };
  };

  // const onFileUpload = (e) => {
  //   console.log(e);

  // const csv = e.target.files[0];

  // const reader = new FileReader();

  // reader.readAsText(csv);

  // reader.onload = function (e) {
  //   console.log(e.target);
  // };
  // };

  return (
    <div className="App">
      <input type="file" onChange={onFileChange} />
      {/* <button onClick={onFileUpload}>Upload!</button> */}

      {/* Bootstrap Table */}
      <div>
        {data && columns && (
          <table class="table">
            <thead>
              <tr>
                {columns.map((item) => (
                  <th scope="col">{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr>
                  {row.map((item) => (
                    <td>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
