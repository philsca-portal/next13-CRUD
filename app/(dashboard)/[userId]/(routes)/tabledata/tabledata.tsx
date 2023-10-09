"use client";

import DeleteDialog from "@/components/ui-components/delete-dialog";
import EditDialog from "@/components/ui-components/dialog";
import SheetPage from "@/components/ui-components/form";

import DataTable from "@/components/ui/datatable";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Applicant } from "@prisma/client";



interface TableDataProps{
    data: Applicant[];
}

const TableData: React.FC<TableDataProps> = ({
    data
}) => {
    return(
        <> 
            <div className="border-b">
                <div className=" flex items-center h-16 px-6">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        PRACTICE-CRUD
                    </h2>
                    <div className="ml-auto">
                        <SheetPage />
                    </div>
                </div>
            </div>           
            <div className="h-full flex-col space-y-4 px-8 py-4">
                <Heading title="Data Table" description="Manage your data" />               
                <Separator />
                <Table>
                    <DataTable  tablecaption="A list of your recent data."
                                tableheadid="ID"
                                tableheaduserid="userID"
                                tableheadname="Fullname"
                                tableheadage="Age"
                                tableheadappointmentdate="Appointment Date"
                                tableheadrole="Role"
                                tableheadcreatedat="Created at"
                                tableheadupdatedat="Updated at"
                                tableheadedit="Edit"
                                tableheaddelete="Delete"/>
                    <TableBody>              
                            {data.map((data) => (
                                <TableRow key={data.id}>
                                    <TableCell className="font-medium border">{data.id}</TableCell>
                                    <TableCell className="border">{data.userId}</TableCell>
                                    <TableCell className="border">{`${data.firstname} ${data.middlename} ${data.lastname}`}</TableCell>
                                    <TableCell className="border">{data.age}</TableCell>
                                    <TableCell className="border">{data.appointmentdate.toDateString()}</TableCell>
                                    <TableCell className="border">{data.role}</TableCell>
                                    <TableCell className="border">{data.createdAt.toDateString()}</TableCell>
                                    <TableCell className="border">{data.updatedAt.toDateString()}</TableCell>
                                    <TableCell className="border">
                                        <EditDialog data={data} />
                                    </TableCell>
                                    <TableCell className="border">
                                        <DeleteDialog title="Are you absolutely sure?"
                                                      description=" This action cannot be undone. This will permanently delete your
                                                      data from our servers."
                                                      cancel="Cancel"
                                                      cOntinue="Continue"
                                                      data={data}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}        
                    </TableBody>
                </Table>       
            </div>
        </>
    )
};

export default TableData;