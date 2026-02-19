import { Link } from "react-router-dom";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";


const learnLinks = ["Contiguous Allocation", "Linked Allocation", "Indexed Allocation", "Unix Inode System"];


const SectionLabel = ({ children }: { children: string }) => (
    <h4
        className="flex items-center gap-2 text-[12px] font-bold uppercase mb-5"
        style={{ letterSpacing: "1px", color: "#000" }}
    >
        <span className="w-[6px] h-[6px] bg-black inline-block flex-shrink-0" />
        {children}
    </h4>
);


const FooterLink = ({ children, to }: { children: string; to?: string }) => (
    <li>
        <Link
            to={to || "#"}
            className="text-[14px] text-black hover:text-gray-600 transition-colors"
            style={{ lineHeight: "1.8" }}
        >
            {children}
        </Link>
    </li>
);


export const Footer = () => {
    return (
        <footer className="bg-white">

            <div className="px-4 sm:px-6 lg:px-10 pt-20 pb-12">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 max-w-[1400px] mx-auto">


                    <div className="xl:col-span-4">
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
                            Organize smarter.
                            <br />
                            Learn deeper.
                        </h3>
                        <p className="max-w-sm text-[15px] text-gray-600 leading-[1.65]">
                            SaveSpace combines practical file organization with visual OS learning so students and developers can build intuition through interaction.
                        </p>
                    </div>


                    <div className="xl:col-span-2">
                        <SectionLabel>APP</SectionLabel>
                        <ul className="space-y-0.5">
                            <FooterLink to="/visualization">Visualization</FooterLink>
                            <FooterLink to="/theory">Theory</FooterLink>
                            <FooterLink to="/finder">Finder Interface</FooterLink>
                            <FooterLink to="/roadmap">Roadmap</FooterLink>
                        </ul>
                    </div>


                    <div className="xl:col-span-3">
                        <SectionLabel>LEARN</SectionLabel>
                        <ul className="space-y-0.5">
                            {learnLinks.map((item) => (
                                <FooterLink key={item} to="/visualization">{item}</FooterLink>
                            ))}
                        </ul>
                    </div>


                    <div className="xl:col-span-3">
                        <SectionLabel>PROJECT</SectionLabel>
                        <ul className="space-y-0.5 mb-8">
                            <li>
                                <a
                                    href="https://github.com/Adi-gitX/savespace"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[14px] text-black hover:text-gray-600 transition-colors"
                                    style={{ lineHeight: "1.8" }}
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>

                        <SectionLabel>BUILT WITH</SectionLabel>
                        <ul className="space-y-0.5 text-[14px] text-black" style={{ lineHeight: "1.8" }}>
                            <li>React + TypeScript</li>
                            <li>Vite</li>
                            <li>Tailwind CSS</li>
                            <li>Framer Motion</li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className="px-4 sm:px-6 lg:px-10">
                <div className="w-full overflow-hidden">
                    <div className="h-[22rem] flex items-center justify-center w-full">
                        <TextHoverEffect text="SaveSpace" />
                    </div>
                </div>
            </div>


            <div className="px-4 sm:px-6 lg:px-10">
                <div
                    className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 py-6"
                    style={{ borderTop: "1px solid #e5e7eb" }}
                >
                    <p className="text-[13px] text-gray-500">
                        © {new Date().getFullYear()} SaveSpace — Built for learning
                    </p>
                    <div className="flex items-center gap-3 text-[13px] text-gray-500">
                        <Link to="/visualization" className="hover:text-gray-800 transition-colors">
                            Launch App
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
