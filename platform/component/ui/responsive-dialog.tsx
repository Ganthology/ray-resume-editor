"use client"

import * as React from "react"
import { useMediaQuery } from "@/platform/hooks/use-media-query"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "./dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer"

interface ResponsiveDialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function ResponsiveDialog({
  children,
  open,
  onOpenChange,
}: ResponsiveDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children}
    </Drawer>
  )
}

const ResponsiveDialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogTrigger>,
  React.ComponentPropsWithoutRef<typeof DialogTrigger>
>(({ ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const Trigger = isDesktop ? DialogTrigger : DrawerTrigger
  return <Trigger ref={ref} {...props} />
})
ResponsiveDialogTrigger.displayName = "ResponsiveDialogTrigger"

const ResponsiveDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent> & {
    drawerSide?: "top" | "bottom" | "left" | "right"
  }
>(({ className, drawerSide = "bottom", ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  if (isDesktop) {
    return <DialogContent ref={ref} className={className} {...props} />
  }

  return <DrawerContent ref={ref} side={drawerSide} className={className} {...props} />
})
ResponsiveDialogContent.displayName = "ResponsiveDialogContent"

const ResponsiveDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  if (isDesktop) {
    return <DialogHeader className={className} {...props} />
  }
  
  return <DrawerHeader className={className} {...props} />
}
ResponsiveDialogHeader.displayName = "ResponsiveDialogHeader"

const ResponsiveDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const Title = isDesktop ? DialogTitle : DrawerTitle
  return <Title ref={ref} {...props} />
})
ResponsiveDialogTitle.displayName = "ResponsiveDialogTitle"

const ResponsiveDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogDescription>,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const Description = isDesktop ? DialogDescription : DrawerDescription
  return <Description ref={ref} {...props} />
})
ResponsiveDialogDescription.displayName = "ResponsiveDialogDescription"

const ResponsiveDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  
  if (isDesktop) {
    return <DialogFooter className={className} {...props} />
  }
  
  return <DrawerFooter className={className} {...props} />
}
ResponsiveDialogFooter.displayName = "ResponsiveDialogFooter"

const ResponsiveDialogClose = React.forwardRef<
  React.ElementRef<typeof DialogClose>,
  React.ComponentPropsWithoutRef<typeof DialogClose>
>(({ ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const Close = isDesktop ? DialogClose : DrawerClose
  return <Close ref={ref} {...props} />
})
ResponsiveDialogClose.displayName = "ResponsiveDialogClose"

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogClose,
}