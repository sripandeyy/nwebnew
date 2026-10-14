import { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "About Us | Nyeras Edutech",
  description: "Learn about Nyeras, an edtech platform based in Bengaluru, India. We help students learn practical tech skills through internships, projects, and mentorship.",
}

export default function AboutPage() {
  return <AboutClient />
}
