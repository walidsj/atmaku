import * as React from 'react'

import { cn } from '@/lib/utils'

interface EmptyPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyPlaceholder({
   className,
   children,
   ...props
}: EmptyPlaceholderProps) {
   return (
      <div
         className={cn(
            'flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50',
            className
         )}
         {...props}
      >
         <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            {children}
         </div>
      </div>
   )
}

interface EmptyPlaceHolderIconProps
   extends React.HTMLAttributes<HTMLDivElement> {}

export const EmptyPlaceholderIcon = function EmptyPlaceHolderIcon({
   children,
}: EmptyPlaceHolderIconProps) {
   return (
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
         {children}
      </div>
   )
}

interface EmptyPlacholderTitleProps
   extends React.HTMLAttributes<HTMLHeadingElement> {}

export const EmptyPlaceholderTitle = function EmptyPlaceholderTitle({
   className,
   ...props
}: EmptyPlacholderTitleProps) {
   return (
      <h2 className={cn('mt-6 text-xl font-semibold', className)} {...props} />
   )
}

interface EmptyPlacholderDescriptionProps
   extends React.HTMLAttributes<HTMLParagraphElement> {}

export const EmptyPlaceholderDescription =
   function EmptyPlaceholderDescription({
      className,
      ...props
   }: EmptyPlacholderDescriptionProps) {
      return (
         <p
            className={cn(
               'mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground',
               className
            )}
            {...props}
         />
      )
   }
