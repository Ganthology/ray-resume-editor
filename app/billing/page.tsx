"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  CheckCircle, 
  Crown,
  ExternalLink,
  Download,
  Clock
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
import { Progress } from "@/platform/component/ui/progress";
import Navigation from "@/platform/component/ui/navigation";
import Footer from "@/platform/component/ui/footer";

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "plans" | "history">("overview");

  // Mock data - would come from your backend/Stripe
  const currentPlan = {
    name: "Basic",
    credits: 3,
    creditsUsed: 1,
    price: "Free",
    status: "active"
  };

  const availablePlans = [
    {
      name: "Basic",
      price: "Free",
      credits: 3,
      features: [
        "Professional templates",
        "Cloud-based saving & sync",
        "Real-time editing & preview",
        "ATS keyword extraction",
        "PDF export"
      ],
      current: true
    },
    {
      name: "Lite",
      price: "$10",
      credits: 50,
      popular: true,
      features: [
        "50 AI Message Credits",
        "AI Resume Consultant",
        "Generate 1 AI-optimized resume",
        "Upload existing resume for enhancement"
      ]
    },
    {
      name: "Pro",
      price: "$30",
      credits: 200,
      premium: true,
      features: [
        "200 AI Message Credits",
        "AI Resume Consultant",
        "Unlimited tailored resumes",
        "Job library for tailored resumes",
        "Upload existing resume for enhancement",
        "Priority support"
      ]
    }
  ];

  const paymentHistory = [
    {
      id: "inv_001",
      date: "2024-01-15",
      amount: "$10.00",
      status: "paid",
      plan: "Lite Plan",
      invoiceUrl: "#"
    },
    {
      id: "inv_002", 
      date: "2023-12-01",
      amount: "$30.00",
      status: "paid",
      plan: "Pro Plan",
      invoiceUrl: "#"
    }
  ];

  const handleUpgrade = (planName: string) => {
    // This would integrate with Stripe
    console.log(`Upgrading to ${planName}`);
    // Redirect to Stripe Checkout or open Stripe billing portal
    window.open('https://billing.stripe.com/p/login/test_example', '_blank');
  };

  const openStripePortal = () => {
    // Open Stripe customer portal for managing billing
    window.open('https://billing.stripe.com/p/login/test_example', '_blank');
  };

  const downloadInvoice = (invoiceUrl: string) => {
    // Download invoice from Stripe
    window.open(invoiceUrl, '_blank');
  };

  const renderContent = () => {
    switch (activeTab) {
      case "plans":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Plan</h2>
              <p className="text-gray-600">Upgrade or downgrade your subscription at any time</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {availablePlans.map((plan, index) => (
                <Card 
                  key={index} 
                  className={`relative ${plan.current ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} ${plan.premium ? 'border-2 border-yellow-500' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                    </div>
                  )}
                  {plan.premium && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-yellow-600 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Best Value
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl flex items-center justify-center">
                      {plan.premium && <Crown className="h-5 w-5 text-yellow-600 mr-2" />}
                      {plan.name}
                    </CardTitle>
                    <div className="text-3xl font-bold text-gray-900">
                      {plan.price}
                      {plan.price !== "Free" && <span className="text-base text-gray-500 font-normal"> one-time</span>}
                    </div>
                    <p className="text-sm text-gray-600">{plan.credits} AI Message Credits</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${plan.current ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                      disabled={plan.current}
                      onClick={() => handleUpgrade(plan.name)}
                    >
                      {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
        
      case "history":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment History</h2>
                <p className="text-gray-600">View and download your invoices</p>
              </div>
              <Button variant="outline" onClick={openStripePortal}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Manage Billing
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{payment.id}</div>
                            <div className="text-sm text-gray-500">{payment.plan}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(payment.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {payment.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge 
                              className={payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                            >
                              {payment.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => downloadInvoice(payment.invoiceUrl)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            {/* Current Plan Overview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Current Plan: {currentPlan.name}
                    </CardTitle>
                    <CardDescription>
                      {currentPlan.price} • {currentPlan.status}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">AI Message Credits</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Used: {currentPlan.creditsUsed}</span>
                        <span>Total: {currentPlan.credits}</span>
                      </div>
                      <Progress 
                        value={(currentPlan.creditsUsed / currentPlan.credits) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-gray-500">
                        {currentPlan.credits - currentPlan.creditsUsed} credits remaining
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Next Billing Date</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {currentPlan.price === "Free" ? "No billing required" : "N/A"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-200 hover:border-blue-300 transition-colors cursor-pointer" onClick={() => setActiveTab("plans")}>
                <CardHeader className="text-center py-6">
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Upgrade Plan</CardTitle>
                  <CardDescription>Get more AI credits and features</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-gray-200 hover:border-gray-300 transition-colors cursor-pointer" onClick={openStripePortal}>
                <CardHeader className="text-center py-6">
                  <ExternalLink className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Manage Billing</CardTitle>
                  <CardDescription>Update payment methods via Stripe</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="border-green-200 hover:border-green-300 transition-colors cursor-pointer" onClick={() => setActiveTab("history")}>
                <CardHeader className="text-center py-6">
                  <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">Payment History</CardTitle>
                  <CardDescription>View invoices and receipts</CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Recent Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">This month</span>
                    <span className="font-medium">{currentPlan.creditsUsed} credits used</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Last month</span>
                    <span className="font-medium">0 credits used</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Total lifetime</span>
                    <span className="font-medium">{currentPlan.creditsUsed} credits used</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation
          title="RaysumeAI"
          subtitle="Billing"
        >
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === "overview" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </Button>
            <Button
              variant={activeTab === "plans" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("plans")}
            >
              Plans
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("history")}
            >
              History
            </Button>
          </div>
        </Navigation>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}