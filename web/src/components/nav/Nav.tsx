"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

interface NavProps {
  links?: NavLink[];
  children?: React.ReactNode;
}

export function Nav({ links = [], children }: NavProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="mx-auto flex h-16 items-center justify-between px-6 md:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">
            Editora
          </span>
        </Link>

        {/* Nav Links */}
        {links.length > 0 && (
          <div className="hidden md:flex items-center gap-6 mx-6">
            {links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        {children && (
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {children}
          </div>
        )}
      </div>
    </nav>
  );
}
