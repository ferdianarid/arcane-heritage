export const footerLinks = {
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/#", isDisabled: true },
      { name: "Careers", href: "/#", isDisabled: true },
    ],
  },
  product: {
    title: "Product",
    links: [
      {
        name: "Features",
        href: "/#features",
        id: "features",
        isDisabled: false,
      },
      { name: "Pricing", href: "/#pricing", id: "pricing", isDisabled: false },
      { name: "FAQs", href: "/#", isDisabled: true },
    ],
  },
  contact: {
    title: "Contact",
    links: [
      {
        name: "123 Business Ave, Suite 456",
        href: "https://maps.app.goo.gl/hA2yf3iAubcutmZT6",
        icon: "/assets/icons/pin.svg",
        isExternal: true,
      },
      {
        name: "support@payro.com",
        href: "mailto:support@payro.com",
        icon: "/assets/icons/envelope.svg",
      },
    ],
  },
};

export const navigationItems = [
  { name: "Museum", href: "/#museum" },
  { name: "Bangunan", href: "/bangunan" },
  { name: "Makanan", href: "/makanan" },
  { name: "Kesenian", href: "/kesenian" },
];
