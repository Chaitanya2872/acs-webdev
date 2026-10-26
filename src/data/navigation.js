// Header menu tree. Items with `children` render as dropdowns.
import { paths } from '../routes/paths';

export const portfolioLinks = [
  { label: 'Artificial Intelligence Solutions', to: paths.portfolio('artificial-intelligence-solutions'), icon: 'bi-cpu-fill' },
  { label: 'Custom Software Development', to: paths.portfolio('software-development'), icon: 'bi-code-slash' },
  { label: 'IT Infrastructure', to: paths.portfolio('it-infrastructure'), icon: 'bi-server' },
  { label: 'Security & Surveillance', to: paths.portfolio('security-surveillance'), icon: 'bi-shield-check' },
  { label: 'Geospatial Technologies', to: paths.portfolio('geospatial-technologies'), icon: 'bi-geo-alt-fill' },
  { label: 'Smart Facilities Management', to: paths.portfolio('smart-facilities-management'), icon: 'bi-building' },
  { label: 'Electro Mechanical Projects', to: paths.portfolio('electro-mechanical-projects'), icon: 'bi-lightning-fill' },
  { label: 'Telecom Services', to: paths.portfolio('telecom-services'), icon: 'bi-broadcast-pin' },
  { label: 'Managed Services', to: paths.portfolio('managed-services'), icon: 'bi-headset' },
];

export const mainNav = [
  { label: 'Home', to: paths.home },
  { label: 'Portfolios', children: portfolioLinks },
  {
    label: 'Products',
    children: [
      {
        label: 'Knowledge Solutions',
        children: [
          { label: 'Smart Analytics', to: paths.product('smart-analytics') },
          { label: 'IOT & Automation', to: paths.product('iot-automation') },
          { label: 'Learning and Management', to: paths.product('learning-and-management') },
          { label: 'Document Management', to: paths.product('document-management') },
        ],
      },
      {
        label: 'Business Solutions',
        children: [
          { label: 'Hospitality Management', to: paths.product('hospitality-management') },
          { label: 'Queue Management', to: paths.product('queue-management') },
          { label: 'Visitor Management System', to: paths.product('visitor-management-system') },
          { label: 'Helpdesk Management', to: paths.product('helpdesk-management') },
          { label: 'HRMS', to: paths.product('hrms') },
        ],
      },
    ],
  },
  { label: 'Clients', to: paths.clients },
  {
    label: 'Investors',
    children: [
      { label: 'Board of Directors', to: paths.boardOfDirectors },
      { label: 'Investor Presentations', to: paths.documents('investor-presentations') },
      {
        label: 'Financial Results',
        alignLeft: true,
        children: [
          { label: 'Unaudited', to: paths.documents('unaudited-financial-results') },
          { label: 'Audited', to: paths.documents('audited-financial-results') },
        ],
      },
      { label: 'Annual Reports', to: paths.documents('annual-reports') },
      { label: 'Annual Return', to: paths.documents('annual-return') },
      { label: 'Stock Exchange Filings', to: paths.stockExchangeFilings },
      { label: 'Investor Information', to: paths.investorInformation },
      { label: 'Code Of Conduct', to: paths.documents('code-of-conduct') },
      {
        label: 'Subsidiary Financials',
        children: [
          { label: 'IOTIQ Innovations Pvt Ltd', to: paths.documents('iotiq-financials') },
          { label: 'Innovistas Innovations Pvt Ltd', to: paths.documents('innovistas-financials') },
        ],
      },
      { label: 'MOA & AOA', to: paths.documents('moa-and-aoa') },
    ],
  },
  { label: 'Team', to: paths.team },
  { label: 'Newsletters', to: paths.documents('newsletters') },
  { label: 'Contact', to: paths.contact },
];

export const footerServiceLinks = [
  { label: 'AI Solutions', to: paths.portfolio('artificial-intelligence-solutions') },
  { label: 'Custom Software', to: paths.portfolio('software-development') },
  { label: 'IT Infrastructure', to: paths.portfolio('it-infrastructure') },
  { label: 'Security & Surveillance', to: paths.portfolio('security-surveillance') },
  { label: 'Geospatial Technologies', to: paths.portfolio('geospatial-technologies') },
  { label: 'Smart Facilities', to: paths.portfolio('smart-facilities-management') },
  { label: 'Managed Services', to: paths.portfolio('managed-services') },
];

export const footerInvestorLinks = [
  { label: 'Board of Directors', to: paths.boardOfDirectors },
  { label: 'Investor Presentations', to: paths.documents('investor-presentations') },
  { label: 'Annual Reports', to: paths.documents('annual-reports') },
  { label: 'Financial Results', to: paths.documents('audited-financial-results') },
  { label: 'Shareholding Pattern', to: paths.documents('share-holding-patterns') },
  { label: 'Corporate Governance', to: paths.documents('corporate-governance') },
  { label: 'Investor Information', to: paths.investorInformation },
  { label: 'Code of Conduct', to: paths.documents('code-of-conduct') },
];

// Grouped links on the Stock Exchange Filings page.
export const filingGroups = [
  {
    id: 'financial',
    title: 'Financial Compliance',
    icon: 'bi-bar-chart-line',
    links: [
      ['Share Holding Patterns (SHP)', 'share-holding-patterns'],
      ['Corporate Governance (CG)', 'corporate-governance'],
      ['Integrated Corporate Governance', 'integrated-corporate-governance'],
      ['Related Party Transactions (RPT)', 'related-party-transaction'],
      ['Annual Secretarial Compliance', 'annual-secretarial-compliance'],
      ['Integrated Filing', 'integrated-filing'],
    ],
  },
  {
    id: 'meetings',
    title: 'Board & General Meetings',
    icon: 'bi-calendar-event',
    links: [
      ['Intimation of Board Meetings', 'intimation-of-board-meetings'],
      ['Outcome of Board Meetings', 'outcome-of-board-meetings'],
      ['Intimation of General Meetings', 'intimation-of-general-meeting'],
      ['Outcome of General Meetings', 'outcome-of-general-meetings'],
    ],
  },
  {
    id: 'disclosures',
    title: 'Disclosures & Regulations',
    icon: 'bi-shield-check',
    links: [
      ['Disclosures Under Regulation 30 of LODR', 'regulation-30-disclosures'],
      ['Postal Ballot', 'postal-ballot'],
      ['Closure of Trading Window', 'closure-of-trading-window'],
      ['Others', 'other-filings'],
    ],
  },
  {
    id: 'publications',
    title: 'Publications & Notices',
    icon: 'bi-newspaper',
    links: [
      ['Newspaper Publications', 'newspaper-publications'],
      ['Notices', 'notices'],
      ['Press & Media Releases', 'press-and-media-releases'],
      ['Receipt of Orders', 'receipt-of-orders'],
    ],
  },
].map((group) => ({ ...group, links: group.links.map(([label, slug]) => ({ label, to: paths.documents(slug) })) }));
