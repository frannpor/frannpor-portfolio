import { cookies } from "next/headers";
import { HomePage } from "@/features/home/components/HomePage";

export default async function Page() {
  const saved = (await cookies()).get("portfolio-locale")?.value;
  return <HomePage initialLocale={saved === "en" ? "en" : "es"} />;
}
