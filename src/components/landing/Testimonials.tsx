import { motion } from "framer-motion";
import { Play, Quote, ChevronLeft, ChevronRight } from "lucide-react";

/* ───────── Logo cloud at bottom ───────── */
const logoCloud = [
    { name: "LexisNexis", cls: "italic font-medium text-[12px]" },
    { name: "Foxen", cls: "font-extrabold text-[16px]" },
    { name: "ManpowerGroup", cls: "font-medium text-[11px]" },
    { name: "MICHELIN", cls: "font-bold tracking-[0.2em] text-[11px]" },
    { name: "pepsi", cls: "font-bold italic text-[13px]" },
    { name: "Rakuten", cls: "font-extrabold tracking-tight text-[16px]" },
    { name: "bp", cls: "font-bold text-[16px]" },
];

export const Testimonials = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div style={{ margin: "0 40px" }}>
                {/* Section label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span
                        className="inline-flex items-center gap-2 text-[11px] font-bold text-black uppercase mb-5"
                        style={{ letterSpacing: "1.5px" }}
                    >
                        <span className="w-[6px] h-[6px] bg-black inline-block" />
                        TESTIMONIALS
                    </span>
                </motion.div>

                {/* Two-column: Video Left + Quote Right */}
                <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
                    {/* Left: CEMEX Video */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <div
                            className="relative overflow-hidden cursor-pointer group"
                            style={{ aspectRatio: "16/10", backgroundColor: "#0f172a" }}
                        >
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-blue-900/20 to-purple-900/20 z-10" />

                            {/* Placeholder image (dark themed) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <div className="text-center z-10">
                                    <div className="text-[11px] text-white/50 uppercase tracking-widest mb-2">
                                        CEMEX
                                    </div>
                                </div>
                            </div>

                            {/* Play button */}
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center pl-1 shadow-xl">
                                        <Play className="w-6 h-6 text-slate-900 fill-slate-900" />
                                    </div>
                                </div>
                            </div>

                            {/* Person info overlay */}
                            <div className="absolute bottom-4 left-4 z-20 text-white">
                                <p className="text-[14px] font-medium">Daniel Garcia Zapata</p>
                                <p className="text-[12px] text-white/70">
                                    Senior Data Scientist at CEMEX
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Carlyle Quote */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex-1 flex flex-col justify-center"
                    >
                        <div className="bg-[#f1f5f9] p-10 h-full flex flex-col justify-between">
                            {/* Logo / Company name */}
                            <div className="mb-8">
                                <span className="text-[22px] font-medium tracking-[0.25em] text-black">
                                    CARLYLE
                                </span>
                            </div>

                            {/* Quote */}
                            <div className="flex-1 mb-8">
                                <Quote className="w-8 h-8 text-gray-300 mb-4" />
                                <blockquote className="text-[18px] text-gray-800 leading-[1.7] font-normal">
                                    "SaveSpace has completely transformed how we handle unstructured
                                    data. The accuracy and speed of their document parsing and
                                    extraction capabilities are unmatched in the industry."
                                </blockquote>
                            </div>

                            {/* Author */}
                            <div>
                                <p className="text-[14px] font-medium text-black">Dean Barr</p>
                                <p className="text-[12px] text-gray-500">
                                    Applied AI Lead and Data Scientist
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Navigation & Logo Strip */}
                <div className="max-w-6xl mx-auto mt-10">
                    {/* Nav arrows */}
                    <div className="flex items-center gap-2 mb-8">
                        <button
                            className="w-10 h-10 flex items-center justify-center bg-white transition-colors hover:bg-gray-50"
                            style={{ border: "1px solid #e7e7e7" }}
                        >
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            className="w-10 h-10 flex items-center justify-center bg-white transition-colors hover:bg-gray-50"
                            style={{ border: "1px solid #e7e7e7" }}
                        >
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    {/* Logo strip */}
                    <div className="flex items-center gap-6 sm:gap-10 flex-wrap pt-4" style={{ borderTop: "1px solid #e7e7e7" }}>
                        {logoCloud.map((logo, i) => (
                            <span
                                key={i}
                                className={`text-black/40 ${logo.cls} whitespace-nowrap hover:text-black/70 transition-colors cursor-pointer`}
                            >
                                {logo.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
