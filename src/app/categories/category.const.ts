import { ColumnDef } from "../app-reusables/data-table/data-table.models";
export const fieldsColumns: ColumnDef[] = [
    {Name: '#', Property: 'fieldId'},
    {Name: 'Type', Property: 'type'},
    {Name: 'Name', Property: 'name'},
    {Name: "Mandatory?", Property: "isMandatory", IsSort: true, Highlights: [
        {Operation: '=', Value: true, AltText: 'Mandatory', Color: 'rgb(26, 213, 152)', BackgroundColor: 'rgba(26, 213, 152,0.3)'},
        {Operation: '=', Value: false, AltText: 'Optional', Color: 'rgb(234, 58, 61)', BackgroundColor: 'rgba(234, 58, 61, 0.2)'}
    ]},
    {Name: 'Content', Property: 'contentTextAr'},
];

export const contentColumns: ColumnDef[] = [
    {Name: '#', Property: 'fieldContentId'},
    {Name: 'English Value', Property: 'valueEn'},
    {Name: 'Arabic Value', Property: 'valueAr'}
]