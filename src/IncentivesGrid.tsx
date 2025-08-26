import React, { useMemo, useState } from "react";
import { ChevronDown, Filter, Info, ExternalLink, Sparkles, Layers, Building2, Factory, Rocket } from "lucide-react";

/**
 * Incentives & Business Support – Interactive Grid
 * - Single-file React component using TailwindCSS
 * - Filter by Sector, Investment Size, Company Stage
 * - Includes comparison grid (cards + table view), narrative tiles, callouts, and resource links
 * - Content is illustrative/sample; replace links and amounts with your official program data as needed
 */

const ALL_SECTORS = [
  "EV/AV",
  "AgTech",
  "AI",
  "Life Sciences",
  "FinTech",
  "Advanced Manufacturing",
];

const ALL_STAGES = ["Startup", "Scale-up", "Enterprise"];

const ALL_SIZES = ["< $10M", "$10–50M", ">$50M+"];

// --- Sample Program Data (derived from your uploaded reports) ---
// Note: amounts/percentages below reflect example scenarios mentioned in the reports.
const PROGRAMS = [
  {
  id: "agriInnovate",
  program: "AgriInnovate Program",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Innovation Funding",
  sectors: ["AgTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $10M"],
  headline: "Supports innovation and commercialization in agricultural technologies.",
  estValue: "Funding up to $10M, with a $10M revenue cap.",
  useCase: "Supports growth of agri-tech businesses through funding and commercialization.",
  link: "#",
},

{
  id: "agriScience",
  program: "AgriScience Program",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Research Funding",
  sectors: ["AgTech", "BioTech"],
  stages: ["Startup", "Scale-up"],
  sizes: ["Up to $3M"],
  headline: "Funding to accelerate agricultural science research and development.",
  estValue: "Funding up to $3M, with a $3M revenue cap.",
  useCase: "Supports research projects in agriculture science and tech innovation.",
  link: "#",
},

{
  id: "canadianAgriculturalPartnership",
  program: "Canadian Agricultural Partnership (CAP)",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Agricultural Support",
  sectors: ["AgTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Comprehensive support program for agricultural innovation and growth.",
  estValue: "Varied funding options with no revenue cap.",
  useCase: "Supports agri-business growth, innovation, and market development.",
  link: "#",
},

{
  id: "bdcCapital",
  program: "BDC Capital",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Investment and Financing",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Up to $50M", "$250K–$50M"],
  headline: "Provides capital investments to support business growth across multiple sectors.",
  estValue: "Funding up to $50M with no revenue cap.",
  useCase: "Supports scaling and expansion of innovative businesses.",
  link: "#",
},

{
  id: "bdcAdvisoryServices",
  program: "BDC Advisory Services",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Business Consulting",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: [],
  headline: "Consulting services to help businesses improve performance and strategy.",
  estValue: "No direct funding; advisory support.",
  useCase: "Supports business growth through expert advisory services.",
  link: "#",
},

{
  id: "bdcFinancing",
  program: "BDC Financing",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Business Financing",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Flexible financing options for growing businesses across sectors.",
  estValue: "Funding varies with no revenue cap.",
  useCase: "Supports capital needs for business expansion and innovation.",
  link: "#",
},

{
  id: "sredTaxIncentive",
  program: "SR&ED Tax Incentive Program",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Tax Incentive",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: [],
  headline: "Tax credits for scientific research and experimental development.",
  estValue: "Up to 35% investment tax credit; no revenue cap.",
  useCase: "Supports R&D activities through tax incentives.",
  link: "#",
},

{
  id: "acceleratedInvestmentIncentive",
  program: "Accelerated Investment Incentive",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Tax Incentive",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: [],
  headline: "Incentives to accelerate investment in eligible assets.",
  estValue: "Varies based on investment; no revenue cap.",
  useCase: "Encourages business investment through accelerated tax deductions.",
  link: "#",
},

{
  id: "tradeCommissionerExportMarketDiversification",
  program: "Trade Commissioner Export Market Diversification",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Export Support",
  sectors: ["AgTech", "EV/AV", "FinTech"],
  stages: [],
  sizes: [],
  headline: "Assists Canadian businesses in expanding to new export markets.",
  estValue: "Non-financial support; advisory services.",
  useCase: "Helps diversify international trade opportunities.",
  link: "#",
},

{
  id: "exportSupportProgram",
  program: "Export Support Program",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Export Support",
  sectors: ["AgTech", "EV/AV", "BioTech"],
  stages: [],
  sizes: ["Varies"],
  headline: "Financial support to boost export activities.",
  estValue: "Varied funding to assist export expansion.",
  useCase: "Supports businesses entering or expanding export markets.",
  link: "#",
},

{
  id: "detroitBlightRemovalProgram",
  program: "Detroit Blight Removal Program",
  country: "USA",
  jurisdiction: "Detroit Metro",
  type: "Community Revitalization",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $5M", "$50K–$5M"],
  headline: "Funding to remove blight and improve Detroit neighborhoods.",
  estValue: "Funding up to $5M with $10M revenue cap.",
  useCase: "Supports urban redevelopment and community improvement projects.",
  link: "#",
},

{
  id: "neighborhoodBusinessRevitalizationProgram",
  program: "Neighborhood Business Revitalization Program",
  country: "USA",
  jurisdiction: "Detroit Metro",
  type: "Business Revitalization",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $5M", "$50K–$5M"],
  headline: "Supports neighborhood business growth and revitalization efforts.",
  estValue: "Funding up to $5M with $10M revenue cap.",
  useCase: "Helps businesses revitalize local Detroit communities.",
  link: "#",
},

{
  id: "detroitBrownfieldRedevelopmentProgram",
  program: "Detroit Brownfield Redevelopment Program",
  country: "USA",
  jurisdiction: "Detroit Metro",
  type: "Environmental Redevelopment",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $5M", "$50K–$5M"],
  headline: "Funding for redevelopment of contaminated brownfield sites.",
  estValue: "Funding up to $5M with $10M revenue cap.",
  useCase: "Supports cleanup and redevelopment of urban brownfield areas.",
  link: "#",
},

{
  id: "feddevOntarioBusinessScaleupAndProductivityProgram",
  program: "FedDev Ontario Business Scale-up and Productivity Program",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Business Growth",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $10M", "$125K–$10M"],
  headline: "Supports business scaling and productivity improvements in Ontario.",
  estValue: "Funding up to $10M with $5M revenue cap.",
  useCase: "Helps Ontario businesses scale and improve productivity.",
  link: "#",
},

{
  id: "feddevOntarioInnovationProgramming",
  program: "FedDev Ontario Innovation Programming",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Innovation Support",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $5M", "$100K–$5M"],
  headline: "Provides innovation funding and support for Ontario businesses.",
  estValue: "Funding up to $5M with $5M revenue cap.",
  useCase: "Supports business innovation and technology adoption in Ontario.",
  link: "#",
},

  {
  id: "investOntarioFund",
  program: "Invest Ontario Fund (IOF)",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Investment and Financing",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $4M", "$250K–$35M"],
  headline: "Provides significant capital investment to support business growth across sectors.",
  estValue: "Funding up to $4M with no revenue cap.",
  useCase: "Supports scaling and expansion of innovative businesses.",
  link: "#",
},

{
  id: "customizedWorkingCapital",
  program: "Customized Working Capital",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Working Capital Financing",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["$250K–$35M"],
  headline: "Flexible working capital financing tailored to business needs.",
  estValue: "No revenue cap; financing varies.",
  useCase: "Supports operational liquidity and business continuity.",
  link: "#",
},

{
  id: "sredTaxIncentiveInvestOntario",
  program: "SR&ED Tax Incentive",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Tax Incentive",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: [],
  headline: "Tax credits for research and experimental development activities.",
  estValue: "No revenue cap; varied funding based on eligible R&D expenses.",
  useCase: "Encourages innovation through tax incentives.",
  link: "#",
},

{
  id: "canadaDigitalAdoptionProgram",
  program: "Canada Digital Adoption Program (CDAP)",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Digital Adoption Support",
  sectors: ["AgTech", "EV/AV", "BioTech"],
  stages: ["Startup", "Scale-up"],
  sizes: ["Up to $15K", "$0–$100K"],
  headline: "Supports small businesses adopting digital technologies.",
  estValue: "Funding up to $15K with $10M revenue cap.",
  useCase: "Helps small businesses improve competitiveness through digital tools.",
  link: "#",
},

{
  id: "innovativeSolutionsCanada",
  program: "Innovative Solutions Canada (ISC)",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Innovation Procurement",
  sectors: ["AgTech", "EV/AV", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Up to $150K per phase"],
  headline: "Government procurement program to support innovative solutions.",
  estValue: "Funding up to $150K per phase with no revenue limit.",
  useCase: "Helps innovators develop and test solutions through government contracts.",
  link: "#",
},

{
  id: "strategicInnovationFund",
  program: "Strategic Innovation Fund (SIF)",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Innovation and Growth Funding",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Enterprise"],
  sizes: ["Up to $50M", "$1M+"],
  headline: "Large-scale funding to support innovation and business growth.",
  estValue: "Funding up to $50M with $10M revenue cap.",
  useCase: "Supports large projects advancing Canadian innovation.",
  link: "#",
},

{
  id: "ontarioTogetherTradeFund",
  program: "Ontario Together Trade Fund (OTTF)",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Trade Support",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Supports businesses in Ontario to expand export opportunities.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Helps Ontario companies access new markets.",
  link: "#",
},

{
  id: "siteReadinessProgram",
  program: "Site Readiness Program",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Infrastructure Support",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Up to $25K"],
  headline: "Supports preparation of sites for business and industrial use.",
  estValue: "Funding up to $25K with no revenue cap.",
  useCase: "Helps businesses access ready-to-use sites.",
  link: "#",
},

{
  id: "skillsDevelopmentFund",
  program: "Skills Development Fund",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Workforce Development",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Funding to support workforce skills training and development.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Helps businesses train and upskill their workforce.",
  link: "#",
},

{
  id: "workforceDevelopmentStream",
  program: "Workforce Development Stream",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Workforce Development",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Supports workforce training initiatives to meet evolving business needs.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Helps improve employee skills and business productivity.",
  link: "#",
},

{
  id: "canadaOntarioJobGrant",
  program: "Canada-Ontario Job Grant",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Workforce Training",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Provides funding for employer-driven employee training programs.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Supports employer investment in workforce skills development.",
  link: "#",
},

{
  id: "michiganBusinessDevelopmentProgram",
  program: "Michigan Business Development Program (MBDP)",
  country: "USA",
  jurisdiction: "Michigan",
  type: "Business Growth and Development",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $10M", "$100K–$10M"],
  headline: "Incentives to promote business growth and job creation in Michigan.",
  estValue: "Funding up to $10M with $25M revenue cap.",
  useCase: "Supports business expansions and workforce growth.",
  link: "#",
},

{
  id: "michiganStrategicFund",
  program: "Michigan Strategic Fund (MSF)",
  country: "USA",
  jurisdiction: "Michigan",
  type: "Investment and Incentives",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $10M", "$100K–$10M"],
  headline: "Funds strategic projects supporting Michigan’s economic development.",
  estValue: "Funding up to $10M with $25M revenue cap.",
  useCase: "Supports strategic investments and job creation.",
  link: "#",
},

{
  id: "industryClusterDevelopmentFund",
  program: "Industry Cluster Development Fund",
  country: "USA",
  jurisdiction: "Michigan",
  type: "Cluster Development",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $10M", "$100K–$10M"],
  headline: "Supports industry clusters to boost regional economic growth.",
  estValue: "Funding up to $10M with $25M revenue cap.",
  useCase: "Encourages collaboration and growth within industry clusters.",
  link: "#",
},

{
  id: "mitacsAccelerateProgram",
  program: "Mitacs Accelerate Program",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Research Partnership Funding",
  sectors: ["AgTech", "BioTech"],
  stages: ["Startup", "Scale-up"],
  sizes: ["Varies"],
  headline: "Funding to connect businesses with research expertise.",
  estValue: "Varied funding levels with no revenue cap.",
  useCase: "Supports R&D through university-industry partnerships.",
  link: "#",
},

  {
  id: "mitacsElevateProgram",
  program: "Mitacs Elevate Program",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Research Partnership Funding",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up"],
  sizes: ["Varies"],
  headline: "Postdoctoral fellowship program connecting businesses with research expertise.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Supports R&D through university-industry partnerships.",
  link: "#",
},

{
  id: "mitacsBusinessStrategyInternship",
  program: "Mitacs Business Strategy Internship",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Internship Program",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: [],
  sizes: ["Varies"],
  headline: "Internships focused on business strategy and innovation.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Supports business innovation through strategic internships.",
  link: "#",
},

{
  id: "energyInnovationProgram",
  program: "Energy Innovation Program",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Energy Innovation Funding",
  sectors: ["BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $5M", "$50K–$3M"],
  headline: "Funds projects advancing clean energy technologies.",
  estValue: "Funding up to $5M with no revenue limit.",
  useCase: "Supports clean energy R&D and demonstration projects.",
  link: "#",
},

{
  id: "cleanGrowthProgram",
  program: "Clean Growth Program",
  country: "Canada",
  jurisdiction: "Canada",
  type: "Clean Technology Funding",
  sectors: ["BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $5M", "$250K–$5M"],
  headline: "Supports development and demonstration of clean technologies.",
  estValue: "Funding up to $5M with $50M revenue cap.",
  useCase: "Promotes environmental sustainability through technology.",
  link: "#",
},

{
  id: "ociVoucherForInnovationAndProductivity",
  program: "OCI Voucher for Innovation and Productivity (VIP)",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Innovation Support",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up"],
  sizes: ["Up to $50,000"],
  headline: "Provides vouchers for innovation and productivity improvement projects.",
  estValue: "Funding up to $50,000 max.",
  useCase: "Helps businesses improve productivity through innovation.",
  link: "#",
},

{
  id: "ociMarketReadinessProgram",
  program: "OCI Market Readiness Program",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Market Development",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Supports market readiness and commercialization activities.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Helps businesses prepare products for market entry.",
  link: "#",
},

{
  id: "ociCollaborativeResearchDevelopmentFund",
  program: "OCI Collaborative Research & Development Fund",
  country: "Canada",
  jurisdiction: "Ontario",
  type: "Collaborative R&D Funding",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Funding to support collaborative research and development projects.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Promotes partnerships between industry and research institutions.",
  link: "#",
},

{
  id: "sbirUsFederalGovernment",
  program: "SBIR (Small Business Innovation Research)",
  country: "USA",
  jurisdiction: "USA",
  type: "Research and Innovation Funding",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Up to $1.5M"],
  headline: "Federal funding to support innovative research by small businesses.",
  estValue: "Funding up to $1.5M with no revenue cap.",
  useCase: "Encourages commercialization of innovative technologies.",
  link: "#",
},

{
  id: "sttrUsFederalGovernment",
  program: "STTR (Small Business Technology Transfer)",
  country: "USA",
  jurisdiction: "USA",
  type: "Research and Innovation Funding",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Up to $1.5M"],
  headline: "Funds cooperative R&D between small businesses and research institutions.",
  estValue: "Funding up to $1.5M with no revenue cap.",
  useCase: "Supports tech transfer and innovation commercialization.",
  link: "#",
},

{
  id: "economicDevelopmentAdministrationGrants",
  program: "Economic Development Administration (EDA) Grants",
  country: "USA",
  jurisdiction: "USA",
  type: "Economic Development Grants",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "Grants to support economic development and business growth.",
  estValue: "Varied funding with no revenue cap.",
  useCase: "Supports regional economic growth projects.",
  link: "#",
},

{
  id: "sbirUsSba",
  program: "SBIR (Small Business Innovation Research)",
  country: "USA",
  jurisdiction: "USA",
  type: "Research and Innovation Funding",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Up to $1.5M"],
  headline: "SBA program funding innovative small business research.",
  estValue: "Funding up to $1.5M with no revenue cap.",
  useCase: "Promotes commercialization of innovations.",
  link: "#",
},

{
  id: "sttrUsSba",
  program: "STTR (Small Business Technology Transfer)",
  country: "USA",
  jurisdiction: "USA",
  type: "Research and Innovation Funding",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Startup", "Scale-up", "Enterprise"],
  sizes: ["Up to $1.5M"],
  headline: "SBA program supporting research collaboration and tech transfer.",
  estValue: "Funding up to $1.5M with no revenue cap.",
  useCase: "Supports technology commercialization efforts.",
  link: "#",
},

{
  id: "sevenALoanProgram",
  program: "7(a) Loan Program",
  country: "USA",
  jurisdiction: "USA",
  type: "Loan Financing",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Varies"],
  headline: "SBA-backed loan program supporting business financing needs.",
  estValue: "Varied loan amounts with no revenue cap.",
  useCase: "Provides capital to support business operations and growth.",
  link: "#",
},

{
  id: "wayneCountySmallBusinessRecoveryGrant",
  program: "Wayne County Small Business Recovery Grant",
  country: "USA",
  jurisdiction: "Wayne County",
  type: "Business Recovery Grant",
  sectors: ["AgTech", "EV/AV", "FinTech", "BioTech"],
  stages: ["Scale-up", "Enterprise"],
  sizes: ["Up to $5M", "$50K–$5M"],
  headline: "Grant program supporting small business recovery in Wayne County.",
  estValue: "Funding up to $5M with $10M revenue cap.",
  useCase: "Helps local businesses recover and sustain operations post-crisis.",
  link: "#",
},  
];

const NARRATIVES = [
  {
    id: "n1",
    title: "AgTech Sensors: R&D in Ontario, Packaging in Detroit",
    icon: <LeafIcon />,
    bullets: [
      "Ontario greenhouse pilots + SR&ED + SODF",
      "Detroit-side food processing & distribution",
      "Dual-market sales with just-in-time cross-border logistics",
    ],
  },
  {
    id: "n2",
    title: "EV/AV Components: Design in Windsor, Manufacture in Detroit",
    icon: <CarIcon />,
    bullets: [
      "Canadian R&D incentives + university partnerships",
      "MCRP + brownfield tools for Detroit factory",
      "OEM proximity and supplier agglomeration",
    ],
  },
  {
    id: "n3",
    title: "FinTech & Data: Train in Windsor, Scale in Detroit",
    icon: <Rocket className="w-5 h-5" />,
    bullets: [
      "University-led talent pipelines",
      "U.S. market access with financial services clients",
      "Stack R&D credits on both sides for product development",
    ],
  },
];

export default function IncentivesGrid() {
  const [sector, setSector] = useState<string>("All");
  const [stage, setStage] = useState<string>("All");
  const [size, setSize] = useState<string>("All");
  const [view, setView] = useState<"cards" | "table">("cards");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return PROGRAMS.filter((p) => {
      const sectorOk = sector === "All" || p.sectors.includes(sector);
      const stageOk = stage === "All" || p.stages.includes(stage);
      const sizeOk = size === "All" || p.sizes.includes(size);
      const text = `${p.program} ${p.country} ${p.type} ${p.headline} ${p.useCase}`.toLowerCase();
      const searchOk = !search.trim() || text.includes(search.toLowerCase());
      return sectorOk && stageOk && sizeOk && searchOk;
    });
  }, [sector, stage, size, search]);

  return (
    <div className="min-h-screen w-full bg-white text-gray-900">
      {/* HERO */}
      <section className="px-6 md:px-10 lg:px-16 py-10 border-b">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              One Region, Dual Advantage
            </h1>
            <p className="mt-3 text-lg">
              Maximize R&D in <span className="font-semibold">Canada</span>,
              scale manufacturing in the <span className="font-semibold">U.S.</span>
            </p>
            <p className="mt-4 text-gray-700">
              Compare grants, loans, tax credits, and trade tools across Windsor–Detroit. Stack incentives on both sides of the border and design a bifurcated strategy that accelerates R&D while scaling production.
            </p>
            <div className="mt-6 flex gap-3">
              <Badge icon={<Sparkles className="w-4 h-4" />}>Canada = R&D & Innovation Edge</Badge>
              <Badge icon={<Layers className="w-4 h-4" />}>U.S. = Manufacturing Scale & Logistics</Badge>
            </div>
          </div>
          <div className="rounded-2xl border p-6 shadow-sm bg-gradient-to-br from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Filter Incentives</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              <Select
                label="Sector"
                value={sector}
                onChange={setSector}
                options={["All", ...ALL_SECTORS]}
              />
              <Select
                label="Investment Size"
                value={size}
                onChange={setSize}
                options={["All", ...ALL_SIZES]}
              />
              <Select
                label="Company Stage"
                value={stage}
                onChange={setStage}
                options={["All", ...ALL_STAGES]}
              />
              <div className="col-span-2 md:col-span-3">
                <label className="text-xs font-medium text-gray-600">Search</label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Try 'battery', 'greenhouse', 'brownfield'…"
                  className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <ViewToggle label="Cards" active={view === "cards"} onClick={() => setView("cards")} />
                <ViewToggle label="Table" active={view === "table"} onClick={() => setView("table")} />
              </div>
              <small className="text-gray-600">{filtered.length} programs</small>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 md:px-10 lg:px-16 py-10">
        <div className="max-w-6xl mx-auto">
          {view === "cards" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProgramCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto border rounded-2xl">
              <table className="min-w-[900px] w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <Th>Program</Th>
                    <Th>Country</Th>
                    <Th>Type</Th>
                    <Th>Sectors</Th>
                    <Th>Stage</Th>
                    <Th>Size</Th>
                    <Th>Typical Value</Th>
                    <Th>Use Case</Th>
                    <Th></Th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-t">
                      <Td className="font-medium">{p.program}</Td>
                      <Td>{p.country}</Td>
                      <Td>{p.type}</Td>
                      <Td>{p.sectors.join(", ")}</Td>
                      <Td>{p.stages.join(", ")}</Td>
                      <Td>{p.sizes.join(", ")}</Td>
                      <Td>{p.estValue}</Td>
                      <Td>{p.useCase}</Td>
                      <Td>
                        <a href={p.link} className="inline-flex items-center gap-1 text-sm underline">
                          Details <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* NARRATIVE TILES */}
      <section className="px-6 md:px-10 lg:px-16 py-12 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold">Narrative Tiles: How Companies Stack Incentives</h2>
          <p className="text-gray-700 mt-2">Hypothetical journeys that combine Canadian R&D advantages with U.S. production scale.</p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {NARRATIVES.map((n) => (
              <div key={n.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    {n.icon}
                  </div>
                  <h3 className="font-semibold leading-tight">{n.title}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc pl-5">
                  {n.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLEMENTARY CALLOUT */}
      <section className="px-6 md:px-10 lg:px-16 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-start">
          <div className="rounded-2xl border p-6 bg-gradient-to-br from-white to-gray-50 shadow-sm">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Sparkles className="w-5 h-5" /> Canada = R&D & Innovation Edge</h3>
            <ul className="mt-3 space-y-2 text-gray-700 text-sm list-disc pl-5">
              <li>R&D tax credits (e.g., SR&ED) + university partnerships</li>
              <li>Talent access (STEM immigration) and competitive labor costs</li>
              <li>Clean energy mix and test facilities (e.g., AV tracks)</li>
            </ul>
          </div>
          <div className="rounded-2xl border p-6 bg-gradient-to-br from-white to-gray-50 shadow-sm">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Factory className="w-5 h-5" /> U.S. = Manufacturing Scale & Logistics</h3>
            <ul className="mt-3 space-y-2 text-gray-700 text-sm list-disc pl-5">
              <li>OEM proximity and supplier agglomeration</li>
              <li>Brownfield & revitalization tools (e.g., MCRP) for plant buildouts</li>
              <li>Trade tools (e.g., FTZ) for JIT cross-border operations</li>
            </ul>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="px-6 md:px-10 lg:px-16 py-12 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold flex items-center gap-2"><Info className="w-5 h-5" /> Resources</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <ResourceCard
              title="Invest WindsorEssex"
              href="https://www.investwindsoressex.com"
              desc="Local support for incentives, site selection, and sector programs."
            />
            <ResourceCard
              title="Detroit Regional Chamber"
              href="https://www.detroitchamber.com"
              desc="Regional business advocacy and U.S. market entry support."
            />
            <ResourceCard
              title="Consulate General of Canada – Detroit"
              href="https://www.international.gc.ca/country-pays/us-eu/detroit.aspx"
              desc="Trade commissioner services and cross-border guidance."
            />
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <footer className="px-6 md:px-10 lg:px-16 py-8 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto">
          Program details shown here are examples for planning. Confirm current eligibility and amounts with program administrators.
        </div>
      </footer>
    </div>
  );
}

// --- UI Subcomponents ---
function ProgramCard({ p }: { p: any }) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm bg-white flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-gray-500">{p.jurisdiction}</div>
          <h3 className="mt-1 text-base font-semibold leading-tight">{p.program}</h3>
          <div className="mt-1 text-xs text-gray-600">{p.country} • {p.type}</div>
        </div>
        <span className="inline-flex items-center rounded-full bg-gray-100 text-gray-800 px-2 py-1 text-xs font-medium">{p.sectors[0]}</span>
      </div>
      <p className="mt-3 text-sm text-gray-700">{p.headline}</p>
      <div className="mt-3 text-sm"><span className="font-medium">Typical value:</span> {p.estValue}</div>
      <div className="mt-1 text-sm text-gray-700"><span className="font-medium">Use case:</span> {p.useCase}</div>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <Badge subtle>{p.stages.join(" · ")}</Badge>
        <Badge subtle>{p.sizes.join(" · ")}</Badge>
      </div>
      <div className="mt-4 pt-4 border-t">
        <a href={p.link} className="inline-flex items-center gap-1 text-sm underline">Details <ExternalLink className="w-3.5 h-3.5" /></a>
      </div>
    </div>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th className="text-left font-semibold text-gray-700 text-xs uppercase tracking-wide px-4 py-3">
    {children}
  </th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

function ViewToggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-sm ${active ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"}`}
    >
      {label}
    </button>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-1 w-full rounded-xl border px-3 py-2 flex items-center justify-between text-left"
      >
        <span>{value}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-xl border bg-white shadow-lg max-h-64 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${opt === value ? "bg-gray-100" : ""}`}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ResourceCard({ title, href, desc }: { title: string; href: string; desc: string }) {
  return (
    <a href={href} className="rounded-2xl border p-5 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2">
        <Building2 className="w-5 h-5" />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-700 mt-2">{desc}</p>
      <div className="mt-3 inline-flex items-center gap-1 text-sm underline">Visit site <ExternalLink className="w-3.5 h-3.5" /></div>
    </a>
  );
}

function Badge({ children, icon, subtle = false }: { children: React.ReactNode; icon?: React.ReactNode; subtle?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs ${subtle ? "bg-gray-100 text-gray-800" : "bg-gray-900 text-white"}`}>
      {icon}
      {children}
    </span>
  );
}

function LeafIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C7 2 3 6 3 11c0 5 4 9 9 9s9-4 9-9c0-.34-.02-.67-.05-1a8.98 8.98 0 00-3.18-5.56A8.98 8.98 0 0012 2zm-1 13c-1.86 0-3.41-1.28-3.86-3h1.02c.4 1.16 1.52 2 2.84 2 1.65 0 3-1.35 3-3 0-1.32-.84-2.44-2-2.84V5.14C14.72 5.59 16 7.14 16 9c0 2.21-1.79 4-4 4z" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.92 6.01A2 2 0 0017 5H7c-.83 0-1.54.5-1.84 1.25L3 10v8a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-8l-2.08-3.99zM6.85 7h10.29l1.04 2H5.81l1.04-2zM6 15a2 2 0 114 0H6zm8 0a2 2 0 114 0h-4z" />
    </svg>
  );
}
