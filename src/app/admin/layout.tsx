import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Studio - Nyeras',
  description: 'Nyeras Master Administrator & Content Management Studio',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
