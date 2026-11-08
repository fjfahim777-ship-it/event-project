import Image from "next/image";
import Hero from "@/components/home/Hero"
import ImpactStats from "@/components/home/ImpactStats";
import Features from "@/components/home/Features";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import CommunityGallery from "@/components/home/CommunityGallery";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <Features />
      <UpcomingEvents />
      <CommunityGallery />
      <Newsletter />
    </>
  )
}
