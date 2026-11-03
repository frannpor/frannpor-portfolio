import { en } from "@/features/home/data/locales/en";
import { es } from "@/features/home/data/locales/es";
import type { Locale, PortfolioContent } from "@/features/home/data/types";

export const portfolioContent: Record<Locale, PortfolioContent> = {
  es,
  en,
};

export const defaultLocale: Locale = "es";

export type {
  ClientContext,
  ImageRef,
  InterfaceCopy,
  ReaderCase,
  ContactCopy,
  Experience,
  Locale,
  Metric,
  NavItem,
  PortfolioContent,
  Principle,
  Project,
  SectionCopy,
  ScrollAtmosphereColumn,
  StackGroup,
} from "@/features/home/data/types";
