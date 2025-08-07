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
        <Nav
          title="Navigation"
          page={[{ href: "/details", title: "Details" }]}
        ></Nav>
        <div className="h-min-[70vh] ">{children}</div>
      </div>
  );
}
