import type { TeamMember } from "@/types";

const IMG = "/images/team";

/**
 * Leadership roster for DSD Security Services.
 * Source: client's organizational hierarchy image.
 * The Team page presents these as sectioned glassmorphism cards
 * (no tree / no connectors). Edit these arrays to change who appears.
 */

export const EXECUTIVE_LEADERSHIP: TeamMember[] = [
  {
    id: "md",
    name: "Mr. Dhananjay S. Deshmukh",
    designation: "Managing Director",
    qualification: "Retd. Ex-Police",
    department: "Management",
    image: `${IMG}/Mr.Dhananjay Deshmukh sir.jpeg`,
  },
  {
    id: "coo",
    name: "Mr. Dheeraj D. Deshmukh",
    designation: "Chief Operating Officer",
    qualification: "B.Tech, CDAC, MBA",
    department: "Management",
    image: `${IMG}/MR.Dhiraj Deshmukh.jpeg`,
  },
  {
    id: "director-pune",
    name: "Mr. Dhairyasheel S. Deshmukh",
    designation: "Director (Pune Division)",
    department: "Management",
    image: `${IMG}/Mr.Dhairyasheel .S. Deshmukh .jpeg`,
  },
];

export interface DepartmentGroup {
  id: string;
  name: string;
  tagline: string;
  members: TeamMember[];
}

export const DEPARTMENTS: DepartmentGroup[] = [
  {
    id: "hr-admin",
    name: "HR & Admin",
    tagline: "People, payroll, and compliance for every DSD assignment.",
    members: [
      {
        id: "hr",
        name: "Mr. Omkar S. Jadhav",
        designation: "HR / Accounts",
        qualification: "M.Com, LLB",
        department: "HR & Admin",
        image: `${IMG}/Mr.omkar jadhav.jpeg`,
      },
    ],
  },
  {
    id: "operations",
    name: "Operations",
    tagline: "Regional and area managers running day-to-day protection across our districts.",
    members: [
      {
        id: "regional",
        name: "Mr. Nitesh Koli",
        designation: "Regional Manager",
        department: "Sangli District",
        image: `${IMG}/Mr.Nitesh koli.jpeg`,
      },
      {
        id: "area1",
        name: "Mr. Dayanand Powar",
        designation: "Area Manager",
        department: "Sangli",
        image: `${IMG}/Mr.Daya Pawar.jpeg`,
      },
      {
        id: "area2",
        name: "Mr. Chetan Bhosale",
        designation: "Area Manager",
        department: "Kupwad / Miraj",
        image: `${IMG}/Mr.Bhosale Chintamani.jpeg`,
      },
      {
        id: "area3",
        name: "Mr. Pradip Patil",
        designation: "Area Manager",
        department: "Ishwarpur / Kolhapur",
        image: `${IMG}/Mr.pradeep Patil.jpeg`,
      },
      {
        id: "operations2",
        name: "Mr. Ratan Naik",
        designation: "Operational Manager",
        department: "Sangli",
        image: `${IMG}/Ratan Naik.jpeg`,
      },
    ],
  },
  {
    id: "training",
    name: "Training",
    tagline: "Preparing every officer to the standards our clients expect.",
    members: [
      {
        id: "trainer2",
        name: "Mr. Shivappa Venkhande",
        designation: "Chief Training Officer",
        qualification: "Ex-Subhedar",
        department: "Training",
        image: `${IMG}/Mr.vankhande.jpeg`,
      },
      {
        id: "trainer1",
        name: "Mr. Nitin Fadature",
        designation: "Training Officer (MSF)",
        department: "Training",
        image: `${IMG}/Mr.Nitin fadtare.jpeg`,
      },
    ],
  },
];
