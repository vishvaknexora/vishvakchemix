-- CreateTable
CREATE TABLE "Chemical" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT 'science',
    "category" TEXT NOT NULL DEFAULT 'Specialty Chemicals',
    "casNumber" TEXT,
    "purity" TEXT,
    "applications" TEXT,
    "specLink" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'main',
    "heroTitle" TEXT NOT NULL DEFAULT 'Advanced Chemical Solutions for Global Industries',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Based in Ahmedabad, providing high-purity chemicals with global logistics and 20+ years of expertise.',
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT NOT NULL DEFAULT 'Ahmedabad, Gujarat, India',
    "updatedAt" DATETIME NOT NULL
);
