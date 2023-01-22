interface BaseSectionDataItem {
    readonly title: string;
    readonly description: string;
    readonly image: string;
}

interface VideoDataItem extends BaseSectionDataItem {
    readonly video: string;
};

interface CodeDataItem extends BaseSectionDataItem {
    readonly code: string;
};

interface WebsiteDataItem extends BaseSectionDataItem {
    readonly link: string;
};

type SectionDataId = "animation" | "apps" | "drawing" | "games" | "websites";

type SectionDataItem = VideoDataItem | CodeDataItem | WebsiteDataItem | BaseSectionDataItem;

interface SectionData {
    readonly id: SectionDataId;
    readonly data: SectionDataItem[];
}