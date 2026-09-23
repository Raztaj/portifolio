import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import LabList from "@/components/lab-list";
import { Divider } from "@/components/ui";
import { labEntries } from "@/lib/content/lab";

export const metadata: Metadata = {
  title: "LAB — TAJELSIR SYSTEMS",
  description:
    "Experiments, prototypes and things built because I wanted to know what would happen.",
};

export default function LabPage() {
  return (
    <main>
      <Nav />
      <PageHeader
        crumb="LAB /"
        backHref="/"
        backLabel="SYSTEMS"
        title="EXPERIMENTS"
        sub="Experiments, prototypes and things I built because I wanted to know what would happen."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <LabList entries={labEntries} />
      </div>
      <Divider />
      <Footer />
    </main>
  );
}