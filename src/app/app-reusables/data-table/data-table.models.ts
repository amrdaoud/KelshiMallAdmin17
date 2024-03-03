import { SortDirection } from "@angular/material/sort";
import { Observable } from "rxjs";

export interface ColumnDef {
    Name: string;
    Property: string;
    IsSort?: boolean;
    Pipe?: any;
    PipeArgs?: string;
    Highlights?: Highlight[];
    IsImage?: boolean;
    HideHandset?: boolean;
    HaveFooter?: boolean;
    FooterName?: string;
    FooterPipe?: any;
    FooterPipeArgs?: string;
    Tooltip?: string;
}
export interface Highlight {
    Value: string | number | boolean;
    Operation: '=' | '<' | '>' | '<=' | '>=' | '<>'
    Color?: string;
    BackgroundColor?: string;
    AltText?: string;
}
export interface DataTableFilter {
    Label?: string;
    PlaceHolder?: string;
    Data?: Observable<any[]>;
    ControlName: string;
    ValueProperty?: string;
    DisplayProperty?: string;
    IsLoading?: Observable<boolean>;
    IsMulti?: boolean;
    Type?: 'select'|'radio'|'input'|'twoDates'|'date'|'slider'|'checkbox';
    UpdateOn?: 'change' | 'blur' | 'submit';
    IsMandatory?: boolean;
    ControlName2?: string;
    Label2?: string;
    PlaceHolder2?: string;
    MinValue?: number;
    MaxValue?: number;
}
export interface FilterObject {
	Key: string;
	Value: string[];
}
export interface GeneralFilterModel {
    SearchQuery?: string | null;
    PageIndex: number;
	PageSize: number;
	SortActive: string;
	SortDirection: SortDirection;
}
export interface DataTableOutput {
	SearchQuery: string | null;
    PageIndex: number;
	PageSize: number;
	SortActive: string;
	SortDirection: SortDirection;
	Filters?: FilterObject[];
}

export interface DataWithSize {
    data: any[];
    dataSize: number;
}
export interface DataTableButtonObject {
    Text: string;
    Icon?: string;
    MatColor?: 'primary' | 'accent' | 'warn';
    HideWhen?: {Property: string, Value: any};
    ShowWhen?: {Property: string, Value: any};
    Disable?:boolean;
}