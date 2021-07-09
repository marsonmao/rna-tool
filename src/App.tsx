import React from "react";
import papa from "papaparse";
import { css } from "@emotion/css";

type Reservation = Record<string, string>;

const courseColumnNamePrefix = "課程" as const;
const courseColumnNameExclude = "課程選擇" as const;
const cancelledCourseColumnName = "取消課程編號" as const;
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
  const [reservations, setReservations] = React.useState<Array<Reservation>>([
    {},
  ]);
  const [courseName, setCourseName] = React.useState("");

  const completeParse = React.useCallback(
    (result: papa.ParseResult<Reservation>) => {
      console.log("[DEBUG]", result.data);
      setReservations(result.data);
    },
    []
  );
  const handleCSVFile = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      papa.parse(file, {
        complete: completeParse,
        header: true,
      });
    },
    [completeParse]
  );
  const handleCourseName = React.useCallback<
    React.ChangeEventHandler<HTMLSelectElement>
  >((e) => {
    setCourseName(e.target.value);
  }, []);

  const courseNames = new Set<string>();
  reservations.forEach((row) => {
    Object.keys(row)
      .filter(
        (col) =>
          col !== courseColumnNameExclude &&
          col.startsWith(courseColumnNamePrefix)
      )
      .map((col) => courseNames.add(row[col]));
  });
  const displayColumns = Object.keys(reservations[0]).filter(
    (col) =>
      includedColumns.some((inc) => col.startsWith(inc)) &&
      excludedColumns.every((exc) => !col.startsWith(exc))
  );
  const headerElement = (
    <tr>
      {displayColumns.map((col, i) => (
        <td className={classes.tableHeaderCell} key={i.toString()}>
          {col}
        </td>
      ))}
    </tr>
  );
  const displayRows = reservations
    .filter((row) => Object.values(row).some((val) => val === courseName))
    .filter((row) => {
      const cancelledCourses = row[cancelledCourseColumnName]
        .split(",")
        .filter((val) => val !== "");
      return cancelledCourses.every((col) => row[col] !== courseName);
    });
  const rowElements = displayRows.map((row, i) => (
    <tr key={i.toString()}>
      {displayColumns.map((col) => (
        <td>{row[col]}</td>
      ))}
    </tr>
  ));
  const handleCopyEmails = React.useCallback<
    React.MouseEventHandler<HTMLButtonElement>
  >(
    (e) => {
      navigator.clipboard.writeText(
        displayRows.map((row) => row[emailColumnName]).join()
      );
    },
    [displayRows]
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
        <span className={classes.marginRight}>{rowElements.length}人</span>
        <button onClick={handleCopyEmails}>Copy Emails</button>
      </div>
      <div className={classes.content}>
        <table className={classes.table}>
          <thead>{headerElement}</thead>
          <tbody>{rowElements}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
