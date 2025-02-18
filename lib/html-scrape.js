import * as fs from "node:fs";
import { fromHtml } from "hast-util-from-html";
import { visit } from "unist-util-visit";

export class scrape {
    /**
     * @param {import("hast").ElementContent} element
     * @param {string} attName
     * @returns {string|undefined}
     */
    static getAttr(element, attName) {
        if (element.type !== "element") {
            return;
        }
        const value =
            element.properties[attName === "class" ? "className" : attName];
        switch (typeof value) {
            case "number":
                return value.toString();
            case "string":
            case "undefined":
                return value;
            case "object":
                if (value instanceof Array) {
                    return value.join(" ");
                }
                break;
        }
        throw new Error(JSON.stringify(value));
    }

    /**
     * @param {import("hast").Parent} ast
     * @param {function (import("hast").Element):boolean} fnMatch
     * @returns {import("hast").Element|undefined}
     */
    static getSubtree(ast, fnMatch) {
        /**
         * @param {import("hast").Element} element
         * @returns {boolean}
         */
        function visitor(element) {
            if (fnMatch(element)) {
                subtree = element;
                return false;
            }
            return true;
        }

        let subtree;

        visit(ast, "element", visitor);

        return subtree;
    }

    /**
     * @param {import("hast").Parent} ast
     * @param {function (import("hast").Element):boolean} fnMatch
     * @returns {import("hast").Element[]}
     */
    static getSubtrees(ast, fnMatch) {
        /**
         * @param {import("hast").Element} element
         */
        function visitor(element) {
            if (fnMatch(element)) {
                subtrees.push(element);
            }
        }

        /** @type {import("hast").Element[]} */
        const subtrees = [];

        visit(ast, "element", visitor);

        return subtrees;
    }

    /**
     * @param {import("hast").Element|import("hast").Text} node
     * @returns {string}
     */
    static getTextContent(node) {
        let text = "";
        visit(node, "text", (node) => {
            text += node.value;
        });
        return text;
    }

    /**
     * @param {string} filePath
     * @returns {import("hast").Root}
     */
    static parseFile(filePath) {
        return this.parseString(fs.readFileSync(filePath, "utf8"));
    }

    /**
     * @param {string} html
     * @returns {import("hast").Root}
     */
    static parseString(html) {
        return fromHtml(html);
    }
}
