/**
 * Single source of truth for program names, paths, and display order.
 * Used by the header, footer, and program page navigation.
 */
export const PROGRAMS = [
  {
    name: "Educational Support",
    shortName: "Education",
    path: "/programs/education",
  },
  {
    name: "Bala Vikas Schools",
    shortName: "Bala Vikas",
    path: "/programs/bala-vikas",
  },
  {
    name: "Medical Services",
    shortName: "Medical Services",
    path: "/programs/medical",
  },
  {
    name: "Tribal Distribution",
    shortName: "Tribal Distribution",
    path: "/programs/tribal",
  },
  {
    name: "Religious & Cultural Services",
    shortName: "Religious & Cultural",
    path: "/programs/religious-cultural",
  },
];

/** Link to a section on the home page (works from any page, respects the deploy base path) */
export function homeSectionHref(id: string): string {
  return `${import.meta.env.BASE_URL || "/"}#${id}`;
}
