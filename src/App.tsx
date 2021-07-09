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
    display: flex;
    flex-direction: column;
  `,
  topBar: css`
    width: 100%;
    height: 64px;
    padding: 12px 24px;
    box-shadow: 0px -10px 20px 0px #000;
  `,
  content: css`
    width: 100%;
    flex: 1 0 64px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 12px 24px;
  `,
  marginRight: css`
    margin-right: 8px;
  `,
  table: css`
    width: 100%;
  `,
  tableHeaderCell: css`
    border-bottom: 1px solid black;
  `,
};

function App() {
  const [csvData, setCSVData] = React.useState<Array<CSVObject>>([{}]);
  const [courseName, setCourseName] = React.useState("");

  const handleCSVFile = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    papa.parse(file, {
      complete: completeParse,
      header: true,
    });
  }, []);
  const completeParse = React.useCallback(
    (result: papa.ParseResult<CSVObject>) => {
      console.log("[DEBUG]", result.data);
      setCSVData(result.data);
    },
    []
  );
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
        <td className={classes.tableHeaderCell} key={i.toString()}>
          {name}
        </td>
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
      <div className={classes.topBar}>
        <input
          className={classes.marginRight}
          type="file"
          name="file"
          onChange={handleCSVFile}
        />
        <select className={classes.marginRight} onChange={handleCourseName}>
          {Array.from(courseNames)
            .sort()
            .map((name) => (
              <option>{name}</option>
            ))}
        </select>
        <span className={classes.marginRight}>{rows.length}人</span>
        <button onClick={handleCopyEmails}>Copy Emails</button>
      </div>
      <div className={classes.content}>
        <table className={classes.table}>
          <thead>{header}</thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
