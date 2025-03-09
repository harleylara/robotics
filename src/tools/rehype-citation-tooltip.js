import {visit} from 'unist-util-visit'
import {find} from 'unist-util-find'

const emptyOptions = {}

// Recursive function to extract text from nodes
function extractText(node) {

  if (node.type === 'text') {
    return node.value; // Return the text value of text nodes
  }

  if (node.children) {
    return node.children
      .map(child => extractText(child)) // Recursively extract text from child nodes
      .join(' '); // Join text with spaces
  }

  return ''; // Return empty string if no text found
}

export default function rehypeCitationTooltip(options) {
  const settings = options || emptyOptions
  return function (tree) {
    visit(tree, 'element', function (node) {

      if (node.tagName === "span" && node.properties?.className?.includes(settings.inlineClass)) {
        // Find child <a> element inside the span
        const anchor = node.children.find(child => child.tagName === 'a');
        if (anchor && anchor.properties.href) {
          const href = anchor.properties.href;

          const cslEntry = find(tree, (n) => n.tagName === 'div' && n.properties.id === href.slice(1))

          const tooltipContent = extractText(cslEntry);

          anchor.properties.title = tooltipContent;
        }
      }
    })
  }
}
