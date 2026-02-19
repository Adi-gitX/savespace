import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const paperLineWidths = ["42%", "56%", "64%", "72%", "81%", "88%", "67%", "53%"];

export const FinalCTA = () => {
    return (
        <section className="relative py-24 lg:py-28 bg-[#f8fafc] overflow-hidden">
            {}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            <div className="relative z-10 px-4 sm:px-6 lg:px-10">
                {}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-[1400px] mx-auto items-start">
                    {}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2
                            style={{
                                fontSize: "clamp(2.2rem, 4.6vw, 3.25rem)",
                                fontWeight: 500,
                                letterSpacing: "-0.03em",
                                lineHeight: "1.08",
                                color: "#000",
                            }}
                        >
                            Ready to
                            <br />
                            organize
                            <br />
                            and learn?
                        </h2>
                    </motion.div>

                    {}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="flex flex-col justify-start pt-2"
                    >
                        <p className="text-[16px] text-gray-700 leading-[1.65] max-w-xl mb-8">
                            Jump into the smart file organizer to clean up
                            your folders, or explore how your operating system
                            manages files under the hood with interactive
                            visualizations and allocation strategy simulations.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href="https://github.com/Adi-gitX/savespace"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button
                                    className="text-[13px] font-medium text-black uppercase bg-white hover:bg-gray-50 transition-all"
                                    style={{
                                        letterSpacing: "0.48px",
                                        border: "1px solid #e7e7e7",
                                        padding: "10px 24px",
                                        height: "44px",
                                    }}
                                >
                                    View on GitHub
                                </button>
                            </a>
                            <Link to="/visualization">
                                <Button
                                    className="text-[13px] font-medium text-white uppercase bg-black hover:bg-gray-900 transition-all"
                                    style={{
                                        letterSpacing: "0.48px",
                                        border: "1px solid black",
                                        padding: "10px 24px",
                                        height: "44px",
                                    }}
                                >
                                    Launch App
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex justify-center mt-20"
                >
                    <div className="relative">
                        {}
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
                                            style={{ height: "4px", width: paperLineWidths[(i + j) % paperLineWidths.length] }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                        {}
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
