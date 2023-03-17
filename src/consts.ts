export const SITE = {
	title: 'Robotics Notes',
	description: 'A collection of my personal notes.',
	defaultLanguage: 'en-us',
} as const;

export const OPEN_GRAPH = {
	image: {
		src: '../public/banner.png',
		alt:
			'a simple logo, the logo is composed of three figures,' +
            ' on the left a vertical rectangle, in the center a circle and a square below it.'
	},
	twitter: 'harleylara_',
};

export const KNOWN_LANGUAGES = {
	English: 'en',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/harleylara/robotics`;

export const COMMUNITY_INVITE_URL = `https://harleylara.com`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	(typeof KNOWN_LANGUAGE_CODES)[number],
	Record<string, { text: string; link: string }[]>
>;

export const SIDEBAR: Sidebar = {
	en: {
		'Section Header': [
			{ text: 'Introduction', link: 'en/introduction' },
			{ text: 'Page 2', link: 'en/page-2' },
			{ text: 'Page 3', link: 'en/page-3' },
		],
		'Reference': [
            { text: 'Styling', link: 'en/ref' },
            { text: 'Notation', link: 'en/ref-notation' }
        ],
        'ROS': [
            { text: 'ROS Intro', link: 'en/ros-intro'}
        ],
        'Foundamentals': [
            { text: 'Linear Algebra', link: 'en/fnd-linear-algebra'},
            { text: 'Geometry', link: 'en/fnd-geometry'}
        ]
	},
};


// This portion here contain global definition
// for LaTex. provides consistent notation 
// throughout all pages, components and libraries 
// used in this documentation
export const NOTATION: any = {
    "\\bm": "\\boldsymbol{#1}",

    // Vectors
    "\\vzero": "\\bm{0}",
    "\\vone": "\\bm{1}",
    "\\vmu": "\\bm{\\mu}",
    "\\vtheta": "\\bm{\\theta}",
    // general vector definition
    "\\v": "\\bm{#1}",
    "\\va": "\\bm{a}",
    "\\vb": "\\bm{b}",
    "\\vc": "\\bm{c}",
    "\\vd": "\\bm{d}",
    "\\ve": "\\bm{e}",
    "\\vf": "\\bm{f}",
    "\\vg": "\\bm{g}",
    "\\vh": "\\bm{h}",
    "\\vi": "\\bm{i}",
    "\\vj": "\\bm{j}",
    "\\vk": "\\bm{k}",
    "\\vl": "\\bm{l}",
    "\\vm": "\\bm{m}",
    "\\vn": "\\bm{n}",
    "\\vo": "\\bm{o}",
    "\\vp": "\\bm{p}",
    "\\vq": "\\bm{q}",
    "\\vr": "\\bm{r}",
    "\\vs": "\\bm{s}",
    "\\vt": "\\bm{t}",
    "\\vu": "\\bm{u}",
    "\\vv": "\\bm{v}",
    "\\vw": "\\bm{w}",
    "\\vx": "\\bm{x}",
    "\\vy": "\\bm{y}",
    "\\vz": "\\bm{z}",

    // Element of a vector
    "\\evalpha": "\\alpha",
    "\\evbeta": "\\beta",
    "\\evepsilon": "\\epsilon",
    "\\evlambda": "\\lambda",
    "\\evomega": "\\omega",
    "\\evmu": "\\mu",
    "\\evpsi": "\\evpi",
    "\\evsigma": "\\sigma",
    "\\evtheta": "\\theta",
    "\\eva": "a",
    "\\evb": "b",
    "\\evc": "c",
    "\\evd": "d",
    "\\eve": "e",
    "\\evf": "f",
    "\\evg": "g",
    "\\evh": "h",
    "\\evi": "i",
    "\\evj": "j",
    "\\evk": "k",
    "\\evl": "l",
    "\\evm": "m",
    "\\evn": "n",
    "\\evo": "o",
    "\\evp": "p",
    "\\evq": "q",
    "\\evr": "r",
    "\\evs": "s",
    "\\evt": "t",
    "\\evu": "u",
    "\\evv": "v",
    "\\evw": "w",
    "\\evx": "x",
    "\\evy": "y",
    "\\evz": "z",

    // Unit vector
    // general unit vector definition
    "\\unit": "\\hat{#1}",
    "\\uva": "\\unit{a}",
    "\\uvb": "\\unit{b}",
    "\\uvc": "\\unit{c}",
    "\\uvd": "\\unit{d}",
    "\\uvf": "\\unit{f}",
    "\\uvg": "\\unit{g}",
    "\\uvh": "\\unit{h}",
    "\\uvi": "\\unit{i}",
    "\\uvj": "\\unit{j}",
    "\\uvk": "\\unit{k}",
    "\\uvl": "\\unit{l}",
    "\\uvm": "\\unit{m}",
    "\\uvn": "\\unit{n}",
    "\\uvo": "\\unit{o}",
    "\\uvp": "\\unit{p}",
    "\\uvq": "\\unit{q}",
    "\\uvr": "\\unit{r}",
    "\\uvs": "\\unit{s}",
    "\\uvt": "\\unit{t}",
    "\\uvu": "\\unit{u}",
    "\\uvv": "\\unit{v}",
    "\\uvw": "\\unit{w}",
    "\\uvx": "\\unit{x}",
    "\\uvy": "\\unit{y}",
    "\\uvz": "\\unit{z}",

    // Matrix
    "\\mBeta": "\\bm{\\Beta}",
    "\\mPhi": "\\bm{\\Phi}",
    "\\mLambda": "\\bm{\\Lambda}",
    "\\mSigma": "\\bm{\\Sigma}",
    // general matrix definition
    "\\m": "\\bm{#1}",
    "\\mA": "\\bm{A}",
    "\\mB": "\\bm{B}",
    "\\mC": "\\bm{C}",
    "\\mD": "\\bm{D}",
    "\\mE": "\\bm{E}",
    "\\mF": "\\bm{F}",
    "\\mG": "\\bm{G}",
    "\\mH": "\\bm{H}",
    "\\mI": "\\bm{I}",
    "\\mJ": "\\bm{J}",
    "\\mK": "\\bm{K}",
    "\\mL": "\\bm{L}",
    "\\mM": "\\bm{M}",
    "\\mN": "\\bm{N}",
    "\\mO": "\\bm{O}",
    "\\mP": "\\bm{P}",
    "\\mQ": "\\bm{Q}",
    "\\mR": "\\bm{R}",
    "\\mS": "\\bm{S}",
    "\\mT": "\\bm{T}",
    "\\mU": "\\bm{U}",
    "\\mV": "\\bm{V}",
    "\\mW": "\\bm{W}",
    "\\mX": "\\bm{X}",
    "\\mY": "\\bm{Y}",
    "\\mZ": "\\bm{Z}",

    // Tensor
    // general tensor definition
    "\\tens": "\\bm{\\mathsf{#1}}",
    "\\tA": "\\tens{A}",
    "\\tB": "\\tens{B}",
    "\\tC": "\\tens{C}",
    "\\tD": "\\tens{D}",
    "\\tE": "\\tens{E}",
    "\\tF": "\\tens{F}",
    "\\tG": "\\tens{G}",
    "\\tH": "\\tens{H}",
    "\\tI": "\\tens{I}",
    "\\tJ": "\\tens{J}",
    "\\tK": "\\tens{K}",
    "\\tL": "\\tens{L}",
    "\\tM": "\\tens{M}",
    "\\tN": "\\tens{N}",
    "\\tO": "\\tens{O}",
    "\\tP": "\\tens{P}",
    "\\tQ": "\\tens{Q}",
    "\\tR": "\\tens{R}",
    "\\tS": "\\tens{S}",
    "\\tT": "\\tens{T}",
    "\\tU": "\\tens{U}",
    "\\tV": "\\tens{V}",
    "\\tW": "\\tens{W}",
    "\\tX": "\\tens{X}",
    "\\tY": "\\tens{Y}",
    "\\tZ": "\\tens{Z}",

    // Sets
    "\\sA": "\\mathbb{A}",
    "\\sB": "\\mathbb{B}",
    "\\sC": "\\mathbb{C}",
    "\\sD": "\\mathbb{D}",
    "\\sE": "\\mathbb{E}",
    "\\sF": "\\mathbb{F}",
    "\\sG": "\\mathbb{G}",
    "\\sH": "\\mathbb{H}",
    "\\sI": "\\mathbb{I}",
    "\\sJ": "\\mathbb{J}",
    "\\sK": "\\mathbb{K}",
    "\\sL": "\\mathbb{L}",
    "\\sM": "\\mathbb{M}",
    "\\sN": "\\mathbb{N}",
    "\\sO": "\\mathbb{O}",
    "\\sP": "\\mathbb{P}",
    "\\sQ": "\\mathbb{Q}",
    "\\sR": "\\mathbb{R}",
    "\\sS": "\\mathbb{S}",
    "\\sT": "\\mathbb{T}",
    "\\sU": "\\mathbb{U}",
    "\\sV": "\\mathbb{V}",
    "\\sW": "\\mathbb{W}",
    "\\sX": "\\mathbb{X}",
    "\\sY": "\\mathbb{Y}",
    "\\sZ": "\\mathbb{Z}",
}
