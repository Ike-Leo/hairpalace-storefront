import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        // Background gradient: Warm rose/brown gradient matching the reference
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#9E7264] to-[#C89B8D] pt-12 lg:pt-0">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">

                    {/* Text Content - Left Column */}
                    <div className="relative z-10 flex flex-col pb-12 pt-8 text-center lg:items-start lg:text-left lg:py-32">
                        <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white shadow-sm sm:text-5xl lg:text-6xl xl:leading-[1.1]">
                            Unveil Your Signature Look with Our <span className="text-white/95">Premium Hair Wigs</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90 lg:text-xl">
                            Explore a curated collection of High-Quality Wigs for
                            Every Occasion. Elevate Your Style with Confidence and Comfort.
                        </p>

                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                            <Link
                                href="/products"
                                className="inline-flex min-w-[160px] items-center justify-center bg-white px-8 py-4 text-base font-semibold uppercase tracking-wide text-[#8B5E50] shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
                            >
                                Shop Now
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex min-w-[160px] items-center justify-center border border-white bg-transparent px-8 py-4 text-base font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:bg-white/10 active:scale-95"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Image Content - Right Column */}
                    {/* Positioned to align bottom with section, scaling up for impact */}
                    <div className="relative mt-8 h-[400px] w-full lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-[90%] lg:w-[55%]">
                        <Image
                            src="/assets/hero-generated.png"
                            alt="Models displaying premium wig collection"
                            fill
                            className="object-contain object-bottom lg:object-cover lg:object-center-bottom"
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            priority
                            quality={90}
                        />
                        {/* Gradient Overlay for blending bottom/sides if needed - Optional but good for 'elevated' feel */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#C89B8D]/20 via-transparent to-transparent lg:hidden"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
