import { useState, useCallback } from "react";
import { Switch, Route, Router as WouterRouter, useLocation, Link } from "wouter";
import { isAuthenticated, clearPassword } from "@/lib/api";
import LoginPage from "@/pages/login";
import LeadsPage from "@/pages/leads";
import ClientsPage from "@/pages/clients";
import PlansPage from "@/pages/plans";
import SessionsPage from "@/pages/sessions";
import InvoicesPage from "@/pages/invoices";
import SharedPlanPage from "@/pages/shared-plan";

const navItems = [
  {
    path: "/",
    label: "Leads",
    icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
  },
  {
    path: "/clients",
    label: "Clients",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    path: "/sessions",
    label: "Sessions",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    path: "/invoices",
    label: "Invoices",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M12 7h.01M12 14h.01M15 14h.01M9 14h.01M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z",
  },
  {
    path: "/plans",
    label: "Plans",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
];

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const handleLogout = () => {
    clearPassword();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="font-bold text-foreground text-lg hidden sm:block">Coach Dashboard</h1>
            </div>

            <nav className="flex items-center gap-0.5 overflow-x-auto">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    location === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="hidden md:inline">{item.label}</span>
                  </span>
                </Link>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
    </div>
  );
}

function ProtectedRoutes() {
  return (
    <DashboardLayout>
      <Switch>
        <Route path="/" component={LeadsPage} />
        <Route path="/clients" component={ClientsPage} />
        <Route path="/sessions" component={SessionsPage} />
        <Route path="/invoices" component={InvoicesPage} />
        <Route path="/plans" component={PlansPage} />
        <Route>
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-foreground">Page not found</h2>
            <Link href="/" className="text-primary hover:underline mt-2 inline-block">Go to Dashboard</Link>
          </div>
        </Route>
      </Switch>
    </DashboardLayout>
  );
}

function AppRoutes() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const handleLogin = useCallback(() => setAuthed(true), []);

  return (
    <Switch>
      <Route path="/plans/:token">
        {(params) => <SharedPlanPage token={params.token} />}
      </Route>
      <Route>
        {authed ? <ProtectedRoutes /> : <LoginPage onLogin={handleLogin} />}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <AppRoutes />
    </WouterRouter>
  );
}

export default App;
