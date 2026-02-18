import { ElementContent } from "hast";

export type Root = import("hast").Root;
export type Element = import("hast").Element;
export type Text = import("hast").Text;

export class scrape {
    static getAttr(
        element: ElementContent,
        attName: string,
    ): string | undefined;
    static getSubtree(
        ast: Root | Element,
        fnMatch: (element: Element) => boolean,
    ): Element | undefined;
    static getSubtrees(
        element: Root | Element,
        fnMatch: (element: Element) => boolean,
    ): Element[];
    static getTextContent(node: ElementContent): string;
    static parseFile(filePath: string): Root;
    static parseString(filePath: string): Root;
}
