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
