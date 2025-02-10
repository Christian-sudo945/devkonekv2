"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { motion } from "framer-motion"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "top" | "right" | "bottom" | "left"
  }
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetPrimitive.Content
      ref={ref}
      className={`fixed z-50 overflow-y-auto bg-white dark:bg-gray-900 p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out duration-300 ${
        side === "right" ? "inset-y-0 right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right" :
        side === "left" ? "inset-y-0 left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left" :
        side === "top" ? "inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top" :
        "inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
      } ${className}`}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-2 text-left mb-6 ${className}`} {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={`text-lg font-semibold text-foreground ${className}`}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
}