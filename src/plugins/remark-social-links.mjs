import { visit } from "unist-util-visit";

export function remarkSocialLinks() {
  return (tree) => {
    visit(tree, "text", (node) => {
      const youtubeRegex =
        /^https:\/\/(?:www\.youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(?:\S*)?$/;


      const mastodonRegex =
        /^https:\/\/([a-zA-Z0-9.-]+)\/(@[\w-]+\/\d{10,20})$/;


      const threadsRegex =
        /^https:\/\/www\.threads\.net\/(@[\w.]+)\/post\/([A-Za-z0-9_\-]+)(\?.*)?$/;

      const replacementTemplates = {
        youtube: (id) =>
          `<iframe width="560" height="400" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
        mastodon: (domain, id) =>
          `<iframe src="https://${domain}/${id}/embed" class="mastodon-embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script src="https://${domain}/embed.js" async="async"></script>`,
        threads: (user, id) =>
          `<div class="threads-post">
<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.net/${user}/post/${id}" data-text-post-version="0" id="ig-tp-${id}" style=" background:#FFF; border-width: 1px; border-style: solid; border-color: #00000026; border-radius: 16px; max-width:800px; margin: 1px; min-width:270px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"> <a href="https://www.threads.net/${user}/post/${id}" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%; font-family: -apple-system, BlinkMacSystemFont, sans-serif;" target="_blank"> <div style=" padding: 40px; display: flex; flex-direction: column; align-items: center;"><div style=" display:block; height:32px; width:32px; padding-bottom:20px;"> <!--missing svg here--> </div> <div style=" font-size: 15px; line-height: 21px; color: #999999; font-weight: 400; padding-bottom: 4px; "> Post by ${user}</div> <div style=" font-size: 15px; line-height: 21px; color: #000000; font-weight: 600; "> View on Threads</div></div></a></blockquote>
<script async src="https://www.threads.net/embed.js"></script>
</div>`,
      };


      let matches;

      if ((matches = node.value.match(youtubeRegex))) {
        const videoId = matches[1];
        node.type = "html";
        node.value = replacementTemplates.youtube(videoId);
      } else if ((matches = node.value.match(mastodonRegex))) {
        const domain = matches[1],
          id = matches[2];

        node.type = "html";

        node.value = replacementTemplates.mastodon(domain, id);
      } else if ((matches = node.value.match(threadsRegex))) {
        const user = matches[1],
          id = matches[2];
        node.type = "html";
        node.value = replacementTemplates.threads(user, id);
      }
    });

  };

}
