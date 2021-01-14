import React from 'react'
import {Admin, Resource} from 'react-admin'
import restProvider from 'ra-data-simple-rest'

import authProvider from './authProvider';

import StandardList from './components/standard/StandardList'
import StandardCreate from './components/standard/StandardCreate'
import StandardEdit from "./components/standard/StandardEdit"

const App = () => {
  return (
    <div>
        <Admin
            title="SIGO"
            dataProvider={restProvider(window.env.API_URL)}
            authProvider={authProvider}
        >
            <Resource name="standard" list={StandardList} create={StandardCreate} edit={StandardEdit} />
        </Admin>
    </div>
  );
}

export default App;
