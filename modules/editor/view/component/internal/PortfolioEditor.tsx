"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/platform/component/ui/accordion";
import { Card, CardContent, CardTitle } from "@/platform/component/ui/card";
import { Plus, QrCode, Trash2 } from "lucide-react";

import { Button } from "@/platform/component/ui/button";
import { Checkbox } from "@/platform/component/ui/checkbox";
import Image from "next/image";
import { Input } from "@/platform/component/ui/input";
import { Label } from "@/platform/component/ui/label";
import { Portfolio } from "@/modules/resume/data/entity/Portfolio";
import React from "react";
import SortOrderPopover from "../../../../../platform/component/sortable/SortOrderPopover";
import { useResumeStore } from "../../../../../app/store/resumeStore";

// Utility function to create summary text for portfolio items
const getPortfolioSummary = (item: Portfolio): string => {
  const name = item.name || "Portfolio Item";
  const url = item.url || "No URL";
  const hasQR = item.qrCode ? " (QR Generated)" : "";

  return `${name} | ${url}${hasQR}`;
};

export default function PortfolioEditor() {
  const portfolio = useResumeStore((state) => state.resumeData.portfolio);
  const {
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    generateQRCode,
    reorderPortfolio,
  } = useResumeStore();

  const handleGenerateQRCode = async (id: string, url: string) => {
    if (!url.trim()) {
      alert("Please enter a URL before generating QR code");
      return;
    }

    // Add protocol if missing
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    await generateQRCode(id, fullUrl);
  };

  return (
    <Card className="border-0 py-0">
      <AccordionTrigger className="px-6 py-4 hover:no-underline">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Portfolio
        </CardTitle>
      </AccordionTrigger>

      <AccordionContent className="px-0 pb-0">
        <CardContent className="p-6 pt-0">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <div className="flex gap-2">
              <SortOrderPopover
                items={portfolio}
                getSummary={getPortfolioSummary}
                onReorder={reorderPortfolio}
                title="Portfolio"
                disabled={portfolio.length < 2}
              />
              <Button onClick={addPortfolio} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Portfolio Item
              </Button>
            </div>
          </div>

          {portfolio.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">No portfolio items added yet.</p>
              <p className="text-xs mt-1">
                Click &quot;Add Portfolio Item&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Accordion type="multiple" className="space-y-4">
                {portfolio.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border border-gray-200/40 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center gap-3 px-4 py-3">
                        <Checkbox
                          checked={item.included}
                          onCheckedChange={(checked) =>
                            updatePortfolio(item.id, { included: !!checked })
                          }
                        />
                        <Button
                          onClick={() => deletePortfolio(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <AccordionTrigger className="flex-1 px-4 py-3 hover:no-underline hover:bg-gray-50/50">
                        <div className="text-left">
                          <div className="font-medium text-gray-900 text-sm">
                            {getPortfolioSummary(item)}
                          </div>
                          {item.qrCode && (
                            <div className="text-xs text-green-600 mt-1">
                              ✓ QR Code generated
                            </div>
                          )}
                        </div>
                      </AccordionTrigger>
                    </div>

                    <AccordionContent className="px-4 pb-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Project Name *
                            </Label>
                            <Input
                              value={item.name}
                              onChange={(e) =>
                                updatePortfolio(item.id, {
                                  name: e.target.value,
                                })
                              }
                              placeholder="My Awesome Project"
                              className="border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              URL Link *
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                value={item.url}
                                onChange={(e) =>
                                  updatePortfolio(item.id, {
                                    url: e.target.value,
                                  })
                                }
                                placeholder="https://myproject.com"
                                className="flex-1 border-gray-200/60 focus:border-blue-500 focus:ring-blue-500/20"
                              />
                              <Button
                                onClick={() =>
                                  handleGenerateQRCode(item.id, item.url)
                                }
                                size="sm"
                                variant="outline"
                                className="gap-2 shrink-0"
                              >
                                <QrCode className="w-4 h-4" />
                                Generate QR
                              </Button>
                            </div>
                          </div>
                        </div>

                        {item.qrCode && (
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              QR Code Preview
                            </Label>
                            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border">
                              <Image
                                src={item.qrCode}
                                alt={`QR Code for ${item.name}`}
                                className="w-16 h-16 border border-gray-200 rounded"
                                width={64}
                                height={64}
                              />
                              <div className="flex-1">
                                <p className="text-sm text-gray-600">
                                  QR Code generated successfully! This will
                                  appear on your resume.
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Scanning this code will take viewers to:{" "}
                                  {item.url}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </CardContent>
      </AccordionContent>
    </Card>
  );
}
