import Topbar from "../components/Topbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DomainsPremium from "../components/DomainsPremium";

export const metadata = {
  title: "Domains | Nyeras",
  description: "Choose between Departments and Job Guarantee tracks.",
};

export default function DomainsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <Header />
      <div className="bg-white/40 backdrop-blur-xl">
        <DomainsPremium />
        <Footer />
      </div>
    </div>
  );
}
