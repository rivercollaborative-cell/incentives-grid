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
    id: "sred",
    program: "Scientific Research & Experimental Development (SR&ED)",
    country: "Canada",
    jurisdiction: "Federal (Canada)",
    type: "Tax Credit",
    sectors: ["EV/AV", "AgTech", "AI", "Life Sciences", "FinTech", "Advanced Manufacturing"],
    stages: ["Startup", "Scale-up", "Enterprise"],
    sizes: ["< $10M", "$10–50M", ">$50M+"],
    headline: "Refundable/Non-refundable credits on eligible R&D costs",
    estValue: "Up to ~35% refundable (example scenario)",
    useCase: "R&D performed in Windsor/Essex; pairs well with university partnerships.",
    link: "#",
  },
  {
    id: "sodf",
    program: "Southwestern Ontario Development Fund (SODF)",
    country: "Canada",
    jurisdiction: "Ontario",
    type: "Grant / Loan (Stackable)",
    sectors: ["EV/AV", "AgTech", "Advanced Manufacturing"],
    stages: ["Startup", "Scale-up", "Enterprise"],
    sizes: ["< $10M", "$10–50M", ">$50M+"],
    headline: "Ontario support for expansions and technology adoption",
    estValue: "Example: 15% of project costs (e.g., $90,000 on $600,000)",
    useCase: "R&D or pilot production investments on the Ontario side.",
    link: "#",
  },
  {
    id: "us_rd",
    program: "U.S. Federal R&D Tax Credit",
    country: "United States",
    jurisdiction: "Federal (U.S.)",
    type: "Tax Credit",
    sectors: ["EV/AV", "AgTech", "AI", "Life Sciences", "FinTech", "Advanced Manufacturing"],
    stages: ["Startup", "Scale-up", "Enterprise"],
    sizes: ["< $10M", "$10–50M", ">$50M+"],
    headline: "Credit on qualified U.S.-based research expenses",
    estValue: "Typical effective range 6–8% (varies by method)",
    useCase: "Detroit-side prototyping, software, or process R&D.",
    link: "#",
  },
  {
    id: "mcrp",
    program: "Michigan Community Revitalization Program (MCRP)",
    country: "United States",
    jurisdiction: "Michigan",
    type: "Grant / Loan / Abatement",
    sectors: ["EV/AV", "AgTech", "Advanced Manufacturing", "Life Sciences"],
    stages: ["Scale-up", "Enterprise"],
    sizes: ["$10–50M", ">$50M+"],
    headline: "Support for transformational/brownfield redevelopment projects",
    estValue: "Example: ~25% of eligible investment (illustrative from report scenario)",
    useCase: "Detroit manufacturing or facility redevelopment to scale production.",
    link: "#",
  },
  {
    id: "brownfield",
    program: "State/Local Brownfield Tools (Detroit/Michigan)",
    country: "United States",
    jurisdiction: "Michigan / Detroit",
    type: "Tax Abatements / TIF",
    sectors: ["EV/AV", "Advanced Manufacturing", "AgTech"],
    stages: ["Scale-up", "Enterprise"],
    sizes: ["$10–50M", ">$50M+"],
    headline: "Property tax capture, abatements, and site-readiness incentives",
    estValue: "Project-specific (stackable with MCRP/MEDC tools)",
    useCase: "U.S. manufacturing lines, logistics, and processing capacity.",
    link: "#",
  },
  {
    id: "ftz",
    program: "Foreign-Trade Zone (Detroit FTZ) – Duty Deferral/Reduction",
    country: "United States",
    jurisdiction: "Detroit Metro",
    type: "Trade Facilitation",
    sectors: ["AgTech", "EV/AV", "Advanced Manufacturing"],
    stages: ["Scale-up", "Enterprise"],
    sizes: ["$10–50M", ">$50M+"],
    headline: "Reduce duties, improve cross-border logistics on U.S. side",
    estValue: "Duty deferral/possible reduction (case-dependent)",
    useCase: "Just-in-time imports/exports aligned with binational supply chains.",
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
