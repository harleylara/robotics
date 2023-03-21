// This file contains me global definitions for customize JSXGraph
// import JXG from 'https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.mjs';

// USING a patch version of jsxgraph to support katex macros
import JXG from './jsxgraphcore.mjs';
import { NOTATION } from '../consts.ts';

// colors definitions
let dark100 = "#333333";
let dark200 = "#4f4f4f";
let dark300 = "#828282";
let dark400 = "#bdbdbd";
let dark500 = "#e0e0e0";
let dark600 = "#f2f2f2";
let white = "#ffffff";

let highlightColor = dark600;
let baseColor = white;

JXG.Options.text.useKatex = true;
JXG.Options.text.katexMacros = NOTATION;

JXG.Options.axis.strokeColor = baseColor;
JXG.Options.axis.ticks.strokeColor = baseColor;

JXG.Options.label.strokeColor = baseColor;
JXG.Options.label.highlightStrokeColor = highlightColor;

JXG.Options.text.strokeColor = baseColor;
JXG.Options.text.highlightStrokeColor = highlightColor;

JXG.Options.slider.label.strokeColor = baseColor;
JXG.Options.slider.highline.strokeColor = baseColor;
JXG.Options.slider.baseline.strokeColor = highlightColor;
JXG.Options.slider.fillColor = dark300;
JXG.Options.slider.ticks.strokeColor = baseColor;
JXG.Options.slider.strokeColor = baseColor;
JXG.Options.slider.highlightStrokeColor = highlightColor;

JXG.Options.navbar.strokeColor = baseColor;
JXG.Options.navbar.fillColor = dark100;

export default JXG;
