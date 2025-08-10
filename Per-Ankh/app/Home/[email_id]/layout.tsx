'use client'
import Nav from '@/app/components/Nav'
import Fooder from '@/app/components/fooder'

export default function ChildrenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        
        <div className="h-min-[70vh] ">{children}</div>
      </div>
  );
}
