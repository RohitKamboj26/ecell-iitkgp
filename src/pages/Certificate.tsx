import React from "react";
import CertificateGenerator from "@/components/CertificateGenerator";
import { ScrollToTop } from "@/components/ScrollToTop";

const Certificate: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <ScrollToTop />
      <CertificateGenerator />
    </div>
  );
};

export default Certificate;
