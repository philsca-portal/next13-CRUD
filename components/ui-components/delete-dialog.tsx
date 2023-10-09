import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Trash } from "lucide-react";
import { Applicant } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface DeleteDialogProps {
    title: string,
    description: string,
    cancel: string,
    cOntinue: string,
    data: Applicant
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
    title,
    description,
    cancel,
    cOntinue,
    data
}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onDelete = async() => {
        try {
            await axios.delete(`/api/applicants/${data.id}`);
            setLoading(true);
            toast.success("Data has been deleted.");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"}>
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>{title}</AlertDialogTitle>
                <AlertDialogDescription>
                    {description}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button disabled={loading} variant={"outline"}>
                            {cancel}
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button disabled={loading} variant={"default"} onClick={() => onDelete()}>
                            {cOntinue} 
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog;