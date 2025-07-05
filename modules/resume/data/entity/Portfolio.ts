export interface Portfolio {
  id: string;
  name: string;
  url: string;
  qrCode?: string; // Generated QR code as base64 data URL
  included: boolean;
}
