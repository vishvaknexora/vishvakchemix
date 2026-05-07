import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="bg-surface-low border-t border-surface-variant w-full">
      <div className="max-w-[1440px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <Link
            href="/"
            className="text-xl font-black tracking-tighter text-primary-container mb-4 block"
          >
            VISHVAKCHEMIX
          </Link>
          <p className="text-sm leading-relaxed text-on-surface-variant mb-2">
            WorkFlo Ahmedabad, GF-001 Mauryansh Elanza, Shyamal Cross Rd, Nr. Parekh Hospital, Satellite, Ahmedabad 380015
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant mb-1">
            <strong>Sales:</strong> Sales@vishvakchemix.com
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant mb-1">
            <strong>Purchase:</strong> purchase@vishvakchemix.com
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant mb-1">
            <strong>Support:</strong> support@vishvakchemix.com
          </p>
          <p className="text-sm leading-relaxed text-on-surface-variant mb-6">
            <strong>Phone:</strong> +91 9152911081 / +91 915291108182 / +91 915291108183
          </p>
          <p className="text-xs leading-relaxed text-outline">
            GSTIN: 27BFJPC8419N2ZY | IEC: BFJPC8419N <br />
            © {new Date().getFullYear()} Vishvakchemix. All Rights Reserved.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-semibold text-primary-container mb-4 uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/products"
                className="text-sm text-on-surface-variant hover:text-accent transition-colors"
              >
                Products Catalog
              </Link>
            </li>
            <li>
              <Link
                href="/#compliance"
                className="text-sm text-on-surface-variant hover:text-accent transition-colors"
              >
                Compliance &amp; ESG
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-semibold text-primary-container mb-4 uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="/#about"
                className="text-sm text-on-surface-variant hover:text-accent transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-sm text-on-surface-variant hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-sm text-on-surface-variant hover:text-accent transition-colors"
              >
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="text-sm font-semibold text-primary-container mb-4 uppercase tracking-wider">
            Support
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                href="mailto:sales@vishvakchemix.com"
                className="text-sm text-on-surface-variant hover:text-accent transition-colors"
              >
                Contact Support
              </Link>
            </li>
            <li>
              <Link
                href="mailto:sales@vishvakchemix.com?subject=Quote Request"
                className="text-sm text-on-surface-variant hover:text-accent transition-colors"
              >
                Request a Quote
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
