import React from 'react';
import { ReactNodeLike } from 'prop-types';

type EmptyLayoutProps = {
  children?: ReactNodeLike;
};

const Layout: React.FC<EmptyLayoutProps> = ({ children }) => <>{children}</>;

export default Layout;
