
'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { Bed, Minus, MessageSquare, Plus, Send, Share2, Star, Utensils, X, ZoomIn, Clock, CalendarCheck2, ShoppingCart, Navigation, Users, User, Baby, Calendar as CalendarIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { DiscoverItem, MenuItem, MenuOption, Room } from '@/lib/discover-data';
import { DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


type DiscoverModalProps = {
    selectedItem: DiscoverItem | null;
    setSelectedItem: Dispatch<SetStateAction<DiscoverItem | null>>;
};

type OrderItem = {
    quantity: number;
    option: MenuOption;
    item: MenuItem;
};

type Order = {
    [compositeKey: string]: OrderItem;
};

type BookingDetails = {
    adults: number;
    children: number;
    dateRange?: DateRange;
    room: Room | null;
}

export function DiscoverModal({ selectedItem, setSelectedItem }: DiscoverModalProps) {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [roomCarouselApi, setRoomCarouselApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentRoomSlide, setCurrentRoomSlide] = useState(0);
    const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
    const [order, setOrder] = useState<Order>({});
    const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
    const { toast } = useToast();
     // State to hold the selected option for each menu item before adding to order
    const [selectedOptions, setSelectedOptions] = useState<{ [itemId: string]: MenuOption }>({});
    
    // Hotel booking states
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isBookingSheetOpen, setIsBookingSheetOpen] = useState(false);
    const [isBookingConfirmationOpen, setIsBookingConfirmationOpen] = useState(false);
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
        adults: 1,
        children: 0,
        dateRange: { from: new Date(), to: addDays(new Date(), 1) },
        room: null,
    });


    useEffect(() => {
      // Reset order when a new item is selected
      setOrder({});
      // Initialize selected options for the new item's menu
      if (selectedItem?.menu) {
          const initialOptions: { [itemId: string]: MenuOption } = {};
          selectedItem.menu.forEach(item => {
              if (item.options.length > 0) {
                initialOptions[item.id] = item.options[0];
              }
          });
          setSelectedOptions(initialOptions);
      }
    }, [selectedItem]);

    const handleClose = () => {
        setSelectedItem(null);
    };

    useEffect(() => {
        if (!carouselApi) return;
        const onSelect = (api: CarouselApi) => setCurrentSlide(api.selectedScrollSnap());
        carouselApi.on('select', onSelect);
        return () => carouselApi.off('select', onSelect);
    }, [carouselApi]);
    
    useEffect(() => {
        if (!roomCarouselApi) return;
        const onSelect = (api: CarouselApi) => setCurrentRoomSlide(api.selectedScrollSnap());
        roomCarouselApi.on('select', onSelect);
        return () => roomCarouselApi.off('select', onSelect);
    }, [roomCarouselApi]);
    
    const handleShare = async () => {
        if (!selectedItem) return;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: selectedItem.title,
                    text: selectedItem.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
                toast({ variant: 'destructive', title: 'Error', description: 'Could not share this item.' });
            }
        } else {
            toast({ title: 'Info', description: 'Sharing is not supported on this browser.' });
        }
    };


    const handleQuantityChange = (item: MenuItem, change: number) => {
        const selectedOption = selectedOptions[item.id] || item.options[0];
        const compositeKey = `${item.id}-${selectedOption.size}`;
        
        const currentQuantity = order[compositeKey]?.quantity || 0;
        const newQuantity = currentQuantity + change;

        const newOrder = { ...order };

        if (newQuantity <= 0) {
            delete newOrder[compositeKey];
        } else {
            newOrder[compositeKey] = {
                quantity: newQuantity,
                option: selectedOption,
                item: item,
            };
        }
        setOrder(newOrder);
    };

    const handleOptionChange = (itemId: string, optionPrice: string) => {
        const menuItem = selectedItem?.menu?.find(item => item.id === itemId);
        if (!menuItem) return;

        const newSelectedOption = menuItem.options.find(opt => opt.price === parseInt(optionPrice));
        if (!newSelectedOption) return;
        
        const oldSelectedOption = selectedOptions[itemId];
        const oldCompositeKey = `${itemId}-${oldSelectedOption.size}`;
        const newCompositeKey = `${itemId}-${newSelectedOption.size}`;

        const newOrder = { ...order };
        const currentQuantity = order[oldCompositeKey]?.quantity;

        // If the item with the old option was in the order, move its quantity to the new option
        if (currentQuantity > 0) {
            delete newOrder[oldCompositeKey];
            newOrder[newCompositeKey] = {
                quantity: currentQuantity,
                option: newSelectedOption,
                item: menuItem,
            };
            setOrder(newOrder);
        }

        setSelectedOptions(prev => ({
            ...prev,
            [itemId]: newSelectedOption,
        }));
    };
    
    const getQuantityForItem = (itemId: string) => {
        // This function now needs to sum quantities across all options for a given item id.
        return Object.entries(order).reduce((total, [key, orderItem]) => {
            if (key.startsWith(`${itemId}-`)) {
                return total + orderItem.quantity;
            }
            return total;
        }, 0);
    }
    
    const getQuantityForCompositeKey = (compositeKey: string) => {
        return order[compositeKey]?.quantity || 0;
    }

    const totalOrderPrice = useMemo(() => {
        return Object.values(order).reduce((total, orderItem) => {
            return total + (orderItem.option.price * orderItem.quantity);
        }, 0);
    }, [order]);

    const handleSendOrderToWhatsapp = () => {
        if (!selectedItem || !selectedItem.phone || totalOrderPrice === 0) return;

        toast({ title: "Getting your location..." });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userLocationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

                let orderDetails = `Hello ${selectedItem.title}, I would like to place an order:\n\n`;
                Object.values(order).forEach((orderItem) => {
                    orderDetails += `*${orderItem.item.name}* (${orderItem.option.size}) x${orderItem.quantity} - ${orderItem.option.price * orderItem.quantity} DZD\n`;
                });
                orderDetails += `\n*Total: ${totalOrderPrice} DZD*\n\nMy location for delivery:\n${userLocationLink}\n\nThank you!`;
                
                const whatsappUrl = `https://wa.me/${selectedItem.phone}?text=${encodeURIComponent(orderDetails)}`;
                window.open(whatsappUrl, '_blank');
                toast({ title: "Redirecting to WhatsApp", description: "Your order is ready to be sent." });
            },
            (error) => {
                console.error("Geolocation error:", error);
                toast({ variant: "destructive", title: "Location Error", description: "Could not get your location. Please enable location services and try again." });
            }
        );
        setIsConfirmingOrder(false);
    };

    const handleRoomSelect = (room: Room) => {
        if (room.availability > 0) {
            setSelectedRoom(room);
            setBookingDetails({
                adults: 1,
                children: 0,
                dateRange: { from: new Date(), to: addDays(new Date(), 1) },
                room: room
            });
            setIsBookingSheetOpen(true);
        }
    }
    
    const handlePersonCountChange = (type: 'adults' | 'children', change: number) => {
        setBookingDetails(prev => {
            const newCount = prev[type] + change;
            return {
                ...prev,
                [type]: Math.max(type === 'adults' ? 1 : 0, newCount)
            }
        });
    }

    const handleSendBookingToWhatsapp = () => {
        if (!selectedItem || !selectedItem.phone || !bookingDetails.room) return;
        const { room, adults, children, dateRange } = bookingDetails;
        
        const checkIn = dateRange?.from ? format(dateRange.from, 'PPP') : 'N/A';
        const checkOut = dateRange?.to ? format(dateRange.to, 'PPP') : 'N/A';

        const message = `Hello ${selectedItem.title}, I would like to book the *${room.name}*.

Details:
- Check-in: ${checkIn}
- Check-out: ${checkOut}
- Guests: ${adults} Adult(s), ${children} Child(ren)

Please let me know about availability and next steps. Thank you!`;

        const whatsappUrl = `https://wa.me/${selectedItem.phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        toast({ title: "Redirecting to WhatsApp", description: "Your booking request is ready." });
        setIsBookingConfirmationOpen(false);
    }

    const imagesToShow = selectedItem?.images || (selectedItem?.image ? [selectedItem.image] : []);

    return (
      <>
        <Dialog open={!!selectedItem} onOpenChange={(isOpen) => !isOpen && handleClose()}>
            <DialogContent className="p-0 border-0 w-full max-w-lg h-full sm:h-auto sm:max-h-[90vh] bg-background text-foreground flex flex-col sm:rounded-2xl overflow-hidden">
                {selectedItem && (
                    <>
                        <DialogTitle className="sr-only">{selectedItem.title}</DialogTitle>
                        <div className="relative flex-shrink-0 pt-6 px-4">
                            <DialogClose className="absolute top-2 right-2 z-20 rounded-full bg-background/50 text-foreground p-1 hover:bg-background/80 transition-colors">
                                <X className="w-4 h-4" />
                                <span className="sr-only">Close</span>
                            </DialogClose>
                            <div className="relative">
                                <Carousel setApi={setCarouselApi} opts={{ loop: true }} className="w-full">
                                    <CarouselContent>
                                        {imagesToShow.map((image, index) => (
                                            <CarouselItem key={image.id || index}>
                                                <Card className="overflow-hidden rounded-2xl shadow-none border-0">
                                                    <CardContent className="p-0">
                                                        <div className="relative w-full aspect-video">
                                                            <Image
                                                                src={image.imageUrl}
                                                                alt={`${selectedItem.title} image ${index + 1}`}
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
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsZoomModalOpen(true)}
                                    className="absolute bottom-2 right-2 rounded-full bg-black/40 text-white h-8 w-8 transition-opacity hover:bg-black/60"
                                >
                                    <ZoomIn className="w-5 h-5" />
                                </Button>
                            </div>
                            {imagesToShow.length > 1 && (
                                <div className="flex justify-center gap-2 mt-4">
                                    {imagesToShow.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => carouselApi?.scrollTo(index)}
                                            className={cn(
                                                "h-2 rounded-full transition-all",
                                                currentSlide === index ? "w-6 bg-primary" : "w-2 bg-muted"
                                            )}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="relative flex-grow overflow-y-auto">
                            <div className="p-6 pt-4">
                                <div className='flex justify-between items-start mb-2'>
                                    <h2 className="text-2xl font-bold font-headline">{selectedItem.title}</h2>
                                    {selectedItem.rating && (
                                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            <span className="font-bold text-foreground">{selectedItem.rating}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <div className="flex items-center gap-2">
                                        {selectedItem.category === 'Hotels' && <Bed className="w-4 h-4 text-primary" />}
                                        {selectedItem.category === 'Restaurants' && <Utensils className="w-4 h-4 text-primary" />}
                                        {selectedItem.category === 'Shopping' && <ShoppingCart className="w-4 h-4 text-primary" />}
                                        <span>{selectedItem.location}</span>
                                    </div>
                                </div>
                                <p className="text-foreground/80 leading-relaxed mb-6">{selectedItem.description}</p>
                                
                                <Separator className="my-6" />

                                {/* Category-specific content */}
                                {selectedItem.category === 'Hotels' && selectedItem.rooms && (
                                    <div>
                                        <h3 className="font-bold text-lg mb-4 font-headline">Available Rooms</h3>
                                        <div className="space-y-4">
                                            {selectedItem.rooms.map(room => (
                                                <Card key={room.name} className="overflow-hidden bg-card shadow-none border-border/80 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => handleRoomSelect(room)}>
                                                    <div className="flex">
                                                        <div className="relative aspect-square w-24 flex-shrink-0">
                                                            <Image src={room.images[0].imageUrl} alt={room.name} fill className="object-cover" />
                                                        </div>
                                                        <div className="p-4 flex flex-col justify-between flex-grow">
                                                           <div>
                                                                <p className="font-bold">{room.name}</p>
                                                                <p className="text-sm font-bold text-primary">{room.price.toLocaleString()} DZD / night</p>
                                                           </div>
                                                           <p className={cn("font-semibold text-sm mt-2", room.availability > 0 ? "text-green-600" : "text-destructive")}>
                                                                {room.availability > 0 ? `${room.availability} available` : 'Fully Booked'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                )}


                                {selectedItem.category === 'Restaurants' && selectedItem.menu && (
                                    <div>
                                        <h3 className="font-bold text-lg mb-4 font-headline">Menu</h3>
                                        <div className="space-y-4">
                                            {selectedItem.menu.map(item => {
                                                const selectedOption = selectedOptions[item.id] || item.options[0];
                                                const compositeKey = `${item.id}-${selectedOption.size}`;
                                                return (
                                                <div key={item.id} className="flex gap-4 items-center">
                                                    <Image src={item.image.imageUrl} alt={item.name} width={80} height={80} className="rounded-lg object-cover aspect-square" />
                                                    <div className="flex-grow">
                                                        <p className="font-bold">{item.name}</p>
                                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            {item.options.length > 1 ? (
                                                                <Select
                                                                    value={selectedOptions[item.id]?.price.toString() || item.options[0].price.toString()}
                                                                    onValueChange={(price) => handleOptionChange(item.id, price)}
                                                                >
                                                                    <SelectTrigger className="w-auto h-8 text-xs">
                                                                        <SelectValue placeholder="Select size" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        {item.options.map(opt => (
                                                                            <SelectItem key={opt.size} value={opt.price.toString()}>
                                                                                {opt.size} - {opt.price} DZD
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                            ) : (
                                                                <p className="text-sm font-bold text-primary">{item.options[0].price} DZD</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                         <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item, -1)}>
                                                            <Minus className="w-5 h-5 text-muted-foreground" />
                                                         </Button>
                                                         <span className="font-bold w-4 text-center">{getQuantityForCompositeKey(compositeKey)}</span>
                                                         <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleQuantityChange(item, 1)}>
                                                             <Plus className="w-5 h-5 text-primary"/>
                                                         </Button>
                                                    </div>
                                                </div>
                                            )})}
                                        </div>
                                    </div>
                                )}

                            </div>
                             <div className="sticky bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                        </div>

                        <div className="p-4 bg-background mt-auto grid grid-cols-1 gap-2">
                             {selectedItem.category === 'Hotels' && (
                                <div className="grid grid-cols-3 gap-2">
                                    <Button variant="outline" size="lg" onClick={handleShare} className="col-span-1">
                                        <Share2 className="mr-2 h-4 w-4" />
                                        Share
                                    </Button>
                                    <Button asChild size="lg" className="col-span-2">
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.coords[0]},${selectedItem.coords[1]}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Navigation className="mr-2 h-4 w-4" />
                                            Directions
                                        </a>
                                    </Button>
                                </div>
                            )}
                            {selectedItem.category === 'Restaurants' && (
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-lg font-bold p-3 bg-muted/50 rounded-lg">
                                        <span>Total</span>
                                        <span>{totalOrderPrice} DZD</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Button variant="outline" size="lg" onClick={handleShare} className="col-span-1">
                                            <Share2 className="mr-2 h-4 w-4" />
                                            Share
                                        </Button>
                                        <Button asChild size="lg" variant="outline" className="col-span-1">
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.coords[0]},${selectedItem.coords[1]}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Navigation className="mr-2 h-4 w-4" />
                                                Directions
                                            </a>
                                        </Button>
                                        <Button size="lg" className="w-full col-span-1" disabled={totalOrderPrice === 0} onClick={() => setIsConfirmingOrder(true)}>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Order
                                        </Button>
                                    </div>
                                </div>
                            )}
                            { selectedItem.category === 'Shopping' && (
                                <div className="grid grid-cols-3 gap-2">
                                    <Button variant="outline" size="lg" onClick={handleShare} className="col-span-1">
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share
                                    </Button>
                                    <Button asChild size="lg" className="col-span-2">
                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.coords[0]},${selectedItem.coords[1]}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Navigation className="mr-2 h-4 w-4" />
                                            Directions
                                        </a>
                                    </Button>
                                </div>
                            )}
                            { (selectedItem.category !== 'Hotels' && selectedItem.category !== 'Restaurants' && selectedItem.category !== 'Shopping') && (
                                <Button asChild size="lg">
                                  <a href={`https://wa.me/${selectedItem.phone}?text=I'm%20interested%20in%20'${encodeURIComponent(selectedItem.title)}'`} target="_blank" rel="noopener noreferrer">
                                     <MessageSquare className="mr-2 h-4 w-4"/>
                                     Enquire Now
                                    </a>
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>

        {/* Restaurant Order Confirmation Sheet */}
        {selectedItem && selectedItem.category === 'Restaurants' && (
            <Sheet open={isConfirmingOrder} onOpenChange={setIsConfirmingOrder}>
                <SheetContent side="bottom" className="w-full rounded-t-2xl p-6">
                    <SheetHeader className="text-left">
                        <SheetTitle>Confirm Your Order</SheetTitle>
                        <SheetDescription>
                            Please review your order before sending it.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="max-h-60 overflow-y-auto my-4 pr-2">
                        <div className="space-y-2">
                        {Object.values(order).map((orderItem) => {
                             if (!orderItem) return null;
                             return (
                                <div key={`${orderItem.item.id}-${orderItem.option.size}`} className="flex justify-between items-center text-sm">
                                    <span className="font-medium">{orderItem.item.name} ({orderItem.option.size}) (x{orderItem.quantity})</span>
                                    <span className="text-muted-foreground">{orderItem.option.price * orderItem.quantity} DZD</span>
                                </div>
                             )
                        })}
                        </div>
                        <Separator className="my-4"/>
                        <div className="flex justify-between items-center font-bold text-lg">
                            <span>Total</span>
                            <span>{totalOrderPrice} DZD</span>
                        </div>
                    </div>
                    <SheetFooter className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                        <SheetClose asChild>
                            <Button variant="outline">Edit Order</Button>
                        </SheetClose>
                        <Button onClick={handleSendOrderToWhatsapp}>Confirm & Send</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        )}
        
        {/* Hotel Room Booking Sheet */}
        {selectedItem && selectedItem.category === 'Hotels' && selectedRoom && (
            <Sheet open={isBookingSheetOpen} onOpenChange={setIsBookingSheetOpen}>
                <SheetContent side="bottom" className="w-full rounded-t-2xl p-0 h-[90vh] flex flex-col">
                     <SheetHeader className="p-6 pb-0">
                        <SheetTitle>{selectedRoom.name}</SheetTitle>
                    </SheetHeader>
                    <div className='flex-grow overflow-y-auto'>
                        <Carousel setApi={setRoomCarouselApi} opts={{ loop: true }} className="w-full mb-4">
                            <CarouselContent>
                                {selectedRoom.images.map((image, index) => (
                                    <CarouselItem key={image.id || index}>
                                        <div className="relative w-full aspect-video">
                                            <Image src={image.imageUrl} alt={`${selectedRoom.name} image ${index + 1}`} fill className="object-cover" data-ai-hint={image.imageHint} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                             {selectedRoom.images.length > 1 && (
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                    {selectedRoom.images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => roomCarouselApi?.scrollTo(index)}
                                            className={cn("h-2 rounded-full transition-all", currentRoomSlide === index ? "w-6 bg-white" : "w-2 bg-white/50")}
                                        />
                                    ))}
                                </div>
                            )}
                        </Carousel>

                         <div className="p-6 space-y-6">
                            <div className='grid grid-cols-2 gap-4 text-center'>
                                <div className='bg-muted/50 rounded-lg p-3'>
                                    <p className='text-sm text-muted-foreground'>Price / night</p>
                                    <p className='font-bold text-primary'>{selectedRoom.price.toLocaleString()} DZD</p>
                                </div>
                                <div className='bg-muted/50 rounded-lg p-3'>
                                    <p className='text-sm text-muted-foreground'>Availability</p>
                                    <p className={cn("font-bold", selectedRoom.availability > 0 ? "text-green-600" : "text-destructive")}>
                                        {selectedRoom.availability > 0 ? `${selectedRoom.availability} available` : 'Fully Booked'}
                                    </p>
                                </div>
                            </div>
                           
                            <div>
                                <h4 className='font-semibold mb-3'>Select Dates</h4>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal h-12",
                                                !bookingDetails.dateRange && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {bookingDetails.dateRange?.from ? (
                                                bookingDetails.dateRange.to ? (
                                                <>
                                                    {format(bookingDetails.dateRange.from, "LLL dd, y")} -{" "}
                                                    {format(bookingDetails.dateRange.to, "LLL dd, y")}
                                                </>
                                                ) : (
                                                format(bookingDetails.dateRange.from, "LLL dd, y")
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="center">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={bookingDetails.dateRange?.from}
                                            selected={bookingDetails.dateRange}
                                            onSelect={(range) => setBookingDetails(prev => ({...prev, dateRange: range}))}
                                            numberOfMonths={1}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div>
                                <h4 className='font-semibold mb-2'>Select Guests</h4>
                                <div className='space-y-3'>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <User className='w-5 h-5 text-muted-foreground'/>
                                            <span className='font-medium'>Adults</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handlePersonCountChange('adults', -1)}><Minus className="w-4 h-4"/></Button>
                                            <span className='font-bold w-4 text-center'>{bookingDetails.adults}</span>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handlePersonCountChange('adults', 1)}><Plus className="w-4 h-4"/></Button>
                                        </div>
                                    </div>
                                     <div className='flex justify-between items-center'>
                                        <div className='flex items-center gap-2'>
                                            <Baby className='w-5 h-5 text-muted-foreground'/>
                                            <span className='font-medium'>Children</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handlePersonCountChange('children', -1)}><Minus className="w-4 h-4"/></Button>
                                            <span className='font-bold w-4 text-center'>{bookingDetails.children}</span>
                                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handlePersonCountChange('children', 1)}><Plus className="w-4 h-4"/></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="p-6 bg-background border-t">
                        <Button size="lg" className="w-full" disabled={bookingDetails.adults === 0} onClick={() => { setIsBookingSheetOpen(false); setIsBookingConfirmationOpen(true);}}>
                            Proceed to Book
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        )}
        
         {/* Hotel Booking Confirmation Sheet */}
        {selectedItem && selectedItem.category === 'Hotels' && selectedRoom && (
             <Sheet open={isBookingConfirmationOpen} onOpenChange={setIsBookingConfirmationOpen}>
                <SheetContent side="bottom" className="w-full rounded-t-2xl p-6">
                    <SheetHeader className="text-left">
                        <SheetTitle>Confirm Your Booking</SheetTitle>
                        <SheetDescription>
                           Review your booking details for the <span className='font-bold'>{selectedRoom.name}</span> at <span className='font-bold'>{selectedItem.title}</span>.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="my-4">
                        <div className="space-y-2 text-sm">
                            <div className='flex justify-between'><span className='text-muted-foreground'>Check-in:</span> <span className='font-medium'>{bookingDetails.dateRange?.from ? format(bookingDetails.dateRange.from, 'PPP') : 'N/A'}</span></div>
                            <div className='flex justify-between'><span className='text-muted-foreground'>Check-out:</span> <span className='font-medium'>{bookingDetails.dateRange?.to ? format(bookingDetails.dateRange.to, 'PPP') : 'N/A'}</span></div>
                            <div className='flex justify-between'><span className='text-muted-foreground'>Guests:</span> <span className='font-medium'>{bookingDetails.adults} Adult(s), {bookingDetails.children} Child(ren)</span></div>
                        </div>
                    </div>
                     <SheetFooter className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                         <Button variant="outline" onClick={() => { setIsBookingConfirmationOpen(false); setIsBookingSheetOpen(true); }}>Edit Booking</Button>
                        <Button onClick={handleSendBookingToWhatsapp}>Confirm & Send</Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        )}

        {selectedItem && isZoomModalOpen && (
            <Dialog open={isZoomModalOpen} onOpenChange={setIsZoomModalOpen}>
                <DialogContent className="p-0 border-0 max-w-full w-full h-full bg-black/80 backdrop-blur-lg flex items-center justify-center">
                    <DialogTitle className="sr-only">{selectedItem.title}</DialogTitle>
                    <div className="relative w-full h-full">
                        <Image
                            src={imagesToShow[currentSlide].imageUrl}
                            alt={`${selectedItem.title} - image ${currentSlide + 1}`}
                            fill
                            className="object-contain"
                            data-ai-hint={imagesToShow[currentSlide].imageHint}
                        />
                    </div>
                    <DialogClose className="absolute top-4 right-4 z-20 rounded-full bg-black/40 text-white p-2 hover:bg-black/60 transition-colors">
                        <X className="w-5 h-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                </DialogContent>
            </Dialog>
      )}
      </>
    );
}

    



