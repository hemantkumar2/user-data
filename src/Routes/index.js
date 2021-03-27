import React from "react";
import { Route } from "react-router-dom";

import Home from "containers/Home";

const index = () => {
  return (
    <div>
      <Route path="/" component={Home} />
    </div>
  );
};

export default index;
