"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, TrendingUp, TrendingDown } from "lucide-react"


const topProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    sales: 1234,
    revenue: 24680,
    rating: 4.8,
    growth: 15.2,
  },
  {
    id: "2",
    name: "Smart Watch",
    category: "Electronics",
    sales: 987,
    revenue: 19740,
    rating: 4.6,
    growth: 8.7,
  },
  {
    id: "3",
    name: "Laptop Stand",
    category: "Accessories",
    sales: 756,
    revenue: 15120,
    rating: 4.9,
    growth: -2.3,
  },
  {
    id: "4",
    name: "USB-C Cable",
    category: "Accessories",
    sales: 654,
    revenue: 6540,
    rating: 4.7,
    growth: 22.1,
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    category: "Audio",
    sales: 543,
    revenue: 10860,
    rating: 4.5,
    growth: 5.4,
  },
]

export default function TopProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Top-Selling Products</h1>
        <p className="text-muted-foreground">View your best performers by sales, revenue, and customer rating</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Products Leaderboard
          </CardTitle>
          <CardDescription>Performance metrics for the current month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border rounded-lg"
              >
                {/* Rank bubble & basic info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
                  <div>
                    <p className="text-sm text-muted-foreground">Sales</p>
                    <p className="font-medium">{product.sales.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                    <p className="font-medium">${product.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      Rating
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </p>
                    <p className="font-medium">{product.rating}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge
                      variant={product.growth >= 0 ? "default" : "destructive"}
                      className="flex items-center gap-1 mx-auto"
                    >
                      {product.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {Math.abs(product.growth)}%
                    </Badge>
                  </div>
                </div>

                {/* Progress bar (responsive hide on xs) */}
                <div className="hidden xl:block w-52">
                  <Progress value={(product.sales / topProducts[0].sales) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
