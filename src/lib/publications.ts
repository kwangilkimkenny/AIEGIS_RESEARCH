import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Publication } from "./types";

const PUBLICATIONS_DIR = path.join(process.cwd(), "src/content/publications");

export function getAllPublications(): Publication[] {
  if (!fs.existsSync(PUBLICATIONS_DIR)) return [];

  const files = fs.readdirSync(PUBLICATIONS_DIR).filter((f) => f.endsWith(".mdx"));

  const publications = files
    .map((filename) => {
      const filePath = path.join(PUBLICATIONS_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        ...data,
        slug: filename.replace(".mdx", ""),
        content,
      } as Publication;
    })
    .filter((pub) => pub.status === "published")
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );

  return publications;
}

export function getPublicationBySlug(slug: string): Publication | null {
  const filePath = path.join(PUBLICATIONS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    ...data,
    slug,
    content,
  } as Publication;
}

export function getFeaturedPublications(): Publication[] {
  return getAllPublications().filter((pub) => pub.featured);
}

export function getPublicationSlugs(): string[] {
  if (!fs.existsSync(PUBLICATIONS_DIR)) return [];

  return fs
    .readdirSync(PUBLICATIONS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}
