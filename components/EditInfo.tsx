import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Employee } from "@/lib/data";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

interface EditInfoProps {
  entry: Employee;
  employees: Employee[];
  setEmployees: Dispatch<SetStateAction<Employee[]>>;
}

export function EditInfo({ entry, employees, setEmployees }: EditInfoProps) {
  const [name, setName] = useState(entry.name);
  const [email, setEmail] = useState(entry.email);
  const [phone, setPhone] = useState(entry.phone.toString());
  // list of teams to select from. To change the team of a member
  const [teams, setTeams] = useState();
  // id of team lead of the selected team
  const [team, setTeam] = useState("");

  const handleSubmit = () => {
    let newInfo: Employee = {
      title: entry.title,
      name,
      id: entry.id,
      email,
      phone: parseInt(phone),
      parent: entry.parent,
      childs: entry.childs,
    };
    if ("team" in entry) {
      newInfo.team = entry.team;
    }
    if(team && parseInt(team)!==entry.parent) {
      var oldTeamLead = employees.find(e => e.id === entry.parent)
      oldTeamLead && (oldTeamLead = {...oldTeamLead, childs:oldTeamLead.childs.filter((id)=>id!==entry.id)})
      var newTeamLead = employees.find(e => e.id === parseInt(team))
      newTeamLead && (newInfo.parent = newTeamLead.id)
      newTeamLead && (newTeamLead.childs.push(newInfo.id))
    }

    setEmployees((old) => {
      old.splice(
        old.findIndex((e) => e.id === entry.id),
        1,
        newInfo
      );
      if (team && oldTeamLead && newTeamLead){
        old.splice(
          old.findIndex((e) => e.id === oldTeamLead?.id),
          1,
          oldTeamLead
        );
        old.splice(
          old.findIndex((e) => e.id === newTeamLead?.id),
          1,
          newTeamLead
        );
      }
      return [...old];
    });
  };

  useEffect(() => {
    if (entry.title === "Team member") {
      let teams: any = {}; //object with keys as team names and values as team leader id
      let teamlead = employees.find((e) => e.id === entry.parent);
      let head = employees.find((e) => e.id === teamlead?.parent);
      head?.childs.forEach((childId) => {
        let teamName = employees.find((e) => e.id === childId)?.team;
        teamName && (teams[teamName] = childId);
      });
      setTeams(teams)
    }
  }, [entry, employees]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Details</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit details</DialogTitle>
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
          {entry.title === "Team member" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Team
              </Label>
              <Select onValueChange={(v)=>{setTeam(v)}}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="change team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teams && (Object.entries(teams).map(([k,v]:any)=>{
                      return <SelectItem key={v} value={v} >{k}</SelectItem>
                    }))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
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
