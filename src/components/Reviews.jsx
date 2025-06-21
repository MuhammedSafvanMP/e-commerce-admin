"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, ThumbsDown, CheckCircle, XCircle } from "lucide-react"

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: "1",
      customerName: "John Doe",
      customerEmail: "john.doe@example.com",
      customerAvatar: "/placeholder.svg",
      productName: "Wireless Headphones",
      rating: 5,
      title: "Excellent sound quality!",
      comment:
        "These headphones exceeded my expectations. The sound quality is crystal clear and the noise cancellation works perfectly. Highly recommended!",
      date: "2024-01-15",
      status: "approved",
      helpful: 12,
      notHelpful: 1,
      verified: true,
    },
    {
      id: "2",
      customerName: "Jane Smith",
      customerEmail: "jane.smith@example.com",
      customerAvatar: "/placeholder.svg",
      productName: "Smart Watch",
      rating: 4,
      title: "Great features, good value",
      comment:
        "The watch has all the features I need. Battery life could be better, but overall very satisfied with the purchase.",
      date: "2024-01-14",
      status: "approved",
      helpful: 8,
      notHelpful: 2,
      verified: true,
    },
    {
      id: "3",
      customerName: "Bob Johnson",
      customerEmail: "bob.johnson@example.com",
      customerAvatar: "/placeholder.svg",
      productName: "Laptop Stand",
      rating: 3,
      title: "Decent but could be better",
      comment:
        "The stand is okay but feels a bit flimsy. It does the job but I expected better build quality for the price.",
      date: "2024-01-13",
      status: "pending",
      helpful: 3,
      notHelpful: 5,
      verified: false,
    },
    {
      id: "4",
      customerName: "Alice Brown",
      customerEmail: "alice.brown@example.com",
      customerAvatar: "/placeholder.svg",
      productName: "USB-C Cable",
      rating: 1,
      title: "Poor quality, broke after a week",
      comment:
        "This cable stopped working after just one week of normal use. Very disappointed with the quality. Would not recommend.",
      date: "2024-01-12",
      status: "pending",
      helpful: 15,
      notHelpful: 2,
      verified: true,
    },
    {
      id: "5",
      customerName: "Charlie Wilson",
      customerEmail: "charlie.wilson@example.com",
      customerAvatar: "/placeholder.svg",
      productName: "Bluetooth Speaker",
      rating: 5,
      title: "Amazing sound for the price!",
      comment:
        "I was skeptical at first, but this speaker delivers incredible sound quality. The bass is deep and the highs are crisp. Perfect for outdoor use too!",
      date: "2024-01-11",
      status: "approved",
      helpful: 20,
      notHelpful: 0,
      verified: true,
    },
  ])

  const updateReviewStatus = (id, status) => {
    setReviews(reviews.map(r => (r.id === id ? { ...r, status } : r)))
  }

  const renderStars = rating =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))

  const getStatusColor = status => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      {reviews.map(review => (
        <Card
          key={review.id}
          className={review.status === "pending" ? "border-l-4 border-l-yellow-500" : ""}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={review.customerAvatar} alt={review.customerName} />
                    <AvatarFallback>{review.customerName.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.customerName}</h3>
                    <p className="text-sm text-muted-foreground">{review.productName}</p>
                    <div className="flex gap-2 items-center text-sm">
                      {renderStars(review.rating)}
                      <span>{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    {review.verified && (
                      <Badge className="text-blue-700 border-blue-200 bg-blue-50 text-xs mt-1">
                        <CheckCircle className="w-3 h-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <Badge
                  className={`${getStatusColor(review.status)} text-xs h-fit px-2 py-1 rounded`}
                >
                  {review.status}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium text-base">{review.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="flex justify-between border-t pt-3 text-sm text-muted-foreground">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {review.helpful}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    {review.notHelpful}
                  </span>
                </div>
                {review.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateReviewStatus(review.id, "approved")}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateReviewStatus(review.id, "rejected")}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
