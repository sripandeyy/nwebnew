import Topbar from "../components/Topbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DomainsPremium from "../components/DomainsPremium";

export const metadata = {
  title: "Domains | Nyeras - E-learning & Career Enablement",
  description: "Explore academic departments and 100% placement job guarantee programs.",
};

export default function DomainsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Topbar />
      <Header />
      <main className="flex-grow">
        <DomainsPremium />
      </main>
      <Footer />
    </div>
  );
}
