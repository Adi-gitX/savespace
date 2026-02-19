import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ───────── Product Data ───────── */
interface ProductData {
    number: string;
    title: string;
    description: string;
    image: string;
    buttonLabel: string;
    bullets: { title: string; desc: string }[];
}

const products: ProductData[] = [
    {
        number: "01",
        title: "SaveCloud",
        description:
            "SaveCloud powers enterprise-grade document automation with industry-best parsing, extraction, indexing, and retrieval — optimized for accuracy, configurability, and scalability.",
        image: "/assets/imgi_24_07766393ac8f2f199ac50a29f15d97082b17272d-1616x1360.png",
        buttonLabel: "START BUILDING",
        bullets: [
            {
                title: "SaveParse",
                desc: "Industry-leading document parsing for 90+ unstructured file types — including support for embedded images, complex layouts, multi-page tables, and even handwritten notes.",
            },
            {
                title: "SaveExtract",
                desc: "Define custom schemas and extract structured data from any document with high accuracy and consistency.",
            },
            {
                title: "Index",
                desc: "Automatically chunk, embed, and index your parsed documents for fast, accurate retrieval.",
            },
        ],
    },
    {
        number: "02",
        title: "Workflows",
        description:
            "Workflows is an event-driven, async-first workflow engine that orchestrates multi-step AI processes, agents, and document pipelines with precision and control.",
        image: "/assets/imgi_27_0586db759cc7b58bf1dc1634803ead8675ec6ed9-1616x1616.png",
        buttonLabel: "START BUILDING",
        bullets: [
            {
                title: "Orchestrate AI Workflows",
                desc: "Easily chain together multiple steps, loop, and parallel paths.",
            },
            {
                title: "Built for Speed",
                desc: "Async-first workflows that seamlessly integrate with modern Python apps, like FastAPI.",
            },
            {
                title: "Event-Driven",
                desc: "Architecture for workflows you can launch, pause, and resume—statefully and seamlessly.",
            },
        ],
    },
    {
        number: "03",
        title: "SaveSpace",
        description:
            "SaveSpace is a developer-first agent framework that rapidly accelerates time-to-production of GenAI applications with trusted low and high-level abstractions. Optimized for agents, RAG, custom workflows, and integrations.",
        image: "/assets/imgi_28_b56f30bb1df5c39ff007ec16c9af133d629148a6-1616x1616.png",
        buttonLabel: "START BUILDING",
        bullets: [
            {
                title: "Modular building blocks",
                desc: "Start building with core components like state, memory, human-in-the-loop review, reflection, and more.",
            },
            {
                title: "Developer-First",
                desc: "Fully-featured Python and Typescript SDKs that easily embed into your existing tech stack.",
            },
            {
                title: "Integrate Anywhere",
                desc: "Pre-built third party connectors for LLMs, data sources, vector DBs, and more.",
            },
        ],
    },
];

/* ───────── Single Sticky Product Card ───────── */
const StickyProductCard = ({ product, index }: { product: ProductData; index: number }) => {
    return (
        <div
            className="sticky h-screen w-full bg-white flex items-center"
            style={{
                top: "90px",
                zIndex: 10 + index,
                borderTop: "1px solid #e5e7eb",
            }}
        >
            <div className="w-full" style={{ padding: "0 40px" }}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-start max-w-[1400px] mx-auto">
                    {/* Left Column: Number + Title + Description + Button */}
                    <div className="lg:col-span-3 flex flex-col justify-start pt-4">
                        <span
                            className="inline-flex items-center gap-2 text-[11px] font-bold text-black uppercase block mb-3"
                            style={{ letterSpacing: "1.5px" }}
                        >
                            <span className="w-[5px] h-[5px] bg-black inline-block" />
                            {product.number}
                        </span>
                        <h3
                            style={{
                                fontSize: "42px",
                                fontWeight: 500,
                                letterSpacing: "-1.2px",
                                lineHeight: "1.05",
                                color: "#000",
                                marginBottom: "16px",
                            }}
                        >
                            {product.title}
                        </h3>
                        <p
                            className="text-[13px] leading-[1.7] mb-8"
                            style={{ color: "#6b7280", maxWidth: "280px" }}
                        >
                            {product.description}
                        </p>
                        <button
                            className="text-[11px] font-medium text-white uppercase bg-black hover:bg-gray-800 transition-all inline-flex items-center justify-center self-start cursor-pointer"
                            style={{
                                letterSpacing: "1.5px",
                                padding: "12px 24px",
                                height: "42px",
                            }}
                        >
                            {product.buttonLabel}
                        </button>
                    </div>

                    {/* Center Column: Product Image */}
                    <div className="lg:col-span-6 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full max-w-xl h-auto"
                            style={{ filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.06))" }}
                        />
                    </div>

                    {/* Right Column: Bullet Points */}
                    <div className="lg:col-span-3 flex flex-col gap-8 pt-4">
                        {product.bullets.map((b, i) => (
                            <div key={i}>
                                <h4
                                    className="text-[16px] font-medium text-black mb-2 flex items-start gap-2"
                                >
                                    <span className="text-gray-400 mt-0.5">•</span>
                                    {b.title}
                                </h4>
                                <p className="text-[13px] leading-relaxed pl-5" style={{ color: "#6b7280" }}>
                                    {b.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ───────── Main Export ───────── */
export const ProcessFlow = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Animate header opacity based on scroll
    const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.08], [0, -40]);

    return (
        <section ref={sectionRef} className="relative bg-white">
            {/* Section Header — fades out as you scroll into cards */}
            <div className="relative" style={{ padding: "0 40px" }}>
                <motion.div
                    style={{ opacity: headerOpacity, y: headerY }}
                    className="text-center py-24"
                >
                    <span
                        className="inline-flex items-center gap-2 text-[11px] font-bold text-black uppercase mb-5"
                        style={{ letterSpacing: "1.5px" }}
                    >
                        <span className="w-[6px] h-[6px] bg-black inline-block" />
                        HOW IT WORKS
                    </span>
                    <h2
                        style={{
                            fontSize: "clamp(2rem, 4vw, 3.25rem)",
                            fontWeight: 500,
                            letterSpacing: "-1.5px",
                            lineHeight: "1.1",
                            color: "#000",
                        }}
                    >
                        From document chaos
                        <br />
                        to intelligent automation
                    </h2>
                </motion.div>
            </div>

            {/* Sticky cards container — each card is 100vh, total 300vh */}
            <div style={{ height: `${products.length * 100}vh` }}>
                {products.map((product, idx) => (
                    <StickyProductCard key={idx} product={product} index={idx} />
                ))}
            </div>
        </section>
    );
};
