import React from "react";
import { Table as AntdTable } from "antd";

const Table = (props) => {
  return (
    <div>
      <AntdTable {...props} />
    </div>
  );
};

export default Table;
