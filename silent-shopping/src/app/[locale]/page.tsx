// ===== LOCALIZED PORTFOLIO ROUTE: START =====
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Portfolio from "@/components/Portfolio";
import type {Locale} from "@/lib/content";

<div className="bg-red-500 p-10 text-white">Tailwind test</div>

type Props = {params: Promise<{locale: string}>};
export function generateStaticParams() {return [{locale: "en"}, {locale: "es"}];}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  if (locale !== "en" && locale !== "es") return {};
  return {
    title: locale === "es" ? "Comercio mayorista en España" : "Wholesale Sourcing in Spain",
    description: locale === "es"
      ? "Silent Shopping, empresa mayorista de hogar y cocina en Vitoria-Gasteiz que comercializa productos en Amazon España."
      : "Silent Shopping is a home and kitchen wholesale business based in Vitoria-Gasteiz, selling via Amazon Spain.",
    alternates: {canonical: `/${locale}`, languages: {en: "/en", es: "/es"}},
  };
}

export default async function LocalizedPage({params}: Props) {
  const {locale} = await params;
  if (locale !== "en" && locale !== "es") notFound();
  return <Portfolio locale={locale as Locale}/>;
}
// ===== LOCALIZED PORTFOLIO ROUTE: END =====
