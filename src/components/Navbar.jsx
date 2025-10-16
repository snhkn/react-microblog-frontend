import { Link } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-40 bg-[rgba(160,134,134,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="font-mono text-xl font-bold text-white">MicroBlog</Link>

                    {/* Add spacing between logo and links */}
                    <div className="hidden md:flex items-center space-x-8 ml-10">
                        <Link to="/" className="text-gray-300 hover:text-white transition-colors">HomeFeed</Link>
                        <Link to="/newpost" className="text-gray-300 hover:text-white transition-colors">New Post</Link>
                        <Link to="/explore" className="text-gray-300 hover:text-white transition-colors">Explore</Link>
                    </div>

                    {/* Sign In Button - pushed to right */}
                    <div className="hidden md:block ml-auto">
                        <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white bg-gray-700">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden ml-auto">
                        <button onClick={() => setMenuOpen(prev => !prev)} className="text-gray-300 focus:outline-none" aria-label="Toggle menu">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {menuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-[rgba(10,10,10,0.9)]">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link to="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">HomeFeed</Link>
                            <Link to="/newpost" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">New Post</Link>
                            <Link to="/explore" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Explore</Link>
                            <button className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">Sign In</button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
