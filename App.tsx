import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { OpenDesignIcon, OpenFinanceIcon, CommunityVotingIcon, OpenManufacturingIcon, ChevronRightIcon, CheckCircleIcon, GitHubIcon, BookOpenIcon, CoreIcon, FaceIcon, ConstructionIcon, RulerIcon, HandleIcon, WeightIcon, FeedbackIcon, ParticipateIcon } from './components/icons';

const principles = [
  {
    icon: <OpenDesignIcon />,
    title: 'Open Design',
    description: 'All specs—materials, weight, balance—are decided collaboratively. CAD files, test results, and material options are public.',
  },
  {
    icon: <OpenFinanceIcon />,
    title: 'Open Finance',
    description: 'Every cost, from materials to logistics, is documented and shared. We target a fair 10% margin, not 500%.',
  },
  {
    icon: <CommunityVotingIcon />,
    title: 'Community Voting',
    description: 'Key features like handle shape, surface texture, and graphics are chosen by community vote. Your paddle, your choice.',
  },
  {
    icon: <OpenManufacturingIcon />,
    title: 'Open Manufacturing',
    description: 'We document the entire prototype and production process with full transparency, including factory selection.',
  },
];

const processSteps = [
    { title: 'Community Onboarding', description: 'Launch website and Discord to gather our founding members.' },
    { title: 'Open Spec Discussion', description: 'Host forums on core material, face, grip, and more.' },
    { title: 'Voting & Finalization', description: 'Community votes on final specs. We create CAD files and mockups.' },
    { title: 'Open Supplier Sourcing', description: 'Post RFQs, share quotes, and select manufacturing partners openly.' },
    { title: 'Pre-orders Launch', description: 'Accept pre-orders with a live cost breakdown. Target: 1000 units.' },
    { title: 'Transparent Manufacturing', description: 'Produce the paddle, sharing factory photos, videos, and QA reports.' },
    { title: 'Delivery & Feedback', description: 'Deliver paddles and open a feedback forum for future improvements.' },
    { title: 'Ambassador Program', description: 'Launch an affiliate system for players, coaches, and clubs.' },
];

const App: React.FC = () => {
    const [preorders, setPreorders] = useState(347);
    const preorderGoal = 1000;
    const preorderProgress = (preorders / preorderGoal) * 100;

    useEffect(() => {
        const interval = setInterval(() => {
            setPreorders(prev => {
                if (prev >= preorderGoal) {
                    clearInterval(interval);
                    return preorderGoal;
                }
                const increment = Math.floor(Math.random() * 5) + 1;
                return Math.min(prev + increment, preorderGoal);
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [preorderGoal]);


  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
      <Header />
      <main>
        {/* Hero Section */}
        <section id="home" className="relative text-center py-20 md:py-32 px-4 bg-white">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/1600/900?grayscale&blur=2')] bg-cover bg-center opacity-5"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-slate-900 mb-4">
              The People's Pickleball Paddle
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              A high-performance paddle, designed by the community, for the community. Radically transparent, obsessionally engineered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#community" className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-colors duration-300">
                Join the Movement
              </a>
              <a href="#process" className="inline-flex items-center justify-center px-8 py-3 bg-white text-teal-500 font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors duration-300">
                Learn How <ChevronRightIcon />
              </a>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section id="mission" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Our Core Principles</h2>
              <p className="mt-4 text-lg text-slate-600">This isn't just another paddle. It's a new way of making things.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle) => (
                <div key={principle.title} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200/50">
                  <div className="text-teal-500 mb-4">{principle.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{principle.title}</h3>
                  <p className="text-slate-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Specifications Section */}
        <section id="specs" className="bg-slate-900 py-20 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="relative text-center mb-12 rounded-lg overflow-hidden bg-black/30 p-8">
                    <img
                        src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=2070&auto=format&fit=crop"
                        alt="Blueprint of a pickleball paddle"
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                        loading="lazy"
                    />
                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Open Spec Paddle — Draft 0.0</h2>
                        <p className="mt-4 text-lg text-slate-300">This is the living document for our first community-built paddle. Review, debate, and help us build it.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-slate-300">
                    {/* Core Material */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-4"><CoreIcon /><h3 className="text-xl font-bold text-white">Core Material & Structure</h3></div>
                        <ul className="space-y-2 list-disc list-inside text-slate-400">
                            <li><span className="font-semibold text-slate-300">Material:</span> Polypropylene honeycomb</li>
                            <li><span className="font-semibold text-slate-300">Structure:</span> Honeycomb with perimeter foam wall</li>
                            <li><span className="font-semibold text-slate-300">Thickness Options:</span> 14mm (pop) & 16mm (control)</li>
                        </ul>
                    </div>
                    {/* Face Sheet */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-4"><FaceIcon /><h3 className="text-xl font-bold text-white">Face Sheet & Layup</h3></div>
                         <ul className="space-y-2 list-disc list-inside text-slate-400">
                            <li><span className="font-semibold text-slate-300">Primary:</span> 3K Raw Carbon Fiber (T700)</li>
                            <li><span className="font-semibold text-slate-300">Hybrid Option:</span> Carbon + Kevlar blend</li>
                            <li><span className="font-semibold text-slate-300">Weave:</span> Twill weave, 3-ply (CCC)</li>
                        </ul>
                    </div>
                    {/* Construction */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                         <div className="flex items-center gap-3 mb-4"><ConstructionIcon /><h3 className="text-xl font-bold text-white">Construction Method</h3></div>
                         <ul className="space-y-2 list-disc list-inside text-slate-400">
                            <li><span className="font-semibold text-slate-300">Method:</span> Thermoformed sandwich panel</li>
                            <li><span className="font-semibold text-slate-300">Edge:</span> Integrated perimeter foam (Gen2)</li>
                             <li><span className="font-semibold text-slate-300">Optional:</span> Widened foam edge (Gen3)</li>
                        </ul>
                    </div>
                    {/* Regulatory */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                         <div className="flex items-center gap-3 mb-4"><RulerIcon /><h3 className="text-xl font-bold text-white">Regulatory Specs</h3></div>
                         <ul className="space-y-2 list-disc list-inside text-slate-400">
                            <li><span className="font-semibold text-slate-300">Combined L+W:</span> ≤ 24 in (61 cm)</li>
                            <li><span className="font-semibold text-slate-300">Surface Roughness:</span> Rz ≤ 30 µm</li>
                            <li><span className="font-semibold text-slate-300">Weight Target:</span> 7.5 – 8.3 oz</li>
                        </ul>
                    </div>
                    {/* Handle */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-4"><HandleIcon /><h3 className="text-xl font-bold text-white">Handle & Grip</h3></div>
                         <ul className="space-y-2 list-disc list-inside text-slate-400">
                            <li><span className="font-semibold text-slate-300">Length:</span> ~5 – 5.5 in</li>
                            <li><span className="font-semibold text-slate-300">Circumference:</span> ~4.25 in (standard)</li>
                             <li><span className="font-semibold text-slate-300">Options:</span> Community feedback on sizes</li>
                        </ul>
                    </div>
                    {/* Weight */}
                    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center gap-3 mb-4"><WeightIcon /><h3 className="text-xl font-bold text-white">Weight</h3></div>
                         <ul className="space-y-2 list-disc list-inside text-slate-400">
                            <li><span className="font-semibold text-slate-300">Target Range:</span> 7.5 – 8.3 oz</li>
                            <li><span className="font-semibold text-slate-300">Light:</span> &lt;7.8 oz</li>
                            <li><span className="font-semibold text-slate-300">Mid:</span> 7.8–8.3 oz</li>
                            <li><span className="font-semibold text-slate-300">Heavy:</span> &gt;8.3 oz</li>
                        </ul>
                    </div>
                </div>

                {/* Community Feedback Section */}
                <div className="mt-16 bg-slate-800 rounded-lg p-8 border border-teal-500/30">
                     <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-2"><FeedbackIcon /><h3 className="text-2xl font-bold text-white">Community Feedback Points</h3></div>
                        <p className="text-slate-400">Your input shapes the final product. Here's what we need to decide on:</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-300">
                       <div>
                           <h4 className="font-semibold text-white mb-2">Face Material?</h4>
                           <ul className="space-y-1 text-slate-400"><li>(A) All-Carbon</li><li>(B) Carbon-Kevlar</li><li>(C) Carbon-Fiberglass</li></ul>
                       </div>
                       <div>
                           <h4 className="font-semibold text-white mb-2">Core Thickness?</h4>
                           <ul className="space-y-1 text-slate-400"><li>(1) 14mm (Speed)</li><li>(2) 16mm (Balanced)</li></ul>
                       </div>
                       <div>
                           <h4 className="font-semibold text-white mb-2">Edge Foam?</h4>
                           <ul className="space-y-1 text-slate-400"><li>On / Off</li></ul>
                       </div>
                       <div>
                           <h4 className="font-semibold text-white mb-2">Weight Preference?</h4>
                           <ul className="space-y-1 text-slate-400"><li>Lighter / Mid / Heavier</li></ul>
                       </div>
                       <div>
                           <h4 className="font-semibold text-white mb-2">Grip Size?</h4>
                           <ul className="space-y-1 text-slate-400"><li>Standard / Small / Large</li></ul>
                       </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-700">
                         <div className="text-center">
                            <div className="flex items-center justify-center gap-3 mb-2"><ParticipateIcon /><h3 className="text-2xl font-bold text-white">How to Participate</h3></div>
                            <p className="text-slate-400 max-w-2xl mx-auto">Use GitHub to vote, comment, and contribute directly to the design. This is your paddle—help us build it right.</p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="https://github.com/open-paddle-project/hub/discussions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-colors duration-300">
                                    Vote in Discussions
                                </a>
                                <a href="https://github.com/open-paddle-project/hub/tree/main/docs/specs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors duration-300">
                                    Submit a PR to Specs
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Why it Matters Section */}
        <section id="why" className="bg-white py-20 px-4">
            <div className="max-w-5xl mx-auto text-center">
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Why This Matters</h2>
                 <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Most sports gear is sold with a 300-500% markup. We think that's insane. We're not building a cheaper paddle, we're building a fairer and better one.</p>
            </div>
            <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Typical Paddle */}
                <div className="border border-slate-200 rounded-lg p-6">
                    <h3 className="text-2xl font-bold text-center mb-4 text-slate-800">Typical Retail Paddle</h3>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <div className="w-28 text-sm font-semibold text-slate-600">Production Cost</div>
                            <div className="flex-1 bg-slate-200 rounded-full h-8 flex items-center">
                                <div className="bg-red-400 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{width: '20%'}}>$25</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-28 text-sm font-semibold text-slate-600">Brand Markup</div>
                            <div className="flex-1 bg-slate-200 rounded-full h-8 flex items-center">
                                <div className="bg-red-500 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{width: '50%'}}>$75</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-28 text-sm font-semibold text-slate-600">Retailer Markup</div>
                             <div className="flex-1 bg-slate-200 rounded-full h-8 flex items-center">
                                <div className="bg-red-600 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{width: '30%'}}>$50</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-3xl font-extrabold mt-6 text-red-600">$150+</p>
                </div>
                {/* OpenPaddle */}
                 <div className="border-2 border-teal-500 rounded-lg p-6 shadow-lg">
                    <h3 className="text-2xl font-bold text-center mb-4 text-teal-600">OpenPaddle</h3>
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <div className="w-28 text-sm font-semibold text-slate-600">Production Cost</div>
                            <div className="flex-1 bg-slate-200 rounded-full h-8 flex items-center">
                                <div className="bg-teal-400 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{width: '75%'}}>$60</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-28 text-sm font-semibold text-slate-600">Logistics</div>
                            <div className="flex-1 bg-slate-200 rounded-full h-8 flex items-center">
                                <div className="bg-teal-500 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{width: '15%'}}>$12</div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="w-28 text-sm font-semibold text-slate-600">Community Margin</div>
                            <div className="flex-1 bg-slate-200 rounded-full h-8 flex items-center">
                                <div className="bg-teal-600 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{width: '10%'}}>$8</div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-3xl font-extrabold mt-6 text-teal-600">$80</p>
                </div>
            </div>
             <p className="text-center mt-8 text-slate-600 text-sm">*Illustrative pricing. Final cost determined by the community and transparently shared.</p>
        </section>

        {/* Power of Scale Section */}
        <section id="scale" className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">The Power of Scale</h2>
                    <p className="mt-4 text-lg text-slate-600">As our community grows, everyone saves. More volume means better prices on materials and manufacturing.</p>
                </div>
                <div className="w-full max-w-3xl mx-auto mt-12 bg-white p-4 sm:p-8 rounded-xl shadow-sm border border-slate-200/80">
                    <div className="relative h-48 sm:h-64">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                            {/* The curve */}
                            <path d="M 20,130 C 150,130 250,50 480,40" stroke="#14b8a6" strokeWidth="4" fill="none" strokeLinecap="round" />
                            
                            {/* Data Point 1: 1k units, ~$80 */}
                            <g>
                                <circle cx="50" cy="122" r="5" fill="#14b8a6" stroke="white" strokeWidth="2" />
                                <text x="50" y="105" textAnchor="middle" className="text-sm font-bold fill-slate-900">$80</text>
                                <text x="50" y="142" textAnchor="middle" className="text-xs fill-slate-500">1k units</text>
                            </g>
                            
                            {/* Data Point 2: 5k units, ~$70 */}
                            <g>
                                <circle cx="265" cy="59" r="5" fill="#14b8a6" stroke="white" strokeWidth="2" />
                                <text x="265" y="42" textAnchor="middle" className="text-sm font-bold fill-slate-900">$70</text>
                                <text x="265" y="80" textAnchor="middle" className="text-xs fill-slate-500">5k units</text>
                            </g>

                            {/* Data Point 3: 10k+ units, ~$65 */}
                            <g>
                                <circle cx="460" cy="42" r="5" fill="#14b8a6" stroke="white" strokeWidth="2" />
                                <text x="460" y="25" textAnchor="middle" className="text-sm font-bold fill-slate-900">$65</text>
                                <text x="460" y="62" textAnchor="middle" className="text-xs fill-slate-500">10k+ units</text>
                            </g>
                        </svg>
                    </div>
                    <div className="flex justify-between mt-4 border-t border-slate-200 pt-4 text-xs sm:text-sm text-slate-500 font-medium">
                        <p>← Lower Cost per Paddle</p>
                        <p>Higher Production Volume →</p>
                    </div>
                </div>
            </div>
        </section>


        {/* How It Works Section */}
        <section id="process" className="bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Our Open Process</h2>
              <p className="mt-4 text-lg text-slate-600">From idea to your hands, every step is transparent and community-driven.</p>
            </div>
            <div className="relative">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 hidden md:block" aria-hidden="true"></div>
                {processSteps.map((step, index) => (
                    <div key={step.title} className="relative mb-8 md:mb-12 flex items-center md:justify-normal">
                        <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                            {index % 2 !== 0 && (
                                <>
                                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                                    <p className="text-slate-600 mt-1">{step.description}</p>
                                </>
                            )}
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 hidden md:block">
                            <div className="w-8 h-8 bg-white border-2 border-teal-500 rounded-full flex items-center justify-center">
                                <span className="font-bold text-teal-500">{index + 1}</span>
                            </div>
                        </div>
                        <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                             <div className="bg-slate-100 p-6 rounded-lg shadow-sm border border-slate-200/50">
                                <div className="flex items-center md:hidden mb-2">
                                     <div className="w-8 h-8 bg-white border-2 border-teal-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                                        <span className="font-bold text-teal-500">{index + 1}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                                </div>
                                <div className="md:hidden">
                                     <p className="text-slate-600 mt-1">{step.description}</p>
                                </div>
                                {index % 2 === 0 && (
                                     <div className="hidden md:block">
                                        <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                                        <p className="text-slate-600 mt-1">{step.description}</p>
                                     </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </section>

        {/* Community CTA Section */}
        <section id="community" className="bg-slate-100 py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Our Open Stack & Community Hub</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
                    Our entire project—from paddle specs to financial breakdowns—lives in a public GitHub monorepo. It’s transparency you can verify, built with tools you trust.
                </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-12">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200/50">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Open Docs & Specs</h3>
                        <p className="text-slate-600">All specs, bill-of-materials, and costs are maintained as versioned Markdown files in our Docusaurus site.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200/50">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Community Voting</h3>
                        <p className="text-slate-600">We use GitHub Discussions and Issues to propose, debate, and vote on every key decision.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200/50">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Transparent Contributions</h3>
                        <p className="text-slate-600">The community contributes directly via Pull Requests, creating a public log of the paddle's evolution.</p>
                    </div>
                </div>

                <div className="my-12 max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-2 text-sm font-semibold">
                        <span className="text-teal-600">Pre-orders for First Batch</span>
                        <span className="text-slate-500">{preorders} / {preorderGoal}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4">
                        <div className="bg-teal-500 h-4 rounded-full transition-all duration-1000 ease-out" style={{ width: `${preorderProgress}%` }}></div>
                    </div>
                    {preorders >= preorderGoal && (
                        <div className="mt-4 flex items-center justify-center text-green-600 font-semibold">
                        <CheckCircleIcon />
                            <span className="ml-2">Goal Reached! Production is next.</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://github.com/open-paddle-project/hub" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-slate-800 text-white font-semibold rounded-lg shadow-md hover:bg-slate-900 transition-colors duration-300">
                        <GitHubIcon /> <span className="ml-2">Explore on GitHub</span>
                    </a>
                    <a href="https://open-paddle-project.github.io/docs" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-3 bg-white text-teal-500 font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors duration-300">
                        <BookOpenIcon /> <span className="ml-2">Read the Docs</span>
                    </a>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default App;