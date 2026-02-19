import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
    return (
        <section className="relative py-28 bg-[#f8fafc] overflow-hidden">
            {/* Dot grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative z-10" style={{ margin: "0 40px" }}>
                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
                    {/* Left: Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            style={{
                                fontSize: "52px",
                                fontWeight: 500,
                                letterSpacing: "-1.56px",
                                lineHeight: "57.2px",
                                color: "#000",
                            }}
                        >
                            Start building
                            <br />
                            your first
                            <br />
                            document agent
                            <br />
                            today
                        </h2>
                    </motion.div>

                    {/* Right: Description + Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-col justify-start pt-2"
                    >
                        <p className="text-[14px] text-gray-600 leading-[1.7] max-w-md mb-8">
                            SaveSpace gets you from raw data to real
                            automation — fast. Get started with SaveCloud or
                            contact our team to learn more.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                className="text-[12px] font-normal text-black uppercase bg-white hover:bg-gray-50 transition-all"
                                style={{
                                    letterSpacing: "0.48px",
                                    border: "1px solid #e7e7e7",
                                    padding: "10px 24px",
                                    height: "40px",
                                }}
                            >
                                Contact Sales
                            </button>
                            <Link to="/visualization">
                                <Button
                                    className="text-[12px] font-normal text-white uppercase bg-black hover:bg-gray-900 transition-all"
                                    style={{
                                        letterSpacing: "0.48px",
                                        border: "1px solid black",
                                        padding: "10px 24px",
                                        height: "40px",
                                    }}
                                >
                                    Try SaveCloud
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Center: Stacked papers illustration */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex justify-center mt-20"
                >
                    <div className="relative">
                        {/* Stack of papers with gradient tint */}
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute bg-white"
                                style={{
                                    width: `${200 - i * 8}px`,
                                    height: `${260 - i * 8}px`,
                                    top: `${i * -6}px`,
                                    left: `${i * 3}px`,
                                    border: "1px solid #e7e7e7",
                                    transform: `rotate(${(i - 2) * 1.5}deg)`,
                                    zIndex: 5 - i,
                                }}
                            >
                                <div className="p-4 space-y-2">
                                    {[...Array(8)].map((_, j) => (
                                        <div
                                            key={j}
                                            className="bg-gray-100"
                                            style={{ height: "4px", width: `${40 + Math.random() * 50}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {/* Gradient overlay */}
                        <div
                            style={{
                                width: "200px",
                                height: "260px",
                                background: "linear-gradient(135deg, rgba(147,197,253,0.15), rgba(196,181,253,0.15), rgba(249,168,212,0.15))",
                                position: "relative",
                                zIndex: 6,
                            }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
