// Maps the old static-site file names to their React routes.
import { documentPages } from '../data/investorDocuments';
import { portfolios } from '../data/portfolios';
import { products } from '../data/products';
import { paths } from './paths';

export const legacyRedirects = {
  'index.html': paths.home,
  'clients.html': paths.clients,
  'team.html': paths.team,
  'contact.html': paths.contact,
  'board_of_directors.html': paths.boardOfDirectors,
  'information_of_consultants.html': paths.investorInformation,
  'stock_exchange_filings.html': paths.stockExchangeFilings,
  ...Object.fromEntries(portfolios.map((p) => [p.legacyPath, paths.portfolio(p.slug)])),
  ...Object.fromEntries(products.map((p) => [p.legacyPath, paths.product(p.slug)])),
  ...Object.fromEntries(documentPages.map((p) => [p.legacyPath, paths.documents(p.slug)])),
};
