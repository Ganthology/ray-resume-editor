import { Text, View } from "@react-pdf/renderer";

import React from "react";

interface HtmlToPdfOptions {
  fontSize?: number;
  lineHeight?: number;
}

export function parseHtmlToPdf(
  htmlContent: string,
  options: HtmlToPdfOptions = {}
): React.ReactElement[] {
  if (!htmlContent || typeof htmlContent !== "string") {
    return [];
  }

  const { fontSize = 11, lineHeight = 1.4 } = options;

  // Parse HTML string into DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const body = doc.body;

  const elements: React.ReactElement[] = [];
  let elementKey = 0;

  function getTextContent(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (tagName === "strong" || tagName === "b") {
        return getTextContent(node.firstChild || node);
      }

      if (tagName === "em" || tagName === "i") {
        return getTextContent(node.firstChild || node);
      }

      // For other elements, get all text content
      let text = "";
      for (const child of Array.from(node.childNodes)) {
        text += getTextContent(child);
      }
      return text;
    }

    return "";
  }

  function processInlineFormatting(node: Node): React.ReactElement[] {
    const results: React.ReactElement[] = [];

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        results.push(
          <Text key={elementKey++} style={{ fontSize, lineHeight }}>
            {text}
          </Text>
        );
      }
      return results;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      if (tagName === "strong" || tagName === "b") {
        const text = getTextContent(element);
        if (text.trim()) {
          results.push(
            <Text
              key={elementKey++}
              style={{ fontSize, lineHeight, fontWeight: "bold" }}
            >
              {text}
            </Text>
          );
        }
        return results;
      }

      if (tagName === "em" || tagName === "i") {
        const text = getTextContent(element);
        if (text.trim()) {
          results.push(
            <Text
              key={elementKey++}
              style={{ fontSize, lineHeight, fontStyle: "italic" }}
            >
              {text}
            </Text>
          );
        }
        return results;
      }

      // For other elements, process children
      for (const child of Array.from(element.childNodes)) {
        results.push(...processInlineFormatting(child));
      }
    }

    return results;
  }

  function processElement(element: Element): React.ReactElement | null {
    const tagName = element.tagName.toLowerCase();

    switch (tagName) {
      case "p":
        const pText = getTextContent(element);
        if (!pText.trim()) return null;

        const pContent = processInlineFormatting(element);
        if (pContent.length === 0) return null;

        return (
          <View key={elementKey++} style={{ marginBottom: 4 }}>
            {pContent}
          </View>
        );

      case "ul":
        const ulItems: React.ReactElement[] = [];
        const listItems = element.querySelectorAll("li");

        listItems.forEach((li) => {
          const liText = getTextContent(li);
          if (liText.trim()) {
            const liContent = processInlineFormatting(li);
            ulItems.push(
              <View
                key={elementKey++}
                style={{ flexDirection: "row", marginBottom: 2 }}
              >
                <Text style={{ fontSize, width: 10 }}>•</Text>
                <View style={{ flex: 1 }}>{liContent}</View>
              </View>
            );
          }
        });

        if (ulItems.length === 0) return null;

        return (
          <View key={elementKey++} style={{ marginBottom: 4 }}>
            {ulItems}
          </View>
        );

      case "ol":
        const olItems: React.ReactElement[] = [];
        const orderedItems = element.querySelectorAll("li");

        orderedItems.forEach((li, index) => {
          const liText = getTextContent(li);
          if (liText.trim()) {
            const liContent = processInlineFormatting(li);
            olItems.push(
              <View
                key={elementKey++}
                style={{ flexDirection: "row", marginBottom: 2 }}
              >
                <Text style={{ fontSize, width: 15 }}>{index + 1}.</Text>
                <View style={{ flex: 1 }}>{liContent}</View>
              </View>
            );
          }
        });

        if (olItems.length === 0) return null;

        return (
          <View key={elementKey++} style={{ marginBottom: 4 }}>
            {olItems}
          </View>
        );

      case "div":
        const divText = getTextContent(element);
        if (!divText.trim()) return null;

        const divContent = processInlineFormatting(element);
        if (divContent.length === 0) return null;

        return (
          <View key={elementKey++} style={{ marginBottom: 4 }}>
            {divContent}
          </View>
        );

      default:
        return null;
    }
  }

  // Process all direct children of body
  const children = Array.from(body.children);
  for (const element of children) {
    const processedElement = processElement(element);
    if (processedElement) {
      elements.push(processedElement);
    }
  }

  // If no elements were processed, try to parse as plain text
  if (elements.length === 0 && htmlContent.trim()) {
    const plainText = htmlContent.replace(/<[^>]*>/g, "").trim();
    if (plainText) {
      const lines = plainText.split("\n").filter((line) => line.trim());
      return lines.map((line, lineIndex) => (
        <Text key={lineIndex} style={{ fontSize, lineHeight, marginBottom: 2 }}>
          {line.trim()}
        </Text>
      ));
    }
  }

  return elements;
}
