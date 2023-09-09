
export interface Employee {
  id: number;
  title: string;
  name: string;
  phone: number;
  email: string;
  parent: number;
  childs: number[];
}

export interface TeamMem extends Employee {
  team: string
}

export const employeeData: (Employee | TeamMem)[] = [
  {
    id: 7962,
    title: "CEO",
    name: "Derek Perez",
    phone: 5936845147,
    email: "lemi@ho.ru",
    parent: 0,
    childs: [6099, 5239, 8692],
  },
  {
    id: 6099,
    title: "Head of staff",
    name: "Maurice Perry",
    phone: 9811033713,
    email: "nabeh@jute.jp",
    parent: 7962,
    childs: [5038],
  },
  {
    id: 5239,
    title: "Head of engineering",
    name: "Jay Fisher",
    phone: 9124323713,
    email: "faegofuz@fob.lk",
    parent: 7962,
    childs: [],
  },
  {
    id: 8692,
    title: "Head of design",
    name: "Mitchell Ford",
    phone: 3582157643,
    email: "cihju@mukudu.uk",
    parent: 7962,
    childs: [],
  },
  {
    id: 5038,
    title: "Team leader",
    name: "Harriett Malone",
    phone: 5830214583,
    email: "defabdow@zupal.bn",
    parent:6099,
    childs: [6297, 6298],
    team: "hr team"
  },
  {
    id: 6297,
    title: "Team member",
    name: "Jared Stephens",
    phone: 5830214583,
    email: "fajopvar@makaofi.ch",
    parent:5038,
    childs: [],
  },
  {
    id: 6298,
    title: "Team member",
    name: "Marcus Herrera",
    phone: 3581237656,
    email: "jefsor@utmilow.tf",
    parent:5038,
    childs: [],
  },
];
