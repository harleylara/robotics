import A from './components/Globals/A.astro';
import InlineCode from './components/Globals/InlineCode.astro';
import Em from './components/Globals/Em.astro';
import H1 from './components/Globals/H1.astro';
import H2 from './components/Globals/H2.astro';
import H3 from './components/Globals/H3.astro';
import H4 from './components/Globals/H4.astro';
import H5 from './components/Globals/H5.astro';
import H6 from './components/Globals/H6.astro';
import Hr from './components/Globals/Hr.astro';
import Img from './components/Globals/Img.astro';
import Ul from './components/Globals/Ul.astro';
import Ol from './components/Globals/Ol.astro';
import Li from './components/Globals/Li.astro';
import Strong from './components/Globals/Strong.astro';
import P from './components/Globals/P.astro';
import Table from './components/Globals/Table.astro';
import Blockquote from './components/Globals/Blockquote.astro';

import CodeBlock from './components/Globals/CodeBlock.astro';

import Equation from './components/Globals/Equation.astro';
import Image from './components/Globals/Image.astro';
import Drawio from './components/Globals/Drawio.astro';
import Definition from './components/Globals/Definition.astro';
import Important from './components/Globals/Important.astro';
import Terminal from './components/Globals/Terminal.astro';
import Think from './components/Globals/Think.astro';
import Shader from './components/Globals/Shader.astro';

import Presentation from './components/Presentations/Presentation.astro';
import Slide from './components/Presentations/Slide.astro';
import OnlyOnSlide from './components/Presentations/OnlyOnSlide.astro';

export const mdxComponents = {
  // Markdown element overrides
  a: A,
  code: InlineCode,
  em: Em,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: Hr,
  img: Img,
  ul: Ul,
  ol: Ol,
  li: Li,
  strong: Strong,
  p: P,
  table: Table,
  blockquote: Blockquote,

  // Replacement for astro-mdx-code-blocks auto-import
  AutoImportedCodeBlock: CodeBlock,

  // Former astro-auto-import globals
  Equation,
  Image,
  Drawio,
  Definition,
  Important,
  Terminal,
  Think,
  Shader,
  Presentation,
  Slide,
  OnlyOnSlide,
};
