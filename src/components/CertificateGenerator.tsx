import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface CertificateData {
  participantName: string;
  eventName: string;
  date: string;
  verificationCode: string;
}

export const CertificateGenerator: React.FC = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [certificateData, setCertificateData] = useState<CertificateData>({
    participantName: "John Doe",
    eventName: "Global Entrepreneurship Summit 2026",
    date: "30th January - 1st February 2026",
    verificationCode: "GES2026-001",
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCertificateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generatePDF = async () => {
    if (!certificateRef.current) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#1a1a1a",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
      pdf.save(`certificate-${certificateData.participantName.replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating certificate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const qrValue = `https://ecell-iitkgp.in/verify?code=${certificateData.verificationCode}`;

  return (
    <div className="w-full bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Certificate Generator</h1>

        {/* Input Section */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Participant Name</label>
              <Input
                type="text"
                name="participantName"
                value={certificateData.participantName}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter participant name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Verification Code</label>
              <Input
                type="text"
                name="verificationCode"
                value={certificateData.verificationCode}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter verification code"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Event Name</label>
              <Input
                type="text"
                name="eventName"
                value={certificateData.eventName}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter event name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Input
                type="text"
                name="date"
                value={certificateData.date}
                onChange={handleInputChange}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Enter date"
              />
            </div>
          </div>
          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
          >
            {isGenerating ? "Generating..." : "Download Certificate as PDF"}
          </Button>
        </Card>

        {/* Certificate Preview */}
        <div className="flex justify-center">
          <div
            ref={certificateRef}
            className="w-full max-w-4xl bg-gradient-to-br from-red-600 to-gray-900 p-12 text-white"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #ff6b4a 0%, #3d2817 50%, #1a1a1a 100%)",
              aspectRatio: "16/10",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div className="text-center border-b-2 border-white border-opacity-30 pb-4 mb-6">
              <h2 className="text-sm font-semibold text-orange-300">
                Rajendra Mishra School of Engineering Entrepreneurship
              </h2>
              <p className="text-sm">Indian Institute of Technology Kharagpur</p>
            </div>

            {/* Logo & Title Section */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-2xl font-bold">E Cell</div>
              <div className="text-right">
                <h1 className="text-3xl font-bold text-orange-300">GLOBAL</h1>
                <h1 className="text-2xl font-bold">ENTREPRENEURSHIP</h1>
                <h1 className="text-xl font-bold text-orange-300">SUMMIT '26</h1>
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold tracking-widest">CERTIFICATE</h1>
              <p className="text-4xl font-bold">OF PARTICIPATION</p>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <p className="text-lg mb-4">This is to certify that</p>
              <p className="text-3xl font-bold border-b-2 border-white mb-4 pb-2">
                {certificateData.participantName}
              </p>
              <p className="text-sm leading-relaxed mb-4">
                actively participated in the flagship event{" "}
                <span className="font-bold">{certificateData.eventName}</span>{" "}
                ({certificateData.date}) organised by the Entrepreneurship Cell,
                Indian Institute of Technology (IIT) Kharagpur. We truly appreciate
                your dedication and successful engagement for the success of this
                initiative.
              </p>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end mt-8">
              {/* QR Code */}
              <div className="flex flex-col items-center">
                <QRCode
                  value={qrValue}
                  size={80}
                  level="H"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
                <p className="text-xs mt-2 text-orange-300">SCAN TO VERIFY</p>
              </div>

              {/* Signature */}
              <div className="text-center">
                <p className="text-2xl font-script mb-2">Mrigank Sharad</p>
                <p className="border-t-2 border-white pt-2 text-xs">
                  Prof. Mrigank Sharad, Co-Chairman,
                  <br />
                  Entrepreneurship Cell, IIT Kharagpur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;
