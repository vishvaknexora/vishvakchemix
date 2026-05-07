import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const baseProducts = [
  {
    name: "Acetic Acid",
    category: "Acids",
    formula: "CH3COOH",
    cas_number: "64-19-7",
    description: "Widely used organic acid in food, pharma, and industrial synthesis.",
    applications: "Food additive, Chemical synthesis, Textiles",
  },
  {
    name: "Citric Acid",
    category: "Acids",
    formula: "C6H8O7",
    cas_number: "77-92-9",
    description: "Weak organic acid used as preservative and flavoring agent.",
    applications: "Food, Pharma, Cosmetics",
  },
  {
    name: "Benzoic Acid",
    category: "Acids",
    formula: "C7H6O2",
    cas_number: "65-85-0",
    description: "Used as preservative and intermediate in chemical production.",
    applications: "Food preservative, Pharma",
  },
  {
    name: "Boric Acid",
    category: "Acids",
    formula: "H3BO3",
    cas_number: "10043-35-3",
    description: "Antiseptic and buffering agent.",
    applications: "Pharma, Glass, Ceramics",
  },
  {
    name: "Ammonium Chloride",
    category: "Salts",
    formula: "NH4Cl",
    cas_number: "12125-02-9",
    description: "Used in fertilizers and pharmaceuticals.",
    applications: "Agriculture, Pharma",
  },
  {
    name: "Ammonium Sulfate",
    category: "Salts",
    formula: "(NH4)2SO4",
    cas_number: "7783-20-2",
    description: "Common fertilizer and lab reagent.",
    applications: "Fertilizer, Biochemistry",
  },
  {
    name: "Sodium Chloride",
    category: "Salts",
    formula: "NaCl",
    cas_number: "7647-14-5",
    description: "Essential salt used in food and industry.",
    applications: "Food, Chemical processing",
  },
  {
    name: "Potassium Permanganate",
    category: "Salts",
    formula: "KMnO4",
    cas_number: "7722-64-7",
    description: "Strong oxidizing agent.",
    applications: "Water treatment, Medical",
  },
  {
    name: "Magnesium Stearate",
    category: "Pharmaceutical Excipients",
    formula: "C36H70MgO4",
    cas_number: "557-04-0",
    description: "Lubricant used in tablet manufacturing.",
    applications: "Pharma",
  },
  {
    name: "Povidone",
    category: "Pharmaceutical Excipients",
    formula: "C6H9NO",
    cas_number: "9003-39-8",
    description: "Binder in pharmaceutical tablets.",
    applications: "Pharma",
  },
  {
    name: "Glycerol",
    category: "Alcohols",
    formula: "C3H8O3",
    cas_number: "56-81-5",
    description: "Humectant used in food and cosmetics.",
    applications: "Cosmetics, Food",
  },
  {
    name: "Isopropyl Alcohol",
    category: "Alcohols",
    formula: "C3H8O",
    cas_number: "67-63-0",
    description: "Common disinfectant and solvent.",
    applications: "Medical, Cleaning",
  },
  {
    name: "EDTA",
    category: "Specialty Chemicals",
    formula: "C10H16N2O8",
    cas_number: "60-00-4",
    description: "Chelating agent used to bind metal ions.",
    applications: "Water treatment, Pharma",
  },
  {
    name: "Resorcinol",
    category: "Specialty Chemicals",
    formula: "C6H6O2",
    cas_number: "108-46-3",
    description: "Used in resins and adhesives.",
    applications: "Rubber, Adhesives",
  },
  {
    name: "Calcium Carbonate",
    category: "Metal Compounds",
    formula: "CaCO3",
    cas_number: "471-34-1",
    description: "Used in construction and pharma.",
    applications: "Construction, Pharma",
  },
  {
    name: "Zinc Oxide",
    category: "Metal Compounds",
    formula: "ZnO",
    cas_number: "1314-13-2",
    description: "Used in rubber and cosmetics.",
    applications: "Cosmetics, Rubber",
  },
];

const metals = ["Calcium", "Sodium", "Potassium", "Zinc", "Magnesium", "Lithium", "Barium", "Strontium", "Copper", "Iron"];
const anions = ["Chloride", "Sulfate", "Nitrate", "Phosphate", "Carbonate", "Bicarbonate", "Acetate", "Citrate", "Bromide", "Iodide", "Fluoride", "Hydroxide"];

const generatedSalts = metals.flatMap((m) =>
  anions.map((a) => ({
    name: `${m} ${a}`,
    category: "Salts",
    formula: "Varies",
    cas_number: "N/A",
    description: `High-purity ${m.toLowerCase()} ${a.toLowerCase()} for industrial and laboratory applications.`,
    applications: "Industrial, Manufacturing, Chemical Synthesis",
  }))
);

const organicAcids = ["Formic Acid", "Propionic Acid", "Butyric Acid", "Valeric Acid", "Caproic Acid", "Oxalic Acid", "Malonic Acid", "Succinic Acid", "Glutaric Acid", "Adipic Acid", "Maleic Acid", "Fumaric Acid", "Tartaric Acid"];
const generatedAcids = organicAcids.map((acid) => ({
    name: acid,
    category: "Acids",
    formula: "Varies",
    cas_number: "N/A",
    description: `Industrial grade ${acid.toLowerCase()} used in various chemical processes.`,
    applications: "Chemical Synthesis, Industrial Applications",
}));

const allProducts = [...baseProducts, ...generatedSalts, ...generatedAcids];

function getCategoryIcon(category: string) {
    switch (category) {
        case "Acids": return "science";
        case "Salts": return "compost";
        case "Pharmaceutical Excipients": return "medical_services";
        case "Alcohols": return "water_drop";
        case "Specialty Chemicals": return "bubble_chart";
        case "Metal Compounds": return "hardware";
        default: return "science";
    }
}

async function main() {
  console.log(`Seeding ${allProducts.length} chemicals...`);

  for (let i = 0; i < allProducts.length; i++) {
    const chemical = allProducts[i];
    const id = chemical.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await prisma.chemical.upsert({
      where: { id: id },
      update: {
          title: chemical.name,
          description: chemical.description,
          icon: getCategoryIcon(chemical.category),
          category: chemical.category,
          casNumber: chemical.cas_number,
          applications: chemical.applications,
          order: i + 1,
      },
      create: {
        id: id,
        title: chemical.name,
        description: chemical.description,
        icon: getCategoryIcon(chemical.category),
        category: chemical.category,
        casNumber: chemical.cas_number,
        applications: chemical.applications,
        order: i + 1,
      },
    });
  }

  await prisma.siteConfig.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      heroTitle: "Advanced Chemical Solutions for Global Industries",
      heroSubtitle:
        "Based in Ahmedabad, providing high-purity chemicals with global logistics and 20+ years of expertise. Engineered for precision, delivered with reliability.",
      address: "Ahmedabad, Gujarat, India",
    },
  });

  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
