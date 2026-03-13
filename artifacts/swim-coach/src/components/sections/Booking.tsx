import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateBooking, CreateBookingRequestService } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CalendarCheck } from "lucide-react";

// Mirroring the API schema locally for react-hook-form validation
const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  service: z.enum([
    CreateBookingRequestService.private_lesson, 
    CreateBookingRequestService.group_session, 
    CreateBookingRequestService.stroke_clinic, 
    CreateBookingRequestService.video_analysis, 
    CreateBookingRequestService.package_5, 
    CreateBookingRequestService.package_10
  ], { required_error: "Please select a service" }),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function Booking() {
  const { toast } = useToast();
  const createBooking = useCreateBooking();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: undefined,
      preferredDate: "",
      preferredTime: "",
      notes: "",
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    createBooking.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Request Sent!",
          description: "I'll get back to you shortly to confirm your session.",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again or email me directly.",
          variant: "destructive"
        });
        console.error(error);
      }
    });
  };

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24">
          
          {/* Left Text */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-3">Schedule</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Ready to dive in?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Fill out the request form and I'll get back to you within 24 hours to confirm our session time and location.
              </p>
              
              <div className="bg-secondary rounded-2xl p-6 border border-border/50">
                <h4 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-accent" />
                  What happens next?
                </h4>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-xs text-primary shrink-0 shadow-sm">1</span>
                    <p>Submit your preferred times and goals.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-xs text-primary shrink-0 shadow-sm">2</span>
                    <p>I review and coordinate pool lane availability.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-xs text-primary shrink-0 shadow-sm">3</span>
                    <p>You receive a calendar invite and payment link.</p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-6 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border"
            >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Name *</label>
                    <Input {...form.register("name")} placeholder="John Doe" />
                    {form.formState.errors.name && (
                      <p className="text-destructive text-xs mt-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Email *</label>
                    <Input type="email" {...form.register("email")} placeholder="john@example.com" />
                    {form.formState.errors.email && (
                      <p className="text-destructive text-xs mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Phone (Optional)</label>
                    <Input type="tel" {...form.register("phone")} placeholder="(555) 123-4567" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Service *</label>
                    <select 
                      {...form.register("service")}
                      className="flex h-12 w-full rounded-lg border-2 border-border bg-background px-4 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10 transition-all duration-200"
                    >
                      <option value="" disabled selected>Select a service</option>
                      <option value={CreateBookingRequestService.private_lesson}>Private Lesson ($80)</option>
                      <option value={CreateBookingRequestService.group_session}>Group Session ($40/ea)</option>
                      <option value={CreateBookingRequestService.stroke_clinic}>Stroke Clinic ($95)</option>
                      <option value={CreateBookingRequestService.video_analysis}>Video Analysis ($60)</option>
                      <option value={CreateBookingRequestService.package_5}>5-Session Package ($360)</option>
                      <option value={CreateBookingRequestService.package_10}>10-Session Package ($680)</option>
                    </select>
                    {form.formState.errors.service && (
                      <p className="text-destructive text-xs mt-1">{form.formState.errors.service.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Preferred Date</label>
                    <Input type="date" {...form.register("preferredDate")} />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Preferred Time</label>
                    <select 
                      {...form.register("preferredTime")}
                      className="flex h-12 w-full rounded-lg border-2 border-border bg-background px-4 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:border-accent focus-visible:ring-4 focus-visible:ring-accent/10 transition-all duration-200"
                    >
                      <option value="">Any Time</option>
                      <option value="morning">Morning (6AM - 11AM)</option>
                      <option value="afternoon">Afternoon (12PM - 4PM)</option>
                      <option value="evening">Evening (5PM - 8PM)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Goals / Notes</label>
                  <Textarea 
                    {...form.register("notes")} 
                    placeholder="Tell me about your current swimming level and what you want to achieve..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={createBooking.isPending}
                >
                  {createBooking.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Request...
                    </>
                  ) : "Submit Booking Request"}
                </Button>
                
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
