import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';

// Inner pages are split into their own chunks so the home page loads only what it needs.
const BoardOfDirectorsPage = lazy(() => import('./pages/BoardOfDirectorsPage'));
const ClientsPage = lazy(() => import('./pages/ClientsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const DocumentListPage = lazy(() => import('./pages/DocumentListPage'));
const InvestorInformationPage = lazy(() => import('./pages/InvestorInformationPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const StockExchangeFilingsPage = lazy(() => import('./pages/StockExchangeFilingsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="portfolios/:slug" element={<PortfolioPage />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="clients" element={<ClientsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="newsletters" element={<DocumentListPage slug="newsletters" />} />
        <Route path="investors">
          <Route path="board-of-directors" element={<BoardOfDirectorsPage />} />
          <Route path="investor-information" element={<InvestorInformationPage />} />
          <Route path="stock-exchange-filings" element={<StockExchangeFilingsPage />} />
          <Route path=":slug" element={<DocumentListPage />} />
        </Route>
        {/* Unknown paths, including old *.html links, are resolved (or 404'd) here. */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
