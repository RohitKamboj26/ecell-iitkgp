import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface BatchCertificateData {
  participantName: string;
  eventName: string;
  date: string;
  verificationCode: string;
}

export const generateBatchCertificates = async (
  certificatesData: BatchCertificateData[],
  certificateTemplate: HTMLElement
) => {
  const generatedCertificates: string[] = [];

  for (let i = 0; i < certificatesData.length; i++) {
    const data = certificatesData[i];

    try {
      // Update template with current participant data
      const nameElement = certificateTemplate.querySelector(
        "[data-certificate-name]"
      );
      const eventElement = certificateTemplate.querySelector(
        "[data-certificate-event]"
      );
      const dateElement = certificateTemplate.querySelector(
        "[data-certificate-date]"
      );
      const codeElement = certificateTemplate.querySelector(
        "[data-certificate-code]"
      );

      if (nameElement) nameElement.textContent = data.participantName;
      if (eventElement) eventElement.textContent = data.eventName;
      if (dateElement) dateElement.textContent = data.date;
      if (codeElement) codeElement.textContent = data.verificationCode;

      // Generate canvas
      const canvas = await html2canvas(certificateTemplate, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#1a1a1a",
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

      // Save PDF
      const filename = `certificate-${data.participantName.replace(/\s+/g, "-")}.pdf`;
      pdf.save(filename);
      generatedCertificates.push(filename);

      // Small delay to prevent browser overload
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error generating certificate for ${data.participantName}:`, error);
    }
  }

  return generatedCertificates;
};

export const importCertificatesFromCSV = async (file: File): Promise<BatchCertificateData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split("\n");
        const headers = lines[0].split(",").map((h) => h.trim());

        const certificates: BatchCertificateData[] = [];

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue;

          const values = lines[i].split(",").map((v) => v.trim());
          const cert: BatchCertificateData = {
            participantName: values[headers.indexOf("participantName")] || "",
            eventName: values[headers.indexOf("eventName")] || "",
            date: values[headers.indexOf("date")] || "",
            verificationCode: values[headers.indexOf("verificationCode")] || "",
          };

          if (cert.participantName) {
            certificates.push(cert);
          }
        }

        resolve(certificates);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};
