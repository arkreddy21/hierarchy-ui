"use client";
import { AddEmployee } from "@/components/AddEmployee";
import { employeeData, Employee, TeamMem } from "@/lib/data";
import useLocalStorage from "@/lib/hooks";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AddTeam } from "@/components/AddTeam";

export default function Home() {
  // TODO use local storage
  const [employees, setEmployees] = useState(employeeData);
  const [selected, setSelected] = useState<null | Employee | TeamMem>(null);
  const ceo = employees.find((e) => e.parent === 0);

  const deleteMember = () => {
    setEmployees((old) => {
      old.splice(
        old.findIndex((e) => e.id === selected?.id),
        1
      );
      return [...old];
    });
    setSelected(null);
  };

  const Entry = ({ entry }: { entry: Employee | TeamMem }) => {
    return (
      <div className="ml-6 my-2">
        <div
          className="rounded border-black border-2 p-2 cursor-pointer flex flex-row items-center justify-between"
          onClick={() => setSelected(entry)}
        >
          <div>
            {"team" in entry && <p className="font-semibold">Team: {entry.team}</p>}
            <p className="font-semibold">{entry.title}</p>
            <p>{entry.name}</p>
          </div>
          {entry.title === "Team leader" && (
            <AddEmployee parent={entry} setEmployees={setEmployees} />
          )}
          {entry.title.startsWith("Head of") && (
            <AddTeam parent={entry} setEmployees={setEmployees} />
          )}
        </div>
        {entry.childs.map((eid) => {
          let child = employees.find((emp) => emp.id === eid);
          return child ? <Entry key={child.id} entry={child} /> : null;
        })}
      </div>
    );
  };

  return (
    <main className="min-h-screen flex flex-row">
      <section className="bg-slate-200 w-96 pr-4">
        {ceo && <Entry key={ceo.id} entry={ceo} />}
      </section>
      <section className="grow p-2">
        {selected && (
          <div className="bg-slate-300 w-fit p-6 rounded mt-4">
            <p>Title: {selected.title}</p>
            <p>Name: {selected.name}</p>
            <p>Phone no: {selected.phone}</p>
            <p>Email: {selected.email}</p>
            {selected.title === "Team member" && (
              <Button onClick={deleteMember}>delete member</Button>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
