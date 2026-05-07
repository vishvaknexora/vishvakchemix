import { getStaticChemicalById, getStaticChemicals } from "@/lib/static-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, FileText, Truck, ShieldCheck, FlaskConical, Package, Award } from "lucide-react";

export function generateStaticParams() {
  const chemicals = getStaticChemicals();
  return chemicals.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const chemical = getStaticChemicalById(id);
  if (!chemical) return { title: "Chemical Not Found" };
  return {
    title: `${chemical.title} - Vishvak Chemix Pvt. Ltd.`,
    description: chemical.description,
  };
}

export default async function ChemicalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chemical = getStaticChemicalById(id);
  if (!chemical) return notFound();

  // Get related chemicals in the same category
  const allChemicals = getStaticChemicals();
  const related = allChemicals
    .filter((c) => c.category === chemical.category && c.id !== chemical.id)
    .slice(0, 4);

  const applications = chemical.applications
    ? chemical.applications.split(",").map((a) => a.trim())
    : [];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb + Hero Banner */}
      <section className="bg-primary pt-12 pb-16 px-6 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/products" className="hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/products`}
              className="hover:text-white transition-colors"
            >
              {chemical.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{chemical.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/20">
                  <FlaskConical className="w-7 h-7" />
                </div>
                <span className="text-xs font-semibold bg-white/10 text-white/90 px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                  {chemical.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-black tracking-tight mb-3">
                {chemical.title}
              </h1>
              <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                {chemical.description}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="mailto:Sales@vishvakchemix.com?subject=Quote Request"
                className="bg-accent text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-all shadow-lg hover:shadow-xl"
              >
                Request Quote
              </Link>
              <Link
                href="/products"
                className="bg-white/10 text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-white/20 transition-all border border-white/20"
              >
                All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Details Grid */}
      <section className="py-16 px-6 md:px-8 bg-surface">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Specifications Card */}
            <div className="bg-white rounded-xl border border-surface-variant p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                <FlaskConical className="w-5 h-5 text-accent" />
                Product Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {chemical.casNumber && chemical.casNumber !== "N/A" && (
                  <div className="bg-surface-low rounded-lg p-4 border border-surface-variant">
                    <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                      CAS Number
                    </span>
                    <span className="text-lg font-mono font-bold text-primary">
                      {chemical.casNumber}
                    </span>
                  </div>
                )}
                {chemical.purity && (
                  <div className="bg-surface-low rounded-lg p-4 border border-surface-variant">
                    <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                      Purity Grade
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {chemical.purity}
                    </span>
                  </div>
                )}
                <div className="bg-surface-low rounded-lg p-4 border border-surface-variant">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                    Category
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {chemical.category}
                  </span>
                </div>
                <div className="bg-surface-low rounded-lg p-4 border border-surface-variant">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">
                    Status
                  </span>
                  <span className="text-lg font-bold text-accent">
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Applications Card */}
            {applications.length > 0 && (
              <div className="bg-white rounded-xl border border-surface-variant p-8 shadow-sm">
                <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Package className="w-5 h-5 text-accent" />
                  Applications &amp; Use Cases
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {applications.map((app) => (
                    <div
                      key={app}
                      className="flex items-center gap-3 bg-surface-low rounded-lg p-4 border border-surface-variant hover:border-accent/30 transition-colors"
                    >
                      <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-sm font-medium text-on-surface">
                        {app}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description Card */}
            <div className="bg-white rounded-xl border border-surface-variant p-8 shadow-sm">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-3">
                <FileText className="w-5 h-5 text-accent" />
                Product Overview
              </h2>
              <p className="text-on-surface-variant leading-relaxed">
                {chemical.description} Vishvak Chemix supplies this product in
                multiple grades suitable for industrial, pharmaceutical, and
                laboratory applications. All products undergo rigorous quality
                control to maintain our 99.9% purity standards.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-primary rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">
                Need Custom Specifications?
              </h3>
              <p className="text-white/70 text-sm mb-5 leading-relaxed">
                We offer custom synthesis and can tailor purity grades,
                packaging, and quantities to your exact requirements.
              </p>
              <Link
                href="mailto:Sales@vishvakchemix.com?subject=Custom Specifications"
                className="block bg-accent text-white text-center px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-lg hover:bg-accent-hover transition-all w-full"
              >
                Contact Us
              </Link>
            </div>

            {/* Quality Assurance */}
            <div className="bg-white rounded-xl border border-surface-variant p-6 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-4">
                Quality Assurance
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <Award className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  ISO 9001:2015 Certified
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <FlaskConical className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  COA provided with shipment
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Global shipping available
                </li>
                <li className="flex items-start gap-3 text-sm text-on-surface-variant">
                  <Package className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  Custom packaging options
                </li>
              </ul>
            </div>

            {/* Documentation */}
            <div className="bg-white rounded-xl border border-surface-variant p-6 shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-4">
                Documentation
              </h3>
              <div className="space-y-2">
                <Link
                  href="mailto:Sales@vishvakchemix.com?subject=SDS Request"
                  className="w-full flex items-center gap-3 bg-surface-low rounded-lg p-3 border border-surface-variant hover:border-accent/30 transition-colors text-left"
                >
                  <FileText className="w-5 h-5 text-accent" />
                  <div>
                    <span className="text-sm font-medium text-on-surface block">
                      Safety Data Sheet
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Request SDS via email
                    </span>
                  </div>
                </Link>
                <Link
                  href="mailto:Sales@vishvakchemix.com?subject=TDS Request"
                  className="w-full flex items-center gap-3 bg-surface-low rounded-lg p-3 border border-surface-variant hover:border-accent/30 transition-colors text-left"
                >
                  <FileText className="w-5 h-5 text-accent" />
                  <div>
                    <span className="text-sm font-medium text-on-surface block">
                      Technical Data Sheet
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Request TDS via email
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 px-6 md:px-8 bg-white border-t border-surface-variant">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl font-black text-primary mb-8">
              Related Products in {chemical.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="block bg-surface-low border border-surface-variant p-6 rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
