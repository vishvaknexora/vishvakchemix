"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getChemicals() {
  return prisma.chemical.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
}

export async function getAllChemicals() {
  return prisma.chemical.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getChemicalById(id: string) {
  return prisma.chemical.findUnique({ where: { id } });
}

export async function createChemical(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = (formData.get("icon") as string) || "science";
  const category = (formData.get("category") as string) || "Specialty Chemicals";
  const casNumber = (formData.get("casNumber") as string) || null;
  const purity = (formData.get("purity") as string) || null;
  const applications = (formData.get("applications") as string) || null;
  const specLink = (formData.get("specLink") as string) || null;
  const published = formData.get("published") === "on";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  await prisma.chemical.create({
    data: {
      title,
      description,
      icon,
      category,
      casNumber,
      purity,
      applications,
      specLink,
      published,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/chemicals");
  redirect("/admin");
}

export async function updateChemical(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const icon = (formData.get("icon") as string) || "science";
  const category = (formData.get("category") as string) || "Specialty Chemicals";
  const casNumber = (formData.get("casNumber") as string) || null;
  const purity = (formData.get("purity") as string) || null;
  const applications = (formData.get("applications") as string) || null;
  const specLink = (formData.get("specLink") as string) || null;
  const published = formData.get("published") === "on";
  const order = parseInt((formData.get("order") as string) || "0", 10);

  await prisma.chemical.update({
    where: { id },
    data: {
      title,
      description,
      icon,
      category,
      casNumber,
      purity,
      applications,
      specLink,
      published,
      order,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/chemicals");
  redirect("/admin");
}

export async function deleteChemical(id: string) {
  await prisma.chemical.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/chemicals");
}

export async function getSiteConfig() {
  let config = await prisma.siteConfig.findUnique({ where: { id: "main" } });
  if (!config) {
    config = await prisma.siteConfig.create({
      data: {
        id: "main",
        heroTitle: "Advanced Chemical Solutions for Global Industries",
        heroSubtitle:
          "Based in Ahmedabad, providing high-purity chemicals with global logistics and 20+ years of expertise.",
        address: "Ahmedabad, Gujarat, India",
      },
    });
  }
  return config;
}
