// Home page content.
import { paths } from '../routes/paths';
import { clientSectors } from './clients';
import { portfolios } from './portfolios';
import { offices } from './site';

export const heroNews = [
  { text: 'Gp Capt (Retd) MJ Vinod Augustine inducted as ACS Group CEO', tone: 'primary' },
  { text: 'ACS is now ISO 42001 certified for Artificial Intelligence Management System', tone: 'highlight' },
];

export const certifications = [
  { standard: 'ISO 9001:2015', name: 'Quality Management System', href: '/assets/docs/ACS TECHNOLOGIES LIMITED ISO 9001.pdf', label: 'ISO 9001' },
  { standard: 'ISO 20000-1:2018', name: 'IT Service Management', href: '/assets/docs/ACS TECHNOLOGIES LIMITED ISO 20000.pdf', label: 'ISO 20000' },
  { standard: 'ISO 27001:2022', name: 'Information Security Management', href: '/assets/docs/ACS TECHNOLOGIES LIMITED ISO 27001.pdf', label: 'ISO 27001' },
  { standard: 'ISO 42001:2023', name: 'AI Management System', href: '/assets/docs/ACS TECHNOLOGIES LIMITED ISO 42001.pdf', label: 'ISO 42001' },
  {
    standard: 'CMMI Level 3',
    name: 'Software Dev & Services Delivery',
    href: '/assets/docs/CMMI Certificate corrected (1).png',
    label: 'CMMI',
    icon: 'bi-award-fill',
  },
];

export const aboutParagraphs = [
  'In the lifespan of most industries, forty-five years represents steady, measured growth. In Information Technology, it represents something far more extraordinary — a journey through multiple complete reinventions of how the world computes. ACS Technologies has been present through every one of them: the mainframe and minicomputer era, the personal computing revolution, the rise of networked enterprise, the internet transformation, cloud adoption, and now the frontier of Artificial Intelligence and IoT. We have not merely witnessed these shifts — we have delivered solutions across each of them, for some of India\'s most demanding clients in government, defence, and enterprise.',
  'ACS Technologies was incorporated in 1980 by a team of computer scientists and engineers who had built their expertise at institutions that defined the global technology landscape — IBM, Bell Labs, IIM, ECIL, and ASCI. At a time when computing in India was in its infancy, these founders saw not just possibility, but obligation: to build a company that could bring world-class technology capability to Indian organisations. That founding conviction — rigorous expertise, applied boldly — has never changed. Today, listed on both BSE (Scrip Code: 530745) and NSE (Symbol: ACSTECH), with deployments ranging from AI systems for the Indian Armed Forces to geospatial work with ISRO and smart facility platforms across the Gulf, ACS Technologies stands as one of India\'s longest-standing and most trusted independent technology companies.',
];

export const testimonials = [
  {
    icon: 'bi-activity',
    text: 'ACS Technologies revolutionized our IT infrastructure, optimizing our Data Centers and aligning them with cutting-edge trends. Their collaboration with top industry players like IBM and Dell was invaluable',
  },
  {
    icon: 'bi-graph-up-arrow',
    text: 'ACS Technologies transformed our business with their custom software solutions. Their ability to integrate seamlessly with our systems improved our operations significantly. A true game-changer!',
  },
  {
    icon: 'bi-activity',
    text: 'IOTIQ Automations brought our business into the future with their IoT and Smart Analytics. Their solutions have drastically improved our decision-making and customer interactions, fostering growth and innovation.',
  },
];

export const introParagraphs = [
  "Embark on an unparalleled IT adventure with ACS Technologies. Since our inception in 1980 by tech visionaries from IBM and Bell Labs, we've been at the helm of IT innovation. Specializing in bespoke, cloud-based solutions, we seamlessly enhance your operational efficiency.",
  "Our legacy isn't just in technology; it's in building enduring partnerships that navigate the ever-evolving IT terrain. With ACS, step into a future where technology transforms challenges into triumphs.",
];

export const services = [
  {
    tag: 'Software',
    title: 'Software Products',
    image: '/assets/img/home/Web Designing.jpg',
    to: paths.portfolio('software-development'),
    text: 'We pride ourselves on delivering bespoke software applications that are meticulously crafted to meet your specific business needs. Our expertise extends to both Structured and Object-Oriented Analysis, ensuring robust design and implementation across multiple platforms and databases.',
  },
  {
    tag: 'Infrastructure',
    title: 'IT Services',
    image: '/assets/img/home/Server Room.jpg',
    to: paths.portfolio('it-infrastructure'),
    text: 'We specialize in transforming enterprises into IT-centric powerhouses, where every aspect of the infrastructure is streamlined for peak efficiency and performance. Our solutions encompass every facet of the IT landscape, ensuring that your Data Centers are not just up-to-date but ahead of the curve.',
  },
  {
    tag: 'IoT & AI',
    title: 'IoT & Smart Analytics',
    image: '/assets/img/home/Home Control App.jpg',
    to: paths.product('iot-automation'),
    text: 'IOTIQ Automations, a specialised division of ACS Technologies, is at the vanguard of IoT and Smart Analytics innovations. We are dedicated to harnessing the power of interconnected devices and advanced data analytics to revolutionize how businesses operate and thrive.',
  },
];

export const clientLogos = [
  { name: 'Indian Air Force', image: '/assets/img/clients/Indian Airforce.png' },
  { name: 'Indian Army', image: '/assets/img/clients/Indian Army.png' },
  { name: 'Indian Navy', image: '/assets/img/clients/Indian Navy.jpg' },
  { name: 'ITC', image: '/assets/img/clients/ITC.png' },
  { name: 'Mahindra Defence', image: '/assets/img/clients/Mahindra Defence.jpg' },
  { name: 'SBI', image: '/assets/img/clients/SBI.png' },
  { name: 'UH', image: '/assets/img/clients/UH.png' },
  { name: 'Dell', image: '/assets/img/clients/Dell.png' },
];

const clientCount = clientSectors.reduce((total, sector) => total + sector.clients.length, 0);

// Headline figures, derived from the site data so they stay accurate as it changes.
export const stats = [
  { value: new Date().getFullYear() - 1980, suffix: '+', label: 'Years of IT Excellence', icon: 'bi-hourglass-split' },
  { value: Math.floor(clientCount / 10) * 10, suffix: '+', label: 'Clients Served', icon: 'bi-people' },
  { value: portfolios.length, label: 'Service Portfolios', icon: 'bi-grid-3x3-gap' },
  { value: offices.length, label: 'Offices in India & Thailand', icon: 'bi-geo-alt' },
  { value: certifications.length, label: 'ISO & CMMI Certifications', icon: 'bi-patch-check' },
];

// Short card copy for the portfolio grid: the label/icon from the menu plus each page's own headline.
export const portfolioCards = portfolios.map((portfolio) => ({
  slug: portfolio.slug,
  title: portfolio.title.join(' '),
  tagline: portfolio.heading,
  image: portfolio.image,
  to: paths.portfolio(portfolio.slug),
}));
