import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="sticky top-0 z-50 flex flex-col"
            style={{ position: "sticky" }}
        >
            {/* Navbar — expands from floating to full-width on scroll */}
            <nav
                className="bg-white flex items-stretch justify-between"
                style={{
                    margin: scrolled ? "0" : "16px 40px 0",
                    border: "1px solid #e7e7e7",
                    height: "48px",
                    transition: "margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {/* LEFT: Logo box | Links box */}
                <div className="flex items-stretch">
                    {/* Logo box */}
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 flex-shrink-0 px-6"
                        style={{ borderRight: "1px solid #e7e7e7" }}
                    >
                        <div
                            className="bg-black flex items-center justify-center"
                            style={{ width: "22px", height: "22px", padding: "3px" }}
                        >
                            <img src="/assets/download.svg" alt="SaveSpace" className="h-3.5 w-auto invert" />
                        </div>
                        <span className="text-[14px] font-medium text-black tracking-tight">SaveSpace</span>
                    </Link>

                    {/* Links box */}
                    <div className="hidden xl:flex items-center gap-5 text-[14px] font-normal text-black px-6">
                        {["Product", "Solutions", "Developers", "Resources", "Company"].map((item) => (
                            <Link
                                key={item}
                                to="#"
                                className="hover:opacity-60 transition-opacity flex items-center gap-0.5 whitespace-nowrap"
                            >
                                {item}
                                <span className="text-[8px] opacity-40 ml-0.5">▼</span>
                            </Link>
                        ))}
                        <Link to="#" className="hover:opacity-60 transition-opacity whitespace-nowrap">Blog</Link>
                        <Link to="#" className="hover:opacity-60 transition-opacity whitespace-nowrap">Pricing</Link>
                    </div>
                </div>

                {/* RIGHT: Social box | Buttons box */}
                <div className="flex items-stretch">
                    {/* Social icons box */}
                    <div
                        className="hidden lg:flex items-center gap-3 text-black px-5"
                        style={{ borderLeft: "1px solid #e7e7e7", borderRight: "1px solid #e7e7e7" }}
                    >
                        <Github className="w-[16px] h-[16px] hover:opacity-50 cursor-pointer transition-opacity" strokeWidth={1.5} />
                        <div
                            className="flex items-center justify-center bg-black"
                            style={{ width: "16px", height: "16px" }}
                        >
                            <span className="text-[8px] font-bold text-white">d</span>
                        </div>
                        <X className="w-[14px] h-[14px] hover:opacity-50 cursor-pointer transition-opacity" strokeWidth={1.5} />
                        <Linkedin className="w-[16px] h-[16px] hover:opacity-50 cursor-pointer transition-opacity" strokeWidth={1.5} />
                        <Youtube className="w-[16px] h-[16px] hover:opacity-50 cursor-pointer transition-opacity" strokeWidth={1.5} />
                    </div>

                    {/* Buttons box */}
                    <div className="flex items-center gap-1.5 px-5">
                        <button
                            className="hidden sm:inline-flex items-center justify-center text-[12px] font-normal text-black uppercase bg-white hover:bg-gray-50 transition-all"
                            style={{
                                letterSpacing: "0.48px",
                                border: "1px solid #e7e7e7",
                                padding: "6px 16px",
                                height: "32px",
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
                                    padding: "6px 16px",
                                    height: "32px",
                                }}
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};
