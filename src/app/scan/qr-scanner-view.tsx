
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, History, Camera, QrCode, X, Share2, Image as ImageIcon, Trash2, CheckCircle, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import Link from 'next/link';

type ScanResult = {
  title: string;
  shortDescription: string;
  content: string;
  images: ImagePlaceholder[];
};

const mockScanResult: ScanResult = {
  title: 'Grand Ksar',
  shortDescription: 'Historic fortress built in the 17th century showcasing the unique re...',
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
  const [isResultSheetOpen, setIsResultSheetOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const animationFrameId = useRef<number>();

  const tick = useCallback(() => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        import('jsqr').then(jsQRModule => {
          const jsQR = jsQRModule.default;
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          });

          if (code) {
            setIsScanning(false);
            // Mock result for demonstration
            if (code.data === 'Grand Ksar') {
                setScanResult(mockScanResult);
                setIsResultSheetOpen(true);
            } else {
                toast({ title: "QR Code Scanned", description: code.data });
            }
          }
        });
      }
    }
    if (isScanning) {
        animationFrameId.current = requestAnimationFrame(tick);
    }
  }, [isScanning, toast]);


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
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    }
  }, [toast]);
  
  useEffect(() => {
    if (isScanning) {
        animationFrameId.current = requestAnimationFrame(tick);
    } else {
        if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }

    return () => {
        if(animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    }
  }, [isScanning, tick])

  const handleScan = () => {
    setIsScanning(true);
  };
  
  const handleCloseResultSheet = () => {
    setIsResultSheetOpen(false);
    setScanResult(null);
  }
  
  const handleOpenGuide = () => {
    setIsResultSheetOpen(false);
    setIsGuideModalOpen(true);
  }
  
  const handleCloseGuideModal = () => {
      setIsGuideModalOpen(false);
      setScanResult(null);
  }

  return (
    <>
      <div className="relative w-full h-full bg-slate-900">
         {hasCameraPermission === true ? (
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black">
                {hasCameraPermission === false ? (
                    <Alert variant="destructive" className="max-w-sm">
                        <AlertTitle>Camera Access Denied</AlertTitle>
                        <AlertDescription>
                        Please enable camera permissions in your browser settings to use this feature.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Camera className="w-24 h-24 text-muted-foreground/20" />
                )}
            </div>
          )}

        {/* Overlay UI */}
        <div className="absolute inset-0 flex flex-col justify-between text-white bg-black/20">
          
          {/* Top Bar */}
          <header className="flex justify-between items-center p-4">
             <Button asChild variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 rounded-full text-white">
                <Link href="/">
                    <ArrowLeft className="w-5 h-5"/>
                </Link>
             </Button>
            <div className="text-center">
                <h1 className="font-bold text-lg">Scan Object</h1>
                <p className="text-xs uppercase tracking-widest opacity-80">Timimoun Guide</p>
            </div>
            <Button variant="ghost" size="icon" className="bg-black/20 hover:bg-black/40 rounded-full text-white">
                <History className="w-5 h-5"/>
            </Button>
          </header>

          {/* Scanning Area */}
          <main className="flex-grow flex flex-col items-center justify-center p-4">
             <div className="w-full max-w-xs aspect-square relative flex items-center justify-center">
                <div className="absolute w-12 h-12 border-t-4 border-l-4 border-primary top-0 left-0 rounded-tl-xl glow" />
                <div className="absolute w-12 h-12 border-t-4 border-r-4 border-primary top-0 right-0 rounded-tr-xl glow" />
                <div className="absolute w-12 h-12 border-b-4 border-l-4 border-primary bottom-0 left-0 rounded-bl-xl glow" />
                <div className="absolute w-12 h-12 border-b-4 border-r-4 border-primary bottom-0 right-0 rounded-br-xl glow" />
                {isScanning && <div className="absolute w-full h-1 bg-primary/50 animate-ping" />}
                <span className="text-4xl font-thin opacity-50">+</span>
             </div>
             <div className='mt-8'>
                <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-primary"/>
                    <span>Align object or code within frame</span>
                </div>
             </div>
          </main>
          
          {/* Bottom Bar */}
          <footer className="p-4 pb-24 flex justify-around items-center">
            <Button variant="ghost" size="icon" className="bg-black/30 hover:bg-black/50 rounded-full h-12 w-12 text-white">
                <ImageIcon className="w-5 h-5"/>
            </Button>
            <Button
                variant="outline"
                className={cn("bg-white/90 hover:bg-white text-black rounded-full h-16 w-16 shadow-lg p-0 border-2 border-black transition-all", isScanning && "scale-90 opacity-50")}
                onClick={handleScan}
                disabled={isScanning || hasCameraPermission !== true}
            >
                <div className="w-full h-full rounded-full flex items-center justify-center">
                    <Camera className="w-7 h-7"/>
                </div>
            </Button>
            <Button variant="ghost" size="icon" className="bg-black/30 hover:bg-black/50 rounded-full h-12 w-12 text-white" onClick={() => setIsScanning(false)} disabled={!isScanning}>
                <X className="w-5 h-5"/>
            </Button>
          </footer>
        </div>
      </div>
      
       <style jsx>{`
            .glow {
                filter: drop-shadow(0 0 8px hsl(var(--primary) / 0.7));
            }
        `}</style>
      
      {/* Result Sheet */}
       {scanResult && (
           <Sheet open={isResultSheetOpen} onOpenChange={(open) => !open && handleCloseResultSheet()}>
                <SheetContent side="bottom" className="w-full max-w-2xl mx-auto rounded-t-2xl p-6 border-0 bg-background/95 backdrop-blur-xl outline-none" hideCloseButton={true}>
                    <div className="flex items-start gap-4">
                        <div className="w-24 h-24 relative flex-shrink-0">
                           <Image src={PlaceHolderImages.find(img => img.id === 'timimoun-map')?.imageUrl || ''} alt="map preview" fill className="object-cover rounded-xl" />
                           <div className="absolute inset-0 bg-black/10 rounded-xl" />
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[8px] px-1.5 py-0.5 rounded-full uppercase font-bold flex items-center gap-1">
                                <MapPin className="w-2 h-2"/>
                                <span>Timimoun</span>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                                <div className="bg-foreground text-background text-xs font-bold px-2 py-0.5 rounded-md uppercase">Detected</div>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold font-headline">{scanResult.title}</h2>
                            <p className="text-muted-foreground text-sm">{scanResult.shortDescription}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-6">
                        <Button variant="secondary" className="col-span-1 h-12 text-base" size="lg">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <Button className="col-span-2 h-12 text-base" size="lg" onClick={handleOpenGuide}>
                            Read Full Guide
                            <ArrowLeft className="w-5 h-5 -rotate-180 ml-2" />
                        </Button>
                    </div>
                </SheetContent>
           </Sheet>
       )}

      {/* Guide Modal */}
      {scanResult && (
        <Dialog open={isGuideModalOpen} onOpenChange={(isOpen) => !isOpen && handleCloseGuideModal()}>
            <DialogContent className="p-0 border-0 w-full max-w-lg h-full sm:h-auto sm:max-h-[90vh] bg-background text-foreground flex flex-col sm:rounded-2xl overflow-hidden">
                <DialogTitle className="sr-only">{scanResult.title}</DialogTitle>
                 <DialogClose className="absolute top-2 right-2 z-20 rounded-full bg-background/50 text-foreground p-1 hover:bg-background/80 transition-colors">
                    <X className="w-4 h-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
                <div className="relative flex-shrink-0 pt-6 px-4">
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
