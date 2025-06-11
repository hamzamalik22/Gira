import { Link } from 'react-router-dom';
import { useUser, UserButton } from '@clerk/clerk-react';
import { CheckCircle, ArrowRight, Users, Zap, Shield, BarChart3, Globe, Smartphone, Star, Play } from 'lucide-react';

const HomePage = () => {
    const { isSignedIn, user } = useUser();

    return (
        <div className="text-gray-200 bg-gray-900 min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-gray-900 border-b border-gray-800 text-white p-4 sticky top-0 z-50 backdrop-blur-sm">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="text-2xl font-bold text-blue-400 flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">G</div>
                            <span>Gira</span>
                        </Link>
                        <div className="hidden md:flex items-center space-x-6 text-sm">
                            <Link to="/features" className="hover:text-blue-400 transition">Features</Link>
                            <Link to="/resources" className="hover:text-blue-400 transition">Resources</Link>
                            <Link to="/enterprise" className="hover:text-blue-400 transition">Enterprise</Link>
                            <Link to="/community" className="hover:text-blue-400 transition">Community</Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isSignedIn ? (
                            <>
                                <Link to="/dashboard" className="text-sm hover:text-blue-400 transition">Dashboard</Link>
                                <Link to="/todos" className="text-sm hover:text-blue-400 transition">Todos</Link>
                                <Link to="/projects" className="text-sm hover:text-blue-400 transition">Projects</Link>
                                <UserButton />
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm hover:text-blue-400 transition">Log In</Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition font-medium"
                                >
                                    Get started free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <div className="container mx-auto px-4 relative">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-blue-900/30 px-4 py-2 rounded-full text-blue-300 text-sm mb-6">
                            <Zap className="w-4 h-4" />
                            <span>Free & open project management tool for agile teams</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Plan, track, and manage your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> agile projects</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Bring the power of agile methodology to your team. Plan sprints, track progress, and ship faster with Gira's intuitive project management platform - completely free, forever.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/signup"
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center space-x-2 w-full sm:w-auto justify-center"
                            >
                                <span>Start using Gira free</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition flex items-center space-x-2 w-full sm:w-auto justify-center">
                                <Play className="w-5 h-5" />
                                <span>Watch demo</span>
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 mt-4">100% free forever • No limits • No credit card required</p>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-16 bg-gray-800/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <p className="text-gray-400 mb-8">Trusted by teams worldwide - all using Gira for free</p>
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                            <div className="bg-gray-700 px-6 py-3 rounded-lg">Microsoft</div>
                            <div className="bg-gray-700 px-6 py-3 rounded-lg">Spotify</div>
                            <div className="bg-gray-700 px-6 py-3 rounded-lg">Airbnb</div>
                            <div className="bg-gray-700 px-6 py-3 rounded-lg">Tesla</div>
                            <div className="bg-gray-700 px-6 py-3 rounded-lg">Netflix</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Features */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Everything your team needs - completely free
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            From planning to shipping, Gira provides all the tools your team needs to deliver exceptional software without any cost.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-6">Scrum and Kanban boards</h3>
                            <p className="text-lg text-gray-300 mb-6">
                                Visualize work, limit work-in-progress, and maximize efficiency with powerful boards that give teams control over how work gets done.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300">Unlimited customizable workflows</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300">Drag-and-drop task management</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300">Real-time collaboration</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-2xl">
                            <div className="bg-gray-800 rounded-lg p-6">
                                <div className="flex space-x-4 mb-4">
                                    <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-sm">To Do</div>
                                    <div className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded text-sm">In Progress</div>
                                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm">Done</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-gray-700 p-3 rounded">User authentication</div>
                                    <div className="bg-gray-700 p-3 rounded">Database migration</div>
                                    <div className="bg-gray-700 p-3 rounded">API endpoints</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 p-8 rounded-2xl">
                                <div className="bg-gray-800 rounded-lg p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-white font-semibold">Sprint Progress</h4>
                                        <span className="text-green-400">67%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                                        <div className="bg-green-500 h-2 rounded-full" style={{width: '67%'}}></div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-white">24</div>
                                            <div className="text-sm text-gray-400">Issues</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-green-400">16</div>
                                            <div className="text-sm text-gray-400">Done</div>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-blue-400">8</div>
                                            <div className="text-sm text-gray-400">In Progress</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h3 className="text-3xl font-bold text-white mb-6">Insights and reporting</h3>
                            <p className="text-lg text-gray-300 mb-6">
                                Track team performance with comprehensive reports and analytics. Make data-driven decisions to improve your development process.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300">Unlimited sprint reports and burndown charts</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300">Team velocity tracking</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300">Custom dashboards</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-20 bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Why teams choose Gira</h2>
                        <p className="text-xl text-gray-400">Powerful features without the price tag</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                            <Users className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-3">Built for teams</h3>
                            <p className="text-gray-400">Designed for cross-functional teams working on complex projects together. No user limits.</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                            <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-3">Fast & reliable</h3>
                            <p className="text-gray-400">99.9% uptime with lightning-fast performance that scales with your team - all for free.</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                            <Shield className="w-8 h-8 text-green-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-3">Enterprise security</h3>
                            <p className="text-gray-400">Bank-level security with advanced user controls - no enterprise fees required.</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                            <BarChart3 className="w-8 h-8 text-purple-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-3">Advanced analytics</h3>
                            <p className="text-gray-400">Deep insights into team performance and project health - completely free.</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                            <Globe className="w-8 h-8 text-indigo-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-3">Global collaboration</h3>
                            <p className="text-gray-400">Work seamlessly across time zones with real-time updates for unlimited users.</p>
                        </div>
                        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                            <Smartphone className="w-8 h-8 text-pink-400 mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-3">Mobile ready</h3>
                            <p className="text-gray-400">Stay productive on the go with our responsive mobile experience - no premium app needed.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Loved by teams worldwide</h2>
                        <p className="text-xl text-gray-400">Amazing results without spending a dime</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 italic">
                                "Gira transformed how our team manages sprints. Can't believe it's completely free - better than tools we used to pay for!"
                            </p>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">SM</div>
                                <div>
                                    <p className="text-white font-semibold">Sarah Martinez</p>
                                    <p className="text-gray-400 text-sm">Engineering Manager, TechCorp</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 italic">
                                "The best free project management tool we've found. No hidden costs, no user limits - just pure value."
                            </p>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">JC</div>
                                <div>
                                    <p className="text-white font-semibold">James Chen</p>
                                    <p className="text-gray-400 text-sm">Product Owner, StartupXYZ</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 italic">
                                "Switched from expensive tools to Gira. Same features, better experience, zero cost. Our budget loves it!"
                            </p>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">AR</div>
                                <div>
                                    <p className="text-white font-semibold">Alex Rodriguez</p>
                                    <p className="text-gray-400 text-sm">Scrum Master, DevTeam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to transform your team's productivity?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of teams already using Gira to plan, track, and ship better software - completely free, forever.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Start using Gira free
                        </Link>
                        <Link
                            to="/contact"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition"
                        >
                            Learn more
                        </Link>
                    </div>
                    <p className="text-blue-200 text-sm mt-4">
                        No credit card required • No user limits • No hidden fees • Free forever
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">G</div>
                                <span className="text-2xl font-bold text-white">Gira</span>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Free & open project management tool for agile teams worldwide. Plan, track, and ship better software without any cost.
                            </p>
                            <div className="flex space-x-4">
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">f</span>
                                </div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">t</span>
                                </div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                                    <span className="text-gray-400 text-sm">in</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li><Link to="/features" className="text-gray-400 hover:text-white transition">Features</Link></li>
                                <li><Link to="/integrations" className="text-gray-400 hover:text-white transition">Integrations</Link></li>
                                <li><Link to="/download" className="text-gray-400 hover:text-white transition">Download</Link></li>
                                <li><Link to="/changelog" className="text-gray-400 hover:text-white transition">What's new</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li><Link to="/about" className="text-gray-400 hover:text-white transition">About us</Link></li>
                                <li><Link to="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
                                <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
                                <li><Link to="/press" className="text-gray-400 hover:text-white transition">Press</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-4">Support</h3>
                            <ul className="space-y-2">
                                <li><Link to="/help" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
                                <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact us</Link></li>
                                <li><Link to="/status" className="text-gray-400 hover:text-white transition">System status</Link></li>
                                <li><Link to="/community" className="text-gray-400 hover:text-white transition">Community</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2025 Gira. All rights reserved. Free forever.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link to="/privacy" className="text-gray-400 hover:text-white transition text-sm">Privacy Policy</Link>
                            <Link to="/terms" className="text-gray-400 hover:text-white transition text-sm">Terms of Service</Link>
                            <Link to="/security" className="text-gray-400 hover:text-white transition text-sm">Security</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;