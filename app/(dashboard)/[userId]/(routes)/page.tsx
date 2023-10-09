import TableData from "./tabledata/tabledata";
import prismadb from "@/lib/prismadb";

const DashboardPage = async() => {
    
    const fetchAllApplicants = await prismadb.applicant.findMany();
    
    return(
        <>          
            <TableData data={fetchAllApplicants} />
        </>
    )
};

export default DashboardPage;