"use client";

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";

import InputForm from "./input-form";

const SheetPage = () => {
    return(
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"default"}>Open Form</Button>
          </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="uppercase text-3xl">Form</DialogTitle>
                    <DialogDescription>
                        Enter your Firstname, Middlename, Lastname, Age, Appointment ate, and Role in the Company.
                    </DialogDescription>
                </DialogHeader>
                  <div className=" mt-space-y py-2 pb-4">
                    <InputForm />
                  </div>
            </DialogContent>
            
        </Dialog>
    )
}

export default SheetPage;