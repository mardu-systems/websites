import { FooterLink } from "@/components/nav/footer/footer";

export const defaultFooterNavLinks: FooterLink[] = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin Login" },
    { href: "https://www.mardu.de", label: "mardu.de" },
    { href: "https://mardu.space", label: "mardu.space" },
];

export const defaultFooterMetaLinks: FooterLink[] = [
    { href: "/publisher", label: "Impressum" },
    { href: "/privacy", label: "Datenschutz" },
];
