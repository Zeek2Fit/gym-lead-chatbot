import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Download, Users, Calendar, DollarSign, TrendingUp, LayoutDashboard, FileText, Settings, ArrowLeft, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import LeadsTable from "@/components/LeadsTable";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import type { Lead } from "@shared/schema";

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGoal, setFilterGoal] = useState("");
  const [filterBudget, setFilterBudget] = useState("");

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchQuery === "" ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGoal = filterGoal === "" || lead.mainGoal.toLowerCase().includes(filterGoal.toLowerCase());
    const matchesBudget = filterBudget === "" || lead.budget === filterBudget;

    return matchesSearch && matchesGoal && matchesBudget;
  });

  const stats = {
    total: leads.length,
    wantsTrial: leads.filter((l) => l.wantsTrial === "yes").length,
    thisWeek: leads.filter((l) => l.timeline === "this_week").length,
    avgBudget: leads.length > 0
      ? Math.round(
          leads.reduce((sum, l) => {
            const budget = l.budget;
            if (budget === "$50-100") return sum + 75;
            if (budget === "$100-200") return sum + 150;
            if (budget === "$200+") return sum + 250;
            return sum;
          }, 0) / leads.length
        )
      : 0,
  };

  const handleExportCSV = async () => {
    if (leads.length === 0) return;

    setActiveSection("export");
    try {
      const response = await fetch("/api/leads/export");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dad-bod-reset-leads-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export CSV:", error);
    }
  };

  const handleSettings = () => {
    setActiveSection("settings");
    alert("Settings coming soon!");
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "leads") {
      const leadsSection = document.querySelector('[data-section="leads"]');
      leadsSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, onClick: () => scrollToSection("dashboard") },
    { id: "analytics", label: "Analytics", icon: BarChart3, onClick: () => setActiveSection("analytics") },
    { id: "leads", label: "Leads", icon: Users, onClick: () => scrollToSection("leads") },
    { id: "export", label: "Export", icon: FileText, onClick: handleExportCSV },
    { id: "settings", label: "Settings", icon: Settings, onClick: handleSettings },
  ];

  const sidebarStyle = {
    "--sidebar-width": "15rem",
  };

  return (
    <SidebarProvider style={sidebarStyle as React.CSSProperties}>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SidebarContent>
            <div className="p-6 border-b border-sidebar-border">
              <Link href="/">
                <Button variant="ghost" size="sm" className="w-full justify-start" data-testid="link-back-home">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={item.onClick}
                        isActive={activeSection === item.id}
                        data-testid={`nav-${item.id}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
              <p className="text-xs text-sidebar-foreground/60">
                Dad Bod Reset Admin
              </p>
              <p className="text-xs text-sidebar-foreground/60 mt-1">
                v1.0.0
              </p>
            </div>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 overflow-y-auto">
          {activeSection === "analytics" ? (
            <div className="max-w-7xl mx-auto px-8 py-8">
              <AnalyticsDashboard />
            </div>
          ) : (
            <>
              <div className="bg-card border-b border-border">
                <div className="max-w-7xl mx-auto px-8 py-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="font-heading font-bold text-3xl" data-testid="text-admin-title">
                        Lead Dashboard
                      </h1>
                      <p className="text-muted-foreground mt-1">
                        Track and manage your Dad Bod Reset leads
                      </p>
                    </div>
                    <Button
                      onClick={handleExportCSV}
                      disabled={filteredLeads.length === 0}
                      data-testid="button-export-csv"
                    >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Leads</p>
                      <p className="text-3xl font-bold" data-testid="stat-total-leads">
                        {stats.total}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Want Trial</p>
                      <p className="text-3xl font-bold" data-testid="stat-wants-trial">
                        {stats.wantsTrial}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Ready This Week</p>
                      <p className="text-3xl font-bold" data-testid="stat-this-week">
                        {stats.thisWeek}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Avg Budget</p>
                      <p className="text-3xl font-bold" data-testid="stat-avg-budget">
                        ${stats.avgBudget}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-8 py-8" data-section="leads">
            <div className="mb-6 flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:max-w-xs"
                data-testid="input-search"
              />
              <Input
                placeholder="Filter by goal..."
                value={filterGoal}
                onChange={(e) => setFilterGoal(e.target.value)}
                className="md:max-w-xs"
                data-testid="input-filter-goal"
              />
              <select
                value={filterBudget}
                onChange={(e) => setFilterBudget(e.target.value)}
                className="px-4 py-2 rounded-lg bg-background border border-input text-foreground"
                data-testid="select-filter-budget"
              >
                <option value="">All Budgets</option>
                <option value="$50-100">$50-100/month</option>
                <option value="$100-200">$100-200/month</option>
                <option value="$200+">$200+/month</option>
                <option value="not_sure">Not sure</option>
              </select>
              {(searchQuery || filterGoal || filterBudget) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterGoal("");
                    setFilterBudget("");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            <LeadsTable leads={filteredLeads} isLoading={isLoading} />
          </div>
            </>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
