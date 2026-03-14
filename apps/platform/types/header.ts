export type NavItem = {
    label: string;
    href?: string;
    description?: string;
    image?: { src: string; alt?: string; aspect?: "wide" | "square" };
    badge?: string;
};

export type MegaGroup = {
    type: "mega";
    label: string;
    hero?: { src: string; alt?: string; caption?: string };
    items: NavItem[];
};

export type SimpleLink = {
    type: "link";
    label: string;
    href: string;
};

export type NavEntry = MegaGroup | SimpleLink;
