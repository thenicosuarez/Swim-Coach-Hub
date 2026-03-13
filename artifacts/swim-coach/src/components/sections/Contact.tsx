import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "Thanks for reaching out! I'll reply soon.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to send message. Try emailing me directly.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <section id="contact" className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-black text-white/[0.03] whitespace-nowrap pointer-events-none select-none">
        LET'S SWIM
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent font-bold tracking-widest uppercase text-sm mb-3">Questions?</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
              Get in Touch
            </h3>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input 
                    {...form.register("name")} 
                    placeholder="Your Name" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent/20"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-300 text-xs mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Input 
                    type="email" 
                    {...form.register("email")} 
                    placeholder="Your Email" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent/20"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-300 text-xs mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Textarea 
                  {...form.register("message")} 
                  placeholder="How can I help you?" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:border-accent focus-visible:ring-accent/20"
                />
                {form.formState.errors.message && (
                  <p className="text-red-300 text-xs mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                variant="accent" 
                size="lg" 
                className="w-full"
                disabled={submitContact.isPending}
              >
                {submitContact.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
