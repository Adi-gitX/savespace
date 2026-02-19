import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* ───────── Company Logo Data ───────── */
const logoRowOne = [
    { name: "C4ADS", cls: "font-black tracking-[0.06em] text-[11px]" },
    { name: "CEMEX", cls: "font-black italic tracking-wider text-[12px]" },
    { name: "3E Delphi", cls: "font-bold text-[12px]" },
    { name: "EY", cls: "font-bold italic text-[16px]" },
    { name: "KPMG", cls: "font-black tracking-[0.15em] text-[14px]" },
    { name: "intel", cls: "font-normal text-[18px] tracking-wide" },
    { name: "pepsi", cls: "font-bold italic text-[13px]" },
    { name: "LexisNexis", cls: "italic font-medium text-[12px]" },
    { name: "Foxen", cls: "font-extrabold text-[16px]" },
    { name: "11x", cls: "font-bold text-[14px]" },
    { name: "CARLYLE", cls: "font-medium tracking-[0.25em] text-[12px]" },
];

const logoRowTwo = [
    { name: "SCOPELY", cls: "font-bold tracking-[0.08em] text-[10px]" },
    { name: "ManpowerGroup", cls: "font-medium text-[11px]" },
    { name: "MICHELIN", cls: "font-bold tracking-[0.2em] text-[11px]" },
    { name: "Rakuten", cls: "font-extrabold tracking-tight text-[16px]" },
    { name: "bp", cls: "font-bold text-[16px]" },
    { name: "REDICA Systems", cls: "font-medium text-[10px] tracking-wide" },
    { name: "Lovable", cls: "font-bold text-[13px] tracking-tight" },
];

export const Hero = () => {
    return (
        <section className="relative w-full pt-28 sm:pt-32 pb-0 overflow-visible bg-white">
            {/* ──────── TOP: Heading Left + Description Right — exact SaveSpace layout ──────── */}
            <div style={{ margin: "0 40px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 items-start mb-10 lg:mb-14">
                    {/* Left — Heading (exact: 56px, weight 500, letter-spacing -1.68px) */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1
                            style={{
                                fontSize: "56px",
                                fontWeight: 500,
                                letterSpacing: "-1.68px",
                                lineHeight: "61.6px",
                                color: "#000",
                            }}
                        >
                            The new standard for
                            <br />
                            complex document
                            <br />
                            processing
                        </h1>
                    </motion.div>

                    {/* Right — Description + Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col justify-end lg:pt-1 lg:ml-auto"
                    >
                        <p
                            style={{
                                fontSize: "19px",
                                fontWeight: 400,
                                lineHeight: "1.4",
                                letterSpacing: "0",
                                color: "#000",
                            }}
                            className="mb-7"
                        >
                            SaveSpace delivers the world's most
                            <br />
                            accurate agentic OCR and document-
                            <br />
                            specific AI workflows, powering complete
                            <br />
                            enterprise automation
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                className="text-[11px] font-medium text-black uppercase bg-white hover:bg-gray-50 transition-all inline-flex items-center justify-center cursor-pointer tracking-[0.08em]"
                                style={{
                                    border: "1px solid #e0e0e0",
                                    padding: "0 18px",
                                    height: "36px",
                                }}
                            >
                                Contact Sales
                            </button>
                            <Link to="/visualization">
                                <Button
                                    className="text-[11px] font-medium text-white uppercase bg-black hover:bg-gray-900 transition-all tracking-[0.08em]"
                                    style={{
                                        border: "1px solid black",
                                        padding: "0 18px",
                                        height: "36px",
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ──────── 3D VISUAL + HORIZONTAL GRADIENT ──────── */}
            <div className="relative w-full">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to right, #7dd3fc, #a5b4fc, #c084fc, #f0abfc, #fda4af)",
                    }}
                />
                <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white to-transparent z-[1]" />

                <div className="relative z-10 flex flex-col items-center" style={{ margin: "0 40px" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative w-full max-w-3xl"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto relative z-10"
                        >
                            <source
                                src="/assets/SaveSpace%20AI%20Agents%20for%20Document%20OCR%20Workflows.webm"
                                type="video/webm"
                            />
                        </video>
                    </motion.div>
                </div>

                {/* ──────── LOGO STRIP — Two Rows ──────── */}
                <div className="relative z-10 pt-8 pb-6">
                    <div className="flex justify-center items-center gap-5 sm:gap-8 lg:gap-12 flex-wrap px-10 mb-4">
                        {logoRowOne.map((logo, i) => (
                            <span
                                key={i}
                                className={`text-black ${logo.cls} whitespace-nowrap opacity-80 hover:opacity-100 transition-opacity`}
                            >
                                {logo.name}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-5 sm:gap-8 lg:gap-12 flex-wrap px-10">
                        {logoRowTwo.map((logo, i) => (
                            <span
                                key={i}
                                className={`text-black ${logo.cls} whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity`}
                            >
                                {logo.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ──────── LLAMACLOUD FREE BANNER ──────── */}
            <div
                className="relative w-full py-10"
                style={{
                    background: "linear-gradient(to bottom, #f0abfc, #fdba74, #fef3c7, white)",
                }}
            >
                <div style={{ margin: "0 40px" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white shadow-md p-6 sm:p-8 max-w-5xl mx-auto"
                        style={{ border: "1px solid #e7e7e7" }}
                    >
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex-shrink-0">
                                <h3
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: 500,
                                        letterSpacing: "-0.48px",
                                        lineHeight: "1.2",
                                        color: "#000",
                                    }}
                                >
                                    Get started with SaveCloud{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 italic">
                                        for free
                                    </span>
                                </h3>
                            </div>

                            <div className="flex-1">
                                <p className="text-[12px] font-medium text-gray-700 mb-2">
                                    Our free plan includes:
                                </p>
                                <ul className="space-y-0.5 text-[11px] text-gray-500 leading-relaxed">
                                    <li>• 10,000 free credits per month (~1,000 pages)</li>
                                    <li>• Agentic OCR for layout-aware document parsing</li>
                                    <li>• Structured extraction of defined schemas</li>
                                    <li>• Build and deploy end-to-end document agents</li>
                                </ul>
                            </div>

                            <div className="flex-shrink-0">
                                <Link to="/visualization">
                                    <Button
                                        className="text-[12px] font-normal text-white uppercase bg-black hover:bg-gray-900 transition-all whitespace-nowrap"
                                        style={{
                                            letterSpacing: "0.48px",
                                            border: "1px solid black",
                                            padding: "8px 20px",
                                            height: "36px",
                                        }}
                                    >
                                        Try SaveCloud
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
