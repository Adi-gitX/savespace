import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ───────── Generate Pyramid Block Data ───────── */
const generateBlocks = () => {
    const blocks: { x: number; maxHeight: number; width: number; hue: number; sat: number }[] = [];
    const totalBlocks = 50;
    const blockWidth = 22;
    const totalWidth = totalBlocks * (blockWidth + 2);
    const centerX = totalWidth / 2;

    for (let i = 0; i < totalBlocks; i++) {
        const x = i * (blockWidth + 2);
        const distFromCenter = Math.abs(x + blockWidth / 2 - centerX);
        const normalizedDist = distFromCenter / (totalWidth / 2);

        // Pyramid shape: tallest at center, shortest at edges
        const maxHeight = Math.max(30, 450 * (1 - normalizedDist * normalizedDist) + Math.random() * 40);

        // Cyan-to-blue gradient based on position
        const hue = 190 + normalizedDist * 30;
        const sat = 70 + Math.random() * 20;

        blocks.push({ x, maxHeight, width: blockWidth, hue, sat });
    }
    return blocks;
};

const pyramidBlocks = generateBlocks();

export const GradientTransition = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Blocks grow from 0 to full height as user scrolls
    const blockScale = useTransform(scrollYProgress, [0, 0.4, 0.6], [0, 0.8, 1]);
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden"
            style={{ height: "700px" }}
        >
            {/* Base gradient background — white to light blue */}
            <motion.div
                className="absolute inset-0"
                style={{
                    opacity: sectionOpacity,
                    background:
                        "linear-gradient(180deg, #ffffff 0%, #f0f9ff 15%, #e0f2fe 40%, #bae6fd 70%, #7dd3fc 100%)",
                }}
            />

            {/* Pyramid blocks — grow from bottom */}
            <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
                {pyramidBlocks.map((block, i) => (
                    <motion.div
                        key={i}
                        className="flex-shrink-0"
                        style={{
                            width: `${block.width}px`,
                            height: useTransform(blockScale, (v) => `${block.maxHeight * v}px`),
                            backgroundColor: `hsl(${block.hue}, ${block.sat}%, 78%)`,
                            marginRight: "2px",
                            opacity: useTransform(scrollYProgress, [0.05, 0.25], [0, 0.75]),
                        }}
                    />
                ))}
            </div>

            {/* Center white glow — pyramid peak highlight */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 50% 60% at 50% 70%, rgba(255,255,255,0.6) 0%, transparent 70%)",
                }}
            />

            {/* Bottom fade to white */}
            <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                    height: "200px",
                    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.9))",
                }}
            />

            {/* Bottom section label */}
            <div className="absolute bottom-0 left-0 right-0 pb-12 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span
                        className="inline-flex items-center gap-2 text-[11px] font-bold text-black uppercase mb-5"
                        style={{ letterSpacing: "1.5px" }}
                    >
                        <span className="w-[6px] h-[6px] bg-black inline-block" />
                        INDUSTRIES
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
                        Unlock document
                        <br />
                        automation across industries
                    </h2>
                </motion.div>
            </div>
        </section>
    );
};
