"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Target,
  Eye,
  MousePointer,
} from "lucide-react"

export default function AnalyticsPage() {
  const revenueData = [
    { month: "Jan", revenue: 12000, orders: 145, customers: 89 },
    { month: "Feb", revenue: 15000, orders: 178, customers: 112 },
    { month: "Mar", revenue: 18000, orders: 203, customers: 134 },
    { month: "Apr", revenue: 22000, orders: 245, customers: 156 },
    { month: "May", revenue: 25000, orders: 289, customers: 178 },
    { month: "Jun", revenue: 28000, orders: 312, customers: 201 },
  ]

  const topProducts = [
    { name: "Wireless Headphones", sales: 1234, revenue: 24680, growth: 15.2 },
    { name: "Smart Watch", sales: 987, revenue: 19740, growth: 8.7 },
    { name: "Laptop Stand", sales: 756, revenue: 15120, growth: -2.3 },
    { name: "USB-C Cable", sales: 654, revenue: 6540, growth: 22.1 },
    { name: "Bluetooth Speaker", sales: 543, revenue: 10860, growth: 5.4 },
  ]

  const customerSegments = [
    { segment: "New Customers", count: 234, percentage: 35, color: "bg-blue-500" },
    { segment: "Returning Customers", count: 456, percentage: 45, color: "bg-green-500" },
    { segment: "VIP Customers", count: 89, percentage: 15, color: "bg-purple-500" },
    { segment: "Inactive Customers", count: 123, percentage: 5, color: "bg-gray-400" },
  ]

  const websiteMetrics = [
    { metric: "Page Views", value: "125,432", change: "+12.5%", trend: "up" },
    { metric: "Unique Visitors", value: "45,678", change: "+8.2%", trend: "up" },
    { metric: "Bounce Rate", value: "32.1%", change: "-2.1%", trend: "down" },
    { metric: "Conversion Rate", value: "3.4%", change: "+0.8%", trend: "up" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive insights into your business performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$120,000</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+15.2%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,372</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+8.7%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <Users className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+12.1%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4%</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-600">+0.8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 text-sm font-medium">{data.month}</div>
                        <div className="flex-1">
                          <Progress value={(data.revenue / 30000) * 100} className="h-2 w-32" />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${data.revenue.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{data.orders} orders</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue sources and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div>
                      <div className="font-medium">Product Sales</div>
                      <div className="text-sm text-muted-foreground">Direct product revenue</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$98,400</div>
                      <div className="text-sm text-green-600">+12.5%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div>
                      <div className="font-medium">Shipping Fees</div>
                      <div className="text-sm text-muted-foreground">Delivery charges</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$15,600</div>
                      <div className="text-sm text-green-600">+8.2%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div>
                      <div className="font-medium">Tax Collected</div>
                      <div className="text-sm text-muted-foreground">Sales tax</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$6,000</div>
                      <div className="text-sm text-green-600">+10.1%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Top Performing Products
              </CardTitle>
              <CardDescription>Best selling products and their performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {product.sales} sales • ${product.revenue.toLocaleString()} revenue
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={product.growth > 0 ? "default" : "destructive"}
                        className="flex items-center gap-1"
                      >
                        {product.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(product.growth)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Customer Segments
                </CardTitle>
                <CardDescription>Customer distribution by segment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerSegments.map((segment, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{segment.segment}</span>
                        <span className="text-sm text-muted-foreground">
                          {segment.count} ({segment.percentage}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={segment.percentage} className="flex-1 h-2" />
                        <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Insights</CardTitle>
                <CardDescription>Key customer metrics and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div className="text-2xl font-bold">87.5%</div>
                    <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="text-2xl font-bold">4.2</div>
                    <div className="text-sm text-muted-foreground">Avg. Order Value</div>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div className="text-2xl font-bold">65%</div>
                    <div className="text-sm text-muted-foreground">Repeat Purchase Rate</div>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div className="text-2xl font-bold">28 days</div>
                    <div className="text-sm text-muted-foreground">Avg. Customer Lifetime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="website" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Website Metrics
                </CardTitle>
                <CardDescription>Key website performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {websiteMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{metric.metric}</div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            (metric.trend === "up" && !metric.change.includes("-")) ||
                            (metric.trend === "down" && metric.change.includes("-"))
                              ? "default"
                              : "destructive"
                          }
                          className="flex items-center gap-1"
                        >
                          {metric.trend === "up" ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointer className="h-5 w-5" />
                  Traffic Sources
                </CardTitle>
                <CardDescription>Where your visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <div>
                      <div className="font-medium">Organic Search</div>
                      <div className="text-sm text-muted-foreground">Google, Bing, etc.</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">45.2%</div>
                      <div className="text-sm text-green-600">+5.2%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div>
                      <div className="font-medium">Direct Traffic</div>
                      <div className="text-sm text-muted-foreground">Direct visits</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">28.7%</div>
                      <div className="text-sm text-green-600">+2.1%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <div>
                      <div className="font-medium">Social Media</div>
                      <div className="text-sm text-muted-foreground">Facebook, Instagram, etc.</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">16.8%</div>
                      <div className="text-sm text-red-600">-1.2%</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <div>
                      <div className="font-medium">Referral</div>
                      <div className="text-sm text-muted-foreground">Other websites</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">9.3%</div>
                      <div className="text-sm text-green-600">+0.8%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
