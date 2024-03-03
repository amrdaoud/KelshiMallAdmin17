import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { ColumnDef, DataTableButtonObject, DataTableFilter } from "../app-reusables/data-table/data-table.models";
import { PostStatsFilterModel } from "./post-stats";

export const postStatsConst :
{columns: ColumnDef[], initialFilter?: PostStatsFilterModel, filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[]} = {
    columns: [
        {Name: "#", Property: "postStatsId", IsSort: true},
        {Name: "Date", Property: "date", Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a', IsSort: true},
        {Name: "Type", Property: "statTypeName", IsSort: true},
        {Name: "Issuer", Property: "storeTitle", IsSort: true},
        {Name: "Issuer #", Property: "mobileNumber"},
        {Name: "Description", Property: "description", IsSort: true},
    ],
    initialFilter: {
        PageIndex: 0,
        PageSize: 30,
        SortActive: "Date",
        SortDirection: "desc"
    },

}