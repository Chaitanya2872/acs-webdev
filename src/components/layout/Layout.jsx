import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import useParallax from '../../hooks/useParallax';
import useReveal from '../../hooks/useReveal';
import useScrollY from '../../hooks/useScrollY';
import useSmoothScroll, { scrollToElement, scrollToY } from '../../hooks/useSmoothScroll';
import GridBackground from '../ui/GridBackground';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  const { pathname, hash } = useLocation();
  const scrollY = useScrollY();
  useSmoothScroll();
  useReveal();
  useParallax();

  // Start each new page at the top, or at the #section it links to.
  useEffect(() => {
    if (hash) {
      scrollToElement(document.getElementById(hash.slice(1)));
    } else {
      scrollToY(0, { immediate: true });
    }
  }, [pathname, hash]);

  useEffect(() => {
    document.body.classList.toggle('scrolled', scrollY > 100);
  }, [scrollY]);

  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

  return (
    <>
      <GridBackground fixed />
      <div id="acs-scroll-progress" style={{ width: `${progress}%` }} />
      <Header />
      <main className="main">
        <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <div key={pathname} className="page-transition">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <Footer />
      <a
        href="#top"
        className={`scroll-top d-flex align-items-center justify-content-center${scrollY > 100 ? ' active' : ''}`}
        aria-label="Back to top"
        onClick={(e) => {
          e.preventDefault();
          scrollToY(0);
        }}
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </>
  );
}
