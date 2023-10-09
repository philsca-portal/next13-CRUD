import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const { userId } = auth();
        const body = await req.json();

        const firstname = body.firstname;
        const middlename = body.middlename;
        const lastname = body.lastname;
        const age = body.age;
        const appointmentdate = body.appointmentdate;
        const role = body.role;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
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

        const checkUserId = await prismadb.user.findMany({
            where: {
                userId: userId
            }
        });

        if(!checkUserId){
            redirect('/sign-in');
        }

        const applicant = await prismadb.applicant.create({
            data: {
                userId: userId,
                firstname,
                middlename,
                lastname,
                age,
                appointmentdate,
                role
            }
        });

        return NextResponse.json(applicant);

    } catch (error) {
        console.log('[APPLICANTS_POST]', error);
        return new NextResponse("Internal Error.", { status: 500 });
    }
}