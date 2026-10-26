// Single source of truth for URLs, so links never hard-code route strings.

export const paths = {
  home: '/',
  portfolio: (slug) => `/portfolios/${slug}`,
  product: (slug) => `/products/${slug}`,
  documents: (slug) => (slug === 'newsletters' ? '/newsletters' : `/investors/${slug}`),
  boardOfDirectors: '/investors/board-of-directors',
  investorInformation: '/investors/investor-information',
  stockExchangeFilings: '/investors/stock-exchange-filings',
  clients: '/clients',
  team: '/team',
  contact: '/contact',
};
