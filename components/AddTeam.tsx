import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, Dispatch, SetStateAction } from "react";
import { Employee } from "@/lib/data";
import { Separator } from "@/components/ui/separator"

interface AddTeamProps {
  parent: Employee;
  setEmployees: Dispatch<SetStateAction<(Employee)[]>>;
}

export function AddTeam({ parent, setEmployees }: AddTeamProps) {
  // new team name
  const [team, setTeam] = useState("");
  // team leader info
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // team member info
  const [name2, setName2] = useState("");
  const [id2, setId2] = useState("");
  const [email2, setEmail2] = useState("");
  const [phone2, setPhone2] = useState("");

  const handleSubmit = () => {
    let newTeamLead:Employee = {
      id: parseInt(id),
      title: "Team leader",
      name,
      email,
      phone: parseInt(phone),
      parent: parent.id,
      childs: [parseInt(id2)],
      team
    };
    let newMember: Employee = {
      id: parseInt(id2),
      title: "Team member",
      name: name2,
      email: email2,
      phone: parseInt(phone2),
      parent: parseInt(id),
      childs: [],
    };
    // adding team lead id to the parent object (Head of department)
    let updatedParent = { ...parent, childs: [...parent.childs, parseInt(id)] };
    setEmployees((old) => {
      old.splice(
        old.findIndex((e) => e.id === parent.id),
        1
      );
      return [...old, updatedParent, newTeamLead, newMember];
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-6 w-fit text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          + team
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Team</DialogTitle>
          <DialogDescription>
            A team must contain one team lead and atleast one member
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="teamName" className="text-right">
              Team name
            </Label>
            <Input
              id="teamName"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="col-span-3"
            />
          </div>

          <Separator className="my-4" />

          <DialogDescription>
            Team leader info
          </DialogDescription>

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

          <Separator className="my-4" />

          <DialogDescription>
            Team member info
          </DialogDescription>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name2" className="text-right">
              Name
            </Label>
            <Input
              id="name2"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id2" className="text-right">
              ID
            </Label>
            <Input
              id="id2"
              value={id2}
              onChange={(e) => setId2(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone2" className="text-right">
              Phone no
            </Label>
            <Input
              id="phone2"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email2" className="text-right">
              Email
            </Label>
            <Input
              id="email2"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
              className="col-span-3"
            />
          </div>

        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
