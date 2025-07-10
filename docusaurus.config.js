
// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OpenPaddle',
  tagline: 'The People\'s Pickleball Paddle',
  favicon: 'img/logo.svg',

  url: 'https://open-paddle-project.github.io',
  baseUrl: '/',

  organizationName: 'open-paddle-project',
  projectName: 'hub',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    [
      'docusaurus-plugin-tailwindcss',
      {
        css: {
          path: 'src/css/custom.css',
          applyAppCss: true,
        },
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/open-paddle-project/hub/tree/main/',
        },
        blog: false, // disabling blog
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'OpenPaddle',
        logo: {
          alt: 'OpenPaddle Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'specSidebar',
            position: 'left',
            label: 'Specs',
          },
          {to: '/#why', label: 'Why It Matters', position: 'left'},
          {to: '/#process', label: 'Process', position: 'left'},
          {
            href: 'https://github.com/open-paddle-project/hub',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Specifications',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/open-paddle-project/hub/discussions',
              },
              {
                label: 'Twitter / X',
                href: 'https://x.com/OpenPaddle',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Project GitHub',
                href: 'https://github.com/open-paddle-project/hub',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} OpenPaddle Project. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
          defaultMode: 'light',
          disableSwitch: false,
          respectPrefersColorScheme: true,
      },
    }),
};

export default config;
