import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const Badge = ({
  className,
  variant = "default",
  ...props
}: BadgeProps) => {
  const getClassNames = () => {
    let baseClass = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    switch (variant) {
      case "default":
        baseClass += " border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
        break;
      case "secondary":
        baseClass += " border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
        break;
      case "destructive":
        baseClass += " border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80";
        break;
      case "outline":
        baseClass += " text-foreground border-2 border-foreground hover:bg-foreground/20";
        break;
      default:
        break;
    }
    if (className) {
      baseClass += ` ${className}`;
    }

    return baseClass;
  };

  return (
    <div className={getClassNames()} {...props} />
  );
};

export { Badge };
