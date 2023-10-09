import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    {params}: { params: { id: string } }
    ){

    try {
        
        const { userId } = auth();
        const body = await req.json();

        const { firstname,
                middlename,
                lastname,
                age,
                appointmentdate,
                role } = body;

        if(!userId){
            return new NextResponse("Unauthorized.", { status: 401 });
        }

        if(!firstname){
            return new NextResponse("Firstname is required.", { status: 400 });
        }

        if(!middlename){
            return new NextResponse("Firstname is required.", { status: 400 });
        }
        
        if(!lastname){
            return new NextResponse("Firstname is required.", { status: 400 });
        }

        if(!age){
            return new NextResponse("Firstname is required.", { status: 400 });
        }

        if(!appointmentdate){
            return new NextResponse("Firstname is required.", { status: 400 });
        }

        if(!role){
            return new NextResponse("Firstname is required.", { status: 400 });
        }

        const updateApplicant = await prismadb.applicant.updateMany({
            where:{
                id: params.id,
                userId: userId
            },
            data:{
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                age: age,
                appointmentdate: appointmentdate,
                role: role
            }
        });

        return NextResponse.json(updateApplicant);

    } catch (error) {
        console.log('[APPLICANTS_PATCH]', error);
        return new NextResponse("Internal Error.", { status: 500 });
    }    
}

export async function DELETE(
    req: Request,
    {params}: { params: { id: string } }
    ){

    try {

        const deleteApplicant = await prismadb.applicant.deleteMany({
            where:{
                id: params.id,
            }
        });

        return NextResponse.json(deleteApplicant);

    } catch (error) {
        console.log('[APPLICANTS_DELETE]', error);
        return new NextResponse("Internal Error.", { status: 500 });
    }    
}