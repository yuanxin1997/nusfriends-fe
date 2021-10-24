import React from "react";
import BreadcrumbWrapper from "./BreadCrumb";
import styled from "styled-components";

const ContainerHeader = ({ headData }) => {
  const { title, breadcrumbData } = headData;
  return (
    <HeadWrapper>
      <h1>{title}</h1>
      <BreadcrumbWrapper breadcrumbData={breadcrumbData}/>
    </HeadWrapper>
  );
};

const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1em;
`;

export default ContainerHeader;
