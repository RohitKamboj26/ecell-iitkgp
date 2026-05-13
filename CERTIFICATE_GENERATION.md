# Certificate Generator Documentation

## Overview
The Certificate Generator system allows for creation and distribution of digital certificates of participation for E Cell events, using the official certificate template as a base.

## Features

### 1. Individual Certificate Generation
- **Location**: `/certificate` route
- **Component**: `CertificateGenerator.tsx`
- Generate single certificates with custom participant names
- Real-time preview of the certificate
- Download as PDF with automatic naming

### 2. Batch Certificate Generation
- **Component**: `BatchCertificateGenerator.tsx`
- Import multiple certificates from CSV file
- Batch process and generate PDFs for all participants
- Progress tracking during generation
- Automatic file naming and download

## CSV Format for Batch Import
The CSV file should have the following columns:
```
participantName,eventName,date,verificationCode
John Doe,Global Entrepreneurship Summit 2026,30th January - 1st February 2026,GES2026-001
Jane Smith,Global Entrepreneurship Summit 2026,30th January - 1st February 2026,GES2026-002
```

## Certificate Template Features

### Template Components
- **Header**: Institution and event branding
- **Title**: "CERTIFICATE OF PARTICIPATION"
- **Dynamic Fields**:
  - Participant Name
  - Event Name
  - Date
  - Verification Code
- **QR Code**: Scannable code for verification (links to verification page)
- **Signature**: Prof. Mrigank Sharad's signature and details
- **Styling**: Professional gradient background matching brand colors

### Certificate Specifications
- **Format**: Landscape A4 (297mm x 210mm)
- **Colors**: Brand red-to-brown gradient background
- **Resolution**: 2x scaling for high-quality PDFs
- **QR Code Size**: 80x80px

## Usage

### Single Certificate Generation
1. Navigate to `/certificate`
2. Fill in the form fields:
   - Participant Name
   - Event Name
   - Date
   - Verification Code
3. View the preview
4. Click "Download Certificate as PDF"

### Batch Certificate Generation
1. Create a CSV file with participant data
2. Access batch generator component
3. Upload CSV file
4. Review imported certificates
5. Click "Generate All Certificates"
6. PDFs will be generated and downloaded sequentially

## Technical Stack

### Dependencies
- `html2canvas`: Convert HTML elements to canvas for PDF generation
- `jsPDF`: Create and download PDF files
- `qrcode.react`: Generate QR codes for verification

### Utility Functions
- `generateBatchCertificates()`: Batch PDF generation
- `importCertificatesFromCSV()`: Parse CSV files

## Verification System

### QR Code Format
The QR code encodes the following URL:
```
https://ecell-iitkgp.in/verify?code={verificationCode}
```

### Verification Page Implementation
Create a verification endpoint that:
1. Accepts verification code as query parameter
2. Checks against database of issued certificates
3. Displays certificate validity and details
4. Shows "Certificate Verified" status

### Example Endpoint
```typescript
GET /api/verify?code=GES2026-001
Response:
{
  valid: true,
  participantName: "John Doe",
  eventName: "Global Entrepreneurship Summit 2026",
  issueDate: "2026-02-01",
  certificateCode: "GES2026-001"
}
```

## Integration with Backend

### Recommended Database Schema
```sql
CREATE TABLE certificates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  participantName VARCHAR(255) NOT NULL,
  eventName VARCHAR(255) NOT NULL,
  eventDate VARCHAR(100),
  verificationCode VARCHAR(50) UNIQUE NOT NULL,
  issueDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  issuedBy VARCHAR(255),
  status ENUM('active', 'revoked', 'expired'),
  metadata JSON
);

CREATE INDEX idx_verification_code ON certificates(verificationCode);
```

## File Structure
```
src/
├── components/
│   ├── CertificateGenerator.tsx       # Single certificate generator
│   └── BatchCertificateGenerator.tsx  # Batch certificate generator
├── pages/
│   └── Certificate.tsx                # Certificate page
├── utils/
│   └── certificateUtils.ts            # Utility functions
```

## Future Enhancements

1. **Database Integration**: Store issued certificates and verification data
2. **Email Integration**: Automatically send certificates to participants
3. **Event Management**: Link certificates to specific events in the system
4. **Analytics**: Track certificate issuance and verification statistics
5. **Custom Templates**: Support multiple certificate designs per event
6. **Digital Signatures**: Add cryptographic verification
7. **Blockchain Integration**: Store certificate hashes for immutability

## Troubleshooting

### PDF Generation Issues
- Ensure all images are loaded before generation
- Check browser console for CORS errors
- Verify html2canvas compatibility with your HTML structure

### QR Code Not Displaying
- Check if QRCode component is properly imported
- Ensure qrcode.react package is installed
- Verify CSS styling doesn't hide the QR code

### CSV Import Errors
- Verify CSV format matches the expected columns
- Check for encoding issues (use UTF-8)
- Ensure no extra whitespace in column headers

## Security Considerations

1. **Verification Code Generation**: Use secure random generation
2. **Database Security**: Hash verification codes in database
3. **Access Control**: Implement proper authentication for admin functions
4. **Rate Limiting**: Add rate limiting to verification endpoint
5. **Audit Trail**: Log all certificate generation and verification activities

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- IE11: Not supported (requires modern browser features)

## Performance Tips
- Use server-side rendering for large batch operations
- Implement job queues for 1000+ certificate batches
- Cache QR code generation results
- Use CDN for certificate assets
