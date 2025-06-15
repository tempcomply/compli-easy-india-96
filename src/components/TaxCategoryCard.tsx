
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface TaxCategoryCardProps {
  icon: LucideIcon;
  label: string;
  description: string;
  cta: string;
  onClick: () => void;
}

const TaxCategoryCard: React.FC<TaxCategoryCardProps> = ({
  icon: Icon,
  label,
  description,
  cta,
  onClick,
}) => (
  <Card
    tabIndex={0}
    role="button"
    onClick={onClick}
    onKeyDown={e => { if (e.key === "Enter" || e.key === " ") onClick(); }}
    className="group transition-all cursor-pointer outline-none ring-0 hover:shadow-lg focus:ring-2 focus:ring-primary/50 focus:z-10 bg-card/90 hover:bg-background animate-fade-in min-h-64 duration-150"
    aria-label={`Go to ${label}`}
  >
    <CardHeader className="flex flex-row items-center gap-4 pb-2">
      <Icon className="w-9 h-9 text-primary group-hover:scale-110 transition-transform duration-200" />
      <CardTitle className="text-xl">{label}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="mb-2">{description}</CardDescription>
    </CardContent>
    <CardFooter className="pt-0">
      <Button
        variant="secondary"
        size="sm"
        tabIndex={-1}
        className="ml-auto"
        aria-label={cta}
      >
        {cta}
      </Button>
    </CardFooter>
  </Card>
);

export default TaxCategoryCard;
