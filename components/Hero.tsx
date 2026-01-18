import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative w-full h-[600px] lg:h-[85vh] flex items-center overflow-hidden bg-[#FDFBF7]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/hero-generated2.png"
                    alt="Luxury Hair Collection"
                    fill
                    className="object-cover object-[80%_center] lg:object-right"
                    priority
                    quality={100}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center">
                <div className="max-w-3xl">
                    {/* Main Heading mimicking the reference */}
                    <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-normal leading-[1.1] tracking-wide text-[#8B5E3C]">
                        <span className="block drop-shadow-md text-white lg:drop-shadow-sm lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-[#8B5E3C] lg:to-[#C19A6B]">
                            LUXURY
                        </span>
                        <span className="block drop-shadow-md text-white lg:drop-shadow-sm lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-[#8B5E3C] lg:to-[#C19A6B]">
                            HAIR
                        </span>
                        <span className="block drop-shadow-md text-white lg:drop-shadow-sm lg:text-transparent lg:bg-clip-text lg:bg-gradient-to-r lg:from-[#8B5E3C] lg:to-[#C19A6B]">
                            COLLECTION
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mt-6 text-xl sm:text-2xl text-[#6D4C41] font-sans font-medium tracking-wide">
                        Crafted for Royalty.
                    </p>

                    {/* Button */}
                    <div className="mt-12">
                        <Link
                            href="/products"
                            className="group relative inline-flex items-center justify-center px-12 py-4 overflow-hidden rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                            {/* Button Background with Golden Gradient Border effect */}
                            <div className="absolute inset-0 rounded-full border-[1.5px] border-[#C19A6B] bg-gradient-to-r from-[#Fdfbf7]/80 to-[#Fdfbf7]/40 backdrop-blur-sm shadow-lg shadow-[#C19A6B]/20"></div>

                            <span className="relative text-base font-bold tracking-[0.15em] text-[#8B5E3C] uppercase group-hover:text-[#6D4C41]">
                                Shop Now
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
