import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
}: { children: React.ReactNode }) {

    const { userId } = auth();

    if(!userId){
        redirect('/sign-in');
    }

    const user = await prismadb.user.findFirst({
        where:{
            userId: userId
        }
    });

    if(user){
        redirect(`/${user.userId}`); 
    }else{
        try {
            await prismadb.user.create({
                data:{
                    userId: userId
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            redirect(`/${userId}`);
        }
    }

    return(
        <>
            {children}       
        </>
    )
}