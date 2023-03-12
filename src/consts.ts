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
		'Another Section': [
            { text: 'Page 4', link: 'en/page-4' }
        ],
        'ROS': [
            { text: 'ROS Intro', link: 'en/ros-intro'}
        ]
	},
};

export const NOTATION: any = {
    "\\bm": "\\boldsymbol{#1}",

    // Vectors
    "\\vzero": "\\bm{0}",
    "\\vone": "\\bm{1}",
    "\\vmu": "\\bm{\\mu}",
    "\\vtheta": "\\bm{\\theta}",
    // general vector definition
    "\\v": "\\bm{#1}",

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

    // Matrix
    "\\mBeta": "\\bm{\\Beta}",
    "\\mPhi": "\\bm{\\Phi}",
    "\\mLambda": "\\bm{\\Lambda}",
    "\\mSigma": "\\bm{\\Sigma}",
    // general matrix definition
    "\\m": "\\bm{#1}"
}
