import React from "react";
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'

const StandardList = (props) => {
    return (
        <List {...props}>
            <Datagrid>
                <TextField source='identification'></TextField>
                <TextField source='title'></TextField>
                <DateField source='publication_date'></DateField>
                <EditButton basePath='/standard' />
                <DeleteButton basePath='/standard' />
            </Datagrid>
        </List>
    )
}

export default StandardList