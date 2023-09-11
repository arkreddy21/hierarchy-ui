import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Employee } from "@/lib/data";
import { useState } from "react";

interface FilterProps {
  employees: Employee[];
}

export function Filter({ employees }: FilterProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [entries, setEntries] = useState<null | Employee[]>(null);

  const handleFilter = () => {
    let filteredEntries = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(name.toLowerCase()) &&
        emp.email.toLowerCase().includes(email.toLowerCase()) &&
        emp.phone.toString().includes(phone)
    );
    setEntries(filteredEntries);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Filter Employees</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filter Employees</DialogTitle>
          <DialogDescription>
            Filter employees by name, email or phone number
          </DialogDescription>
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

        <Button className="w-20" onClick={handleFilter}>
          Filter
        </Button>

        {entries && entries.length > 0 && <Separator />}

        {entries?.map((entry) => (
          <div key={entry.id} className="bg-slate-300 w-fit p-6 rounded mt-4">
            <p>Title: {entry.title}</p>
            <p>Name: {entry.name}</p>
            <p>Phone no: {entry.phone}</p>
            <p>Email: {entry.email}</p>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
