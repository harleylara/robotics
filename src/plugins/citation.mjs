import { visit } from "unist-util-visit";

export function citationTransform() {
  return (tree) => {
    visit(tree, 'text', node => {

      // Regular expression to match patterns like [@key1] or [@key1;key2]
      const keyPattern = /\[@([a-zA-Z0-9]+(?:;[a-zA-Z0-9]+)*)\]/g;
      const matches = [...node.value.matchAll(keyPattern)];

      if (matches.length > 0) {
        // Replace matched patterns as desired
        node.type = "hmtl"
        node.value = node.value.replace(keyPattern, (match, keys) => {
          // You can split the keys by semicolon and process them individually
          const keyList = keys.split(';');
          return `<Cite citeKeys="${keyList.join(', ')}">@${keyList.join(' ; ')}</Cite>`;
        });
      }
    })
  };
}
