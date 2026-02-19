import { Link } from "react-router-dom";
import { Github, Linkedin, Youtube } from "lucide-react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

/* ───────── Footer Link Data ───────── */
const solutionsCol1 = [
    "Engineering & R&D",
    "Administrative Operations",
    "Financial Analysts",
    "Developers",
];
const solutionsCol2 = ["Insurance", "Finance", "Manufacturing", "Healthcare & Pharma"];
const solutionsCol3 = [
    "Finance Due Diligence",
    "Invoice Processing",
    "Technical Document Search",
    "Customer Support",
];

const products = ["SaveCloud", "Parse", "Extract", "Index", "SaveSpace", "Workflows"];
const resources = ["Customer Stories", "Glossary"];
const company = ["Pricing", "Blog", "About us", "Careers", "Brand", "Trust center"];

/* ───────── Custom Icons ───────── */
const DiscordIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-current">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

/* ───────── Section Label with square bullet ───────── */
const SectionLabel = ({ children }: { children: string }) => (
    <h4
        className="flex items-center gap-2 text-[12px] font-bold uppercase mb-5"
        style={{ letterSpacing: "1px", color: "#000" }}
    >
        <span className="w-[6px] h-[6px] bg-black inline-block flex-shrink-0" />
        {children}
    </h4>
);

/* ───────── Link Item ───────── */
const FooterLink = ({ children }: { children: string }) => (
    <li>
        <Link
            to="#"
            className="text-[14px] text-black hover:text-gray-600 transition-colors"
            style={{ lineHeight: "1.8" }}
        >
            {children}
        </Link>
    </li>
);

/* ───────── Main Footer ───────── */
export const Footer = () => {
    return (
        <footer className="bg-white">
            {/* ───────── Top Section ───────── */}
            <div style={{ padding: "80px 60px 48px" }}>
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 max-w-[1400px] mx-auto">

                    {/* Left: Tagline + CTA */}
                    <div className="xl:col-span-3">
                        <h3
                            style={{
                                fontSize: "42px",
                                fontWeight: 500,
                                letterSpacing: "-1.2px",
                                lineHeight: "1.15",
                                color: "#000",
                                marginBottom: "32px",
                            }}
                        >
                            Build document
                            <br />
                            agents that
                            <br />
                            understand,
                            <br />
                            reason, and act
                        </h3>
                        <div className="flex flex-col items-start gap-3 mb-8">
                            <button
                                className="text-[12px] font-medium text-black uppercase bg-white hover:bg-gray-50 transition-all cursor-pointer"
                                style={{
                                    letterSpacing: "1.5px",
                                    border: "1px solid #000",
                                    padding: "14px 28px",
                                    height: "48px",
                                }}
                            >
                                CONTACT SALES
                            </button>
                            <Link to="/visualization">
                                <button
                                    className="text-[12px] font-medium text-white uppercase bg-black hover:bg-gray-900 transition-all cursor-pointer"
                                    style={{
                                        letterSpacing: "1.5px",
                                        padding: "14px 28px",
                                        height: "48px",
                                    }}
                                >
                                    SIGN UP
                                </button>
                            </Link>
                        </div>
                        <Link to="#" className="text-[14px] text-black hover:text-gray-600 transition-colors">
                            Explore AI Summary
                        </Link>
                        {/* AI Icons Row */}
                        <div className="flex items-center gap-3 mt-3">
                            {["◎", "✦", "✳", "⊘", "✺"].map((icon, i) => (
                                <span key={i} className="text-[18px] text-gray-400">{icon}</span>
                            ))}
                        </div>
                    </div>

                    {/* Solutions — 3 sub-columns */}
                    <div className="xl:col-span-4">
                        <SectionLabel>SOLUTIONS</SectionLabel>
                        <div className="grid grid-cols-3 gap-4">
                            <ul className="space-y-0.5">
                                {solutionsCol1.map((item) => (
                                    <FooterLink key={item}>{item}</FooterLink>
                                ))}
                            </ul>
                            <ul className="space-y-0.5">
                                {solutionsCol2.map((item) => (
                                    <FooterLink key={item}>{item}</FooterLink>
                                ))}
                            </ul>
                            <ul className="space-y-0.5">
                                {solutionsCol3.map((item) => (
                                    <FooterLink key={item}>{item}</FooterLink>
                                ))}
                            </ul>
                        </div>

                        {/* Products below Solutions */}
                        <div className="mt-10">
                            <SectionLabel>PRODUCTS</SectionLabel>
                            <ul className="space-y-0.5">
                                {products.map((item) => (
                                    <FooterLink key={item}>{item}</FooterLink>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Resources + Company */}
                    <div className="xl:col-span-2">
                        <SectionLabel>RESOURCES</SectionLabel>
                        <ul className="space-y-0.5 mb-10">
                            {resources.map((item) => (
                                <FooterLink key={item}>{item}</FooterLink>
                            ))}
                        </ul>
                        <SectionLabel>COMPANY</SectionLabel>
                        <ul className="space-y-0.5">
                            {company.map((item) => (
                                <FooterLink key={item}>{item}</FooterLink>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter + Social */}
                    <div className="xl:col-span-3">
                        <SectionLabel>WEEKLY NEWSLETTER</SectionLabel>
                        <p className="text-[13px] text-gray-600 leading-[1.6] mb-5">
                            Get a weekly roundup of the latest news and insights on the world of LLMs
                            and word on the newest features of the SaveSpace libraries.
                        </p>
                        <div className="flex flex-col gap-3 mb-8">
                            <input
                                type="email"
                                placeholder='For example, "jane@company.com"'
                                className="w-full bg-white text-[13px] text-gray-600 placeholder-gray-400 px-4 py-3 outline-none"
                                style={{ border: "1px solid #d1d5db", height: "44px" }}
                            />
                            <button
                                className="text-[12px] font-bold text-white uppercase bg-black hover:bg-gray-900 transition-all w-full cursor-pointer"
                                style={{
                                    letterSpacing: "1.5px",
                                    padding: "14px 24px",
                                    height: "48px",
                                }}
                            >
                                SUBSCRIBE
                            </button>
                        </div>

                        {/* Social icons */}
                        <div className="flex items-center gap-5 text-black">
                            <Github className="w-[20px] h-[20px] hover:opacity-50 cursor-pointer transition-opacity" strokeWidth={1.5} />
                            <DiscordIcon />
                            <XIcon />
                            <Linkedin className="w-[20px] h-[20px] hover:opacity-50 cursor-pointer transition-opacity" strokeWidth={1.5} />
                            <Youtube className="w-[20px] h-[20px] hover:opacity-50 cursor-pointer transition-opacity" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ───────── Large SaveSpace Text Hover Effect ───────── */}
            <div style={{ padding: "0 60px" }}>
                <div className="w-full overflow-hidden">
                    <div className="h-[22rem] flex items-center justify-center w-full">
                        <TextHoverEffect text="SaveSpace" />
                    </div>
                </div>
            </div>

            {/* ───────── Copyright Bar ───────── */}
            <div style={{ padding: "0 60px" }}>
                <div
                    className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 py-6"
                    style={{ borderTop: "1px solid #e5e7eb" }}
                >
                    <p className="text-[13px] text-gray-500">
                        © {new Date().getFullYear()} SaveSpace
                    </p>
                    <div className="flex items-center gap-3 text-[13px] text-gray-500">
                        <Link to="#" className="hover:text-gray-800 transition-colors">
                            Privacy Notice
                        </Link>
                        <span className="w-[5px] h-[5px] bg-gray-400 inline-block" />
                        <Link to="#" className="hover:text-gray-800 transition-colors">
                            Terms of Service
                        </Link>
                        <span className="w-[5px] h-[5px] bg-gray-400 inline-block" />
                        <Link to="#" className="hover:text-gray-800 transition-colors">
                            Data Processing Addendum
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
