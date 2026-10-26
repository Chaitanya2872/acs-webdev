// Investor document listing pages, rendered by pages/DocumentListPage.jsx.
// Filings are published from the document portal (stored in S3, served via the portal's public API) and
// appear here without a website deploy. These bundled lists are:
//   - the fallback shown when VITE_DOCUMENTS_API_URL is unset or the API cannot be reached, and
//   - the source the portal's legacy migration imported the existing filings from.
// Do not add new filings here; upload them in the portal. Each page's slug must match a portal category.

export const documentPages = [
  {
    slug: 'annual-reports',
    title: 'Annual Reports',
    legacyPath: 'annual_reports.html',
    documents: [
      { title: 'Annual Report 2026', href: '/assets/docs/Annual Reports/Annual Report 2026.pdf', type: 'pdf' },
      { title: 'Annual Report 2025', href: '/assets/docs/Annual Reports/Annual Report 2025.pdf', type: 'pdf' },
      { title: 'Annual Report 2024', href: '/assets/docs/Annual Reports/Annual Report 2024.pdf', type: 'pdf' },
      { title: 'Annual Report 2023', href: '/assets/docs/Annual Reports/Annual Report 2023.pdf', type: 'pdf' },
    ],
  },
  {
    slug: 'annual-return',
    title: 'Annual Return',
    legacyPath: 'annual_return.html',
    documents: [
      { title: 'Annual Return_Form_2025_ACS', href: '/assets/docs/Annual Return/AC0272634.pdf', type: 'pdf' },
      {
        title: 'Annual Return_Form_2024_ACS',
        href: '/assets/docs/Annual Return/Annual Return_2024_ACS.pdf',
        type: 'pdf',
      },
      {
        title: 'Annual Return_Form_2023_ACS',
        href: '/assets/docs/Annual Return/Annual Return_ 2023_ACS.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'annual-secretarial-compliance',
    title: 'Annual Secretarial Compliance',
    legacyPath: 'annual_secreterial_compliance.html',
    documents: [
      {
        title: 'Annual Secretarial Compliance Report 2025-26',
        href: '/assets/docs/Annual Secreterial Compliance/ASCR_ACS_2025-26_merged (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Annual Secretarial Compliance Report_2024-25',
        href: '/assets/docs/Annual Secreterial Compliance/Annual Secretarial Compliance Report_2024-25.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliances-Reg.24(A)-Annual Secretarial Compliance 31st March 2024',
        href: '/assets/docs/Annual Secreterial Compliance/Compliances-Reg.24(A)-Annual Secretarial Compliance_31March 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliances-Reg.24(A)-Annual Secretarial Compliance 31st March 2023',
        href: '/assets/docs/Annual Secreterial Compliance/Compliances-Reg.24(A)-Annual Secretarial Compliance 31st March 2023.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'audited-financial-results',
    title: 'Audited Financial Results',
    legacyPath: 'audited_financial_results.html',
    documents: [
      {
        title: 'Audited Financials Results 2025-26',
        href: '/assets/docs/Financial Results/OUTCOME WITH RESULTS.pdf',
        type: 'pdf',
      },
      {
        title: 'Audited Financial Results 2024-25',
        href: '/assets/docs/Financial Results/Audited Financial Results 2024-25.pdf',
        type: 'pdf',
      },
      {
        title: 'Audited Financials Results 31 March 2024',
        href: '/assets/docs/Financial Results/Audited financial result 31 march 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Audited Financial Results 31 March 2023',
        href: '/assets/docs/Financial Results/Audited Financial Results 31 March 2023.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'closure-of-trading-window',
    title: 'Closure of Trading Window',
    legacyPath: 'closure_of_trading_window.html',
    documents: [
      {
        title: 'Closure of trading window 30th Jun 2026',
        href: '/assets/docs/closure of trading window/Closure of trading window 30th Jun 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure of Trading Window - 30th Sep 2026',
        href: '/assets/docs/closure of trading window/Closure of trading window 30th Sep 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure of Trading Window 31st Mar 2026',
        href: '/assets/docs/closure of trading window/Closure of Trading Window 31st Mar 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure of Trading Window 31st Dec 2025',
        href: '/assets/docs/closure of trading window/Closure trading window 31st December 2025.pdf.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure of Trading Window 29th Sep 2025',
        href: '/assets/docs/closure of trading window/Closure of Trading Window 29th September, 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure of Trading Window 30th June 2025',
        href: '/assets/docs/closure of trading window/Closure of Trading Window_30 June 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Closure Window 31st March 2025',
        href: '/assets/docs/closure of trading window/Intimation of Closure Window 31st March 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure Window 31 December 2024',
        href: '/assets/docs/closure of trading window/Closure window 31 december 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure Window 30 September 2024',
        href: '/assets/docs/closure of trading window/Closure window 30 september 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure Window 30 June 2024',
        href: '/assets/docs/closure of trading window/closure window 30 June 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure Window 31 March 2024',
        href: '/assets/docs/closure of trading window/Closure window 31 March 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure Window 31 December 2023',
        href: '/assets/docs/closure of trading window/Closure window 31 December 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure Window 30 September 2023',
        href: '/assets/docs/closure of trading window/Closure Window 30 september 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure Window 30 June 2023',
        href: '/assets/docs/closure of trading window/Closure window 30 June 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Closure Window 31 March 2023',
        href: '/assets/docs/closure of trading window/Closure Window 31 March 2023.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'code-of-conduct',
    title: 'Code of Conduct',
    legacyPath: 'code_of_conduct.html',
    documents: [
      {
        title: 'Details of familirazation programme to independent director FY2025-26',
        href: '/assets/docs/Code of Conduct/FAMILIARISATION PROGRAMME FOR INDEPENDENT DIRECTORS FY 2025-26.pdf',
        type: 'pdf',
      },
      {
        title: 'Details of familirazation programme to independent director',
        href: '/assets/docs/Code of Conduct/Details of familirazation programme to independent director.pdf',
        type: 'pdf',
      },
      {
        title: 'Terms and Conditions of appointment of Independent director',
        href: '/assets/docs/Code of Conduct/Terms and Conditions of appointment of Independent director.pdf',
        type: 'pdf',
      },
      {
        title: 'Code of Conduct of Board & Sr Managment',
        href: '/assets/docs/Code of Conduct/Code of Conduct of Board & Sr Managment.pdf',
        type: 'pdf',
      },
      {
        title: 'Names and Contact details of Key Managerial Personnel',
        href: '/assets/docs/Code of Conduct/Names and Contact details of Key Managerial Personnel.pdf',
        type: 'pdf',
      },
      {
        title: 'Remuneration policy of non excuetive directors',
        href: '/assets/docs/Code of Conduct/Remuneration policy of non excuetive directors.pdf',
        type: 'pdf',
      },
      { title: 'Policy on RPT', href: '/assets/docs/Code of Conduct/Policy on RPT.pdf', type: 'pdf' },
      { title: 'ARCHIVAL POLICY(1)', href: '/assets/docs/Code of Conduct/ARCHIVAL POLICY(1).pdf', type: 'pdf' },
      {
        title: 'BOD PERFORMANCE EVALUATION POLICY(1)',
        href: '/assets/docs/Code of Conduct/BOD PERFORMANCE EVALUATION POLICY(1).pdf',
        type: 'pdf',
      },
      {
        title: 'CODE FOR INDEPENDENTDIRECTORS(1)',
        href: '/assets/docs/Code of Conduct/CODE FOR INDEPENDENTDIRECTORS(1).pdf',
        type: 'pdf',
      },
      {
        title: 'CODE OF CONDUCT OF INSIDER TRADING',
        href: '/assets/docs/Code of Conduct/CODE OF CONDUCT OF INSIDER TRADING.pdf',
        type: 'pdf',
      },
      {
        title: 'CODE OF PRACTICE FOR FAIR DISCLOSURE OF UPPSI(1)',
        href: '/assets/docs/Code of Conduct/CODE OF PRACTICE FOR FAIR DISCLOSURE OF UPPSI(1).pdf',
        type: 'pdf',
      },
      {
        title: 'NOMINATION AND REMUNERATION POLICY(1)',
        href: '/assets/docs/Code of Conduct/NOMINATION AND REMUNERATION POLICY(1).pdf',
        type: 'pdf',
      },
      {
        title: 'Policy on determination on materiality of events',
        href: '/assets/docs/Code of Conduct/Policy on determination on materiality of events.pdf',
        type: 'pdf',
      },
      {
        title: 'Policy for determining the Material subsdiary',
        href: '/assets/docs/Code of Conduct/Policy for determining the Material subsdiary.pdf',
        type: 'pdf',
      },
      {
        title: 'POLICY OF PRESERVATION OF RECORDS(1)',
        href: '/assets/docs/Code of Conduct/POLICY OF PRESERVATION OF RECORDS(1).pdf',
        type: 'pdf',
      },
      {
        title: 'POLICY OF PREVENTION OF SEXUAL HARASSMENT(1)',
        href: '/assets/docs/Code of Conduct/POLICY OF PREVENTION OF SEXUAL HARASSMENT(1).pdf',
        type: 'pdf',
      },
      {
        title: 'WHISTLEBLOWER POLICY(1)',
        href: '/assets/docs/Code of Conduct/WHISTLEBLOWER  POLICY(1).pdf',
        type: 'pdf',
      },
      {
        title: 'Name change Disclosure',
        href: '/assets/docs/Code of Conduct/Name change Disclosure.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'corporate-governance',
    title: 'Corporate Governance',
    legacyPath: 'corporate_governance.html',
    documents: [
      {
        title: 'Integrated Corporate Governance report 31 Mar 2026',
        href: '/assets/docs/Corporate governence/ICG_MAR_2026_REPORT.html',
        type: 'html',
      },
      {
        title: 'Integrated Corporate Governance report 31 Dec 2025',
        href: '/assets/docs/Corporate governence/ICG_31_12_2025_REPORT.html',
        type: 'html',
      },
      {
        title: 'Integrated Corporate Governance report 30 Sep 2025',
        href: '/assets/docs/Corporate governence/Integrated Governance_September 30 2025_Report.html',
        type: 'html',
      },
      {
        title: 'Integrated Corporate Governance report 30 Jun 2025',
        href: '/assets/docs/Corporate governence/Integrated Governance_June_30 2025_Report.html',
        type: 'html',
      },
      {
        title: 'Integrated Corporate Governance report 31 Mar 2025',
        href: '/assets/docs/Corporate governence/Integrated Governance_March_31_2025_Report.html',
        type: 'html',
      },
      {
        title: 'Corporate Governance report 31 December 2024',
        href: '/assets/docs/Corporate governence/Corporate governance Dec 2024.html',
        type: 'html',
      },
      {
        title: 'Corporate Governance report 30 September 2024',
        href: '/assets/docs/Corporate governence/Corporate Acs 30 September 2024.html',
        type: 'html',
      },
      {
        title: 'Corporate Governance Report 31 st March 2024',
        href: '/assets/docs/Corporate governence/Corporate Governance Report 31 st March 2024.html',
        type: 'html',
      },
      {
        title: 'Corporate Governance report 31 December 2023',
        href: '/assets/docs/Corporate governence/Corporate Governance report 31 December 2023.html',
        type: 'html',
      },
      {
        title: 'Corporate Governance report 30 September 2023',
        href: '/assets/docs/Corporate governence/Corporate Governance report 30 September 2023.html',
        type: 'html',
      },
      {
        title: 'Corporate Governance report 30 june 2023',
        href: '/assets/docs/Corporate governence/Corporate Governance report 30 june 2023.html',
        type: 'html',
      },
    ],
  },
  {
    slug: 'regulation-30-disclosures',
    title: 'Disclosures Under Regulation 30 of LODR',
    legacyPath: 'disclosures_under-regulation_30_of_lodr.html',
    documents: [
      {
        title: 'Announcement under Regulation 30 (LODR) - Letter to Selected Shareholders 07th Sep 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Anouncement_under_regulation_30_Letter_to_selected_shareholders_07_09_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) - Outcome of General Meeting 03rd Sep 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome_03_09_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 02nd Sep 2026',
        href: '/assets/docs/News paper publication/Notice_Pre_dispatch_Newspaper_disclosure.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30(LODR) 14th Aug 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR 14th Aug 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 13th Aug 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting - 13 August 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) - Trading Approval 05th Aug 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 (LODR)-Trading approval-05 aug 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 04th Aug 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome of BM.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 03rd Jul 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting 03.07.2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 25th Jun 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 (LODR) 25th June, 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 23rd Jun 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 (LODR) 23rd June, 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 17th June, 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Draft investors meet.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 28th May 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/OUTCOME WITH RESULTS.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 31st Mar 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Press Release Mar 31 2026- Exclusive agreement with Tahaluf Al Emarat.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 20th Mar 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 (LODR) 20 MAR 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 27th Feb 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Outcome_Reg 30-Corporate Guarantee_signed.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 13th Feb 2026',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Outcome final.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 1st Dec 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Outcome 1_12_2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR) 14th Nov 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Half Yearly Outcome.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation Of Receipt Of An Award 11th Nov 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/ACS appreciation letter final.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30(LODR) 24th Sep 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Regulation 30, 24th September, 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30(LODR) 8th Sep 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Disclosure under regulation 30 - 08.09.2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30(LODR) 26h Aug 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Disclosure under regulation 30 26-08.2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30(LODR)_14th Aug 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 (LODR)-Award_of_Order_Receipt_of_Order.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30_13th Aug 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30_28th May 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under  Regulation 30_28th May 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement Under Regulation 30(LODR)_9th May 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement Under Regulation 30(LODR)_9th May 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement Under Regulation 30(LODR)_7th May 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement Under Regulation 30(LODR)_7th May 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement Under Regulation 30(LODR)_1st May 2025',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement Under Regulation 30(LODR)_1st May 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 31st December 2024',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_31st December 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 14th November 2024',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_14th November 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 15th June 2024_Document1',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_15th June 2024_Document1.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 15th June 2024_Document2',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_15th June 2024_Document2.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 20th March 2024',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_20 March 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 6th March 2024',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_6th March 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 22nd January 2024',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_22nd January 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 7th December 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_7th December 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 10th November 2023_Document1',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_10th November 2023 Document 1.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 10th November 2023_Document2',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_10th November 2023_Document 2.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 4th November 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_4th November 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 20th October 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_20th October 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 6th September 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_6th September 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 24th August 2023_Document1',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_24th August 2023_Document 1.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 24th August 2023_Document2',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_24th August 2023_Document 2.pdf',
        type: 'pdf',
      },
      {
        title: 'Matters Relating to Appointment Of Managing Director Whole Time Director 31st May 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Matters Relating To Appointment Of Managing Director Whole Time Director. 31st May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 31st May 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_31st May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 18th May 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_18th May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR)-Change in Corporate Office Address 6th May 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 (LODR)-Change in Corporate Office Address 6th May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR)-Change in Directorate 6th May 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 (LODR)-Change in Directorate 6th May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 LODR 6th May 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 LODR_6th May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Announcement under Regulation 30 (LODR)-Change in Directorate 4th May 2023_Document1',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Announcement under Regulation 30 (LODR)-Change in Directorate 4th May 2023 Document 1.pdf',
        type: 'pdf',
      },
      {
        title: 'Appointment of Compliance officer and company secretary 10th April 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Appointment of Compliance officer and company secretary 10 April 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Corporate Insolvency Resolution Process (CIRP) 6th April 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Corporate Insolvency Resolution Process (CIRP)-Updates - Corporate Insolvency Resolution Process (CIRP) 6th April 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Disclosure Of Additional Details Required For Corporate Announcement Filed Under Regulation 30 Of SEBI (LODR) Regulations, 2015 27th February 2023',
        href: '/assets/docs/Announcement under Regulation 30 LODR/Disclosure Of Additional Details Required For Corporate Announcement Filed Under Regulation 30 Of SEBI (LODR) Regulations, 2015_27th February 2023.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'innovistas-financials',
    title: 'Innovistas Innovations Pvt Ltd - Subsidiary Financials',
    legacyPath: 'innovista_financials.html',
    documents: [
      {
        title: 'Financials - INNOVISTA (FY 2025-26)',
        href: '/assets/docs/Subsdiary Financials/Financials-INNOVISTA-FY 2025-26.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'integrated-corporate-governance',
    title: 'Integrated Corporate Governance',
    legacyPath: 'integrated_corporate_governance.html',
    documents: [
      {
        title: 'IGR_FINAL_30JUNE2025_REPORT',
        href: '/assets/docs/Integrated corporate governance/IGR_FINAL_30JUNE2025_REPORT.html',
        type: 'html',
      },
      {
        title: 'REPORT_ICG_31MAR_FINAL',
        href: '/assets/docs/Integrated corporate governance/REPORT_ICG_31MAR_FINAL.html',
        type: 'html',
      },
    ],
  },
  {
    slug: 'integrated-filing',
    title: 'Integrated Filing',
    legacyPath: 'integrated_filling.html',
    documents: [
      {
        title: 'Integrated filling 30th September 2025',
        href: '/assets/docs/Integrated Filling/Half Yearly Outcome (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Integrated filling 31st December 2024',
        href: '/assets/docs/Integrated Filling/Integrated filling_31st December 2024.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'intimation-of-board-meetings',
    title: 'Intimation of Board Meetings',
    legacyPath: 'intimation_of_board_meetings.html',
    documents: [
      {
        title: 'Intimation of Board Meeting to be held on 3rd Sep 2026',
        href: '/assets/docs/Intimation of Board Meetings/Intimation_for_31_08_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of board meeting on 13th Aug 2026',
        href: '/assets/docs/Intimation of Board Meetings/BM intimation 13th August, 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of board meeting on 4th Aug 2026',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of BM_ACS Technologies.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of board meeting on 28th May 2026',
        href: '/assets/docs/Intimation of Board Meetings/Intimation for 28.05.2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of board meeting on 13th Feb 2026',
        href: '/assets/docs/Intimation of Board Meetings/ACS LETTER HEAD  (3).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of board meeting on 14th Nov 2025',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board Meeting on 14th November, 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of board meeting on 22nd Sep 2025',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of 22nd September, 2025 Board meeting.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of board meeting on 1st Sep 2025',
        href: '/assets/docs/Intimation of Board Meetings/board meeting intimation 01Sep2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of board meeting on 13th AUG',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of board meeting on 13th AUG.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board meeting 28th May 2025',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board meeting _28 May 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 4th February 2025',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board Meeting 4th February 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 6th November 2024',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board Meeting 6th November 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 29th July 2024',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board meeting 29th July 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 20th May 2024',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board meeting 20th May 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 16th March 2024',
        href: '/assets/docs/Intimation of Board Meetings/Intimation ofBoard Meeting 16th March 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 23rd February 2024',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of board Meeting 23rd February 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 2nd February 2024',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board Meeting 2nd February 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 29th August 2023',
        href: '/assets/docs/Intimation of Board Meetings/Intimation ofBoard Meeting 29th August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 8th August 2023',
        href: '/assets/docs/Intimation of Board Meetings/Intimation ofBoard Meeting 8th August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 7th August 2023',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board Meeting 7th August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 4th August 2023',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board Meeting 4th August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 23rd May 2023',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board Meeting 23th  May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Board Meeting 12th May 2023',
        href: '/assets/docs/Intimation of Board Meetings/Intimation of Board Meeting 12th May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Monitoring Committee Meeting 10th April 2023',
        href: '/assets/docs/Intimation of Board Meetings/Intimation Of 1St Monitoring Committee Meeting 10th April 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Postponment 6th Meeting 25th November 2022',
        href: '/assets/docs/Intimation of Board Meetings/Postponment 6th Meeting COC_25th November 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of 6th Meeting 22nd November 2022',
        href: '/assets/docs/Intimation of Board Meetings/6th Meeting COC_22nd November 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of 5th Meeting 9th November 2022',
        href: '/assets/docs/Intimation of Board Meetings/5th Meeting COC_9th November 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of 4th Meeting 7th October 2022',
        href: '/assets/docs/Intimation of Board Meetings/4th Meeting COC_7th October 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of 3rd Meeting 19th September 2022',
        href: '/assets/docs/Intimation of Board Meetings/3rd Meeting COC_19th September 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of 2nd Meeting 20th August 2022',
        href: '/assets/docs/Intimation of Board Meetings/2nd Meeting COC_20th August 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of 1st Meeting 1st August 2022',
        href: '/assets/docs/Intimation of Board Meetings/1st Meeting COC_ 1st August 2022.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'intimation-of-general-meeting',
    title: 'Intimation of General Meetings',
    legacyPath: 'intimation_of_general_meeting.html',
    documents: [
      {
        title: 'Intimation of 33rd AGM to be held on 30th Sep 2026',
        href: '/assets/docs/Notices/Notice_of_33rd_AGM.pdf',
        type: 'pdf',
      },
      {
        title: 'Update on Notice of EGM_15th October 2025',
        href: '/assets/docs/Intimation of General Meeting/Update on Notice of Extraordinary General Meeting held on 15th October, 2025..pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of AGM_12th September 2024',
        href: '/assets/docs/Intimation of General Meeting/Intimation of AGM_12th September 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of EGM on 15th Oct 2025',
        href: '/assets/docs/Intimation of General Meeting/EGM_Notice-15-Oct-2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Corrigendum to Intimation of EGM on 15th Oct 2025',
        href: '/assets/docs/Intimation of General Meeting/EGM_Notice - Corrigendum Revised Final-2-6.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'investor-presentations',
    title: 'Investor Presentations',
    legacyPath: 'investor_presentations.html',
    documents: [
      {
        title: 'Investors Meet presentation of ACS - 23-Jun-2026',
        href: '/assets/docs/presentations/ACS_Technologies_TechAndBusinessRoadmap_22_Jun_1745H.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'moa-and-aoa',
    title: 'MOA & AOA',
    legacyPath: 'moa_&_aoa.html',
    documents: [
      { title: 'AOA Amended Compressed', href: '/assets/docs/MOA_AOA/AOA_Amended_compressed.pdf', type: 'html' },
      { title: 'MOA Amended', href: '/assets/docs/MOA_AOA/MOA updated and stamped.pdf.pdf', type: 'html' },
    ],
  },
  {
    slug: 'newsletters',
    title: 'Newsletters',
    legacyPath: 'newsletters.html',
    documents: [
      {
        title: 'CMD\'s Newsletter - August 2024',
        href: '/assets/docs/Newsletters/ACS NEWSLETTER AUG \'24 EDITION.pdf',
        type: 'pdf',
      },
      {
        title: 'CMD\'s Newsletter - December 2023',
        href: '/assets/docs/Newsletters/ACS_Newsletter_December23.pdf',
        type: 'pdf',
      },
      {
        title: 'CMD\'s Newsletter - October 2023',
        href: '/assets/docs/Newsletters/ACS_NewsletterOct23.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'newspaper-publications',
    title: 'Newspaper Publications',
    legacyPath: 'newspaper_publications.html',
    documents: [
      {
        title: 'Newspaper Publication 07th Sep 2026',
        href: '/assets/docs/News paper publication/Newspaper_publication_07_09_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper publication pre dispatch notice of AGM to be held on 30th Sep 2026',
        href: '/assets/docs/News paper publication/Notice_Pre_dispatch_Newspaper_disclosure.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication for Q1 FY2026-27 Unaudited Financial Results 14th Aug 2026',
        href: '/assets/docs/News paper publication/Newspaper publication Q1 FY2026-27 14th Aug 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication confirming dispatch of Postal Ballot Notice 05th Aug 2026',
        href: '/assets/docs/News paper publication/Newspaper publication Postal Ballot Notice Dispatch 05th Aug 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication for Q4 and financial year ended 31st Mar 2026 Audited Financial Results - 29th May 2026',
        href: '/assets/docs/News paper publication/Newspaper publication.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication for Q3 Unaudited Financial Results 14th Feb 2026',
        href: '/assets/docs/News paper publication/newspaper cover letter with results.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication for Q2 Unaudited Financial Results 15th Nov 2025',
        href: '/assets/docs/News paper publication/Unaudited Result SEPTEMBER 30 2025 Newspaper publication.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper publications Corrigrendum to EGM Notice for 15 Oct 2025',
        href: '/assets/docs/News paper publication/Newspaper publication of Corriegendum.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 25th Sep 2025',
        href: '/assets/docs/News paper publication/Newspaper Publication 25th September, 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper publications Post Dispatch 08 Sep 2025',
        href: '/assets/docs/News paper publication/Newspaper publication post dispatch - 08.09.2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper publications Pre Dispatch 03 Sep 2025',
        href: '/assets/docs/News paper publication/Newspaper publication pre dispatch - 03.09.2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper publications 13th Aug 2025',
        href: '/assets/docs/News paper publication/News Paper Publication 13.08.2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper publications 30th May 2025',
        href: '/assets/docs/News paper publication/Newspaper publications_30th May 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 13th February 2025',
        href: '/assets/docs/News paper publication/Newspaper Publication 13th February 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 10th January 2025',
        href: '/assets/docs/News paper publication/-Newspaper Publication 10th January 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 16th November 2024',
        href: '/assets/docs/News paper publication/Newspaper Publication_16th November 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 11th September 2024',
        href: '/assets/docs/News paper publication/Newspaper Publication 11th September 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 7th August 2024',
        href: '/assets/docs/News paper publication/Newspaper Publication 7th August 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 30th May 2024',
        href: '/assets/docs/News paper publication/Newspaper Publication_30th May 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 14th February 2024',
        href: '/assets/docs/News paper publication/Newspaper Publication_14th February 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 11th November 2023',
        href: '/assets/docs/News paper publication/Newspaper Publication_11th November 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 7th September 2023',
        href: '/assets/docs/News paper publication/Newspaper Publication_7th September 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 17th August 2023',
        href: '/assets/docs/News paper publication/Newspaper Publication_17th August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Newspaper Publication 1st June 2023',
        href: '/assets/docs/News paper publication/Newspaper Publication 1st June 2023.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'notices',
    title: 'Notices',
    legacyPath: 'notices.html',
    documents: [
      {
        title: 'Notice of 33rd Annual General Meeting',
        href: '/assets/docs/Notices/Notice_of_33rd_AGM.pdf',
        type: 'pdf',
      },
      { title: 'Postal Ballot Notice 4th August 2026', href: '/assets/docs/Notices/sd merged.pdf', type: 'pdf' },
      {
        title: 'Postal Ballot Notice 9th January 2025',
        href: '/assets/docs/Notices/Postal Ballot Notice_9th January 2025.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'outcome-of-board-meetings',
    title: 'Outcome of Board Meetings',
    legacyPath: 'outcome_of_board_meetings.html',
    documents: [
      {
        title: 'Outcome of Board Meeting 03 Sep 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome_03_09_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 13 Aug 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting - 13 August 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting of 04 Aug 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome of BM.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting of 03 Jul 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting 03.07.2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Revised Outcome of Board Meeting 25th Jun 2026',
        href: '/assets/docs/Outcome of board meetings/Revised Outcome of Board Meeting 25th Jun 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 25th Jun 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting 25th Jun 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 28th May 2026',
        href: '/assets/docs/Outcome of board meetings/OUTCOME WITH RESULTS.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 27 Feb 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome_Reg 30-Corporate Guarantee_signed.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 13 Feb 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome final (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 1 Dec 2025',
        href: '/assets/docs/Outcome of board meetings/Outcome 1_12_2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 14 Nov 2025',
        href: '/assets/docs/Outcome of board meetings/Half Yearly Outcome.pdf',
        type: 'pdf',
      },
      {
        title: 'Revised Outcome of Board meeting 22 Sep 2025',
        href: '/assets/docs/Outcome of board meetings/Revised Outcome of 22nd September 2025 Board meeting.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board meeting 22 Sep 2025',
        href: '/assets/docs/Outcome of board meetings/Outcome of 22nd September, 2025 Board meeting.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board meeting 01 Sep 2025',
        href: '/assets/docs/Outcome of board meetings/board meeting outcome 01Sep2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board meeting 26 Aug 2025',
        href: '/assets/docs/Outcome of board meetings/Board Meeting Outcome 26Aug2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board meeting 13 Aug 2025',
        href: '/assets/docs/Outcome of board meetings/Outcome of board meeting 13.08.2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board meeting Revised_28 May 2025',
        href: '/assets/docs/Outcome of board meetings/Board Outcome _Revised_28 May 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 28th May 2025',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board meeting 28th May 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board meeting 28 February 2025',
        href: '/assets/docs/Outcome of board meetings/outcome of Baord meeting 28 February 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 12th February 2025',
        href: '/assets/docs/Outcome of board meetings/outcome of Board Meeting 12th February 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 7th January 2025',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting 7th January 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 14th November 2024',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting 14th November 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 5th August 2024',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meetin 5th August 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 30th May 2024',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting 30 May 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 20th March 2024',
        href: '/assets/docs/Outcome of board meetings/outcome 20th March 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 28th February 2024',
        href: '/assets/docs/Outcome of board meetings/outcome 28th February 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 13th February 2024',
        href: '/assets/docs/Outcome of board meetings/Outcome of the Board Meeting 13th February 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 10th November 2023 part-1',
        href: '/assets/docs/Outcome of board meetings/outcome 10th November 2023 part1.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 10th November 2023 Part-2',
        href: '/assets/docs/Outcome of board meetings/outcome 10th November 2023 Part 2.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 10th November 2023 part-3',
        href: '/assets/docs/Outcome of board meetings/outcome 10 th November 2023 part 3.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 6th September 2023',
        href: '/assets/docs/Outcome of board meetings/outcome 6th September 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 25th August 2023',
        href: '/assets/docs/Outcome of board meetings/outcome 25th August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 14th August 2023',
        href: '/assets/docs/Outcome of board meetings/outcome 14th August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 15th June 2023',
        href: '/assets/docs/Outcome of board meetings/outcome 15th June, 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 30th May 2023',
        href: '/assets/docs/Outcome of board meetings/outcome 30th May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Board Meeting 18th May 2023',
        href: '/assets/docs/Outcome of board meetings/outcome 18th May, 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of Monitoring Meeting 5th May 2023',
        href: '/assets/docs/Outcome of board meetings/Outcome of Monitoring Meeting 5th May 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of 6th Meeting 6th December 2022',
        href: '/assets/docs/Outcome of board meetings/Outcome of 6th Meeting COC_6th December 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of 5th Meeting 9th November 2022',
        href: '/assets/docs/Outcome of board meetings/Outcome of 5th Meeting COC_9th November 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of 4th Meeting 7th October 2022',
        href: '/assets/docs/Outcome of board meetings/Outcome of 4th Meeting COC_7th October 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of 3rd Meeting 19th September 2022',
        href: '/assets/docs/Outcome of board meetings/Outcome of 3rd Meeting COC_19th September  2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of 2nd Meeting 20th August 2022',
        href: '/assets/docs/Outcome of board meetings/Outcome of 2nd Meeting COC_20th August 2022.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'outcome-of-general-meetings',
    title: 'Outcome of General Meetings',
    legacyPath: 'outcome_of_general_meetings.html',
    documents: [
      {
        title: 'Declaration Of Voting Result- Scrutinizer Report for EGM of 15 Oct 2025',
        href: '/assets/docs/Outcome of General Meeting/Scrutinizers Report of EGM 15th October, 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of EGM - 15 Oct 2025',
        href: '/assets/docs/Outcome of General Meeting/Outcome of EGM 15th october, 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Scrutinizer Report of AGM of 30 Sep 2025',
        href: '/assets/docs/Outcome of General Meeting/AGM 30th Sept, 2025 Scrutinizer report (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of AGM of 30 Sep 2025',
        href: '/assets/docs/Outcome of General Meeting/Outcome of AGM 30th September, 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Declaration Of Voting Result- Scrutinizer Report for AGM 2024',
        href: '/assets/docs/Outcome of General Meeting/Declaration Of Voting Result- Scrutinizer Report_3rd October 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of AGM 2024',
        href: '/assets/docs/Outcome of General Meeting/Outcome of General Meeting 30 th September 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Outcome of AGM 2023',
        href: '/assets/docs/Outcome of General Meeting/Outcome of AGM 2023.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'postal-ballot',
    title: 'Postal Ballot',
    legacyPath: 'postal_ballot.html',
    documents: [
      {
        title: 'Postal Ballot Outcome and Scrutinizer Report 03 Sep 2026',
        href: '/assets/docs/Postal Ballot/Postal_ballot_outcome_and_Scrutinizer_report_03_09_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Shareholder Meeting Postal Ballot Scrutinizers Report 12 February 2025',
        href: '/assets/docs/Postal Ballot/Shareholder Meeting Postal Ballot Scrutinizers Report 12 February 2025.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'press-and-media-releases',
    title: 'Press and Media Releases',
    legacyPath: 'press_and_media_releases.html',
    documents: [
      {
        title: 'Press Release Jun 19 2026 - ACS Technologies Limited Strengthens Delivery Excellence with CMMI Level 3 Appraisal',
        href: '/assets/docs/Press and Media Releases/Press release- CMMI level 3.pdf',
        type: 'pdf',
      },
      {
        title: 'Press Release May 12 2026- Memorandum of Understanding with XDLINX Space Labs Private Limited',
        href: '/assets/docs/Press and Media Releases/Press release XDLINX.pdf',
        type: 'html',
      },
      {
        title: 'Press Release (Revised) Apr 04 2026- Exclusive agreement with Tahaluf Al Emarat',
        href: '/assets/docs/Press and Media Releases/press release revised.pdf',
        type: 'html',
      },
      {
        title: 'Press Release Mar 31 2026- Exclusive agreement with Tahaluf Al Emarat',
        href: '/assets/docs/Press and Media Releases/Press Release Mar 31 2026- Exclusive agreement with Tahaluf Al Emarat.pdf',
        type: 'html',
      },
      {
        title: 'Press Release Jan 21 2026',
        href: '/assets/docs/Press and Media Releases/Press release Infomerics.pdf',
        type: 'html',
      },
    ],
  },
  {
    slug: 'receipt-of-orders',
    title: 'Intimation of Receipt of Orders',
    legacyPath: 'receipt_of_orders.html',
    documents: [
      {
        title: 'Intimation of Receipt of Work order 15th Apr 2026',
        href: '/assets/docs/Receipt Of Orders/Kernex 15_04_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 26th Mar 2026',
        href: '/assets/docs/Receipt Of Orders/Intimation of Receipt of Work order 26th Mar 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 12th Feb 2026',
        href: '/assets/docs/Receipt Of Orders/RVNL_12_02_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 30th Jan 2026',
        href: '/assets/docs/Receipt Of Orders/P2P 30_01_2026.pdf.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 27th Jan 2026',
        href: '/assets/docs/Receipt Of Orders/fa27d95d-cf26-4320-821d-b6f6cf807539.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 20th Jan 2026',
        href: '/assets/docs/Receipt Of Orders/Agreement with AP govt (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 20th Jan 2026',
        href: '/assets/docs/Receipt Of Orders/Andhra Pradesh Urban Infrastructure Asset Management 20_01_2026 (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 17th Jan 2026',
        href: '/assets/docs/Receipt Of Orders/Akshara 17th January 2026 (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 7th Jan 2026',
        href: '/assets/docs/Receipt Of Orders/mahindra defence 7th January 2026 Signed (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 5th Dec 2025',
        href: '/assets/docs/Receipt Of Orders/Tyre killers signed.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 5th Dec 2025',
        href: '/assets/docs/Receipt Of Orders/Indian navy 05_12_2025 signed.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 25th Nov 2025',
        href: '/assets/docs/Receipt Of Orders/mahindra defence workorder (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 25th Nov 2025',
        href: '/assets/docs/Receipt Of Orders/Chennai airport work order (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 25th Nov 2025',
        href: '/assets/docs/Receipt Of Orders/Madurai Airport work order (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 10th Nov 2025',
        href: '/assets/docs/Receipt Of Orders/Intimation of Receipt of Work order 10th Nov 2025 (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 30th Oct 2025',
        href: '/assets/docs/Receipt Of Orders/Receipt of work orders from Afcons Infrastructure Limited. (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 30th Oct 2025',
        href: '/assets/docs/Receipt Of Orders/Receipt of work orders from Indian Navy. (1).pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of Work order 17th Oct 2025',
        href: '/assets/docs/Receipt Of Orders/Receipt of work orders from Indian Navy 17th October, 2025 (1).pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'related-party-transaction',
    title: 'Related Party Transactions',
    legacyPath: 'related_party_transaction.html',
    documents: [
      {
        title: 'Related Party Transaction 30 September 2024',
        href: '/assets/docs/Related Party Transaction/Related Party Transaction 30 September 2024.html',
        type: 'html',
      },
      {
        title: 'Related Party Transaction 31 March 2024',
        href: '/assets/docs/Related Party Transaction/Related Party Transaction 31 March  2024.html',
        type: 'html',
      },
      {
        title: 'Related Party Transactions 30 September 2023',
        href: '/assets/docs/Related Party Transaction/Related Party Transactions 30 september 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Related party Transaction 31st March 2023',
        href: '/assets/docs/Related Party Transaction/Related party Transaction 31st March 2023.html',
        type: 'html',
      },
    ],
  },
  {
    slug: 'other-filings',
    title: 'Other Filings',
    legacyPath: 'sef_others.html',
    documents: [
      {
        title: 'PCS Compliance Certificate - 49,50,495 equity shares allotment',
        href: '/assets/docs/others/PCS_Compliance_Certificate_4950495_equity_shares_allotment.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of Receipt of In-principle Approval - Adiniya Disclosure',
        href: '/assets/docs/others/Intimation Receipt of Inprinciple Approval- Adiniya Disclosure.pdf',
        type: 'pdf',
      },
      {
        title: 'Application for In-principle approval for 49,50,495 equity shares allotment',
        href: '/assets/docs/others/Application_for_In_principle_approval_for_4950495_equity_shares_allotment.pdf',
        type: 'pdf',
      },
      {
        title: 'Monitoring Agency Report for quarter ended 30th June, 2026',
        href: '/assets/docs/others/Monitoring_Agency_Report_13_08_2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Monitoring Agency Report for quarter ended 31st March, 2026',
        href: '/assets/docs/others/e58e70a3-d86c-4deb-9be5-ce914ab2eaa3.pdf',
        type: 'pdf',
      },
      {
        title: 'Declaration Regarding Trading of Securities at NSE under permitted category 21st April, 2026',
        href: '/assets/docs/others/NSE listing declaration.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliance Certificate_Regulation 74(5)_31 Mar 2026',
        href: '/assets/docs/others/Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations31-Mar-2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Monitoring Agency Report for Quarter ended 31st December 2025',
        href: '/assets/docs/others/Final_MA Report Q3 FY 26 _ACS TECHNOLOGIES lIMITED_SIGNED.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliance Certificate_Regulation 74(5)_31 Dec 2025',
        href: '/assets/docs/others/Compliance certificate 74(5)-Dec2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation of receipt of the In-Principal approval from BSE Limited for issue warrants',
        href: '/assets/docs/others/Intimation of receipt of the In-Principal approval from BSE Limited for issue warrants.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliance Certificate_Regulation 74(5)_30 Sep 2025',
        href: '/assets/docs/others/Compliance certificate_final-30-09-2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliance Certificate_Regulation 74(5)_30 June 2025',
        href: '/assets/docs/others/Compliance Certificate_Regulation 74(5)_30 June 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation for Non - applicability of Large Entity disclosure.',
        href: '/assets/docs/others/Intimation for Non - applicability of Large Entity disclosure..pdf',
        type: 'pdf',
      },
      {
        title: 'Certificate under Regulation 74(5) of the SEBI (Depositories and Participants)',
        href: '/assets/docs/others/Certificate under Regulation 74(5) of the SEBI (Depositories and Participants).pdf',
        type: 'pdf',
      },
      {
        title: 'Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_15th January 2025',
        href: '/assets/docs/others/Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_15th January 2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_16th October 2024',
        href: '/assets/docs/others/Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_16th October 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_15th July 2024',
        href: '/assets/docs/others/Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_15th July 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliance Certificate Under Regulation 40 (9), 40 (10) Of SEBI (LODR) 2015._16th April 2024',
        href: '/assets/docs/others/Compliance Certificate Under Regulation 40 (9), 40 (10) Of SEBI (LODR) 2015._16th April 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_15th April 2024',
        href: '/assets/docs/others/Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_15th April 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Submission Of Compliance Certificate Under Regulation 7(3) Of SEBI (LODR) 2015...Reg_10th April 2024',
        href: '/assets/docs/others/Submission Of Compliance Certificate Under Regulation 7(3) Of SEBI (LODR) 2015...Reg_10th April 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Format of the Initial Disclosure to be made by an entity identified as a Large Corporate Annexure A_6th April 2024',
        href: '/assets/docs/others/Format of the Initial Disclosure to be made by an entity identified as a Large Corporate Annexure A_6th April 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Format of the Annual Disclosure to be made by an entity identified as a LC Annexure B2 6th April 2024',
        href: '/assets/docs/others/Format of the Annual Disclosure to be made by an entity identified as a LC Annexure B2 6th April 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Receipt Of In Principle Listing Approval From The BSE_5th April 2024',
        href: '/assets/docs/others/Receipt Of In Principle Listing Approval From The BSE_5th April 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_11th January 2024',
        href: '/assets/docs/others/Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018_11th January 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Cancellation Of Record Date For The Extinguishment And Reduction Of Share Capital(I.E 25Th August 2023) 6th September 2023',
        href: '/assets/docs/others/Cancellation Of Record Date For The Extinguishment And Reduction Of Share Capital(I.E 25Th August 2023) 6th September 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Cancellation Of Record Date For The Extinguishment And Reduction Of Share Capital(I.E 25Th August 2023) 31st August 2023',
        href: '/assets/docs/others/Cancellation Of Record Date For The Extinguishment And Reduction Of Share Capital(I.E 25Th August 2023) 31st August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018 1st August 2023',
        href: '/assets/docs/others/Compliances-Certificate under Reg. 74 (5) of SEBI (DP) Regulations, 2018 1st August 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Silent Features Of The Resolution Plan Approved Under Section 31 Of The Insolvency And Bankruptcy Code, 2016, As Amended (\'IBC\') 6th April 2023',
        href: '/assets/docs/others/Silent Features Of The Resolution Plan Approved Under Section 31 Of The Insolvency And Bankruptcy Code, 2016, As Amended (\'IBC\') 6th April 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Corporate Insolvency Resolution Process (CIRP)-Approval of Resolution plan by Tribunal 29th March 2023',
        href: '/assets/docs/others/Corporate Insolvency Resolution Process (CIRP)-Approval of Resolution plan by Tribunal 29th March 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Corporate Action-Amalgamation Merger Demerger 29th March 2023',
        href: '/assets/docs/others/Corporate Action-Amalgamation Merger  Demerger 29th March 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Intimation regarding the admission under CIRP and appointment of Interim Resolution Professional (IRP)_11 July 2022',
        href: '/assets/docs/others/Intimation regarding the admission under CIRP and appointment of Interim Resolution Professional (IRP)_11 July 2022.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'share-holding-patterns',
    title: 'Share Holding Patterns',
    legacyPath: 'share_holding_patterns.html',
    documents: [
      {
        title: 'Shareholding Pattern 31 Mar 2026',
        href: '/assets/docs/shareholdingpattern/SHP_31MAR_2026_REPORT.html',
        type: 'html',
      },
      {
        title: 'Shareholding Pattern 31 Dec 2025',
        href: '/assets/docs/shareholdingpattern/SHP_31_12_2025_Report.html',
        type: 'html',
      },
      {
        title: 'Shareholding Pattern 30 Sep 2025',
        href: '/assets/docs/shareholdingpattern/shp_september_2025_report.html',
        type: 'html',
      },
      {
        title: 'Shareholding Pattern 30th June 2025',
        href: '/assets/docs/shareholdingpattern/SHP_REPORT_30JUNE 2025_FINAL.html',
        type: 'html',
      },
      {
        title: 'Shareholding Pattern 31st March 2025',
        href: '/assets/docs/shareholdingpattern/SHP_REPORT_31MAR2025_FINAL.html',
        type: 'pdf',
      },
      {
        title: 'Shareholding Pattern 31 December 2024',
        href: '/assets/docs/shareholdingpattern/Shareholding Pattern 31 December 2024.html',
        type: 'html',
      },
      {
        title: 'Shareholding Pattern 30 September 2024',
        href: '/assets/docs/shareholdingpattern/shareholding pattern 30 September 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Shareholding Pattern 30 June 2024',
        href: '/assets/docs/shareholdingpattern/shareholding pattern 30 June 2024.html.pdf',
        type: 'pdf',
      },
      {
        title: 'Shareholding Pattern 31 March 2024',
        href: '/assets/docs/shareholdingpattern/Share Holding Pattern 31 March 2024.html',
        type: 'html',
      },
      {
        title: 'Shareholding Pattern 31 December 2023',
        href: '/assets/docs/shareholdingpattern/Shareholding Pattern 31 December 2023.html',
        type: 'html',
      },
      {
        title: 'Shareholding Pattern 30 September 2023',
        href: '/assets/docs/shareholdingpattern/Shareholding Pattern 30 September 2023.html',
        type: 'html',
      },
      {
        title: 'Shareholding Pattern 30 June 2023',
        href: '/assets/docs/shareholdingpattern/Shareholding Pattern 30 June 2023.html',
        type: 'html',
      },
    ],
  },
  {
    slug: 'iotiq-financials',
    title: 'IOTIQ Innovations Pvt Ltd - Subsidiary Financials',
    legacyPath: 'subsdiary_financials.html',
    documents: [
      {
        title: 'Financials - IOTIQ (FY 2025-26)',
        href: '/assets/docs/Subsdiary Financials/Financials-IOTIQ-FY 2025-26.pdf',
        type: 'pdf',
      },
      {
        title: 'Financials - IOTIQ (FY 2024-25)',
        href: '/assets/docs/Subsdiary Financials/Financials - IOTIQ (FY 2024-25) INR.pdf',
        type: 'pdf',
      },
      {
        title: 'Financials - IOTIQ (FY 2023-24)',
        href: '/assets/docs/Subsdiary Financials/IOTIQ 2023-24.pdf',
        type: 'pdf',
      },
      {
        title: 'Financials - IOTIQ (FY 2022-23)',
        href: '/assets/docs/Subsdiary Financials/Financials - IOTIQ (FY 2022-23).pdf',
        type: 'pdf',
      },
      {
        title: 'Financials - IOTIQ (FY 2021-22)',
        href: '/assets/docs/Subsdiary Financials/Financials - IOTIQ (FY 2021-22).pdf',
        type: 'pdf',
      },
      {
        title: 'Financials - IOTIQ (FY 2019-20)',
        href: '/assets/docs/Subsdiary Financials/Financials - IOTIQ (FY 2019-20).pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'unaudited-financial-results',
    title: 'Unaudited Financial Results',
    legacyPath: 'unaudited_financial_results.html',
    documents: [
      {
        title: 'Unaudited Financial Results 30 June 2026',
        href: '/assets/docs/Outcome of board meetings/Outcome of Board Meeting - 13 August 2026.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financial Results 31 December 2025',
        href: '/assets/docs/Financial Results/Outcome final.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financial Results 30 September 2025',
        href: '/assets/docs/Financial Results/Half Yearly Outcome.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financials Results 30th Jun 2025',
        href: '/assets/docs/Financial Results/Unaudited Financial Results 13.08.2025.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financials Results 31 December 2024',
        href: '/assets/docs/Financial Results/unaudited financials results 31december 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financial Results 30 September 2024',
        href: '/assets/docs/Financial Results/unaudited financial results 30 september 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financials Results 30 June 2024',
        href: '/assets/docs/Financial Results/unaudited financial result 30 june 2024.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financial Results 31 December 2023',
        href: '/assets/docs/Financial Results/unaudited financial results 31 December 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financials Results 30 September 2023',
        href: '/assets/docs/Financial Results/unaudited financial results 30 september 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financial Results 30 June 2023',
        href: '/assets/docs/Financial Results/unaudited Financial results 30 June 2023.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financials Results 31 December 2022',
        href: '/assets/docs/Financial Results/Unaudited Financial Results 31 December 2022.pdf',
        type: 'pdf',
      },
      {
        title: 'Unaudited Financial Results 30 September 2022',
        href: '/assets/docs/Financial Results/Unaudited Financial result 30 september 2022.pdf',
        type: 'pdf',
      },
    ],
  },
];
