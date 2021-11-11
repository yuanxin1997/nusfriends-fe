import React from "react";
import BreadcrumbWrapper from "./BreadCrumb";
import styled from "styled-components";

const ContainerHeader = ({ headData }) => {
  const { title, breadcrumbData } = headData;
  return (
    <HeadWrapper>
      <BreadcrumbWrapper breadcrumbData={breadcrumbData} />
      <h1 style={{ marginTop: 20 }}>{title}</h1>
    </HeadWrapper>
  );
};

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 0.5em;
`;

export default ContainerHeader;
