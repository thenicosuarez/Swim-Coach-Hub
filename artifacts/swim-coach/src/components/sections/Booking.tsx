import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  CalendarCheck,
  ExternalLink,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/[your-handle]";

const quickServices = [
  { label: "Private Lesson", sub: "from $60 / 30 min" },
  { label: "Advanced / Team Prep", sub: "from $65 / 30 min" },
  { label: "Baby & Toddler", sub: "from $40 / session" },
  { label: "Group / Family", sub: "$50 / 45 min" },
  { label: "Video Review", sub: "$20 / video" },
];

const intakeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  neighborhood: z.string().min(2, "Neighborhood is required"),
  swimmerAge: z.string().optional(),
  serviceInterest: z.string().min(1, "Please select a service"),
  goal: z.string().min(1, "Please select a goal"),
  allFourStrokes: z.string().min(1, "Please select an option"),
  poolAccess: z.string().min(1, "Please select an option"),
  preferredDays: z.array(z.string()).optional(),
  preferredTime: z.string().optional(),
  experience: z.string().optional(),
  notes: z.string().optional(),
});

type IntakeFormValues = z.infer<typeof intakeSchema>;

export function Booking() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<IntakeFormValues>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      neighborhood: "",
      swimmerAge: "",
      serviceInterest: "",
      goal: "",
      allFourStrokes: "",
      poolAccess: "",
      preferredDays: [],
      preferredTime: "",
      experience: "",
      notes: "",
    },
  });

  const onSubmit = async (data: IntakeFormValues) => {
    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
      const res = await fetch(`${baseUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.serviceInterest,
          notes: JSON.stringify({
            neighborhood: data.neighborhood,
            swimmerAge: data.swimmerAge,
            goal: data.goal,
            allFourStrokes: data.allFourStrokes,
            poolAccess: data.poolAccess,
            preferredDays: data.preferredDays,
            preferredTime: data.preferredTime,
            experience: data.experience,
            additionalNotes: data.notes,
          }),
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast({
        title: "Got it! Thank you!",
        description:
          "I'll review your info and reach out within 24 hours to set up your first session.",
      });
      setIsSubmitted(true);
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const days = [
    "Monday",
    "Thursday PM",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <section id="booking" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold tracking-widest uppercase text-sm mb-3"
          >
            Schedule
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6"
          >
            Ready to dive in?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Pick a service and book directly on my Calendly, or fill out the
            intake form below so I can learn about your swimmer first!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {quickServices.map((svc, i) => (
            <motion.a
              key={svc.label}
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group bg-card border border-border/50 rounded-xl p-5 flex flex-col items-center text-center hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <h4 className="font-display font-bold text-foreground mb-1">
                {svc.label}
              </h4>
              <p className="text-xs text-muted-foreground mb-3">{svc.sub}</p>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:text-accent transition-colors">
                Schedule on Calendly
                <ExternalLink className="w-3 h-3" />
              </span>
            </motion.a>
          ))}
        </div>

        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarCheck className="w-4 h-4 text-primary" />
            <span>
              I'm usually free <strong className="text-foreground">Mondays, Thursday afternoons, Fridays,</strong> and <strong className="text-foreground">weekends</strong>.
            </span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                Tell me about your swimmer
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Help me prepare for our first session! The more I know about your
                goals, the better I can customize your experience.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-card rounded-3xl shadow-xl shadow-black/5 border border-border p-10 text-center">
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                <h4 className="font-display text-2xl font-bold text-foreground mb-2">
                  Thank you!
                </h4>
                <p className="text-muted-foreground mb-6">
                  I've got your info and I'll reach out within 24 hours.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit another form
                </Button>
              </div>
            ) : (
              <div className="bg-card p-6 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-border">
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div>
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 pb-2 border-b border-border">
                      Your Info
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">
                          Your Name *
                        </label>
                        <Input
                          {...form.register("name")}
                          placeholder="First & last name"
                        />
                        {form.formState.errors.name && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">
                          Email *
                        </label>
                        <Input
                          type="email"
                          {...form.register("email")}
                          placeholder="your@email.com"
                        />
                        {form.formState.errors.email && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">
                          Phone *
                        </label>
                        <Input
                          type="tel"
                          {...form.register("phone")}
                          placeholder="(312) 555-1234"
                        />
                        {form.formState.errors.phone && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">
                          Neighborhood / Area *
                        </label>
                        <Input
                          {...form.register("neighborhood")}
                          placeholder="e.g. West Loop, Lincoln Park, Oak Park..."
                        />
                        {form.formState.errors.neighborhood && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.neighborhood.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 pb-2 border-b border-border">
                      About the Swimmer
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">
                          Swimmer's Age
                        </label>
                        <Input
                          {...form.register("swimmerAge")}
                          placeholder="e.g. 6, Adult, 18 months..."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">
                          Service Interest *
                        </label>
                        <select
                          {...form.register("serviceInterest")}
                          className="flex h-12 w-full rounded-lg border-2 border-border bg-background px-4 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-200"
                        >
                          <option value="">Select a service</option>
                          <option value="private_lesson">Private Lesson</option>
                          <option value="advanced_team_prep">
                            Advanced / Team Prep
                          </option>
                          <option value="baby_toddler">Baby & Toddler</option>
                          <option value="group_family">Group / Family</option>
                          <option value="video_review">Video Review</option>
                          <option value="not_sure">Not sure yet</option>
                        </select>
                        {form.formState.errors.serviceInterest && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.serviceInterest.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 space-y-1.5">
                      <label className="text-sm font-semibold text-foreground">
                        Current Experience Level
                      </label>
                      <select
                        {...form.register("experience")}
                        className="flex h-12 w-full rounded-lg border-2 border-border bg-background px-4 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-200"
                      >
                        <option value="">Select experience level</option>
                        <option value="none">No swimming experience</option>
                        <option value="beginner">
                          Beginner — can float / kick a little
                        </option>
                        <option value="intermediate">
                          Intermediate — can swim but wants to improve
                        </option>
                        <option value="advanced">
                          Advanced — competitive / team swimmer
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-foreground mb-4 pb-2 border-b border-border">
                      Goals & Preferences
                    </h4>

                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                          What's the main goal? *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            {
                              value: "water_safety",
                              label: "Water Safety",
                              desc: "Survival skills & comfort in water",
                            },
                            {
                              value: "recreational",
                              label: "Recreational",
                              desc: "Confident swimming for fun & vacations",
                            },
                            {
                              value: "competitive",
                              label: "Competitive",
                              desc: "Stroke precision & faster times",
                            },
                          ].map((opt) => (
                            <label
                              key={opt.value}
                              className={`relative flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                form.watch("goal") === opt.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/30"
                              }`}
                            >
                              <input
                                type="radio"
                                value={opt.value}
                                {...form.register("goal")}
                                className="sr-only"
                              />
                              <span className="font-semibold text-sm text-foreground">
                                {opt.label}
                              </span>
                              <span className="text-xs text-muted-foreground mt-0.5">
                                {opt.desc}
                              </span>
                            </label>
                          ))}
                        </div>
                        {form.formState.errors.goal && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.goal.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                          Want to learn all four strokes? *
                        </label>
                        <div className="flex gap-3">
                          {[
                            { value: "yes", label: "Yes, all four!" },
                            { value: "no", label: "Not necessarily" },
                            { value: "not_sure", label: "Not sure yet" },
                          ].map((opt) => (
                            <label
                              key={opt.value}
                              className={`flex-1 text-center py-3 px-4 rounded-xl border-2 cursor-pointer text-sm font-semibold transition-all duration-200 ${
                                form.watch("allFourStrokes") === opt.value
                                  ? "border-primary bg-primary/5 text-foreground"
                                  : "border-border text-muted-foreground hover:border-primary/30"
                              }`}
                            >
                              <input
                                type="radio"
                                value={opt.value}
                                {...form.register("allFourStrokes")}
                                className="sr-only"
                              />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                        {form.formState.errors.allFourStrokes && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.allFourStrokes.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                          Do you have access to a pool? *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            {
                              value: "own_pool",
                              label: "Yes, I have a pool",
                            },
                            {
                              value: "building_pool",
                              label: "Building / HOA pool",
                            },
                            {
                              value: "need_location",
                              label: "I need a location",
                            },
                          ].map((opt) => (
                            <label
                              key={opt.value}
                              className={`text-center py-3 px-4 rounded-xl border-2 cursor-pointer text-sm font-semibold transition-all duration-200 ${
                                form.watch("poolAccess") === opt.value
                                  ? "border-primary bg-primary/5 text-foreground"
                                  : "border-border text-muted-foreground hover:border-primary/30"
                              }`}
                            >
                              <input
                                type="radio"
                                value={opt.value}
                                {...form.register("poolAccess")}
                                className="sr-only"
                              />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                        {form.formState.errors.poolAccess && (
                          <p className="text-destructive text-xs">
                            {form.formState.errors.poolAccess.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">
                          Preferred Days
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {days.map((day) => {
                            const selected =
                              form.watch("preferredDays")?.includes(day) ??
                              false;
                            return (
                              <label
                                key={day}
                                className={`py-2 px-4 rounded-full border-2 cursor-pointer text-sm font-medium transition-all duration-200 ${
                                  selected
                                    ? "border-primary bg-primary/10 text-foreground"
                                    : "border-border text-muted-foreground hover:border-primary/30"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  value={day}
                                  {...form.register("preferredDays")}
                                  className="sr-only"
                                />
                                {day}
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">
                          Preferred Time of Day
                        </label>
                        <select
                          {...form.register("preferredTime")}
                          className="flex h-12 w-full rounded-lg border-2 border-border bg-background px-4 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 transition-all duration-200"
                        >
                          <option value="">Any time works</option>
                          <option value="morning">
                            Morning (6 AM - 11 AM)
                          </option>
                          <option value="afternoon">
                            Afternoon (12 PM - 4 PM)
                          </option>
                          <option value="evening">
                            Evening (5 PM - 8 PM)
                          </option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-foreground">
                          Anything else I should know?
                        </label>
                        <Textarea
                          {...form.register("notes")}
                          placeholder="Medical considerations, fears, past swim experience, questions for me..."
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send My Swimmer Info"
                    )}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
