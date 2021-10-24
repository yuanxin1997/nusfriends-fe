// ################################
// #######     IMPORT     #########
// ################################
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as AntdIcons from "@ant-design/icons";

// ################################
// #######    HOOK, JSX     #######
// ################################
const SideBar = ({ tabData }) => {
  const location = useLocation();

  const tabWrapper = tabData.map((obj, index) => {
    const AntdIcon = AntdIcons[obj.icon];
    return (
      <Link key={index} to={obj.path}>
        <TabWrapper className={obj.path === location.pathname ? "active" : "inactive"}>
          <AntdIcon style={{ fontSize: "20px", marginRight: "20px" }} />
          <p>{obj.title}</p>
        </TabWrapper>
      </Link>
    );
  });

  return (
    <Wrapper>
      <div>{tabWrapper} </div>
    </Wrapper>
  );
};

// ################################
// #########     CSS     ##########
// ################################
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12em;
`;

const TabWrapper = styled.div`
  display: flex;
  &.active {
    color: var(--base-100);
  }
  &.inactive {
    color: var(--base-10);
  }
  &:hover {
    color: var(--base-100);
  }
`;

// ################################
// #######     EXPORT     #########
// ################################
export default SideBar;
