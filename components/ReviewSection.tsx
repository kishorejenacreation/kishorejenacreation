"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  StarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

import { useAuth } from "@/components/AuthProvider"; // ✅ make sure AuthProvider is in components

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  rating: z.number().min(1).max(5),
  review: z.string().min(10, { message: "Review must be at least 10 characters." }),
});

const allReviews = [
  { id: 1, name: "Priya Das", rating: 5, review: "Excellent video editing service! My wedding video turned out amazing. Kishore bhai did fantastic work. Highly recommended!", date: "2024-01-15", service: "Video Editing" },
  { id: 2, name: "Rajesh Kumar", rating: 5, review: "Professional photo editing work. The team delivered exactly what I wanted for my business portfolio. Very satisfied with the quality.", date: "2024-01-10", service: "Photo Editing" },
  { id: 3, name: "Sneha M", rating: 4, review: "Great thumbnail designs for my YouTube channel. Increased my click-through rate significantly! Worth every rupee spent.", date: "2024-01-05", service: "Thumbnail Design" },
  { id: 4, name: "Arjun Singh", rating: 5, review: "Beautiful wedding invitation design! Everyone loved the elegant and modern design elements. Perfect for our Punjabi wedding.", date: "2024-01-20", service: "Wedding Invitations" },
  { id: 5, name: "Kavya Rath", rating: 3, review: "Amazing music platform! Love the collection of English songs, especially the latest hits. Great for my morning workouts.", date: "2024-01-18", service: "Music Platform" },
  { id: 6, name: "Vikram Senapati", rating: 4, review: "Quick turnaround time for logo design. Very professional service and great communication. Will definitely work again.", date: "2024-01-12", service: "Graphic Design" },
  { id: 7, name: "Ananya Singh", rating: 5, review: "Fantastic audio editing for my podcast. The sound quality improved dramatically! Kishore ji knows his work very well.", date: "2024-01-08", service: "Audio Editing" },
  { id: 8, name: "Rohit Kumar", rating: 5, review: "Outstanding work on my product photography. The edited images look absolutely professional. Boosted my online sales!", date: "2024-01-25", service: "Photo Editing" },
  { id: 9, name: "Meera Ghosh", rating: 4, review: "Love the user interface of the music platform. Easy to search and find my favorite English songs. Very user-friendly design.", date: "2024-01-22", service: "Music Platform" },
  { id: 10, name: "Pooja Mishra", rating: 5, review: "Professional wedding card design with beautiful modern typography. All our relatives were impressed! Traditional yet contemporary.", date: "2024-02-05", service: "Wedding Invitations" },
  { id: 11, name: "Sanjay Rout", rating: 5, review: "Superb photo editing for our family function photos. Made everyone look their best! Very reasonable pricing too.", date: "2024-02-08", service: "Photo Editing" },
];

export default function ReviewSection() {
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { isAuthenticated } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      review: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }

    setIsSubmitting(true);

    const emailData = {
      to: "jenakishore2006@gmail.com",
      subject: `New Review from ${values.name}`,
      body: `
        Name: ${values.name}
        Email: ${values.email}
        Rating: ${values.rating}/5 stars
        Review: ${values.review}
        Date: ${new Date().toLocaleDateString()}
      `,
    };

    setTimeout(() => {
      console.log("Review sent to admin:", emailData);
      alert("Thank you for your review! We appreciate your feedback.");
      form.reset();
      setRating(0);
      setIsSubmitting(false);
    }, 2000);
  }

  const StarRating = ({
    rating: currentRating,
    onRatingChange,
    interactive = false,
  }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    interactive?: boolean;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRatingChange?.(star)}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          disabled={!interactive}
        >
          {star <= currentRating ? (
            <StarIcon className="h-5 w-5 text-yellow-400" />
          ) : (
            <StarOutlineIcon className="h-5 w-5 text-gray-300" />
          )}
        </button>
      ))}
    </div>
  );

  const displayedReviews = showAllReviews ? allReviews : allReviews.slice(0, 3);

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Client Reviews
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Review List */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">What Our Clients Say</h3>
            <div className="space-y-6">
              <AnimatePresence>
                {displayedReviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    className="bg-secondary/20 p-6 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                        <p className="text-xs text-primary">{review.service}</p>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-muted-foreground mb-2">{review.review}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Toggle Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="flex items-center gap-2 mx-auto px-6 py-3 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                {showAllReviews ? (
                  <>
                    <ChevronUpIcon className="h-4 w-4" />
                    Show Less Reviews
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    Show More Reviews ({allReviews.length - 3} more)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Submit Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Leave a Review</h3>
            <div className="bg-secondary/10 p-6 rounded-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div>
                            <StarRating
                              rating={rating}
                              onRatingChange={(newRating) => {
                                setRating(newRating);
                                field.onChange(newRating);
                              }}
                              interactive
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="review"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Review</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your experience with our services..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        {showLoginPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              className="bg-background rounded-2xl p-8 max-w-md w-full text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <StarIcon className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Login Required</h3>
              <p className="text-muted-foreground mb-6">
                Please login or register to submit a review and share your experience with us.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  Login / Register
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
