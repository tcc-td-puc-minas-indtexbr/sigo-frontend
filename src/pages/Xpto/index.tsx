import React, { useContext } from 'react';
import AppContext from '../../store/AppContext';
import { Button } from "shards-react";

const Xpto: React.FC = () => {
  const { isSidebarVisible, toggleSidebar } = useContext(AppContext);

  return <div>XPTO - {`${isSidebarVisible}`} - <Button onClick={() => toggleSidebar() }>Change sidebar state</Button></div>;
}

export default Xpto;