import React from "react";
import papa from "papaparse";
import { css } from "@emotion/css";

type CSVObject = Record<string, string>;

const courseColumnName = "課程" as const;
const courseColumnNameExclude = "課程選擇" as const;
const cancelledCourseNumberColumnName = "取消課程編號" as const;
const emailColumnName = "電子郵件地址" as const;
const includedColumns = ["時間戳記", "稱呼", "電子郵件地址"] as const;
const excludedColumns = [] as const;

const classes = {
  root: css`
    width: 100%;
    height: 100%;
  `,
};

function App() {
  const inputRef = React.useRef(null);
  const [csvFile, setCSVFile] = React.useState<File>();
  const [csvData, setCSVData] = React.useState<Array<CSVObject>>([{}]);
  const [courseName, setCourseName] = React.useState("");

  const handleCSVFile = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    setCSVFile(event.target.files?.[0]);
  }, []);
  const completeParse = React.useCallback(
    (result: papa.ParseResult<CSVObject>) => {
      console.log(result.data);
      setCSVData(result.data);
    },
    []
  );
  const parseCSV = React.useCallback(() => {
    if (!csvFile) return;
    papa.parse(csvFile, {
      complete: completeParse,
      header: true,
    });
  }, [csvFile, completeParse]);
  const handleCourseName = React.useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((e) => {
    setCourseName(e.target.value);
  }, []);

  const courseNames = new Set<string>();
  csvData.forEach((d) => {
    Object.keys(d)
      .filter(
        (v) => v !== courseColumnNameExclude && v.startsWith(courseColumnName)
      )
      .map((v) => courseNames.add(d[v]));
  });
  const columns = Object.keys(csvData[0]).filter(
    (v) =>
      includedColumns.some((inc) => v.startsWith(inc)) &&
      excludedColumns.every((exc) => !v.startsWith(exc))
  );
  const header = (
    <tr>
      {columns.map((name, i) => (
        <td key={i.toString()}>{name}</td>
      ))}
    </tr>
  );
  const dataRows = csvData
    .filter((d) => Object.values(d).some((v) => v === courseName))
    .filter((d) => {
      const cancelledCourses = d[cancelledCourseNumberColumnName]
        .split(",")
        .filter((v) => v !== "");
      return cancelledCourses.every((name) => d[name] !== courseName);
    });
  const rows = dataRows.map((d, i) => (
    <tr key={i.toString()}>
      {columns.map((name) => (
        <td>{d[name]}</td>
      ))}
    </tr>
  ));
  const handleCopyEmails = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (e) => {
      navigator.clipboard.writeText(
        dataRows.map((d) => d[emailColumnName]).join()
      );
    },
    [dataRows]
  );
  return (
    <div className={classes.root}>
      <input type="file" ref={inputRef} name="file" onChange={handleCSVFile} />
      <button onClick={parseCSV}>Parse</button>
      <select onChange={handleCourseName}>
        {Array.from(courseNames)
          .sort()
          .map((name) => (
            <option>{name}</option>
          ))}
      </select>
      <div>{rows.length}人</div>
      <button onClick={handleCopyEmails}>Copy Emails</button>
      <table>
        <thead>{header}</thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default App;
