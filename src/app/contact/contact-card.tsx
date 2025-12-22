
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ContactCard() {
    const guideImage = PlaceHolderImages.find((img) => img.id === 'tour-guide-avatar');

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center items-center">
                <Avatar className="w-24 h-24 mb-4 border-4 border-primary/50">
                    {guideImage && <AvatarImage src={guideImage.imageUrl} alt="Tour Guide" data-ai-hint={guideImage.imageHint} />}
                    <AvatarFallback>AG</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-2xl">Your Local Guide</CardTitle>
                <CardDescription>Need help or want to book a private tour? Get in touch!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold text-foreground">Ahmed Guendouz</p>
                    <p className="text-sm">Official Timimoun Tour Guide</p>
                    <p className="text-xs mt-2 italic">"I'm here to make your visit to the Red Oasis unforgettable."</p>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="w-full">
                    <a href="mailto:support@timimoun-guide.dz">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                    </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                    <a href="tel:+213-555-123-456">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
}
