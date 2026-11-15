import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-accent-foreground shadow-[0_10px_30px_-12px_var(--accent)] hover:-translate-y-0.5 hover:brightness-110",
        outline:
          "border border-border bg-card/40 text-foreground backdrop-blur hover:-translate-y-0.5 hover:border-accent/60 hover:bg-card/80",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:text-accent hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-7",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ComponentProps<"a"> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export type ButtonElementProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function ButtonElement({ className, variant, size, ...props }: ButtonElementProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
