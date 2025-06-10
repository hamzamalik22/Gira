import { Link } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';

const HomePage = () => {
    const { isSignedIn, user } = useUser();

    return (
        <div className="text-gray-200 bg-gray-900">
            {/* Navigation Bar */}
            <nav className="bg-gray-800 text-white p-4 shadow-lg sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-400">Gira</Link>
                    <div className="flex items-center space-x-6">
                        {isSignedIn ? (
                            <>
                                <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                                <Link to="/todos" className="hover:text-blue-400 transition">Todos</Link>
                                <Link to="/projects" className="hover:text-blue-400 transition">Projects</Link>
                                <span className="text-white">Welcome, {user.username || user.firstName || 'User'}</span>
                                <UserButton />

                            </>
                        ) : (
                            <>
                                <Link to="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                                <Link to="/todos" className="hover:text-blue-400 transition">Todos</Link>
                                <Link to="/projects" className="hover:text-blue-400 transition">Projects</Link>
                                <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gray-700 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Empower Your Team with Gira
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
                        Take control of your projects with our intuitive project boards, powerful task management, and seamless collaboration tools. Boost productivity and streamline workflows today.
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/dashboard"
                            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
                        >
                            Go to Dashboard
                        </Link>
                        <Link
                            to="/signup"
                            className="inline-block bg-transparent border-2 border-blue-600 text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-blue-600 hover:text-white transition"
                        >
                            Sign Up Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Powerful Features for Modern Teams</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <div className="text-4xl text-blue-400 mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Personal Todos & Project Boards</h3>
                            <p className="text-gray-400">
                                Drag-and-drop tasks across customizable columns to visualize and manage your workflow effortlessly.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <div className="text-4xl text-blue-400 mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Insightful Dashboard</h3>
                            <p className="text-gray-400">
                                Monitor project progress with real-time analytics and customizable task summaries.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <div className="text-4xl text-blue-400 mb-4">🤝</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Team Collaboration</h3>
                            <p className="text-gray-400">
                                Assign tasks, add comments, and collaborate with your team in one centralized platform.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <div className="text-4xl text-blue-400 mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Advanced Search & Filters</h3>
                            <p className="text-gray-400">
                                Quickly find tasks with powerful search and filter options by status, assignee, or priority.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <div className="text-4xl text-blue-400 mb-4">📅</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Project Management</h3>
                            <p className="text-gray-400">
                                Organize tasks into projects, set deadlines, and track milestones with ease.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <div className="text-4xl text-blue-400 mb-4">⚙️</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Custom Workflows</h3>
                            <p className="text-gray-400">
                                Tailor workflows to your team's needs with flexible status and priority settings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-700">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <p className="text-gray-300 italic mb-4">
                                "Gira transformed our team's productivity. The project boards are intuitive, and the dashboard gives us clear insights."
                            </p>
                            <p className="text-blue-400 font-semibold">– Sarah M., Project Manager</p>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <p className="text-gray-300 italic mb-4">
                                "The collaboration tools make it easy to stay aligned with my team, no matter where we are."
                            </p>
                            <p className="text-blue-400 font-semibold">– John D., Developer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Teaser Section */}
            <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Flexible Plans for Every Team</h2>
                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                        From startups to enterprises, Gira offers plans to suit your needs. Start free and upgrade as you grow.
                    </p>
                    <Link
                        to="/pricing"
                        className="inline-block bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-500 transition"
                    >
                        Explore Pricing
                    </Link>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
                    <p className="text-lg mb-8 max-w-xl mx-auto">
                        Join thousands of teams using Gira to manage projects with ease and efficiency.
                    </p>
                    <div className="space-x-4">
                        <Link to="/dashboard" className="inline-block bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-900 transition">Dashboard</Link>
                        <Link
                            to="/signup"
                            className="inline-block bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Gira</h3>
                            <p className="text-gray-400">
                                The ultimate project management tool for modern teams.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
                                <li><Link to="/todos" className="hover:text-blue-400">Todos</Link></li>
                                <li><Link to="/projects" className="hover:text-blue-400">Projects</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><Link to="/help" className="hover:text-blue-400">Help Center</Link></li>
                                <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
                                <li><Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-blue-400">Terms of Service</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                            <p className="text-gray-400">Email: support@Gira.com</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-400">&copy; 2025 Gira. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;