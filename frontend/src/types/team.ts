/**
 * Organizational team member node used to render the recursive org chart.
 * Nodes with an empty `name` render as a department/group header instead of a person card.
 */
export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  qualification?: string;
  department?: string;
  image: string;
  children?: TeamMember[];
}
