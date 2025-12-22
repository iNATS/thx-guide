
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Link, QrCode } from 'lucide-react';

type ScanResult = {
  title: string;
  description: string;
  url: string;
};

const mockScanResult: ScanResult = {
  title: 'Ksar of Timimoun',
  description: 'The ancient fortified village (Ksar) of Timimoun is a stunning example of traditional Saharan architecture, built with red mud-brick. It offers a glimpse into the historical caravan routes and the local way of life.',
  url: 'https://en.wikipedia.org/wiki/Timimoun'
}

export function QrScannerView() {
  const [scannedData, setScannedData] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate a scan
    setTimeout(() => {
        setScannedData(mockScanResult);
        setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <div className="aspect-square w-full bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
          <Camera className="w-24 h-24 text-muted-foreground/50" />
          <div className="absolute inset-0 border-[20px] border-black/20" />
          <div className="absolute w-16 h-16 border-4 border-primary top-8 left-8 rounded-tl-lg" />
          <div className="absolute w-16 h-16 border-4 border-primary top-8 right-8 rounded-tr-lg" />
          <div className="absolute w-16 h-16 border-4 border-primary bottom-8 left-8 rounded-bl-lg" />
          <div className="absolute w-16 h-16 border-4 border-primary bottom-8 right-8 rounded-br-lg" />
           {isScanning && <div className="absolute top-0 left-0 h-1 w-full bg-primary/70 animate-[scan_2s_ease-in-out_infinite]" style={{ animationName: 'scan' }}></div>}
            <style jsx>{`
              @keyframes scan {
                0% { transform: translateY(0); }
                100% { transform: translateY(100%); }
              }
            `}</style>
        </div>
        <Button onClick={handleScan} disabled={isScanning} className="w-full" size="lg">
          <QrCode className="mr-2 h-5 w-5" />
          {isScanning ? 'Scanning...' : 'Simulate Scan'}
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="font-headline text-lg font-semibold">
          Information
        </h3>
        {scannedData ? (
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle>{scannedData.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>{scannedData.description}</CardDescription>
              <Button asChild variant="outline">
                <a href={scannedData.url} target="_blank" rel="noopener noreferrer">
                  <Link className="mr-2 h-4 w-4" />
                  Learn More
                </a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-muted-foreground py-8 border-2 border-dashed rounded-lg h-full flex items-center justify-center">
            <p>Scan a code to see information here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
