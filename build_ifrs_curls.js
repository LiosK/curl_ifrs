#!/usr/bin/env node
'use strict';

// Define functions

/** Build downloaded filename from Standard title */
const buildFilename = title => {
  const numMap = new Map([
    ['IFRS ', '1'],
    ['IAS ', '2'],
    ['IFRIC ', '3'],
    ['SIC-', '4'],
  ]);
  for (const [key, val] of numMap.entries()) {
    const pf = title.match(new RegExp(`^${key}(\\d+) .*`));
    if (pf) {
      return `${val}${('0' + pf[1]).slice(-2)} ${title}.pdf`;
    }
  }
  return `${title}.pdf`;
};

/** Build download URL from Standard title */
const buildUrl = (title, baseUrl) => {
  const urlMap = new Map([
    ['IFRS ', 'IFRS'],
    ['IAS ', 'IAS'],
    ['IFRIC ', 'IFRIC'],
    ['SIC-', 'SIC'],
  ]);
  for (const [key, val] of urlMap.entries()) {
    const pf = title.match(new RegExp(`^${key}(\\d+) .*`));
    if (pf) {
      return `${baseUrl}${val}${pf[1]}.pdf`;
    }
  }
  return `${baseUrl}${title}.pdf`;
};

const main = (baseUrl, titles, irregulars) => {
  const jsessionid = process.argv[2] || '';
  if (jsessionid === '') {
    console.error('Error: No JSESSIONID argument; Locate it in Cookie');
    console.error('Usage: build_ifrs_curls JSESSIONID | bash');
    return 1;
  }

  const cookie = 'Cookie: JSESSIONID=' + jsessionid;
  const printCurl = (url, filename) => {
    console.log(`curl -H '${cookie}' '${filename}' > '${url}'`);
  };

  new Map(titles.map(title => [
    buildUrl(title, baseUrl),
    buildFilename(title),
  ])).forEach(printCurl);
  irregulars.forEach(printCurl);

  return 0;
};


// Define parameters

const baseUrl = 'http://eifrs.ifrs.org/eifrs/bnstandards/en/';

const titles = [
  'IFRS 1 First-time Adoption of International Financial Reporting Standards',
  'IFRS 2 Share-based Payment',
  'IFRS 3 Business Combinations',
  'IFRS 5 Non-current Assets Held for Sale and Discontinued Operations',
  'IFRS 6 Exploration for and Evaluation of Mineral Resources',
  'IFRS 7 Financial Instruments: Disclosures',
  'IFRS 8 Operating Segments',
  'IFRS 9 Financial Instruments',
  'IFRS 10 Consolidated Financial Statements',
  'IFRS 11 Joint Arrangements',
  'IFRS 12 Disclosure of Interests in Other Entities',
  'IFRS 13 Fair Value Measurement',
  'IFRS 14 Regulatory Deferral Accounts',
  'IFRS 15 Revenue from Contracts with Customers',
  'IFRS 16 Leases',
  'IFRS 17 Insurance Contracts',
  'IAS 1 Presentation of Financial Statements',
  'IAS 2 Inventories',
  'IAS 7 Statement of Cash Flows',
  'IAS 8 Accounting Policies, Changes in Accounting Estimates and Errors',
  'IAS 10 Events after the Reporting Period',
  'IAS 12 Income Taxes',
  'IAS 16 Property, Plant and Equipment',
  'IAS 19 Employee Benefits',
  'IAS 20 Accounting for Government Grants and Disclosure of Government Assistance',
  'IAS 21 The Effects of Changes in Foreign Exchange Rates',
  'IAS 23 Borrowing Costs',
  'IAS 24 Related Party Disclosures',
  'IAS 26 Accounting and Reporting by Retirement Benefit Plans',
  'IAS 27 Separate Financial Statements',
  'IAS 28 Investments in Associates and Joint Ventures',
  'IAS 29 Financial Reporting in Hyperinflationary Economies',
  'IAS 32 Financial Instruments: Presentation',
  'IAS 33 Earnings per Share',
  'IAS 34 Interim Financial Reporting',
  'IAS 36 Impairment of Assets',
  'IAS 37 Provisions, Contingent Liabilities and Contingent Assets',
  'IAS 38 Intangible Assets',
  'IAS 39 Financial Instruments: Recognition and Measurement',
  'IAS 40 Investment Property',
  'IAS 41 Agriculture',
  'IFRIC 1 Changes in Existing Decommissioning, Restoration and Similar Liabilities',
  'IFRIC 2 Members’ Shares in Co-operative Entities and Similar Instruments',
  'IFRIC 5 Rights to Interests arising from Decommissioning, Restoration and Environmental Rehabilitation Funds',
  'IFRIC 6 Liabilities arising from Participating in a Specific Market—Waste Electrical and Electronic Equipment',
  'IFRIC 7 Applying the Restatement Approach under IAS 29 Financial Reporting in Hyperinflationary Economies',
  'IFRIC 10 Interim Financial Reporting and Impairment',
  'IFRIC 12 Service Concession Arrangements',
  'IFRIC 14 IAS 19—The Limit on a Defined Benefit Asset, Minimum Funding Requirements and their Interaction',
  'IFRIC 16 Hedges of a Net Investment in a Foreign Operation',
  'IFRIC 17 Distributions of Non-cash Assets to Owners',
  'IFRIC 19 Extinguishing Financial Liabilities with Equity Instruments',
  'IFRIC 20 Stripping Costs in the Production Phase of a Surface Mine',
  'IFRIC 21 Levies',
  'IFRIC 22 Foreign Currency Transactions and Advance Consideration',
  'IFRIC 23 Uncertainty over Income Tax Treatments',
  'SIC-10 Government Assistance—No Specific Relation to Operating Activities',
  'SIC-25 Income Taxes—Changes in the Tax Status of an Entity or its Shareholders',
  'SIC-29 Service Concession Arrangements: Disclosures',
  'SIC-32 Intangible Assets—Web Site Costs',
];

const irregulars = new Map([
  [baseUrl + 'framework.pdf', '100 Conceptual Framework for Financial Reporting.pdf'],
  [baseUrl + 'SIC07.pdf', '407 SIC-7 Introduction of the Euro.pdf'],
  [baseUrl + 'PS01.pdf', '501 Practice Statement 1: Management Commentary.pdf'],
  [baseUrl + 'PS02.pdf', '502 Practice Statement 2: Making Materiality Judgements.pdf'],
]);


// Run
process.exit(main(baseUrl, titles, irregulars));
