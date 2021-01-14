import React from "react";
import {Edit, SimpleForm, TextInput, DateInput, TextField, DateField, Datagrid} from 'react-admin'

const StandardEdit = (props) => {
    return (
        <Edit title="Edit a Standard" {...props}>
            <SimpleForm>
                <TextInput disabled source='id'></TextInput>
                <TextInput disabled source='uuid'></TextInput>
                <TextInput source='identification'></TextInput>
                <TextInput source='title'></TextInput>
                <DateInput source='publicationDate'></DateInput>
            </SimpleForm>
        </Edit>
    )
}

export default StandardEdit