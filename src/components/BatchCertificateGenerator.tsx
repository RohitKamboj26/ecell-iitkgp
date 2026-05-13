import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { importCertificatesFromCSV, BatchCertificateData } from "@/utils/certificateUtils";

export const BatchCertificateGenerator: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);
  const [certificates, setCertificates] = useState<BatchCertificateData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedCertificates = await importCertificatesFromCSV(file);
      setCertificates(importedCertificates);
      alert(`Imported ${importedCertificates.length} certificates`);
    } catch (error) {
      alert("Error importing CSV: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const generateAllPDFs = async () => {
    if (certificates.length === 0 || !certificateRef.current) {
      alert("No certificates to generate");
      return;
    }

    setIsGenerating(true);
    const totalCerts = certificates.length;

    for (let i = 0; i < totalCerts; i++) {
      const cert = certificates[i];
      setProgress(Math.round(((i + 1) / totalCerts) * 100));

      try {
        // Update the template with current certificate data
        const template = certificateRef.current.cloneNode(true) as HTMLElement;

        // Create a temporary container
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        tempContainer.appendChild(template);
        document.body.appendChild(tempContainer);

        // Update text content
        const nameEl = template.querySelector("[data-cert-name]");
        const codeEl = template.querySelector("[data-cert-code]");
        const eventEl = template.querySelector("[data-cert-event]");
        const dateEl = template.querySelector("[data-cert-date]");

        if (nameEl) nameEl.textContent = cert.participantName;
        if (codeEl) codeEl.textContent = cert.verificationCode;
        if (eventEl) eventEl.textContent = cert.eventName;
        if (dateEl) dateEl.textContent = cert.date;

        // Update QR code
        const qrContainer = template.querySelector("[data-cert-qr]");
        if (qrContainer && !qrContainer.querySelector("svg")) {
          const qrValue = `https://ecell-iitkgp.in/verify?code=${cert.verificationCode}`;
          const qrElement = document.createElement("div");
          qrElement.id = `qr-${i}`;
          const root = qrContainer as HTMLElement;
          root.innerHTML = "";
          root.appendChild(qrElement);

          // Render QR code
          const QRCanvas = document.createElement("canvas");
          const QRContext = QRCanvas.getContext("2d");
          if (QRContext) {
            // You would need to use a library that supports canvas rendering
            const img = document.createElement("img");
            img.src = `https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qrValue)}`;
            qrElement.appendChild(img);
          }
        }

        // Wait for image to load
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Generate canvas
        const canvas = await html2canvas(template, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#1a1a1a",
          allowTaint: true,
        });

        // Create PDF
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
        pdf.save(`certificate-${cert.participantName.replace(/\s+/g, "-")}.pdf`);

        // Clean up
        document.body.removeChild(tempContainer);
      } catch (error) {
        console.error(`Error generating certificate for ${cert.participantName}:`, error);
      }

      // Small delay between PDFs
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setIsGenerating(false);
    setProgress(0);
    alert("All certificates generated!");
  };

  return (
    <div className="w-full bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Batch Certificate Generator</h1>

        {/* Upload Section */}
        <Card className="bg-gray-900 border-gray-700 p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Import Certificates from CSV</h2>
          <p className="text-gray-400 mb-4">
            Upload a CSV file with columns: participantName, eventName, date, verificationCode
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4"
          >
            Select CSV File
          </Button>

          {certificates.length > 0 && (
            <div className="mt-4">
              <p className="text-green-400 font-bold mb-4">
                {certificates.length} certificates ready to generate
              </p>
              <div className="max-h-48 overflow-y-auto bg-gray-800 p-4 rounded">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="text-sm text-gray-300 mb-2">
                    {idx + 1}. {cert.participantName} ({cert.verificationCode})
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={generateAllPDFs}
            disabled={isGenerating || certificates.length === 0}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3"
          >
            {isGenerating
              ? `Generating... ${progress}%`
              : `Generate All ${certificates.length} Certificates`}
          </Button>
        </Card>

        {/* Hidden Certificate Template */}
        <div className="hidden">
          <CertificateTemplate ref={certificateRef} />
        </div>
      </div>
    </div>
  );
};

interface CertificateTemplateProps {
  participantName?: string;
  eventName?: string;
  date?: string;
  verificationCode?: string;
}

const CertificateTemplate = React.forwardRef<
  HTMLDivElement,
  CertificateTemplateProps
>(
  (
    {
      participantName = "John Doe",
      eventName = "Global Entrepreneurship Summit 2026",
      date = "30th January - 1st February 2026",
      verificationCode = "GES2026-001",
    },
    ref
  ) => {
    const qrValue = `https://ecell-iitkgp.in/verify?code=${verificationCode}`;

    return (
      <div
        ref={ref}
        className="w-full bg-gradient-to-br from-red-600 to-gray-900 p-12 text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #ff6b4a 0%, #3d2817 50%, #1a1a1a 100%)",
          aspectRatio: "16/10",
          position: "relative",
          overflow: "hidden",
          width: "1600px",
          height: "1000px",
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
          <p
            className="text-3xl font-bold border-b-2 border-white mb-4 pb-2"
            data-cert-name
          >
            {participantName}
          </p>
          <p className="text-sm leading-relaxed mb-4">
            actively participated in the flagship event{" "}
            <span className="font-bold" data-cert-event>
              {eventName}
            </span>{" "}
            (<span data-cert-date>{date}</span>) organised by the Entrepreneurship Cell,
            Indian Institute of Technology (IIT) Kharagpur. We truly appreciate
            your dedication and successful engagement for the success of this
            initiative.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end mt-8">
          {/* QR Code */}
          <div className="flex flex-col items-center" data-cert-qr>
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

        {/* Verification Code */}
        <div className="absolute bottom-4 right-4 text-xs text-gray-400">
          Code: <span data-cert-code>{verificationCode}</span>
        </div>
      </div>
    );
  }
);

CertificateTemplate.displayName = "CertificateTemplate";

export default BatchCertificateGenerator;
