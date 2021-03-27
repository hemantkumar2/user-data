import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";

import Table from "components/Table";
import axios from "axios";
import { API_ROOT } from "constants/api-config";

const userDataKeys = ["name", "mob", "address", "image"];

function Home() {
  const [userData, setUserData] = useState(null);
  const [tableData, setTableData] = useState({ columns: [], data: [] });

  useEffect(() => {
    const fetchUserData = async () => {
      axios
        .get(`${API_ROOT}task/1137/report/details/new`)
        .then((res) => setUserData(res.data));
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const columns = userData?.task_questions.map((ele, i) => {
      if (userDataKeys[i] === "image") {
        const url = userDataKeys[i];
        return {
          title: ele.question,
          dataIndex: url,
          key: url,
          render: (url) => {
            return <img style={{ height: "5rem" }} src={url} alt={url} />;
          },
        };
      }
      return {
        title: ele.question,
        dataIndex: userDataKeys[i],
        key: userDataKeys[i],
      };
    });

    const data = userData?.task_answers
      .map((ele) => ele?.answer)
      .map((ele) => {
        let userObj = {};
        ele.forEach((ele, i) => {
          userObj[userDataKeys[i]] = ele.answer;
        });
        return userObj;
      });
    setTableData({
      ...tableData,
      columns,
      data,
    });
  }, [userData, tableData]);

  const { columns, data } = tableData;
  const getTable = () => {
    if (!userData) {
      return <Spin size="large" />;
    }
    return (
      <Col lg={18}>
        <Table
          style={{ marginTop: ".5rem" }}
          bordered
          columns={columns}
          dataSource={data}
        />
      </Col>
    );
  };
  return (
    <div>
      <Row justify="center">{getTable()}</Row>
    </div>
  );
}

export default Home;
