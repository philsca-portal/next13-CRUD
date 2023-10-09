import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Applicant } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { format} from "date-fns";
import { CalendarIcon, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface EditDialogProps{
    data: Applicant;
}

const formSchema = z.object({
    firstname: z.string({
        required_error: "This field is required.",
        invalid_type_error: "Enter a valid value.",
    }),
    middlename: z.string({
        required_error: "This field is required.",
        invalid_type_error: "Enter a valid value.",
    }),
    lastname: z.string({
        required_error: "This field is required.",
        invalid_type_error: "Enter a valid value.",
    }),
    age: z.coerce.number({
        required_error: "Age is required.",
        invalid_type_error: "Enter a valid value."
    }).min(18, {
        message: "Age must be 18 above"
    }).max(99),
    appointmentdate: z.date({
        required_error: "Please select a date and time.",
        invalid_type_error: "That's not a date.",
    }),
    role: z.string({
        required_error: "This field is required.",
        invalid_type_error: "Enter a valid value.",
    })
});

const EditDialog: React.FC<EditDialogProps> = ({
    data
}) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data
    });

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            await axios.patch(`/api/applicants/${data.id}`, values);
            toast.success("data has been updated.");
            setIsDialogOpen(false);
            router.refresh();
            console.log(values.appointmentdate);
        } catch (error) {
            toast.error("Something went wrong.");
        } finally{
            setLoading(false);
        }
    }

    return(
        <Dialog> 
            <DialogTrigger asChild> 
                <Button variant={"outline"} type="button" onClick={() => setIsDialogOpen(true)}> 
                    <Edit className="h-4 w-4"/> 
                </Button> 
            </DialogTrigger>
            {isDialogOpen && (
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Edit Modal</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently change the data from our servers.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="space-y py-2 pb-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                                <div className=" grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <FormField 
                                            control={form.control}
                                            name="firstname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Firstname</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder="Enter your Firstname.." {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="middlename"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Firstname</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder="Enter your Middlename.." {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="lastname"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Lastname</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder="Enter your Lastname.." {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <FormField 
                                            control={form.control}
                                            name="age"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Age</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder="Enter your Age.." {...field}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="appointmentdate"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Appointment Date</FormLabel>
                                                    <FormControl>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button disabled={loading} variant={"outline"}
                                                                        className={cn(
                                                                            "w-full justify-start text-left font-normal",
                                                                            !field.value && "text-muted-foreground"
                                                                        )}
                                                                >
                                                                    <CalendarIcon className=" mr-2 h-4 w-4" />
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}            
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar disabled={loading}
                                                                mode="single"
                                                                selected={field.value}
                                                                onSelect={field.onChange}
                                                                initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField 
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Role</FormLabel>
                                                    <FormControl>
                                                        <Input disabled={loading} placeholder="Enter your Role.." {...field}/>  
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex w-full items-center justify-end">
                                    <Button disabled={loading} type="submit">Save Changes</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent> 
            )}
        </Dialog>  
    )
}

export default EditDialog;