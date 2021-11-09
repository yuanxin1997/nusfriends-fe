import React from "react";
import { Breadcrumb } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const BreadCrumb = ({ breadcrumbData }) => {
  const bcItemsWrapper = breadcrumbData.map((obj, index) => {
    return (
      <Breadcrumb.Item key={index}>
        {index == breadcrumbData.length - 1 ? (
          <CurrItem>{obj.name}</CurrItem>
        ) : (
          <Link to={obj.path}>{obj.name}</Link>
        )}
      </Breadcrumb.Item>
    );
  });
  return (
    <Wrapper>
      <Breadcrumb>{bcItemsWrapper}</Breadcrumb>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 2em;
`;

const CurrItem = styled.span`
  font-weight: 700;
`;
export default BreadCrumb;
