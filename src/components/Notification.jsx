"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, CheckCheck, Trash2, ShoppingCart, User, Package, AlertTriangle } from "lucide-react"


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Order Received",
      message: "Order #3210 has been placed by John Doe for $250.00",
      type: "order",
      isRead: false,
      timestamp: "2024-01-15T10:30:00Z",
      priority: "high",
    },
    {
      id: "2",
      title: "Low Stock Alert",
      message: "Wireless Headphones stock is running low (5 items remaining)",
      type: "product",
      isRead: false,
      timestamp: "2024-01-15T09:15:00Z",
      priority: "medium",
    },
    {
      id: "3",
      title: "New User Registration",
      message: "Jane Smith has created a new account",
      type: "user",
      isRead: true,
      timestamp: "2024-01-15T08:45:00Z",
      priority: "low",
    },
    {
      id: "4",
      title: "Payment Failed",
      message: "Payment for order #3209 has failed. Customer needs to update payment method.",
      type: "order",
      isRead: false,
      timestamp: "2024-01-14T16:20:00Z",
      priority: "high",
    },
    {
      id: "5",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
      type: "system",
      isRead: true,
      timestamp: "2024-01-14T14:00:00Z",
      priority: "medium",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const readCount = notifications.filter((n) => n.isRead).length

  const getIcon = (type) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-5 h-5" />
      case "user":
        return <User className="w-5 h-5" />
      case "product":
        return <Package className="w-5 h-5" />
      case "system":
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 dark:bg-red-950"
      case "medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950"
      case "low":
        return "text-green-600 bg-green-50 dark:bg-green-950"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-950"
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const NotificationCard = ({ notification }) => (
    <Card
      className={`transition-all duration-200 ${!notification.isRead ? "border-l-4 border-l-blue-500 bg-blue-50/30 dark:bg-blue-950/30" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium ${!notification.isRead ? "font-semibold" : ""}`}>{notification.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {notification.priority}
                </Badge>
                {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
              </div>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markAsRead(notification.id)}
                className="text-blue-600 hover:text-blue-700"
              >
                <Check className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteNotification(notification.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your store activities</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {unreadCount} unread
          </Badge>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="read">Read ({readCount})</TabsTrigger>
          <TabsTrigger value="high">High Priority</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notifications
            .filter((n) => !n.isRead)
            .map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
        </TabsContent>

        <TabsContent value="read" className="space-y-4">
          {notifications
            .filter((n) => n.isRead)
            .map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          {notifications
            .filter((n) => n.priority === "high")
            .map((notification) => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
        </TabsContent>
      </Tabs>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No notifications</h3>
            <p className="text-muted-foreground text-center">
              You're all caught up! New notifications will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
