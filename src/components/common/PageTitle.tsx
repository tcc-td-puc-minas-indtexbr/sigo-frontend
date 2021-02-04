import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";

type PageTitleProps = {
  title: string,
  subtitle: string,
  className: string,
};

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle, className }) => {
  const classes = classNames(
    className,
    "text-center",
    "text-md-left",
    "mb-sm-0"
  );

  return (
    <Col xs="12" sm="4" className={classes}>
      <span className="text-uppercase page-subtitle">{subtitle}</span>
      <h3 className="page-title">{title}</h3>
    </Col>
  )
};

export default PageTitle;
