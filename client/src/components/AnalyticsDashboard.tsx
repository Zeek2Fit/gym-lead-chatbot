import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, CheckCircle2, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { AnalyticsStats } from "../../../server/storage";

export default function AnalyticsDashboard() {
  const { data: stats, isLoading } = useQuery<AnalyticsStats>({
    queryKey: ["/api/analytics/stats"],
  });

  if (isLoading || !stats) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="h-4 bg-muted rounded w-24"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Widget Opens",
      value: stats.totalWidgetOpens,
      description: "Total visitors",
      icon: Users,
      testId: "stat-widget-opens",
    },
    {
      title: "Conversations",
      value: stats.totalConversationStarts,
      description: "Engaged visitors",
      icon: TrendingUp,
      testId: "stat-conversations",
    },
    {
      title: "Completed",
      value: stats.totalConversationCompletes,
      description: "Finished chatbot flow",
      icon: CheckCircle2,
      testId: "stat-completed",
    },
    {
      title: "Trials Booked",
      value: stats.totalTrialsBooked,
      description: "Session bookings",
      icon: Calendar,
      testId: "stat-trials-booked",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight" data-testid="heading-analytics">
          Analytics Overview
        </h2>
        <p className="text-muted-foreground">
          Track your chatbot performance and conversion metrics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} data-testid={stat.testId}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid={`${stat.testId}-value`}>
                {stat.value.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card data-testid="card-conversion-funnel">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>
              Journey from widget open to booked trial
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    stage: "Opens",
                    value: stats.totalWidgetOpens,
                    percentage: 100,
                  },
                  {
                    stage: "Started",
                    value: stats.totalConversationStarts,
                    percentage:
                      stats.totalWidgetOpens > 0
                        ? Math.round((stats.totalConversationStarts / stats.totalWidgetOpens) * 100)
                        : 0,
                  },
                  {
                    stage: "Completed",
                    value: stats.totalConversationCompletes,
                    percentage: Math.round(stats.conversionRate),
                  },
                  {
                    stage: "Booked",
                    value: stats.totalTrialsBooked,
                    percentage:
                      stats.totalWidgetOpens > 0
                        ? Math.round((stats.totalTrialsBooked / stats.totalWidgetOpens) * 100)
                        : 0,
                  },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="stage" type="category" className="text-xs" width={80} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                          <p className="font-medium">{data.stage}</p>
                          <p className="text-sm text-muted-foreground">
                            {data.value} visitors ({data.percentage}%)
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {[0, 1, 2, 3].map((index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? "hsl(var(--primary))"
                          : index === 1
                          ? "hsl(180, 70%, 50%)"
                          : index === 2
                          ? "hsl(180, 60%, 45%)"
                          : "hsl(180, 50%, 40%)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card data-testid="card-conversion-rates">
          <CardHeader>
            <CardTitle>Conversion Rates</CardTitle>
            <CardDescription>
              Key performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm font-bold" data-testid="rate-completion">
                  {stats.conversionRate.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(stats.conversionRate, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Of widget opens that complete the flow
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Booking Rate</span>
                <span className="text-sm font-bold" data-testid="rate-booking">
                  {stats.bookingRate.toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-teal-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(stats.bookingRate, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Of completed flows that book a trial
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface FunnelStepProps {
  label: string;
  value: number;
  total: number;
  percentage: number;
  testId: string;
}

function FunnelStep({ label, value, total, percentage, testId }: FunnelStepProps) {
  return (
    <div data-testid={testId}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {value} ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
