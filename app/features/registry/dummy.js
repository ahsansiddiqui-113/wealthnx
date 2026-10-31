// Placeholder feature page (owner will replace the copy). `dummy: true` is reported by `npm run check:features`.
// Remove the `dummy: true` flag (and this helper call) once real content is written.
const icons = ['sparkles', 'layers', 'trend-up', 'pie', 'bell', 'link'];

export const dummyFeature = (slug, label, menu, image) => ({
  slug,
  label,
  dummy: true,
  menu,
  metaTitle: `${label} - WealthNX`,
  metaDescription: `${label} dummy description.`,
  hero: {
    headline: `Dummy headline for`,
    accent: `${label}.`,
    blurb: `${label} dummy blurb text.`,
    image,
  },
  cards: icons.map((icon, i) => ({ icon, title: `Dummy title ${i + 1}`, text: 'Dummy description.' })),
});
