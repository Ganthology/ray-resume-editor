"use client";

import {
  AlertCircle,
  Brain,
  Briefcase,
  CheckCircle,
  Clock,
  Cloud,
  Crown,
  DollarSign,
  Eye,
  FileText,
  Filter,
  MessageSquare,
  Search,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/platform/component/ui/carousel";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import Link from "next/link";

export default function LandingPage() {
  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "End the formatting struggle forever",
      features: [
        "Professional templates (no more Word/Docs)",
        "Cloud-based saving & sync",
        "Real-time editing & preview",
        "ATS keyword extraction",
        "PDF export",
        "3 AI Message Credits",
      ],
      buttonText: "Get Started Free",
      buttonStyle: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      name: "Lite",
      price: "$10",
      priceSubtext: " one-time",
      badge: "Most Popular",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      description: "AI consultant for one perfect resume",
      features: [
        "50 AI Message Credits",
        "AI Resume Consultant (replaces $300+ writers)",
        "Generate 1 AI-optimized resume",
        "Upload existing resume for enhancement",
      ],
      excludedFeatures: ["Multiple job targeting"],
      buttonText: "Get Lite - $10",
      buttonStyle: "bg-stone-900 hover:bg-stone-800",
    },
    {
      name: "Pro",
      price: "$30",
      priceSubtext: " one-time",
      description: "Unlimited AI-powered job targeting",
      badge: "Best Value",
      badgeColor: "bg-stone-900 text-white",
      icon: <Crown className="h-5 w-5 text-stone-700 mr-2" />,
      features: [
        "200 AI Message Credits",
        "AI Resume Consultant (replaces $300+ writers)",
        "Unlimited tailored resumes",
        "Job library for tailored resumes",
        "Upload existing resume for enhancement",
        "More features on the roadmap",
        "Priority support",
      ],
      buttonText: "Get Pro - $30",
      buttonStyle: "bg-stone-900 hover:bg-stone-800",
      highlighted: true,
    },
  ];

  const testimonials = [
    {
      rating: 5,
      text: "Saved me $500 and weeks of frustration! The Pro plan helped me create 8 different resumes for different roles. Got 3 interviews in the first week - something that never happened with my old Word resume.",
      author: "Alex Martinez",
      role: "Software Engineer",
      initials: "AM",
    },
    {
      rating: 5,
      text: "I was spending hours every week fixing formatting in Google Docs. The free version alone eliminated all that headache. The templates just work perfectly every time.",
      author: "Jessica Liu",
      role: "Marketing Manager",
      initials: "JL",
    },
    {
      rating: 5,
      text: "The Lite plan was perfect for my job search. Instead of paying $400 for a resume writer, I spent $10 and got my resume enhanced by AI. Landed my first job out of college!",
      author: "David Kim",
      role: "Recent Graduate",
      initials: "DK",
    },
    {
      rating: 5,
      text: "The AI chat feature is incredible. It's like having a professional resume writer available 24/7. My interview rate increased by 300% after using Raysume AI.",
      author: "Sarah Chen",
      role: "Product Manager",
      initials: "SC",
    },
    {
      rating: 5,
      text: "Finally, a resume builder that actually understands ATS systems. My resumes now pass through every screening system. Worth every penny!",
      author: "Michael Rodriguez",
      role: "Data Scientist",
      initials: "MR",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-stone-900">
              Raysume AI
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="#templates"
              className="text-stone-600 hover:text-stone-900 transition-colors font-medium"
            >
              Templates
            </Link>
            <Button
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-50 bg-transparent"
            >
              Sign In
            </Button>
            <Button className="bg-stone-900 hover:bg-stone-800 text-white">
              Get Started Free
            </Button>
          </nav>
          <div className="md:hidden">
            <Button className="bg-stone-900 hover:bg-stone-800 text-white text-sm px-4 py-2">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Problem Statement */}
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-red-50 text-red-700 border border-red-200 hover:bg-red-50">
              <AlertCircle className="h-4 w-4 mr-2" />
              Stop Struggling with Resume Creation
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mb-4 sm:mb-6 leading-tight">
              No More Google Docs.{" "}
              <span className="text-stone-600">
                No More Expensive Consultants.
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-600 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-4">
              Stop wasting hours fighting with Word layouts and paying $500+ for
              resume writers.
              <strong className="text-stone-900">
                {" "}
                Raysume AI creates professional, ATS-optimized resumes in
                minutes
              </strong>{" "}
              — tailored for every job you apply to.
            </p>
          </div>

          {/* Problem vs Solution Grid */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Problems */}
            <Card className="border-2 border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-red-800 flex items-center">
                  <X className="h-5 sm:h-6 w-5 sm:w-6 mr-2" />
                  The Old Way (Frustrating & Expensive)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <X className="h-4 sm:h-5 w-4 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 text-sm sm:text-base">
                      Hours of Manual Formatting
                    </p>
                    <p className="text-xs sm:text-sm text-red-600">
                      Fighting with Google Docs and Word to align text, fix
                      spacing, and make it look professional
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <X className="h-4 sm:h-5 w-4 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 text-sm sm:text-base">
                      Expensive Resume Writers
                    </p>
                    <p className="text-xs sm:text-sm text-red-600">
                      Paying $300-$800 for consultants who take days to deliver
                      generic resumes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <X className="h-4 sm:h-5 w-4 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 text-sm sm:text-base">
                      One-Size-Fits-All Approach
                    </p>
                    <p className="text-xs sm:text-sm text-red-600">
                      Using the same resume for every job application, missing
                      out on opportunities
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <X className="h-4 sm:h-5 w-4 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 text-sm sm:text-base">
                      ATS Rejection
                    </p>
                    <p className="text-xs sm:text-sm text-red-600">
                      Resumes getting filtered out by Applicant Tracking Systems
                      before humans see them
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solutions */}
            <Card className="border-2 border-emerald-200 bg-emerald-50/50">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-emerald-800 flex items-center">
                  <CheckCircle className="h-5 sm:h-6 w-5 sm:w-6 mr-2" />
                  The Raysume AI Way (Fast & Smart)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800 text-sm sm:text-base">
                      Professional Templates Ready
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-600">
                      Pre-designed, ATS-optimized templates that look perfect
                      without any manual formatting
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800 text-sm sm:text-base">
                      AI Resume Consultant for $10-20
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-600">
                      Get expert-level resume optimization and career advice at
                      95% less cost
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800 text-sm sm:text-base">
                      Unlimited Tailored Resumes
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-600">
                      Create unique, job-specific resumes for every application
                      in minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-emerald-800 text-sm sm:text-base">
                      ATS-Optimized by Default
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-600">
                      Every resume passes ATS filters and reaches human
                      recruiters
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Benefits */}
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              {
                icon: Clock,
                iconColor: "bg-blue-100 text-blue-600",
                title: "Save 10+ Hours",
                desc: "Create professional resumes in minutes, not hours of formatting frustration",
              },
              {
                icon: DollarSign,
                iconColor: "bg-green-100 text-green-600",
                title: "Save $500+",
                desc: "Get expert-level resume consulting for a fraction of traditional consultant costs",
              },
              {
                icon: Zap,
                iconColor: "bg-purple-100 text-purple-600",
                title: "3x More Interviews",
                desc: "Tailored, ATS-optimized resumes that actually get you noticed by recruiters",
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="border border-stone-200 hover:border-stone-300 transition-colors text-center"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-10 sm:w-12 h-10 sm:h-12 ${
                      benefit.iconColor.split(" ")[0]
                    } rounded-lg flex items-center justify-center mb-3 mx-auto`}
                  >
                    <benefit.icon
                      className={`h-5 sm:h-6 w-5 sm:w-6 ${
                        benefit.iconColor.split(" ")[1]
                      }`}
                    />
                  </div>
                  <CardTitle className="text-base sm:text-lg text-stone-900">
                    {benefit.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-stone-600">
                    {benefit.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden mb-8 sm:mb-12">
            <div className="flex animate-scroll-benefits">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex">
                  {[
                    {
                      icon: Clock,
                      iconColor: "bg-blue-100 text-blue-600",
                      title: "Save 10+ Hours",
                      desc: "Create professional resumes in minutes, not hours of formatting frustration",
                    },
                    {
                      icon: DollarSign,
                      iconColor: "bg-green-100 text-green-600",
                      title: "Save $500+",
                      desc: "Get expert-level resume consulting for a fraction of traditional consultant costs",
                    },
                    {
                      icon: Zap,
                      iconColor: "bg-purple-100 text-purple-600",
                      title: "3x More Interviews",
                      desc: "Tailored, ATS-optimized resumes that actually get you noticed by recruiters",
                    },
                  ].map((benefit, index) => (
                    <Card
                      key={`${setIndex}-${index}`}
                      className="border border-stone-200 mx-2 min-w-[280px] text-center"
                    >
                      <CardHeader className="pb-4">
                        <div
                          className={`w-12 h-12 ${
                            benefit.iconColor.split(" ")[0]
                          } rounded-lg flex items-center justify-center mb-3 mx-auto`}
                        >
                          <benefit.icon
                            className={`h-6 w-6 ${
                              benefit.iconColor.split(" ")[1]
                            }`}
                          />
                        </div>
                        <CardTitle className="text-lg text-stone-900">
                          {benefit.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-stone-600">
                          {benefit.desc}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 sm:mb-8">
              <Button
                size="lg"
                className="bg-stone-900 hover:bg-stone-800 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Start Building Free - No Credit Card
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-stone-300 hover:bg-stone-50 bg-transparent"
              >
                See How It Works
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-stone-500">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                250K+ users
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-amber-500" />
                4.8/5 rating
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                95% ATS pass rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white border-t border-stone-200">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-stone-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Trusted by professionals at top companies
          </p>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-5 gap-4 sm:gap-8 items-center opacity-60">
            {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map(
              (company) => (
                <div
                  key={company}
                  className="text-stone-400 font-semibold text-sm sm:text-lg"
                >
                  {company}
                </div>
              )
            )}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden">
            <div className="flex animate-scroll-companies opacity-60">
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex">
                  {[
                    "Google",
                    "Microsoft",
                    "Amazon",
                    "Apple",
                    "Meta",
                    "Netflix",
                    "Spotify",
                    "Uber",
                  ].map((company, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="text-stone-400 font-semibold text-lg mx-8 whitespace-nowrap"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-stone-50 border-t border-stone-200"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto">
              From eliminating formatting headaches to AI-powered job targeting
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">
                Always Free
              </Badge>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-3">
                No More Formatting Nightmares
              </h3>
              <p className="text-stone-600 mt-2 text-sm sm:text-base">
                Professional resume builder that just works
              </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: FileText,
                  title: "Smart Editor",
                  desc: "Real-time editing with perfect formatting automatically",
                },
                {
                  icon: Cloud,
                  title: "Cloud Saving",
                  desc: "Never lose your work - access anywhere, anytime",
                },
                {
                  icon: Search,
                  title: "ATS Keywords",
                  desc: "Automatically extract and optimize for job requirements",
                },
                {
                  icon: Eye,
                  title: "Live Preview",
                  desc: "See exactly how your resume will look to employers",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border border-stone-200 hover:border-stone-300 transition-colors"
                >
                  <CardHeader className="text-center pb-4">
                    <feature.icon className="h-6 sm:h-8 w-6 sm:w-8 text-stone-700 mb-2 mx-auto" />
                    <CardTitle className="text-sm sm:text-base">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden overflow-hidden">
              <div className="flex animate-scroll-left">
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex">
                    {[
                      {
                        icon: FileText,
                        title: "Smart Editor",
                        desc: "Real-time editing with perfect formatting automatically",
                      },
                      {
                        icon: Cloud,
                        title: "Cloud Saving",
                        desc: "Never lose your work - access anywhere, anytime",
                      },
                      {
                        icon: Search,
                        title: "ATS Keywords",
                        desc: "Automatically extract and optimize for job requirements",
                      },
                      {
                        icon: Eye,
                        title: "Live Preview",
                        desc: "See exactly how your resume will look to employers",
                      },
                    ].map((feature, index) => (
                      <Card
                        key={`${setIndex}-${index}`}
                        className="border border-stone-200 mx-2 min-w-[280px]"
                      >
                        <CardHeader className="text-center pb-4">
                          <feature.icon className="h-8 w-8 text-stone-700 mb-2 mx-auto" />
                          <CardTitle className="text-base">
                            {feature.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {feature.desc}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Features */}
          <div>
            <div className="text-center mb-6 sm:mb-8">
              <Badge className="bg-stone-100 text-stone-800 border border-stone-300">
                AI-Powered Consultant
              </Badge>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-3">
                Replace Expensive Resume Writers
              </h3>
              <p className="text-stone-600 mt-2 text-sm sm:text-base">
                Get expert-level optimization for $10-20 instead of $500+
              </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "ATS Optimization",
                  desc: "AI ensures 95%+ ATS pass rate - no more black hole applications",
                },
                {
                  icon: MessageSquare,
                  title: "AI Chat Consultant",
                  desc: "Chat with AI to craft perfect resume content and get career advice",
                },
                {
                  icon: Briefcase,
                  title: "Job-Specific Tailoring",
                  desc: "Create unique resumes for every job - maximize your chances",
                },
                {
                  icon: Brain,
                  title: "Interview Preparation",
                  desc: "Get personalized interview questions and company research",
                },
                {
                  icon: Filter,
                  title: "Content Analysis",
                  desc: "Identify weak content and get suggestions for improvement",
                },
                {
                  icon: TrendingUp,
                  title: "Career Enhancement",
                  desc: "Continuous improvement based on industry best practices",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="border border-stone-200 hover:border-stone-300 transition-colors"
                >
                  <CardHeader className="pb-4">
                    <feature.icon className="h-6 sm:h-8 w-6 sm:w-8 text-stone-700 mb-2" />
                    <CardTitle className="text-sm sm:text-base">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {feature.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden overflow-hidden">
              <div className="flex animate-scroll-right">
                {[...Array(2)].map((_, setIndex) => (
                  <div key={setIndex} className="flex">
                    {[
                      {
                        icon: Target,
                        title: "ATS Optimization",
                        desc: "AI ensures 95%+ ATS pass rate - no more black hole applications",
                      },
                      {
                        icon: MessageSquare,
                        title: "AI Chat Consultant",
                        desc: "Chat with AI to craft perfect resume content and get career advice",
                      },
                      {
                        icon: Briefcase,
                        title: "Job-Specific Tailoring",
                        desc: "Create unique resumes for every job - maximize your chances",
                      },
                      {
                        icon: Brain,
                        title: "Interview Preparation",
                        desc: "Get personalized interview questions and company research",
                      },
                      {
                        icon: Filter,
                        title: "Content Analysis",
                        desc: "Identify weak content and get suggestions for improvement",
                      },
                      {
                        icon: TrendingUp,
                        title: "Career Enhancement",
                        desc: "Continuous improvement based on industry best practices",
                      },
                    ].map((feature, index) => (
                      <Card
                        key={`${setIndex}-${index}`}
                        className="border border-stone-200 mx-2 min-w-[280px]"
                      >
                        <CardHeader className="pb-4">
                          <feature.icon className="h-8 w-8 text-stone-700 mb-2" />
                          <CardTitle className="text-base">
                            {feature.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {feature.desc}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-t border-stone-200"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
              Simple Pricing That Saves You Money
            </h2>
            <p className="text-base sm:text-lg text-stone-600">
              Start free, upgrade when you need AI-powered optimization
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`border ${
                  plan.highlighted
                    ? "border-2 border-stone-900"
                    : "border-stone-200 hover:border-stone-300"
                } transition-colors relative`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className={plan.badgeColor + " px-3 py-1"}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-xl flex items-center justify-center">
                    {plan.icon}
                    {plan.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-stone-900 mt-3">
                    {plan.price}
                    {plan.priceSubtext && (
                      <span className="text-base text-stone-500 font-normal">
                        {plan.priceSubtext}
                      </span>
                    )}
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: feature }} />
                      </li>
                    ))}
                    {plan.excludedFeatures?.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-stone-400"
                      >
                        <X className="h-4 w-4 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className={`w-full ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel using shadcn/ui */}
          <div className="md:hidden">
            <Carousel opts={{ loop: true }}>
              <CarouselContent className="overflow-visible py-3">
                {pricingPlans.map((plan, index) => (
                  <CarouselItem key={index}>
                    <Card
                      className={`border ${
                        plan.highlighted
                          ? "border-2 border-stone-900"
                          : "border-stone-200"
                      } transition-colors relative`}
                    >
                      {plan.badge && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className={plan.badgeColor + " px-3 py-1"}>
                            {plan.badge}
                          </Badge>
                        </div>
                      )}
                      <CardHeader className="text-center pb-6">
                        <CardTitle className="text-xl flex items-center justify-center">
                          {plan.icon}
                          {plan.name}
                        </CardTitle>
                        <div className="text-3xl font-bold text-stone-900 mt-3">
                          {plan.price}
                          {plan.priceSubtext && (
                            <span className="text-base text-stone-500 font-normal">
                              {plan.priceSubtext}
                            </span>
                          )}
                        </div>
                        <CardDescription className="mt-2">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-center text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                              <span
                                dangerouslySetInnerHTML={{ __html: feature }}
                              />
                            </li>
                          ))}
                          {plan.excludedFeatures?.map(
                            (feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-center text-sm text-stone-400"
                              >
                                <X className="h-4 w-4 mr-3 flex-shrink-0" />
                                {feature}
                              </li>
                            )
                          )}
                        </ul>
                        <Button className={`w-full ${plan.buttonStyle}`}>
                          {plan.buttonText}
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section
        id="templates"
        className="py-12 sm:py-16 px-4 sm:px-6 bg-stone-50 border-t border-stone-200"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
              Professional Templates That Actually Work
            </h2>
            <p className="text-base sm:text-lg text-stone-600">
              No more fighting with layouts - these templates are ATS-optimized
              and recruiter-approved
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {[1, 2, 3].map((template) => (
              <Card
                key={template}
                className="border border-stone-200 hover:border-stone-300 transition-colors"
              >
                <CardContent className="p-0">
                  <div className="h-32 sm:h-48 bg-gradient-to-br from-stone-100 to-stone-200 rounded-t-lg flex items-center justify-center">
                    <FileText className="h-8 sm:h-12 w-8 sm:w-12 text-stone-400" />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold mb-2 text-stone-900 text-sm sm:text-base">
                      Professional Template {template}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600">
                      Clean, ATS-friendly design that passes all screening
                      systems
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Badge className="bg-stone-100 text-stone-800 border border-stone-300 px-4 py-2">
              🚀 More templates coming soon!
            </Badge>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-t border-stone-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg text-stone-600">
              See how Raysume AI helped professionals save time and money while
              landing better jobs
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Card key={index} className="border border-stone-200">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-500 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-stone-600 mb-4 text-sm">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-stone-600 font-semibold text-sm">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-stone-900">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-stone-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden">
            <div className="flex animate-scroll-testimonials">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex">
                  {testimonials.map((testimonial, index) => (
                    <Card
                      key={`${setIndex}-${index}`}
                      className="border border-stone-200 mx-2 min-w-[300px]"
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-center mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 text-amber-500 fill-current"
                            />
                          ))}
                        </div>
                        <p className="text-stone-600 mb-4 text-sm">
                          {testimonial.text}
                        </p>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-stone-600 font-semibold text-sm">
                              {testimonial.initials}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-stone-900">
                              {testimonial.author}
                            </p>
                            <p className="text-xs text-stone-500">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-stone-900">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Stop Wasting Time and Money on Resume Creation
          </h2>
          <p className="text-base sm:text-lg text-stone-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who&apos;ve eliminated formatting
            headaches and expensive consultants
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-stone-900 hover:bg-stone-100 px-6 sm:px-8 py-3 sm:py-4"
            >
              Start Free - No Credit Card Required
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-stone-600 text-white hover:bg-stone-800 px-6 sm:px-8 py-3 sm:py-4 bg-transparent"
            >
              See All Features
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-8 sm:py-12 px-4 sm:px-6 border-t border-stone-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-stone-900 font-bold text-xs">R</span>
                </div>
                <span className="text-lg sm:text-xl font-bold">Raysume AI</span>
              </div>
              <p className="text-stone-400 text-xs sm:text-sm">
                The smart resume builder that eliminates formatting headaches
                and replaces expensive consultants.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">
                Product
              </h4>
              <ul className="space-y-2 text-stone-400 text-xs sm:text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Resume Builder
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    AI Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">
                Resources
              </h4>
              <ul className="space-y-2 text-stone-400 text-xs sm:text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Resume Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    ATS Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Career Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm sm:text-base">
                Company
              </h4>
              <ul className="space-y-2 text-stone-400 text-xs sm:text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-stone-400 text-xs sm:text-sm">
            <p>&copy; 2025 Raysume AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes scroll-testimonials {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-benefits {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-companies {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 35s linear infinite;
        }

        .animate-scroll-testimonials {
          animation: scroll-testimonials 40s linear infinite;
        }

        .animate-scroll-benefits {
          animation: scroll-benefits 25s linear infinite;
        }

        .animate-scroll-companies {
          animation: scroll-companies 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
