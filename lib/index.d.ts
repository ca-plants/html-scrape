export type Root = import("hast").Root;
export type Element = import("hast").Element;
export type Text = import("hast").Text;

export class scrape {
    static getAttr(element: Element, attName: string): string | undefined;
    static getSubtree(
        ast: Root | Element,
        fnMatch: (element: Element) => boolean,
    ): Element | undefined;
    static getSubtrees(
        element: Root | Element,
        fnMatch: (element: Element) => boolean,
    ): Element[];
    static getTextContent(node: Element | Text): string;
    static parseFile(filePath: string): Root;
}
