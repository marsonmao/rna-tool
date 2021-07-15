import React from "react";
import papa from "papaparse";
import { css } from "@emotion/css";

type Reservation = Record<string, string>;

// For collecting course names
const courseColumnNamePrefix = "課程" as const;
const courseColumnNameExclude = "課程選擇" as const;

// Some column name constant
const cancelledCourseColumnName = "取消課程編號" as const;
const emailColumnName = "電子郵件地址" as const;
const courseSelectionColumnName = "課程選擇" as const;

// Display constant
const includedColumns = ["時間戳記", "稱呼", "電子郵件地址", "上課方案"] as const;
const excludedColumns = [] as const;
const transformers: Record<string, (rawValue: string) => string> = {
  "上課方案": (rawValue: string) => rawValue !== '新生體驗' ? '' : rawValue,
  "課程選擇": (rawValue: string) => {
    console.log(rawValue, rawValue.split(', '), rawValue.split(',').map(v => `${v}\n`).join(''));
    return rawValue.split(', ').map(v => `${v}\n`).join('');
  },
}

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
  tableDataCell: css`
    vertical-align: top;
    white-space: pre-line;
    border-bottom: 1px solid black;
  `,
};

function App() {
  const [reservations, setReservations] = React.useState<Array<Reservation>>([]);
  const [courseName, setCourseName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [removeDuplicateEmail, setRemoveDuplicateEmail] = React.useState(false);

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
    setEmail("");
  }, []);
  const handleEmail = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setEmail(e.target.value);
    setCourseName("");
  }, []);
  const handleRemoveDuplicate = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => {
    setRemoveDuplicateEmail(v => !v);
  }, []);

  // Generate data
  const courseNames = React.useMemo(() => {
    const result = new Set<string>();
    reservations.forEach((row) => {
      Object.keys(row)
        .filter(
          (col) =>
            col !== courseColumnNameExclude &&
            col.startsWith(courseColumnNamePrefix)
        )
        .map((col) => result.add(row[col]));
    });
    return result;
  }, [reservations]);
  const displayColumns = React.useMemo(() => {
    const result = Object.keys(reservations[0] || {}).filter(
      (col) =>
        includedColumns.some((inc) => col.startsWith(inc)) &&
        excludedColumns.every((exc) => !col.startsWith(exc))
    );
    if (email !== "") result.push(courseSelectionColumnName);
    return result;
  }, [reservations, email])
  const displayRows = React.useMemo(() => {
    let result = reservations
      .filter((row) => courseName === "" || Object.values(row).some((val) => val === courseName))
      .filter((row) => {
        const cancelledCourses = row[cancelledCourseColumnName]
          .split(",")
          .filter((val) => val !== "");
        return cancelledCourses.every((col) => row[col] !== courseName);
      }).filter((row) => email === "" || row[emailColumnName] === email);
    if (removeDuplicateEmail) {
      const uniqueEmails = new Set();
      result.reverse();
      for (let i = 0; i < result.length; ++i) {
        if (uniqueEmails.has(result[i][emailColumnName])) {
          result[i] = {};
        } else {
          uniqueEmails.add(result[i][emailColumnName]);
        }
      }
      result = result.filter(row => Object.keys(row).length !== 0);
      result.reverse();
    }
    return result;
  }, [reservations, courseName, email, removeDuplicateEmail]);
  
  // Render
  const headerElement = (
    <tr>
      {displayColumns.map((col, i) => (
        <td className={classes.tableHeaderCell} key={i.toString()}>
          {col}
        </td>
      ))}
    </tr>
  );
  const rowElements = displayRows.map((row, i) => (
    <tr key={i.toString()}>
      {displayColumns.map((col, j) => (
        <td key={j.toString()} className={classes.tableDataCell}>{transformers[col] ? transformers[col](row[col]) : row[col]}</td>
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
        <select className={classes.marginRight} value={courseName} onChange={handleCourseName}>
          {Array.from(courseNames)
            .sort()
            .map((name, i) => (
              <option key={i.toString()}>{name}</option>
            ))}
        </select>
        <span className={classes.marginRight}>{rowElements.length}人</span>
        <button className={classes.marginRight} onClick={handleCopyEmails}>Copy Emails</button>
        <input className={classes.marginRight} placeholder="搜尋email" value={email} onChange={handleEmail} />
        <label className={classes.marginRight}>消除重複<input type="checkbox" checked={removeDuplicateEmail} onChange={handleRemoveDuplicate} /></label>
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
