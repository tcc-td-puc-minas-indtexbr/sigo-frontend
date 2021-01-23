import React, { useContext } from 'react';
import AppContext from '../../store/AppContext';
import { Button } from "shards-react";


const Foo: React.FC = () => {
  const { toggleSidebar } = useContext(AppContext);

  return <div>Foo - <Button onClick={() => toggleSidebar() }>Change sidebar state</Button></div>;
}

export default Foo;