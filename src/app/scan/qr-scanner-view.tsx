
'use client';

import { useState, useEffect, useRef }s from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, QrCode, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

type ScanResult = {
  title: string;
  content: string;
  images: ImagePlaceholder[];
};

const mockScanResult: ScanResult = {
  title: 'The Secret of the Foggara',
  content: 'The foggara is an ancient and ingenious underground irrigation system that has allowed life to flourish in Timimoun for centuries. This network of tunnels, dug by hand, channels water from distant aquifers to the palm groves, relying purely on gravity. Workers, known as "foggara-masters," maintain these delicate systems, a tradition passed down through generations. Exploring a foggara offers a fascinating glimpse into the sustainable engineering of the past and the resilience of the Saharan people.',
  images: [
    PlaceHolderImages.find((img) => img.id === 'foggara-tour')!,
    PlaceHolderImages.find((img) => img.id === 'oasis-palm-grove')!,
  ],
};


export function QrScannerView() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this feature.',
        });
      }
    };

    getCameraPermission();
    
    // Cleanup function to stop the camera stream
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate a scan
    setTimeout(() => {
      setScanResult(mockScanResult);
      setIsScanning(false);
    }, 1500);
  };
  
  const handleCloseModal = () => {
    setScanResult(null);
  }

  return (
    <>
      <div className="space-y-4">
        <div className="aspect-square w-full bg-secondary rounded-lg flex items-center justify-center relative overflow-hidden">
            {hasCameraPermission === true ? (
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            ) : (
                <Camera className="w-24 h-24 text-muted-foreground/50" />
            )}
          
          <div className="absolute inset-0 border-[20px] border-black/20" />
          <div className="absolute w-16 h-16 border-4 border-primary top-8 left-8 rounded-tl-lg" />
          <div className="absolute w-16 h-16 border-4 border-primary top-8 right-8 rounded-tr-lg" />
          <div className="absolute w-16 h-16 border-4 border-primary bottom-8 left-8 rounded-bl-lg" />
          <div className="absolute w-16 h-16 border-4 border-primary bottom-8 right-8 rounded-br-lg" />
           {isScanning && (
                <div className="absolute top-0 left-0 h-1.5 w-full bg-primary/70 shadow-[0_0_20px_10px_hsl(var(--primary))]" 
                     style={{
                         animation: 'scan 2s ease-in-out infinite'
                     }}
                />
            )}
            <style jsx>{`
              @keyframes scan {
                0% { transform: translateY(-10%); }
                50% { transform: translateY(calc(100% + 10%)); }
                100% { transform: translateY(-10%); }
              }
            `}</style>
        </div>
        
        {hasCameraPermission === false && (
            <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                Please allow camera access in your browser settings to scan QR codes.
              </AlertDescription>
            </Alert>
        )}

        <Button onClick={handleScan} disabled={isScanning || !hasCameraPermission} className="w-full" size="lg">
          <QrCode className="mr-2 h-5 w-5" />
          {isScanning ? 'Scanning...' : 'Simulate Scan'}
        </Button>
      </div>

      {scanResult && (
        <Dialog open={!!scanResult} onOpenChange={(isOpen) => !isOpen && handleCloseModal()}>
            <DialogContent className="p-0 border-0 w-full max-w-lg h-full sm:h-auto sm:max-h-[90vh] bg-background text-foreground flex flex-col sm:rounded-2xl overflow-hidden">
                <DialogTitle className="sr-only">{scanResult.title}</DialogTitle>
                <div className="relative flex-shrink-0 pt-6 px-4">
                    <DialogClose className="absolute top-2 right-2 z-20 rounded-full bg-background/50 text-foreground p-1 hover:bg-background/80 transition-colors">
                        <X className="w-4 h-4" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                    {scanResult.images && scanResult.images.length > 0 && (
                        <Carousel opts={{ loop: true }} className="w-full">
                            <CarouselContent>
                            {scanResult.images.map((image, index) => (
                                <CarouselItem key={image.id}>
                                <Card className="overflow-hidden rounded-2xl shadow-none border-0">
                                    <CardContent className="p-0">
                                    <div className="relative w-full aspect-video">
                                        <Image
                                        src={image.imageUrl}
                                        alt={`${scanResult.title} image ${index + 1}`}
                                        fill
                                        className="object-cover rounded-2xl"
                                        data-ai-hint={image.imageHint}
                                        />
                                    </div>
                                    </CardContent>
                                </Card>
                                </CarouselItem>
                            ))}
                            </CarouselContent>
                        </Carousel>
                    )}
                </div>

                <div className="relative flex-grow overflow-y-auto">
                    <div className="p-6 pt-4 space-y-4">
                         <h2 className="text-2xl font-bold font-headline">{scanResult.title}</h2>
                         <p className="text-foreground/80 leading-relaxed">{scanResult.content}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}
    </>
  );
}
