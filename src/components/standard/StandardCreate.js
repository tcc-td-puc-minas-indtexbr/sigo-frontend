import React from "react";
import {Create, SimpleForm, TextInput, DateInput, TextField, DateField, Datagrid} from 'react-admin'

const StandardCreate = (props) => {
    return (
        <Create title="Create a Standard" {...props}>
            <SimpleForm>
                <TextInput source='identification'></TextInput>
                <TextInput source='title'></TextInput>
                <DateInput source='publicationDate'></DateInput>
            </SimpleForm>
        </Create>
    )
}

export default StandardCreate