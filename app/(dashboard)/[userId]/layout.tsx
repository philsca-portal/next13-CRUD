import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
    }: { 
        children: React.ReactNode;
        params: { userId: string }
    }) {
        
        const user = await prismadb.user.findFirst({
            where:{
                userId: params.userId
            }
        });
        
        if(!user){
            redirect('/sign-in');
        }

    return(
        <>
            {children}       
        </>
    )
}