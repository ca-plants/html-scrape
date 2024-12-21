import { scrape } from "../lib/html-scrape.js";

it("parse", () => {
    const ast = scrape.parseString("<html></html>");
    expect(ast.type).toBe("root");
});

it("getSubtree", () => {
    const ast = scrape.parseString('<html><div id="x"></div></html>');
    const tree = scrape.getSubtree(ast, (e) => scrape.getAttr(e, "id") === "x");
    if (!tree) {
        throw new Error();
    }
    expect(tree.properties.id).toBe("x");
});

it("getSubtree undefined", () => {
    const ast = scrape.parseString('<html><div id="x"></div></html>');
    const tree = scrape.getSubtree(ast, (e) => scrape.getAttr(e, "id") === "y");
    expect(tree).toBeUndefined();
});

it("getSubtrees", () => {
    const ast = scrape.parseString(
        '<html><div><p></p></div><div id="x"><p></p><p><div></div>/p></div></html>',
    );
    const tree = scrape.getSubtree(ast, (e) => scrape.getAttr(e, "id") === "x");
    if (!tree) {
        throw new Error();
    }
    const subtrees = scrape.getSubtrees(tree, (e) => e.tagName === "p");
    expect(subtrees.length).toBe(2);
});

it("getTextContent", () => {
    const ast = scrape.parseString(
        '<html><div id="y">abc <span>def</span></div></html>',
    );
    const element = scrape.getSubtree(
        ast,
        (e) => scrape.getAttr(e, "id") === "y",
    );
    if (!element) {
        throw new Error();
    }
    const text = scrape.getTextContent(element);
    expect(text).toBe("abc def");
});

it("getAttr", () => {
    const ast = scrape.parseString(
        '<html><div id="x" class="ab cd"><div></html>',
    );
    const div = scrape.getSubtree(ast, (e) => scrape.getAttr(e, "id") === "x");
    if (!div) {
        throw new Error();
    }
    expect(scrape.getAttr(div, "class")).toBe("ab cd");
});
