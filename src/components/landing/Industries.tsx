import { motion } from "framer-motion";
import { FileText, Shield, Factory, HeartPulse } from "lucide-react";

const industries = [
    {
        name: "Finance",
        icon: <FileText className="w-6 h-6" />,
        desc: "From financial research and due diligence to automated invoice processing, leading banks, hedge funds, and fintechs are transforming workflows with AI.",
        cta: "EXPLORE FINANCE",
        color: "#67e8f9",
        bgGradient: "linear-gradient(135deg, #67e8f9 0%, #22d3ee 40%, #06b6d4 100%)",
    },
    {
        name: "Insurance",
        icon: <Shield className="w-6 h-6" />,
        desc: "Risk and protection leaders are turning unstructured data into action—streamlining underwriting, audits, and claim processing.",
        cta: "EXPLORE INSURANCE",
        color: "#a5b4fc",
        bgGradient: "linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 40%, #818cf8 100%)",
    },
    {
        name: "Manufacturing",
        icon: <Factory className="w-6 h-6" />,
        desc: "Leading manufacturers are using AI to extract insights from specs, manuals, and inspection reports—faster and more accurately.",
        cta: "EXPLORE MANUFACTURING",
        color: "#fbbf24",
        bgGradient: "linear-gradient(135deg, #fcd34d 0%, #fbbf24 40%, #f59e0b 100%)",
    },
    {
        name: "Healthcare",
        icon: <HeartPulse className="w-6 h-6" />,
        desc: "From medical records and handwritten doctor notes to insurance claims, healthcare providers are using AI to streamline clinical and administrative workflows.",
        cta: "EXPLORE HEALTHCARE",
        color: "#f9a8d4",
        bgGradient: "linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 40%, #f472b6 100%)",
    },
];

export const Industries = () => {
    return (
        <section className="py-20 bg-[#f1f5f9] relative overflow-hidden">
            <div style={{ margin: "0 40px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                    {industries.map((industry, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="bg-[#e8ecf1] flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                            style={{ minHeight: "320px" }}
                        >
                            {/* Top gradient accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-[2px]"
                                style={{ background: industry.bgGradient }}
                            />
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className="w-10 h-10 flex items-center justify-center text-black"
                                        style={{ border: "1px solid #d1d5db" }}
                                    >
                                        {industry.icon}
                                    </div>
                                    <h3 style={{ fontSize: "24px", fontWeight: 500, letterSpacing: "-0.48px", color: "#000" }}>
                                        {industry.name}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-[13px] text-gray-600 leading-[1.7] max-w-[340px] mb-6">
                                    {industry.desc}
                                </p>

                                {/* CTA Button */}
                                <button
                                    className="text-[11px] font-normal text-black uppercase bg-white hover:bg-gray-50 transition-all"
                                    style={{
                                        letterSpacing: "1.5px",
                                        border: "1px solid #d1d5db",
                                        padding: "10px 20px",
                                    }}
                                >
                                    {industry.cta}
                                </button>
                            </div>

                            {/* Right: Colored abstract image */}
                            <div
                                className="absolute top-4 right-4 bottom-4"
                                style={{
                                    width: "180px",
                                    background: industry.bgGradient,
                                    opacity: 0.9,
                                }}
                            >
                                {/* Nested squares pattern */}
                                <div className="absolute inset-4 flex items-center justify-center">
                                    <div
                                        className="w-full h-full"
                                        style={{
                                            border: `3px solid rgba(255,255,255,0.3)`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "70%",
                                                height: "70%",
                                                border: `3px solid rgba(255,255,255,0.25)`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: "60%",
                                                    height: "60%",
                                                    border: `3px solid rgba(255,255,255,0.2)`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
