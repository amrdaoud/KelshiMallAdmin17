import { CurrencyPipe } from "@angular/common";
import { LocaleDatePipe } from "../app-reusables/common/locale-date.pipe";
import { ColumnDef, DataTableButtonObject, DataTableFilter, GeneralFilterModel } from "../app-reusables/data-table/data-table.models";

export const ordersConst :
{columns: ColumnDef[], initialFilter?: GeneralFilterModel,btns?:DataTableButtonObject[], filters?: DataTableFilter[], menuButtons?: DataTableButtonObject[], selectBtns?: DataTableButtonObject[]} = {
    columns: [
        {Name: "#", Property: "orderId"},
        {Name: "Date", Property: "orderDate", Pipe: LocaleDatePipe, PipeArgs: 'MMM dd, y, hh:mm a', IsSort: true},
        {Name: "Product", Property: "postName", IsSort: true},
        {Name: "Seller", Property: "sellerStoreTitle"},
        {Name: "Sender Name", Property: "sellerRecepientName"},
        {Name: "Sender Phone", Property: "sellerRecepientMobileNumber"},
        {Name: "Direction", Property: "direction"},
        {Name: "Distance/M", Property: "distanceM"},
        {Name: "Buyer", Property: "buyerStoreTitle"},
        {Name: "Receiver Name", Property: "buyerRecepientName"},
        {Name: "Receiver Phone", Property: "buyerRecepientMobileNumber"},
        {Name: "Provider", Property: "providerName"},
        {Name: "Method", Property: "methodName"},
        {Name: "Status", Property: "statusName"},
        {Name: "Price", Property: "postPrice", Pipe: CurrencyPipe},
        {Name: "Delivery", Property: "deliveryFee", Pipe: CurrencyPipe},
        {Name: "Taxes", Property: "taxesFee", Pipe: CurrencyPipe},
        {Name: "Total", Property: "totalPrice", Pipe: CurrencyPipe}
    ],
    initialFilter: {
        PageIndex: 0,
        PageSize: 30,
        SortActive: "orderDate",
        SortDirection: "desc"
    }
}