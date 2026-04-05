import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "accent";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
    
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent/10 hover:text-accent",
      link: "text-primary underline-offset-4 hover:underline",
      accent: "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5",
    };

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-14 rounded-xl px-10 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: { variant?: ButtonProps["variant"]; size?: ButtonProps["size"]; className?: string } = {}) {
  const base = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
  const v: Record<NonNullable<ButtonProps["variant"]>, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent/10 hover:text-accent",
    link: "text-primary underline-offset-4 hover:underline",
    accent: "bg-accent text-accent-foreground shadow-lg shadow-accent/25 hover:bg-accent/90",
  };
  const s: Record<NonNullable<ButtonProps["size"]>, string> = {
    default: "h-12 px-6 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-14 rounded-xl px-10 text-base",
    icon: "h-10 w-10",
  };
  return [base, v[variant ?? "default"], s[size ?? "default"], className].filter(Boolean).join(" ");
}

export { Button }
