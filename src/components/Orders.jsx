"use client"



import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Eye, Package, Truck, CheckCircle, XCircle, Clock, MapPin } from "lucide-react"



export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      items: [
        { name: "Wireless Headphones", quantity: 1, price: 199.99 },
        { name: "USB-C Cable", quantity: 2, price: 15.99 },
      ],
      total: 231.97,
      status: "delivered",
      orderDate: "2024-01-10",
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "TRK123456789",
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      items: [{ name: "Smart Watch", quantity: 1, price: 299.99 }],
      total: 299.99,
      status: "shipped",
      orderDate: "2024-01-12",
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
      trackingNumber: "TRK987654321",
    },
    {
      id: "ORD-003",
      customerName: "Bob Johnson",
      customerEmail: "bob.johnson@example.com",
      items: [
        { name: "Laptop Stand", quantity: 1, price: 49.99 },
        { name: "Wireless Mouse", quantity: 1, price: 29.99 },
      ],
      total: 79.98,
      status: "processing",
      orderDate: "2024-01-14",
      shippingAddress: "789 Pine St, Chicago, IL 60601",
    },
    {
      id: "ORD-004",
      customerName: "Alice Brown",
      customerEmail: "alice.brown@example.com",
      items: [{ name: "Bluetooth Speaker", quantity: 1, price: 89.99 }],
      total: 89.99,
      status: "pending",
      orderDate: "2024-01-15",
      shippingAddress: "321 Elm St, Houston, TX 77001",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((orders) =>
      orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              trackingNumber:
                newStatus === "shipped" ? `TRK${Date.now()}` : order.trackingNumber,
            }
          : order
      )
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
  }

  return (
    <div className="space-y-6 px-2 sm:px-4">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search orders..."
              className="pl-10 w-full"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["Total Orders", orderStats.total, <Package className="w-4 h-4" />],
          ["Pending Orders", orderStats.pending, <Clock className="w-4 h-4" />],
          ["Shipped Orders", orderStats.shipped, <Truck className="w-4 h-4" />],
          ["Total Revenue", `$${orderStats.totalRevenue.toFixed(2)}`, <CheckCircle className="w-4 h-4" />],
        ].map(([title, count, icon], idx) => (
          <Card key={idx}>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">{title}</CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
              <p className="text-xs text-muted-foreground">Updated now</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="flex flex-wrap gap-2">
          <TabsTrigger value="all">All ({orderStats.total})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({orderStats.pending})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({orderStats.processing})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({orderStats.shipped})</TabsTrigger>
        </TabsList>

        {/* Orders Table */}
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>{filteredOrders.length} results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border">
                <Table className="min-w-[800px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Tracking</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{order.customerName}</div>
                          <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                        </TableCell>
                        <TableCell>
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm">
                              {item.quantity}× {item.name}
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} flex gap-1 items-center`}>
                            {getStatusIcon(order.status)} {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {order.trackingNumber ? (
                            <code className="text-blue-600">{order.trackingNumber}</code>
                          ) : (
                            <span className="text-muted-foreground">–</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
