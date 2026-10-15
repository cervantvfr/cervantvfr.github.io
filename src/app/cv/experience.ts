export interface Role {
  title: string;
  organization: string;
  location: string;
  dates: string;
  bullets: string[];
}

export const experience: Role[] = [
  {
    title: 'Role title',
    organization: 'Organization',
    location: 'City',
    dates: 'Year – Year',
    bullets: [
      'Replace this with what you did in the role.',
      'Add another responsibility or result.'
    ]
  },
  {
    title: 'Earlier role title',
    organization: 'Earlier organization',
    location: 'City',
    dates: 'Year – Year',
    bullets: [
      'Replace this with work from an earlier role.',
      'Add another responsibility or result.'
    ]
  }
];
