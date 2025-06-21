"use client"

import AnalyticsPage from "@/components/Analytics"
import CarouselPage from "@/components/Carousel"
import Dashboard from "@/components/Dashboard"
import Header from "@/components/Header"
import NotificationsPage from "@/components/Notification"
import OrdersPage from "@/components/Orders"
import ProductsPage from "@/components/Products"
import ReviewsPage from "@/components/Reviews"
import Sidebar from "@/components/Sidebar"
import TopProductsPage from "@/components/Top-product"
import UsersPage from "@/components/Users"
import { useState } from "react"
import LoginPage from "@/components/Login"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "products":
        return <ProductsPage />
      case "notifications":
        return <NotificationsPage />
      case "carousel":
        return <CarouselPage />
      case "users":
        return <UsersPage />
      case "orders":
        return <OrdersPage />
      case "analytics":
        return <AnalyticsPage />
      case "reviews":
        return <ReviewsPage />
      case "top-products":
        return <TopProductsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} onLogout={() => setIsLoggedIn(false)} />
        <main className="p-4 lg:p-8">{renderPage()}</main>
      </div>
    </div>
  )
}
