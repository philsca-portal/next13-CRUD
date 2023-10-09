"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import axios from "axios";

import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";


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

const InputForm = () => {

    const [date, setDate] = useState<Date>();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            appointmentdate: new Date(),
            role: ""
        }
    });

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/applicants', values);
            toast.success("Applicants data has been saved.");
            window.location.assign(`/${response.data.userId}`);
            
        } catch (error) {
            toast.error("Something went wrong.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
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
                                                        !date && "text-muted-foreground"
                                                    )}
                                            >
                                                <CalendarIcon className=" mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}            
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar disabled={loading}
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
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
                <div className="flex items-center justify-end w-full">
                    <Button disabled={loading} type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
}

export default InputForm;