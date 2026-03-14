export type ProductIntroProps = {
    title: string;
    subtitle?: string;
    badges?: string[];
    images?: string[];
};

export type PriceOption = {
    id: string;
    label: string;
    deltaPriceCents: number;
    default?: boolean;
};

export type PriceBoxProps = {
    basePriceCents: number;
    options?: PriceOption[];
    onAddToWishlist?: (payload: { optionIds: string[] }) => void;
    onConfigure?: (payload: { optionIds: string[] }) => void;
    ctas?: { wishlistLabel?: string; configureLabel?: string };
    stockInfo?: { status: "in_stock" | "preorder" | "oos"; note?: string };
    selected?: string[];
    descriptionHtml: string;
    onSelectedChange?: (ids: string[]) => void;
};

export type Feature = { title: string; description: string; icon?: string };
export type FeaturesTabProps = { features: Feature[] };

export type IncludedItem = { name: string; qty?: number; note?: string; icon?: string };
export type IncludedTabProps = { items: IncludedItem[] };

export type GuideAsset = { label: string; href: string };
export type GuideStep = { title: string; contentHtml: string; assets?: GuideAsset[] };
export type BuildGuideTabProps = { steps: GuideStep[] };

export type ProductPageData = {
    slug: string;
    intro: ProductIntroProps;
    pricing: PriceBoxProps;
    tabs: {
        features: FeaturesTabProps;
        included: IncludedTabProps;
        guide: BuildGuideTabProps;
    };
};
