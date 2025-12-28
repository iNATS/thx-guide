
import { QrScannerView } from './qr-scanner-view';

export default function ScanPage() {
  return (
    <div className="w-full h-[calc(100vh)] bg-background">
      <QrScannerView />
    </div>
  );
}
