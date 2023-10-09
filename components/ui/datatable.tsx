import { TableCaption, TableHeader, TableRow, TableHead} from "./table";

interface DataTableProps{
    tablecaption: string,
    tableheadid: string,
    tableheaduserid: string,
    tableheadname: string,
    tableheadage: string,
    tableheadappointmentdate: string,
    tableheadrole: string,
    tableheadcreatedat: string,
    tableheadupdatedat: string,
    tableheadedit: string,
    tableheaddelete:string,
}

const DataTable: React.FC<DataTableProps> = ({
    tablecaption,
    tableheadid,
    tableheaduserid,
    tableheadname,
    tableheadage,
    tableheadappointmentdate,
    tableheadrole,
    tableheadcreatedat,
    tableheadupdatedat,
    tableheadedit,
    tableheaddelete
}) => {
    return(
        <>
            <TableCaption>{tablecaption}</TableCaption>
            <TableHeader>
                <TableRow> 
                    <TableHead className="border">{tableheadid}</TableHead>
                    <TableHead className="border">{tableheaduserid}</TableHead>
                    <TableHead className="border">{tableheadname}</TableHead>
                    <TableHead className="border">{tableheadage}</TableHead>
                    <TableHead className="border">{tableheadappointmentdate}</TableHead>
                    <TableHead className="border">{tableheadrole}</TableHead>
                    <TableHead className="border">{tableheadcreatedat}</TableHead>
                    <TableHead className="border">{tableheadupdatedat}</TableHead>
                    <TableHead className="border">{tableheadedit}</TableHead>
                    <TableHead className="border">{tableheaddelete}</TableHead>
                </TableRow>
            </TableHeader>
        </>
    )
}

export default DataTable;