import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, Dispatch, SetStateAction } from "react";
import { Employee } from "@/lib/data";

interface AddEmployeeProps {
  parent: Employee;
  setEmployees: Dispatch<SetStateAction<(Employee)[]>>;
}

export function AddEmployee({ parent, setEmployees }: AddEmployeeProps) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    let newMember: Employee = {
      id: parseInt(id),
      title: "Team member",
      name,
      email,
      phone: parseInt(phone),
      parent: parent.id,
      childs: [],
    };
    // adding new member id to the parent object (team leader)
    let updatedParent = { ...parent, childs: [...parent.childs, parseInt(id)] };
    setEmployees((old) => {
      old.splice(
        old.findIndex((e) => e.id === parent.id),
        1
      );
      return [...old, updatedParent, newMember];
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-6 w-fit text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          + member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add team member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              ID
            </Label>
            <Input
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone no
            </Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
