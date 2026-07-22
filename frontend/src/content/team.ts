import type { TeamMember } from "@/types";

const IMG = "/images/team";

/**
 * Organizational hierarchy for DSD Security Services.
 * Rendered recursively by the Team page — edit this tree to change the org chart.
 * Nodes with an empty `name` render as a department/group header (Operations, Training).
 */
export const TEAM_HIERARCHY: TeamMember = {
  id: "md",
  name: "Mr. Dhananjay S. Deshmukh",
  designation: "Managing Director",
  qualification: "Retd. Ex-Police",
  department: "Management",
  image: `${IMG}/Mr.Dhananjay Deshmukh sir.jpeg`,
  children: [
    {
      id: "coo",
      name: "Mr. Dheeraj D. Deshmukh",
      designation: "Chief Operating Officer",
      qualification: "B.Tech, DAC, MBA",
      department: "Management",
      image: `${IMG}/MR.Dhiraj Deshmukh.jpeg`,
      children: [
        {
          id: "hr",
          name: "Mr. Omkar S. Jadhav",
          designation: "HR / Accounts",
          qualification: "M.Com, LLB",
          department: "HR & Admin",
          image: `${IMG}/Mr.omkar jadhav.jpeg`,
          children: [
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
          ],
        },
        {
          id: "operations",
          name: "",
          designation: "Operations",
          department: "Operations",
          image: "",
          children: [
            {
              id: "regional",
              name: "Mr. Nilesh Koli",
              designation: "Regional Manager",
              department: "Sangli District",
              image: `${IMG}/Mr.Nitesh koli.jpeg`,
            },
          ],
        },
        {
          id: "training",
          name: "",
          designation: "Training",
          department: "Training",
          image: "",
          children: [
            {
              id: "trainer1",
              name: "Mr. Nitin Fadature",
              designation: "Training Officer (MSF)",
              image: `${IMG}/Mr.Nitin fadtare.jpeg`,
            },
            {
              id: "trainer2",
              name: "Mr. Shivaji Venkhande",
              designation: "Chief Training Officer",
              qualification: "Ex-Subhedar",
              image: `${IMG}/Mr.vankhande.jpeg`,
              children: [
                {
                  id: "area3",
                  name: "Mr. Pradip Patil",
                  designation: "Area Manager",
                  department: "Ichalkaranji / Kolhapur",
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
          ],
        },
      ],
    },
  ],
};
