// This file contains me global definitions for customize JSXGraph
// import JXG from 'https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.mjs';

// USING a patch version of jsxgraph to support katex macros
import JXG from './jsxgraphcore.mjs';
// import JXG from "jsxgraph"
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

JXG.Options.text.useTemml = true;
JXG.Options.text.temmlMacros = NOTATION;

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


JXG.Options = JXG.merge(JXG.Options, {
  board: {
    showNavigation: false,
    showCopyright: false,
    axis: true,
    keepaspectratio:true,
    defaultAxes: {
        x : {
            name: 'x',
            withLabel: true,
            label: {
                position: 'rt',
                offset: [-10, -15]
            },
            ticks: {
                majorHeight: 5,
            },
        },
        y : {
            withLabel:true,
            name: 'y',
            label: {
                position: 'rt',
                offset: [-20, -10]
            },
            ticks: {
                majorHeight: 5,
            },
      }
    },
    grid: {
      major: {
        face: 'point',
        size: 2
      },
      minor: {
        face: 'point',
        size: 0
      },
      minorElements: 'auto',
      includeBoundaries: false,
    }
  }
});

export default JXG;
