
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';
import { QrScannerView } from './qr-scanner-view';

export default function ScanPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-full pb-24">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <QrCode className="w-6 h-6 text-primary" />
            Scan QR Code
          </CardTitle>
          <CardDescription>
            Point your camera at a QR code to discover more about Timimoun's landmarks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QrScannerView />
        </CardContent>
      </Card>
    </div>
  );
}
