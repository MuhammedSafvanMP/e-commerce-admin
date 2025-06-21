"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"


export default function CarouselPage() {
  const [slides, setSlides] = useState([
    {
      id: "1",
      title: "Summer Sale",
      subtitle: "Up to 50% off on all electronics",
      image: "/placeholder.svg",
      link: "/products/electronics",
      status: "active",
      order: 1,
    },
    {
      id: "2",
      title: "New Arrivals",
      subtitle: "Check out our latest products",
      image: "/placeholder.svg",
      link: "/products/new",
      status: "active",
      order: 2,
    },
    {
      id: "3",
      title: "Free Shipping",
      subtitle: "On orders over $100",
      image: "/placeholder.svg",
      link: "/shipping",
      status: "inactive",
      order: 3,
    },
  ])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState(null)
  const [newSlide, setNewSlide] = useState({
    title: "",
    subtitle: "",
    image: "",
    link: "",
    status: "active",
    order: slides.length + 1,
  })

  const activeSlides = slides.filter((slide) => slide.status === "active").sort((a, b) => a.order - b.order)

  const handleAddSlide = () => {
    if (newSlide.title && newSlide.subtitle) {
      const slide = {
        id: Date.now().toString(),
        title: newSlide.title,
        subtitle: newSlide.subtitle || "",
        image: newSlide.image || "/placeholder.svg",
        link: newSlide.link || "",
        status: newSlide.status ,
        order: newSlide.order || slides.length + 1,
      }
      setSlides([...slides, slide])
      setNewSlide({ title: "", subtitle: "", image: "", link: "", status: "active", order: slides.length + 2 })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditSlide = (slide) => {
    setEditingSlide(slide)
    setNewSlide(slide)
  }

  const handleUpdateSlide = () => {
    if (editingSlide && newSlide.title && newSlide.subtitle) {
      setSlides(slides.map((s) => (s.id === editingSlide.id ? ({ ...editingSlide, ...newSlide }) : s)))
      setEditingSlide(null)
      setNewSlide({ title: "", subtitle: "", image: "", link: "", status: "active", order: slides.length + 1 })
    }
  }

  const handleDeleteSlide = (id) => {
    setSlides(slides.filter((s) => s.id !== id))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carousel Management</h1>
          <p className="text-muted-foreground">Manage your homepage carousel slides</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Slide</DialogTitle>
              <DialogDescription>Create a new carousel slide</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  placeholder="Enter slide title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={newSlide.subtitle}
                  onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                  placeholder="Enter slide subtitle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newSlide.image}
                  onChange={(e) => setNewSlide({ ...newSlide, image: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link URL</Label>
                <Input
                  id="link"
                  value={newSlide.link}
                  onChange={(e) => setNewSlide({ ...newSlide, link: e.target.value })}
                  placeholder="Enter link URL"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newSlide.status}
                    onValueChange={(value) => setNewSlide({ ...newSlide, status: value  })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={newSlide.order}
                    onChange={(e) => setNewSlide({ ...newSlide, order: Number.parseInt(e.target.value) })}
                    placeholder="1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddSlide}>Add Slide</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Carousel Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Carousel Preview</CardTitle>
          <CardDescription>Preview how your carousel will look on the homepage</CardDescription>
        </CardHeader>
        <CardContent>
          {activeSlides.length > 0 ? (
            <div className="relative">
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                  src={activeSlides[currentSlide]?.image || "/placeholder.svg"}
                  alt={activeSlides[currentSlide]?.title || ""}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">{activeSlides[currentSlide]?.title}</h2>
                    <p className="text-lg md:text-xl">{activeSlides[currentSlide]?.subtitle}</p>
                    <Button className="bg-white text-black hover:bg-gray-100">Shop Now</Button>
                  </div>
                </div>

                {activeSlides.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={prevSlide}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={nextSlide}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>
                  </>
                )}
              </div>

              {activeSlides.length > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                  {activeSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-muted-foreground">No active slides to display</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Slides Management */}
      <Card>
        <CardHeader>
          <CardTitle>All Slides</CardTitle>
          <CardDescription>Manage all carousel slides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {slides.map((slide) => (
              <div key={slide.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    width={80}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{slide.title}</h3>
                    <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={slide.status === "active" ? "default" : "secondary"}>{slide.status}</Badge>
                      <span className="text-xs text-muted-foreground">Order: {slide.order}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => handleEditSlide(slide)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Slide</DialogTitle>
                        <DialogDescription>Update slide information</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-title">Title</Label>
                          <Input
                            id="edit-title"
                            value={newSlide.title}
                            onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-subtitle">Subtitle</Label>
                          <Input
                            id="edit-subtitle"
                            value={newSlide.subtitle}
                            onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-image">Image URL</Label>
                          <Input
                            id="edit-image"
                            value={newSlide.image}
                            onChange={(e) => setNewSlide({ ...newSlide, image: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-link">Link URL</Label>
                          <Input
                            id="edit-link"
                            value={newSlide.link}
                            onChange={(e) => setNewSlide({ ...newSlide, link: e.target.value })}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleUpdateSlide}>Update Slide</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSlide(slide.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
