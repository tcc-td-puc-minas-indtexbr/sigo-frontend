import { ReactNodeLike } from "prop-types";
import React from "react";

type EmptyLayoutProps = {
  children?: ReactNodeLike;
};

const Layout: React.FC<EmptyLayoutProps> = ({ children }) => <>{children}</>;

export default Layout;
