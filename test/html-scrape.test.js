import { htmlScrape } from "../lib/html-scrape.js";

it("parse", () => {
    const ast = htmlScrape.parseString("<html></html>");
    expect(ast.type).toBe("root");
});

it("getSubtree", () => {
    const ast = htmlScrape.parseString('<html><div id="x"></div></html>');
    const tree = htmlScrape.getSubtree(
        ast,
        (e) => htmlScrape.getAttr(e, "id") === "x",
    );
    if (!tree) {
        throw new Error();
    }
    expect(tree.properties.id).toBe("x");
});

it("getSubtree undefined", () => {
    const ast = htmlScrape.parseString('<html><div id="x"></div></html>');
    const tree = htmlScrape.getSubtree(
        ast,
        (e) => htmlScrape.getAttr(e, "id") === "y",
    );
    expect(tree).toBeUndefined();
});

it("getSubtrees", () => {
    const ast = htmlScrape.parseString(
        '<html><div><p></p></div><div id="x"><p></p><p><div></div>/p></div></html>',
    );
    const tree = htmlScrape.getSubtree(
        ast,
        (e) => htmlScrape.getAttr(e, "id") === "x",
    );
    if (!tree) {
        throw new Error();
    }
    const subtrees = htmlScrape.getSubtrees(tree, (e) => e.tagName === "p");
    expect(subtrees.length).toBe(2);
});

it("getTextContent", () => {
    const ast = htmlScrape.parseString(
        '<html><div id="y">abc <span>def</span></div></html>',
    );
    const element = htmlScrape.getSubtree(
        ast,
        (e) => htmlScrape.getAttr(e, "id") === "y",
    );
    if (!element) {
        throw new Error();
    }
    const text = htmlScrape.getTextContent(element);
    expect(text).toBe("abc def");
});
