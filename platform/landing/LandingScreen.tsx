import {
  Brain,
  Briefcase,
  CheckCircle,
  Cloud,
  Crown,
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
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/platform/component/ui/card";

import { Badge } from "@/platform/component/ui/badge";
import { Button } from "@/platform/component/ui/button";
import { LandingConstants } from "./LandingConstants";
import Link from "next/link";

// import { useRouter } from "next/navigation";

export default function LandingPage() {
  // const router = useRouter();
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-stone-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-2xl font-bold text-stone-900">
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
            <Link href="/editor">
              <Button className="bg-stone-900 hover:bg-stone-800 text-white hover:cursor-pointer">
                Get Started Free
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-stone-100 text-stone-800 hover:bg-stone-100 border border-stone-200">
              ✨ AI-Powered Resume Builder
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-6 leading-tight">
              Build Professional Resumes with{" "}
              <span className="text-stone-700">Raysume AI</span>
            </h1>
            <p className="text-xl text-stone-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Create ATS-optimized resumes with our intelligent editor. Start
              free, upgrade for AI-powered resume generation and job targeting
              features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/editor">
                <Button
                  size="lg"
                  className="hover:cursor-pointer bg-stone-900 hover:bg-stone-800 text-lg px-8 py-4"
                >
                  Create your first resume
                </Button>
              </Link>
              <Link href="/chat">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover:cursor-pointer text-lg px-8 py-4 border-stone-300 hover:bg-stone-50 bg-transparent"
                >
                  Build with AI Resume Coach
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-stone-700" />
                </div>
                <CardTitle className="text-lg text-stone-900">
                  Smart Editor
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Real-time editing with instant preview and ATS optimization
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-3">
                  <Brain className="h-6 w-6 text-stone-700" />
                </div>
                <CardTitle className="text-lg text-stone-900">
                  AI-Powered
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Generate and enhance resumes with advanced AI technology
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-3">
                  <Target className="h-6 w-6 text-stone-700" />
                </div>
                <CardTitle className="text-lg text-stone-900">
                  Job Targeting
                </CardTitle>
                <CardDescription className="text-stone-600">
                  Tailor resumes for specific jobs and track applications
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-stone-500 mt-12">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              1K+ users
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-amber-500" />
              4.8/5 rating
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
              ATS-optimized
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-16 px-6 bg-white border-t border-stone-200"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Everything You Need for Resume Success
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              From basic editing to AI-powered optimization and job targeting
            </p>
          </div>

          {/* Core Features */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200">
                Always Free
              </Badge>
              <h3 className="text-xl font-bold text-stone-900 mt-3">
                Core Resume Builder
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="text-center pb-4">
                  <FileText className="h-8 w-8 text-stone-700 mb-2 mx-auto" />
                  <CardTitle className="text-base">Smart Editor</CardTitle>
                  <CardDescription className="text-sm">
                    Real-time editing with instant preview
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="text-center pb-4">
                  <Cloud className="h-8 w-8 text-stone-700 mb-2 mx-auto" />
                  <CardTitle className="text-base">Cloud Saving</CardTitle>
                  <CardDescription className="text-sm">
                    Access your resumes anywhere, anytime
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="text-center pb-4">
                  <Search className="h-8 w-8 text-stone-700 mb-2 mx-auto" />
                  <CardTitle className="text-base">ATS Keywords</CardTitle>
                  <CardDescription className="text-sm">
                    Extract and optimize for ATS systems
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="text-center pb-4">
                  <Eye className="h-8 w-8 text-stone-700 mb-2 mx-auto" />
                  <CardTitle className="text-base">Live Preview</CardTitle>
                  <CardDescription className="text-sm">
                    See changes as you type
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Premium Features */}
          <div>
            <div className="text-center mb-8">
              <Badge className="bg-stone-100 text-stone-800 border border-stone-300">
                Premium AI Features
              </Badge>
              <h3 className="text-xl font-bold text-stone-900 mt-3">
                Advanced AI-Powered Tools
              </h3>
              <p className="text-stone-600 mt-2">
                Available with Lite and Pro plans
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="pb-4">
                  <Target className="h-8 w-8 text-stone-700 mb-2" />
                  <CardTitle className="text-base">ATS Optimization</CardTitle>
                  <CardDescription className="text-sm">
                    AI analyzes and optimizes your resume for maximum ATS
                    compatibility
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="pb-4">
                  <MessageSquare className="h-8 w-8 text-stone-700 mb-2" />
                  <CardTitle className="text-base">AI Resume Coach</CardTitle>
                  <CardDescription className="text-sm">
                    Chat with AI to generate and enhance resume content
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="pb-4">
                  <Briefcase className="h-8 w-8 text-stone-700 mb-2" />
                  <CardTitle className="text-base">Job Targeting</CardTitle>
                  <CardDescription className="text-sm">
                    Customize resumes for specific job descriptions and
                    requirements
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="pb-4">
                  <Brain className="h-8 w-8 text-stone-700 mb-2" />
                  <CardTitle className="text-base">Interview Prep</CardTitle>
                  <CardDescription className="text-sm">
                    Get personalized interview questions and preparation tips
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="pb-4">
                  <Filter className="h-8 w-8 text-stone-700 mb-2" />
                  <CardTitle className="text-base">Content Analysis</CardTitle>
                  <CardDescription className="text-sm">
                    Identify and improve AI-generated or weak content
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
                <CardHeader className="pb-4">
                  <TrendingUp className="h-8 w-8 text-stone-700 mb-2" />
                  <CardTitle className="text-base">Enhancement</CardTitle>
                  <CardDescription className="text-sm">
                    Continuous improvement based on industry best practices
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-16 px-6 bg-stone-50 border-t border-stone-200"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Simple, Affordable Pricing
            </h2>
            <p className="text-lg text-stone-600">
              Choose the plan that fits your career goals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
              <CardHeader className="text-center pb-6">
                <Badge className="bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
                  Most Popular
                </Badge>
                <CardTitle className="text-xl">Basic</CardTitle>
                <div className="text-3xl font-bold text-stone-900 mt-3">
                  Free
                </div>
                <CardDescription className="mt-2">
                  Forever free with core features
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Resume builder with templates
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Cloud-based saving (logged in users)
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Real-time editing & preview
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    ATS keyword extraction
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    PDF export
                  </li>
                  <li className="flex items-center text-sm text-stone-400">
                    <X className="h-4 w-4 mr-3 flex-shrink-0" />
                    AI Resume Coach
                  </li>
                  <li className="flex items-center text-sm text-stone-400">
                    <X className="h-4 w-4 mr-3 flex-shrink-0" />
                    AI Optimized Resume
                  </li>
                </ul>
                <Link href="/editor">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Lite Plan */}
            <Card className="border border-stone-200 hover:border-stone-300 transition-colors">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl">Lite</CardTitle>
                <div className="text-3xl font-bold text-stone-900 mt-3">
                  $10
                  <span className="text-base text-stone-500 font-normal">
                    {" "}
                    one-time
                  </span>
                </div>
                <CardDescription className="mt-2">
                  Perfect for single resume generation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Everything in Basic
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    <span>
                      <strong>AI Resume Coach</strong> for resume generation
                    </span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Generate 1 AI-optimized resume
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Upload existing resume for context
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Resume enhancement suggestions
                  </li>
                  <li className="flex items-center text-sm text-stone-400">
                    <X className="h-4 w-4 mr-3 flex-shrink-0" />
                    Multiple job targeting
                  </li>
                </ul>
                <Button className="w-full bg-stone-900 hover:bg-stone-800">
                  Get Lite - $10
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-stone-900 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-stone-900 text-white px-3 py-1">
                  Best Value
                </Badge>
              </div>
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl flex items-center justify-center">
                  <Crown className="h-5 w-5 text-stone-700 mr-2" />
                  Pro
                </CardTitle>
                <div className="text-3xl font-bold text-stone-900 mt-3">
                  $20
                  <span className="text-base text-stone-500 font-normal">
                    {" "}
                    one-time
                  </span>
                </div>
                <CardDescription className="mt-2">
                  Unlimited resumes & job targeting
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Everything in Lite
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    <span>
                      <strong>Advanced AI Resume Coach</strong> with unlimited
                      access
                    </span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    <strong>Unlimited</strong> resume generation
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Tailor resumes to different jobs
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Job library to save positions
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Interview preparation & company research
                  </li>
                </ul>
                <Button className="w-full bg-stone-900 hover:bg-stone-800">
                  Get Pro - $20
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      {LandingConstants.showTemplateSection && (
        <section
          id="templates"
          className="py-16 px-6 bg-white border-t border-stone-200"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-900 mb-4">
                Professional Resume Templates
              </h2>
              <p className="text-lg text-stone-600">
                Choose from our growing collection of ATS-optimized templates
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((template) => (
                <Card
                  key={template}
                  className="border border-stone-200 hover:border-stone-300 transition-colors"
                >
                  <CardContent className="p-0">
                    <div className="h-48 bg-gradient-to-br from-stone-100 to-stone-200 rounded-t-lg flex items-center justify-center">
                      <FileText className="h-12 w-12 text-stone-400" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-stone-900">
                        Professional Template {template}
                      </h3>
                      <p className="text-sm text-stone-600">
                        Clean, modern design optimized for ATS systems
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
      )}

      {/* Testimonials */}
      <section className="py-16 px-6 bg-stone-50 border-t border-stone-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-stone-600">
              See how Raysume AI helped professionals land their dream jobs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border border-stone-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-stone-600 mb-4 text-sm">
                  &quot;The Pro plan was worth every penny! The AI chat helped
                  me generate 5 different resumes for different roles and I
                  landed 3 interviews in the first week.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-stone-600 font-semibold text-sm">
                      AM
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-stone-900">
                      Alex Martinez
                    </p>
                    <p className="text-xs text-stone-500">Software Engineer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-stone-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-stone-600 mb-4 text-sm">
                  &quot;Even the free version is better than most paid resume
                  builders I&apos;ve tried. The ATS keyword extraction helped me
                  understand what recruiters were looking for.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-stone-600 font-semibold text-sm">
                      JL
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-stone-900">
                      Jessica Liu
                    </p>
                    <p className="text-xs text-stone-500">Marketing Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-stone-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-stone-600 mb-4 text-sm">
                  &quot;The Lite plan was perfect for my needs. The AI chat
                  helped me enhance my old resume and I landed my first job out
                  of college. Simple and effective!&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-stone-600 font-semibold text-sm">
                      DK
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-stone-900">
                      David Kim
                    </p>
                    <p className="text-xs text-stone-500">Recent Graduate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-stone-900">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who&apos;ve transformed their
            careers with Raysume AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-stone-900 hover:bg-stone-100 px-8 py-4"
            >
              Start Free Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-stone-600 text-white hover:bg-stone-800 px-8 py-4 bg-transparent"
            >
              View All Plans
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12 px-6 border-t border-stone-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-stone-900 font-bold text-xs">R</span>
                </div>
                <span className="text-xl font-bold">Raysume AI</span>
              </div>
              <p className="text-stone-400 text-sm">
                The smart resume builder that helps you land your dream job with
                AI-powered optimization.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-stone-400 text-sm">
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
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-stone-400 text-sm">
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
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-stone-400 text-sm">
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
          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-stone-400 text-sm">
            <p>&copy; 2024 Raysume AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
