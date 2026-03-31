'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react'

// ---------- Types ----------
interface CustomerBase {
  sNo: number
  customerName: string
  businessOverview: string
  marketFocus: string
  totalAnnualRevenue: string
  customerSizeScale: string
  keyContactPerson: string
  designationRole: string
  emailAddress: string
  phoneWhatsApp: string
  linkedInProfile: string
  websiteUrl: string
}

interface CustomerAdvanced extends CustomerBase {
  keyBuyingCriteria: string
  keyPainPoints: string
  upcomingTriggers: string
  budgetOwnership: string
  procurementModel: string
  preferredEngagementType: string
}

interface CustomerPremium extends CustomerAdvanced {
  preferredSolutionType: string
  preferredDeploymentModel: string
  performanceExpectations: string
  customerBenchmarkingSummary: string
  additionalComments: string
}

// ---------- Demo Data ----------
const demoData: CustomerPremium[] = [
  {
    sNo: 1,
    customerName: 'SafeHome Systems Inc.',
    businessOverview: 'Leading DIY home security provider specializing in wireless camera solutions for residential customers across North America.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '245.0',
    customerSizeScale: 'Large',
    keyContactPerson: 'Michael Torres',
    designationRole: 'VP of Product Development',
    emailAddress: 'michael.torres@safehomesys.com',
    phoneWhatsApp: '+1-312-555-0147',
    linkedInProfile: 'linkedin.com/in/michaeltorres',
    websiteUrl: 'www.safehomesystems.com',
    keyBuyingCriteria: 'Video quality, ease of installation, cloud storage pricing',
    keyPainPoints: 'High customer churn due to subscription fatigue, limited AI integration',
    upcomingTriggers: 'Launching 4K solar-assisted camera line in Q3 2026',
    budgetOwnership: 'CTO Office',
    procurementModel: 'Direct OEM partnerships',
    preferredEngagementType: 'Strategic technology partnership',
    preferredSolutionType: 'Battery-Powered + Solar-Assisted Cameras',
    preferredDeploymentModel: 'Self-managed (DIY) with optional professional install',
    performanceExpectations: '99.5% uptime, <2s alert latency, 30-day cloud retention',
    customerBenchmarkingSummary: 'Top 5 player in residential DIY segment; strong brand loyalty but lagging in AI-powered detection features vs. competitors.',
    additionalComments: 'Expressed interest in white-label partnerships for Pan-Tilt-Zoom cameras. Decision expected by Q2 2026.'
  },
  {
    sNo: 2,
    customerName: 'VisionGuard Technologies',
    businessOverview: 'Manufacturer and distributor of commercial-grade security cameras for small businesses and retail chains.',
    marketFocus: 'Commercial',
    totalAnnualRevenue: '182.5',
    customerSizeScale: 'Medium',
    keyContactPerson: 'Sarah Chen',
    designationRole: 'Director of Procurement',
    emailAddress: 'sarah.chen@visionguard.com',
    phoneWhatsApp: '+1-415-555-0289',
    linkedInProfile: 'linkedin.com/in/sarahchen-vg',
    websiteUrl: 'www.visionguardtech.com',
    keyBuyingCriteria: 'PoE compatibility, night vision range, scalability',
    keyPainPoints: 'Fragmented supplier base, inconsistent firmware quality across brands',
    upcomingTriggers: 'Expanding to Canadian market in 2026; new warehouse monitoring product',
    budgetOwnership: 'Procurement Department',
    procurementModel: 'Competitive RFP process',
    preferredEngagementType: 'Volume supply agreement',
    preferredSolutionType: 'Power over Ethernet (PoE) Cameras',
    preferredDeploymentModel: 'Professionally managed with remote monitoring',
    performanceExpectations: '4K resolution, IP67 rating, 5-year warranty',
    customerBenchmarkingSummary: 'Strong in retail security vertical; growing 18% YoY. Key differentiator is integrated POS-camera analytics.',
    additionalComments: 'Currently evaluating 3 suppliers for next-gen outdoor cameras. Budget approved for $12M procurement cycle.'
  },
  {
    sNo: 3,
    customerName: 'HomeWatch Direct',
    businessOverview: 'D2C e-commerce brand selling affordable indoor and doorbell security cameras to budget-conscious homeowners.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '89.3',
    customerSizeScale: 'Small',
    keyContactPerson: 'James Rodriguez',
    designationRole: 'CEO & Founder',
    emailAddress: 'james@homewatchdirect.com',
    phoneWhatsApp: '+1-972-555-0331',
    linkedInProfile: 'linkedin.com/in/jamesrodriguez-hwd',
    websiteUrl: 'www.homewatchdirect.com',
    keyBuyingCriteria: 'Price competitiveness, Amazon marketplace ranking, fast shipping',
    keyPainPoints: 'Margin pressure from Chinese OEM competitors, high return rates on battery cameras',
    upcomingTriggers: 'Planning launch of video doorbell with built-in package detection',
    budgetOwnership: 'Founder/CEO direct',
    procurementModel: 'Direct import from OEM factories',
    preferredEngagementType: 'OEM/ODM with private labeling',
    preferredSolutionType: 'Indoor Fixed + Video Doorbell Cameras',
    preferredDeploymentModel: 'Self-managed (DIY) only',
    performanceExpectations: 'HD/Full HD minimum, 2-way audio, <$50 retail price point',
    customerBenchmarkingSummary: 'Fast-growing D2C brand; #8 in Amazon Home Security category. Vulnerable to supply chain disruptions.',
    additionalComments: 'Open to co-branded product development. Small team but agile decision-making.'
  },
  {
    sNo: 4,
    customerName: 'SecurePoint Commercial Solutions',
    businessOverview: 'Full-service security integrator providing camera systems, access control, and monitoring for commercial properties.',
    marketFocus: 'Commercial',
    totalAnnualRevenue: '320.0',
    customerSizeScale: 'Large',
    keyContactPerson: 'David Kim',
    designationRole: 'Chief Technology Officer',
    emailAddress: 'dkim@securepointcs.com',
    phoneWhatsApp: '+1-646-555-0178',
    linkedInProfile: 'linkedin.com/in/davidkim-spc',
    websiteUrl: 'www.securepointcs.com',
    keyBuyingCriteria: 'Integration with access control systems, analytics capabilities, enterprise support',
    keyPainPoints: 'Complex multi-site deployments, lack of unified management dashboard across camera brands',
    upcomingTriggers: 'Won $45M contract for retail chain with 200+ locations; need standardized camera solution',
    budgetOwnership: 'CTO + CFO joint approval',
    procurementModel: 'Preferred vendor list with annual review',
    preferredEngagementType: 'Enterprise licensing + dedicated support',
    preferredSolutionType: 'Pan-Tilt-Zoom + Outdoor Fixed Cameras',
    preferredDeploymentModel: 'Professionally managed with SLA',
    performanceExpectations: '4K resolution, AI object detection, 90-day storage, <1s response',
    customerBenchmarkingSummary: 'Market leader in commercial security integration; 12% market share in North America. Strong recurring revenue from monitoring contracts.',
    additionalComments: 'Key decision in Q1 2027 for standardizing on single camera vendor across all client sites.'
  },
  {
    sNo: 5,
    customerName: 'NorthStar Home Security',
    businessOverview: 'Canadian home security company offering bundled camera + monitoring packages for single-family homes.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '156.8',
    customerSizeScale: 'Medium',
    keyContactPerson: 'Emily Tremblay',
    designationRole: 'VP of Operations',
    emailAddress: 'emily.t@northstarsecurity.ca',
    phoneWhatsApp: '+1-514-555-0422',
    linkedInProfile: 'linkedin.com/in/emilytremblay',
    websiteUrl: 'www.northstarsecurity.ca',
    keyBuyingCriteria: 'Cold weather performance, bilingual app support, Canadian data residency',
    keyPainPoints: 'Battery performance in sub-zero temperatures, limited local cloud options in Canada',
    upcomingTriggers: 'Expanding from Quebec/Ontario to Western Canada; need weather-hardened outdoor cameras',
    budgetOwnership: 'VP Operations',
    procurementModel: 'Preferred supplier with annual contracts',
    preferredEngagementType: 'Distribution partnership',
    preferredSolutionType: 'Hardwired + Floodlight Cameras',
    preferredDeploymentModel: 'Hybrid (DIY + professional install option)',
    performanceExpectations: 'Operating range -40C to +50C, 2K minimum resolution',
    customerBenchmarkingSummary: 'Dominant player in Canadian residential market; 22% share in Quebec. Strong customer satisfaction scores.',
    additionalComments: 'Priority prospect for weather-resistant camera line. Regulatory compliance with PIPEDA is critical requirement.'
  },
  {
    sNo: 6,
    customerName: 'QuickInstall Security',
    businessOverview: 'Home improvement retailer-aligned security brand focused on DIY floodlight and spotlight cameras.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '67.2',
    customerSizeScale: 'Small',
    keyContactPerson: 'Robert Martinez',
    designationRole: 'Head of Product',
    emailAddress: 'rmartinez@quickinstall.com',
    phoneWhatsApp: '+1-813-555-0567',
    linkedInProfile: 'linkedin.com/in/robertmartinez-qi',
    websiteUrl: 'www.quickinstallsecurity.com',
    keyBuyingCriteria: 'Retail shelf appeal, easy 15-min installation, competitive MAP pricing',
    keyPainPoints: 'Competing with big brands for home improvement retail shelf space',
    upcomingTriggers: 'Partnership discussion with major home improvement chain for exclusive SKUs',
    budgetOwnership: 'Head of Product',
    procurementModel: 'Seasonal bulk orders',
    preferredEngagementType: 'White-label manufacturing',
    preferredSolutionType: 'Floodlight and Spotlight Security Cameras',
    preferredDeploymentModel: 'Self-managed (DIY)',
    performanceExpectations: 'Full HD, motion-activated LED, weatherproof IP65',
    customerBenchmarkingSummary: 'Niche player with strong contractor channel. Growing 25% YoY in floodlight camera sub-segment.',
    additionalComments: 'Needs camera modules for integration into their existing floodlight housing designs.'
  },
  {
    sNo: 7,
    customerName: 'TechVault Monitoring Services',
    businessOverview: 'Professional monitoring company transitioning from traditional alarm systems to video verification and smart camera solutions.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '410.0',
    customerSizeScale: 'Large',
    keyContactPerson: 'Lisa Park',
    designationRole: 'SVP of Strategic Partnerships',
    emailAddress: 'lpark@techvaultms.com',
    phoneWhatsApp: '+1-404-555-0198',
    linkedInProfile: 'linkedin.com/in/lisapark-tvm',
    websiteUrl: 'www.techvaultmonitoring.com',
    keyBuyingCriteria: 'Video verification accuracy, false alarm reduction, integration with central station',
    keyPainPoints: 'Legacy system migration complexity, subscriber transition to video-based monitoring',
    upcomingTriggers: 'Rolling out video verification service to 500K existing alarm subscribers over 18 months',
    budgetOwnership: 'SVP Strategic Partnerships + Board approval',
    procurementModel: 'Multi-year supply agreement',
    preferredEngagementType: 'Co-development + exclusive supply',
    preferredSolutionType: 'Indoor Fixed + Outdoor Fixed Cameras',
    preferredDeploymentModel: 'Professionally managed with 24/7 monitoring',
    performanceExpectations: '2K+ resolution, AI false alarm filtering >95%, ONVIF compliance',
    customerBenchmarkingSummary: 'Top 3 monitoring company in NA; 2.1M subscribers. Transitioning business model creates major camera procurement opportunity.',
    additionalComments: 'Potential $50M+ deal over 3 years. Pilot program with 10K cameras approved for Q4 2026.'
  },
  {
    sNo: 8,
    customerName: 'SolarCam Innovations',
    businessOverview: 'Startup specializing in solar-powered security cameras for rural properties, farms, and off-grid locations.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '28.5',
    customerSizeScale: 'Small',
    keyContactPerson: 'Andrew Foster',
    designationRole: 'Co-Founder & CTO',
    emailAddress: 'afoster@solarcaminnovations.com',
    phoneWhatsApp: '+1-720-555-0834',
    linkedInProfile: 'linkedin.com/in/andrewfoster-sci',
    websiteUrl: 'www.solarcaminnovations.com',
    keyBuyingCriteria: 'Solar panel efficiency, 4G/LTE connectivity, battery longevity',
    keyPainPoints: 'Limited cellular bandwidth in rural areas, solar panel degradation over time',
    upcomingTriggers: 'Series B funding expected Q2 2026; plans to scale from 50K to 200K units annually',
    budgetOwnership: 'Co-Founder direct',
    procurementModel: 'Contract manufacturing partnerships',
    preferredEngagementType: 'Technology licensing + component supply',
    preferredSolutionType: 'Solar-Assisted Cameras',
    preferredDeploymentModel: 'Self-managed (DIY) with cellular backup',
    performanceExpectations: '2K resolution, 72-hour battery backup, 4G LTE connectivity',
    customerBenchmarkingSummary: 'First mover in solar security camera niche; 35% market share in off-grid segment. Technology moat in power management.',
    additionalComments: 'Excellent acquisition target or partnership opportunity. Proprietary solar charging algorithm is key IP.'
  },
  {
    sNo: 9,
    customerName: 'RetailWatch Solutions',
    businessOverview: 'Provides integrated video surveillance and loss prevention systems for retail stores, restaurants, and foodservice outlets.',
    marketFocus: 'Commercial',
    totalAnnualRevenue: '195.0',
    customerSizeScale: 'Medium',
    keyContactPerson: 'Karen Williams',
    designationRole: 'Director of Business Development',
    emailAddress: 'kwilliams@retailwatch.com',
    phoneWhatsApp: '+1-214-555-0921',
    linkedInProfile: 'linkedin.com/in/karenwilliams-rw',
    websiteUrl: 'www.retailwatchsolutions.com',
    keyBuyingCriteria: 'POS integration, people counting accuracy, heat mapping capabilities',
    keyPainPoints: 'Camera vandalism in high-risk locations, bandwidth constraints in multi-camera setups',
    upcomingTriggers: 'Expanding analytics platform to include AI-driven shrinkage prediction',
    budgetOwnership: 'Director of BD + VP Sales',
    procurementModel: 'Project-based procurement',
    preferredEngagementType: 'Reseller with value-added services',
    preferredSolutionType: 'Indoor Fixed + Pan-Tilt-Zoom Cameras',
    preferredDeploymentModel: 'Professionally managed',
    performanceExpectations: '4K and Above, vandal-proof IK10 rating, advanced analytics SDK',
    customerBenchmarkingSummary: 'Strong in QSR and fast-casual restaurant vertical; partnerships with 3 of top 10 restaurant chains.',
    additionalComments: 'Looking for camera vendor with open API for custom analytics integration. Decision timeline: Q3 2026.'
  },
  {
    sNo: 10,
    customerName: 'WarehousePro Security',
    businessOverview: 'Specializes in security solutions for warehouses, distribution centers, and storage facilities across the U.S. and Canada.',
    marketFocus: 'Commercial',
    totalAnnualRevenue: '134.7',
    customerSizeScale: 'Medium',
    keyContactPerson: 'Thomas Anderson',
    designationRole: 'VP of Engineering',
    emailAddress: 'tanderson@warehousepro.com',
    phoneWhatsApp: '+1-503-555-0776',
    linkedInProfile: 'linkedin.com/in/thomasanderson-wp',
    websiteUrl: 'www.warehouseprosecurity.com',
    keyBuyingCriteria: 'Wide-angle coverage, low-light performance, edge computing for local processing',
    keyPainPoints: 'Large area coverage requiring too many cameras, high infrastructure cabling costs',
    upcomingTriggers: 'New product line for autonomous warehouse monitoring using AI + PTZ cameras',
    budgetOwnership: 'VP Engineering',
    procurementModel: 'Annual blanket purchase orders',
    preferredEngagementType: 'OEM supply + joint product development',
    preferredSolutionType: 'Outdoor Fixed + Power over Ethernet (PoE) Cameras',
    preferredDeploymentModel: 'Hybrid (self-managed software + professional install)',
    performanceExpectations: '4K resolution, 180-degree FOV, edge AI processing, -30C to +60C operating range',
    customerBenchmarkingSummary: 'Leading warehouse security specialist; serves 40% of top 50 3PL companies. Expanding into smart warehouse analytics.',
    additionalComments: 'Strategic account - could drive $8M annual camera procurement. Requires cameras with ONVIF Profile S/T compliance.'
  },
  {
    sNo: 11,
    customerName: 'AllSafe Smart Home',
    businessOverview: 'Smart home ecosystem company integrating security cameras with smart locks, sensors, and home automation platforms.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '298.0',
    customerSizeScale: 'Large',
    keyContactPerson: 'Jennifer Liu',
    designationRole: 'Head of Hardware Partnerships',
    emailAddress: 'jliu@allsafesmarthome.com',
    phoneWhatsApp: '+1-408-555-0543',
    linkedInProfile: 'linkedin.com/in/jenniferliu-ash',
    websiteUrl: 'www.allsafesmarthome.com',
    keyBuyingCriteria: 'Matter/Thread protocol support, ecosystem compatibility, compact industrial design',
    keyPainPoints: 'Fragmented smart home standards, camera integration with third-party voice assistants',
    upcomingTriggers: 'Launching Matter-certified camera lineup in partnership with major smart home platform',
    budgetOwnership: 'Head of Hardware Partnerships + CPO',
    procurementModel: 'Strategic OEM partnerships',
    preferredEngagementType: 'Co-branding + exclusive features',
    preferredSolutionType: 'Indoor Fixed + Video Doorbell Cameras',
    preferredDeploymentModel: 'Self-managed (DIY) with ecosystem integration',
    performanceExpectations: '2K resolution, Matter protocol, local processing option, <3W power consumption',
    customerBenchmarkingSummary: 'Fastest-growing smart home brand; 4.2M active devices deployed. Camera is weakest product in current lineup.',
    additionalComments: 'High-value partnership opportunity. They need a reliable camera OEM partner for their ecosystem expansion.'
  },
  {
    sNo: 12,
    customerName: 'CondoSafe Management',
    businessOverview: 'Property management technology company providing security camera solutions for multi-family residential complexes.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '52.1',
    customerSizeScale: 'Small',
    keyContactPerson: 'Patricia Gomez',
    designationRole: 'Director of Technology',
    emailAddress: 'pgomez@condosafe.com',
    phoneWhatsApp: '+1-305-555-0662',
    linkedInProfile: 'linkedin.com/in/patriciagomez-cs',
    websiteUrl: 'www.condosafe.com',
    keyBuyingCriteria: 'Multi-tenant management, license plate recognition, package room monitoring',
    keyPainPoints: 'Managing cameras across 200+ properties with different network configurations',
    upcomingTriggers: 'Rolling out centralized cloud management platform for all managed properties',
    budgetOwnership: 'Director of Technology',
    procurementModel: 'Centralized procurement for managed properties',
    preferredEngagementType: 'Bulk supply + managed service integration',
    preferredSolutionType: 'Outdoor Fixed + Video Doorbell Cameras',
    preferredDeploymentModel: 'Professionally managed with centralized dashboard',
    performanceExpectations: '2K resolution, LPR capability, package detection AI, cloud multi-tenancy',
    customerBenchmarkingSummary: 'Growing player in multi-family security; manages 200+ condo/apartment complexes. Sticky customer base with 95% renewal rate.',
    additionalComments: 'Interesting vertical-specific opportunity. Needs cameras with multi-tenant cloud architecture support.'
  },
  {
    sNo: 13,
    customerName: 'EagleEye Distribution',
    businessOverview: 'Major security product distributor serving dealers, integrators, and installers across the United States.',
    marketFocus: 'Commercial',
    totalAnnualRevenue: '520.0',
    customerSizeScale: 'Large',
    keyContactPerson: 'Mark Thompson',
    designationRole: 'Chief Commercial Officer',
    emailAddress: 'mthompson@eagleeye-dist.com',
    phoneWhatsApp: '+1-469-555-0187',
    linkedInProfile: 'linkedin.com/in/markthompson-ee',
    websiteUrl: 'www.eagleeyedistribution.com',
    keyBuyingCriteria: 'Product breadth, dealer margin structure, technical support quality',
    keyPainPoints: 'Managing 50+ camera brands in portfolio, demand for consolidated vendor relationships',
    upcomingTriggers: 'Rationalizing camera vendor portfolio from 50 to 15 preferred brands by end of 2026',
    budgetOwnership: 'CCO + CEO',
    procurementModel: 'Master distribution agreements',
    preferredEngagementType: 'Exclusive distribution in select territories',
    preferredSolutionType: 'Full product line across all camera types',
    preferredDeploymentModel: 'Both DIY and professional channels',
    performanceExpectations: 'Full range from HD to 4K, comprehensive product portfolio, strong warranty program',
    customerBenchmarkingSummary: 'Top 5 security distributor in NA; $520M revenue. Vendor consolidation creates winner-take-more dynamic.',
    additionalComments: 'Critical channel partner opportunity. Being selected as preferred vendor could mean $30M+ annual orders.'
  },
  {
    sNo: 14,
    customerName: 'SmartOffice Security Corp',
    businessOverview: 'Provides integrated security and building management systems for small offices and co-working spaces.',
    marketFocus: 'Commercial',
    totalAnnualRevenue: '76.3',
    customerSizeScale: 'Small',
    keyContactPerson: 'Daniel Park',
    designationRole: 'VP of Product Management',
    emailAddress: 'dpark@smartofficesec.com',
    phoneWhatsApp: '+1-617-555-0443',
    linkedInProfile: 'linkedin.com/in/danielpark-sos',
    websiteUrl: 'www.smartofficesecurity.com',
    keyBuyingCriteria: 'Compact form factor, occupancy analytics, integration with access control',
    keyPainPoints: 'Privacy concerns in office environments, GDPR/privacy compliance for camera placement',
    upcomingTriggers: 'Expanding to 500 new co-working locations through partnership with major co-working brand',
    budgetOwnership: 'VP Product Management',
    procurementModel: 'Project-based with framework agreement',
    preferredEngagementType: 'Solution partnership with bundled pricing',
    preferredSolutionType: 'Indoor Fixed Cameras',
    preferredDeploymentModel: 'Professionally managed with privacy masking',
    performanceExpectations: '2K resolution, privacy zone masking, occupancy counting, PoE powered',
    customerBenchmarkingSummary: 'Emerging player in smart office vertical; strong product-market fit in co-working segment. 180% YoY growth.',
    additionalComments: 'Fast-growing account with significant volume potential as co-working market expands post-pandemic.'
  },
  {
    sNo: 15,
    customerName: 'MapleSec Technologies',
    businessOverview: 'Canadian security technology company focused on integrated camera and alarm solutions for residential and light commercial markets.',
    marketFocus: 'Residential',
    totalAnnualRevenue: '112.0',
    customerSizeScale: 'Medium',
    keyContactPerson: 'Sophie Dubois',
    designationRole: 'Director of Procurement',
    emailAddress: 'sdubois@maplesec.ca',
    phoneWhatsApp: '+1-613-555-0290',
    linkedInProfile: 'linkedin.com/in/sophiedubois-ms',
    websiteUrl: 'www.maplesec.ca',
    keyBuyingCriteria: 'Canadian data sovereignty, bilingual support, ULC certification',
    keyPainPoints: 'Limited camera options with Canadian data center support, high logistics costs for nationwide distribution',
    upcomingTriggers: 'Preparing for new Canadian privacy regulation (Bill C-27) compliance requirements',
    budgetOwnership: 'Director of Procurement',
    procurementModel: 'Annual vendor selection with quarterly POs',
    preferredEngagementType: 'Authorized reseller with Canadian support',
    preferredSolutionType: 'Battery-Powered + Hardwired Cameras',
    preferredDeploymentModel: 'Hybrid (DIY + professional installation)',
    performanceExpectations: 'HD and Full HD minimum, Canadian cloud hosting, ULC-listed, -40C operation',
    customerBenchmarkingSummary: 'Top 10 Canadian security provider; strong in Ontario and BC markets. Valued at $180M in recent funding round.',
    additionalComments: 'Strategic for Canadian market penetration. Needs camera partner committed to Canadian data residency.'
  }
]

// ---------- Column configs ----------
interface ColumnDef {
  key: keyof CustomerPremium
  label: string
  group: string
  minWidth?: string
}

const basicColumns: ColumnDef[] = [
  { key: 'sNo', label: 'S.No.', group: '', minWidth: '60px' },
  { key: 'customerName', label: 'Customer Name', group: 'Customer Information', minWidth: '180px' },
  { key: 'businessOverview', label: 'Business Overview', group: 'Customer Information', minWidth: '280px' },
  { key: 'marketFocus', label: 'Market Focus (Residential or Commercial)', group: 'Customer Information', minWidth: '160px' },
  { key: 'totalAnnualRevenue', label: 'Total Annual Revenue (US$ Million)', group: 'Customer Information', minWidth: '140px' },
  { key: 'customerSizeScale', label: 'Customer Size / Scale', group: 'Customer Information', minWidth: '130px' },
  { key: 'keyContactPerson', label: 'Key Contact Person', group: 'Contact Details', minWidth: '160px' },
  { key: 'designationRole', label: 'Designation / Role', group: 'Contact Details', minWidth: '160px' },
  { key: 'emailAddress', label: 'Email Address', group: 'Contact Details', minWidth: '220px' },
  { key: 'phoneWhatsApp', label: 'Phone / WhatsApp Number', group: 'Contact Details', minWidth: '170px' },
  { key: 'linkedInProfile', label: 'LinkedIn Profile', group: 'Contact Details', minWidth: '200px' },
  { key: 'websiteUrl', label: 'Website URL', group: 'Contact Details', minWidth: '200px' },
]

const advancedColumns: ColumnDef[] = [
  ...basicColumns,
  { key: 'keyBuyingCriteria', label: 'Key Buying Criteria', group: 'Professional Drivers', minWidth: '220px' },
  { key: 'keyPainPoints', label: 'Key Pain Points', group: 'Professional Drivers', minWidth: '220px' },
  { key: 'upcomingTriggers', label: 'Upcoming Triggers and Initiatives', group: 'Professional Drivers', minWidth: '240px' },
  { key: 'budgetOwnership', label: 'Budget Ownership', group: 'Purchasing Behaviour Metrics', minWidth: '160px' },
  { key: 'procurementModel', label: 'Procurement Model', group: 'Purchasing Behaviour Metrics', minWidth: '180px' },
  { key: 'preferredEngagementType', label: 'Preferred Engagement Type', group: 'Purchasing Behaviour Metrics', minWidth: '200px' },
]

const premiumColumns: ColumnDef[] = [
  ...advancedColumns,
  { key: 'preferredSolutionType', label: 'Preferred Solution Type', group: 'Solution Requirements', minWidth: '200px' },
  { key: 'preferredDeploymentModel', label: 'Preferred Deployment Model', group: 'Solution Requirements', minWidth: '220px' },
  { key: 'performanceExpectations', label: 'Performance Expectations', group: 'Solution Requirements', minWidth: '240px' },
  { key: 'customerBenchmarkingSummary', label: 'Customer Benchmarking Summary (Potential Customers)', group: 'CMI Insights', minWidth: '300px' },
  { key: 'additionalComments', label: 'Additional Comments / Notes by CMI Team', group: 'CMI Insights', minWidth: '280px' },
]

// ---------- Group header builder ----------
function getGroupHeaders(columns: ColumnDef[]): { group: string; span: number }[] {
  const groups: { group: string; span: number }[] = []
  let currentGroup = ''
  let currentSpan = 0
  for (const col of columns) {
    if (col.group !== currentGroup) {
      if (currentSpan > 0) groups.push({ group: currentGroup, span: currentSpan })
      currentGroup = col.group
      currentSpan = 1
    } else {
      currentSpan++
    }
  }
  if (currentSpan > 0) groups.push({ group: currentGroup, span: currentSpan })
  return groups
}

const groupColors: Record<string, string> = {
  '': 'bg-gray-100',
  'Customer Information': 'bg-[#2B4C7E] text-white',
  'Contact Details': 'bg-[#3D6098] text-white',
  'Professional Drivers': 'bg-[#4A7ABF] text-white',
  'Purchasing Behaviour Metrics': 'bg-[#5B8AD0] text-white',
  'Solution Requirements': 'bg-[#6C9AE0] text-white',
  'CMI Insights': 'bg-[#7DAAF0] text-white',
}

// ---------- Table component ----------
function PropositionTable({
  columns,
  data,
  searchTerm,
}: {
  columns: ColumnDef[]
  data: CustomerPremium[]
  searchTerm: string
}) {
  const [sortKey, setSortKey] = useState<keyof CustomerPremium | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = data.filter((row) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return columns.some((col) => {
      const val = row[col.key]
      return val != null && String(val).toLowerCase().includes(term)
    })
  })

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0
    const av = String(a[sortKey])
    const bv = String(b[sortKey])
    const cmp = av.localeCompare(bv, undefined, { numeric: true })
    return sortDir === 'asc' ? cmp : -cmp
  })

  const toggleSort = (key: keyof CustomerPremium) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const groups = getGroupHeaders(columns)

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full text-sm">
        <thead>
          {/* Group header row */}
          <tr>
            {groups.map((g, i) => (
              <th
                key={i}
                colSpan={g.span}
                className={`px-3 py-2 text-center text-xs font-bold uppercase tracking-wider border-b border-r border-gray-300 ${groupColors[g.group] || 'bg-gray-100'}`}
              >
                {g.group}
              </th>
            ))}
          </tr>
          {/* Column header row */}
          <tr className="bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-b border-r border-gray-200 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                style={{ minWidth: col.minWidth }}
                onClick={() => toggleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {sortKey === col.key ? (
                    sortDir === 'asc' ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, ri) => (
            <tr
              key={row.sNo}
              className={ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-3 py-2 text-xs text-gray-700 border-b border-r border-gray-100"
                  style={{ minWidth: col.minWidth }}
                >
                  {col.key === 'totalAnnualRevenue'
                    ? `$${row[col.key]}`
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------- Main component ----------
interface Props {
  title?: string
  height?: number
}

type Proposition = 'basic' | 'advanced' | 'premium'

export default function CustomerIntelligencePropositions({ title, height }: Props) {
  const [activeProp, setActiveProp] = useState<Proposition>('basic')
  const [searchTerm, setSearchTerm] = useState('')

  const propositions: { id: Proposition; label: string; description: string; columns: ColumnDef[] }[] = [
    {
      id: 'basic',
      label: 'Proposition 1 - Basic',
      description: 'Customer Information + Contact Details',
      columns: basicColumns,
    },
    {
      id: 'advanced',
      label: 'Proposition 2 - Advance',
      description: 'Basic + Professional Drivers + Purchasing Behaviour',
      columns: advancedColumns,
    },
    {
      id: 'premium',
      label: 'Proposition 3 - Premium',
      description: 'Advance + Solution Requirements + CMI Insights',
      columns: premiumColumns,
    },
  ]

  const active = propositions.find((p) => p.id === activeProp)!

  return (
    <div>
      {title && (
        <h2 className="text-lg font-bold text-gray-800 mb-1">{title}</h2>
      )}
      <p className="text-sm text-gray-500 mb-4">
        North America DIY Home Security Camera Market - Customer Database | Verified directory and insight on customers
      </p>

      {/* Proposition tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {propositions.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveProp(p.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeProp === p.id
                ? 'bg-[#2B4C7E] text-white shadow'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-3">{active.description}</p>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div style={{ maxHeight: height ? height - 120 : undefined, overflow: 'auto' }}>
        <PropositionTable
          columns={active.columns}
          data={demoData}
          searchTerm={searchTerm}
        />
      </div>

      <div className="mt-3 text-xs text-gray-400 text-right">
        Showing {demoData.length} customers
      </div>
    </div>
  )
}
