'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import { FileText, Clock, MessageSquare, Check, TrendingUp, Shield, ArrowRight, Lock, FileCheck, Globe, BarChart3 } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-navy selection:bg-brand-blue selection:text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-12 lg:gap-16 text-left">

            {/* Content */}
            <div className="max-w-4xl z-10">
              <h1 className="text-5xl md:text-6xl lg:text-[76px] font-bold font-serif leading-[1.1] mb-6 tracking-tight">
                Home buying built <span className="text-brand-blue">for the buyer,</span> <br />
                not the agent.
              </h1>
              <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl leading-relaxed">
                The complete platform for savvy buyers to acquire homes directly from sellers. Save the 3% commission and get the same protection, powered by AI and expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/pricing"
                  className="px-8 py-4 bg-brand-blue text-white text-base font-bold rounded-full hover:bg-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
                >
                  Start Saving Now
                </Link>
              </div>
            </div>

            {/* Mockup */}
            <div className="relative z-0 w-full">
              {/* Abstract background blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10"></div>

              {/* Main UI Card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 relative backdrop-blur-sm bg-white/90">
                {/* Dashboard Header */}
                <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Suggestion Card */}
                  <div className="col-span-12 md:col-span-8 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1">Purchase Offer</h3>
                        <p className="text-gray-400 text-xs">123 Berry St, Nashville TN</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded tracking-wider">Drafting</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Offer Price</p>
                        <p className="font-bold text-sm">$450,000</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-[10px] text-green-600 uppercase font-bold mb-1">Savings</p>
                        <p className="font-bold text-green-600 text-sm">+$13,500</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Closing</p>
                        <p className="font-bold text-sm">Oct 24</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar Cards */}
                  <div className="col-span-12 md:col-span-4 space-y-4">
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">$</div>
                      <div>
                        <p className="text-xs font-bold">Seller Agreed</p>
                        <p className="text-[10px] text-gray-400">Save $12k fees</p>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">%</div>
                      <div>
                        <p className="text-xs font-bold">Rates Dropped</p>
                        <p className="text-[10px] text-gray-400">Lock in 5.2%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-10">Trusted by buyers closing on</p>
          <div className="flex flex-wrap justify-between items-center gap-8 md:gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 max-w-5xl mx-auto">
            <span className="text-2xl font-serif font-black">Zillow</span>
            <span className="text-2xl font-sans font-bold">Redfin</span>
            <span className="text-2xl font-sans font-bold">Realtor.com</span>
            <span className="text-2xl font-serif font-bold tracking-tight">Opendoor</span>
            <span className="text-2xl font-sans font-bold">Rocket Mortgage</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-blue transition-colors">
                <FileText className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Legal Documents</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Every form you need, state-specific and legally approved. Where to submit purchase agreements, we've really hit paperwork.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-blue transition-colors">
                <Clock className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Market Data</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Don't overpay. Get access to the same data buyers' agents use to determine the fair market value of any home.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-brand-blue transition-colors">
                <MessageSquare className="w-6 h-6 text-brand-blue group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-serif">Expert Support</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Our team of licensed experts is available to answer questions about contingencies, inspections, and closing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Winning Offers Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                Turn scattered listings into <span className="text-brand-blue">winning offers</span>.
              </h2>
              <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                Stop juggling PDFs and emails. Our platform unifies the entire offer process into a simple, guided workflow that sellers love.
              </p>
              <ul className="space-y-6 mb-10">
                {[
                  'Generate compliant purchase agreements in minutes',
                  'Automate negotiation responses',
                  'Secure document signatures electronically'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-5 h-5 mt-1 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-brand-blue" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="px-8 py-3 bg-brand-blue text-white font-bold rounded-full hover:bg-cyan-700 transition-colors inline-block shadow-lg">
                Get Started
              </Link>
            </div>

            {/* Right UI Mockup List */}
            <div className="relative">
              <div className="absolute inset-0 bg-gray-50/50 transform rotate-2 rounded-[2.5rem] -z-10 scale-105"></div>

              <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 relative">
                {/* Step 1 */}
                <div className="relative z-10">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:scale-[1.01] cursor-default">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">1</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg font-serif">Identify Home</h4>
                      <p className="text-sm text-gray-400 font-medium">Import from Zillow/Redfin</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300" />
                  </div>
                </div>

                {/* Connector 1 */}
                <div className="h-10 border-l-2 border-dashed border-gray-200 ml-[2.35rem] my-2"></div>

                {/* Step 2 - Active */}
                <div className="relative z-10">
                  <div className="bg-white p-5 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-5 relative overflow-hidden transform scale-[1.02]">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-blue"></div>
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold text-lg ml-1">2</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg font-serif">Generate Offer</h4>
                      <p className="text-sm text-gray-400 font-medium">AI-assisted terms & price</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-brand-blue text-xs font-bold rounded-lg uppercase tracking-wider">Active</span>
                  </div>
                </div>

                {/* Connector 2 */}
                <div className="h-10 border-l-2 border-dashed border-gray-200 ml-[2.35rem] my-2"></div>

                {/* Step 3 */}
                <div className="relative z-10">
                  <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 flex items-center gap-5 opacity-60">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">3</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg font-serif">Close Deal</h4>
                      <p className="text-sm text-gray-400 font-medium">Title & Escrow Coordination</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actionable Data Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-loose">
              Make all your data <span className="italic font-serif text-brand-blue">instantly actionable</span>.
            </h2>
            <p className="text-lg text-gray-500">
              Control your deal terms with precision. Our calculators and negotiation tools put you in the driver's seat.
            </p>
            <Link href="#" className="text-brand-blue font-bold mt-4 inline-flex items-center gap-2">
              Explore the platform <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tool 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">New Tool</div>
                <Shield className="w-6 h-6 text-gray-300" />
              </div>
              <h3 className="text-2xl font-bold serif mb-2">Inspection Response Tool</h3>
              <p className="text-gray-400 text-sm mb-8">Negotiate repairs directly without the back-and-forth.</p>
              {/* Micro UI */}
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Roof Repair Credit</span>
                  <span className="font-bold text-red-500">-$2,500</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">HVAC Service</span>
                  <span className="font-bold text-brand-navy">Seller Pays</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span>Total Value</span>
                  <span className="text-green-600">$3,200</span>
                </div>
              </div>
            </div>

            {/* Tool 2 */}
            <Link href="/savings" className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 block hover:shadow-md transition-all cursor-pointer group">
              <div className="flex justify-end items-center mb-8">
                <TrendingUp className="w-6 h-6 text-gray-300 group-hover:text-brand-blue transition-colors" />
              </div>
              <h3 className="text-2xl font-bold serif mb-2">Closing Cost Calculator</h3>
              <p className="text-gray-400 text-sm mb-8">Know your exact cash to close to the penny.</p>
              {/* Micro UI Graph */}
              <div className="flex items-end gap-2 h-32 pt-4 mb-6">
                <div className="flex-1 bg-brand-blue/20 rounded-t-lg h-[40%] relative">
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded transition-opacity">Fees</div>
                </div>
                <div className="flex-1 bg-brand-blue/40 rounded-t-lg h-[60%]"></div>
                <div className="flex-1 bg-brand-blue/60 rounded-t-lg h-[30%]"></div>
                <div className="flex-1 bg-brand-blue/80 rounded-t-lg h-[80%]"></div>
                <div className="flex-1 bg-brand-blue rounded-t-lg h-[50%]"></div>
              </div>

              <div className="w-full py-3 bg-brand-blue text-white font-bold rounded-xl text-center shadow-lg group-hover:bg-cyan-700 transition-colors">
                Calculate Savings
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold font-serif mb-12">Buyers who took control.</h2>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Person 1 */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800"
                alt="Testimonial 1"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">"I was skeptical at first, but the step-by-step guidance made it incredibly easy. The seller was happy to save too."</p>
                <div>
                  <p className="text-brand-blue font-bold text-3xl mb-1">Saved $14,500</p>
                  <p className="text-white font-bold text-sm">James S.</p>
                  <p className="text-gray-400 text-xs">Closed in Denver, CO</p>
                </div>
              </div>
            </div>

            {/* Person 2 */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="Testimonial 2"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">"BuyUnrepped gave me the confidence to negotiate directly. The tools are professional grade and easy to use."</p>
                <div>
                  <p className="text-brand-blue font-bold text-3xl mb-1">Saved $22,100</p>
                  <p className="text-white font-bold text-sm">Sarah M.</p>
                  <p className="text-gray-400 text-xs">Closed in Austin, TX</p>
                </div>
              </div>
            </div>

            {/* Person 3 */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800"
                alt="Testimonial 3"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <p className="text-white/90 text-sm leading-relaxed mb-6 font-medium">"The process was smoother than my last purchase with an agent. Why pay fees when you can do this?"</p>
                <div>
                  <p className="text-brand-blue font-bold text-3xl mb-1">Saved $9,800</p>
                  <p className="text-white font-bold text-sm">Marcus R.</p>
                  <p className="text-gray-400 text-xs">Closed in Nashville, TN</p>
                </div>
              </div>
            </div>

          </div>
          <div className="text-center mt-12">
            <Link href="#" className="font-bold text-brand-blue hover:text-brand-navy inline-flex items-center gap-2 group transition-colors">
              Read more stories from our buyers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blue Banner Enterprise Section */}
      <section className="bg-brand-blue text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">Enterprise Grade</p>
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
                Tools for <br /> buyers who want to <br /> build wealth, not pay fees.
              </h2>
              <p className="text-blue-100 text-lg mb-10 max-w-md">
                We've taken the tools used by top real estate firms and made them accessible to you. Fully secure, compliant, and easy to use.
              </p>
              <Link href="/pricing" className="px-8 py-3 bg-white text-brand-blue font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg inline-block">
                Get Started
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <FileCheck className="w-8 h-8 text-blue-200 mb-4" />
                <h4 className="font-bold text-lg mb-1">Smart Contracts</h4>
                <p className="text-blue-200 text-xs leading-relaxed">Attorney-approved templates for all 50 states.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <Lock className="w-8 h-8 text-blue-200 mb-4" />
                <h4 className="font-bold text-lg mb-1">Secure Data</h4>
                <p className="text-blue-200 text-xs leading-relaxed">Bank-grade encryption for all your financial data.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <BarChart3 className="w-8 h-8 text-blue-200 mb-4" />
                <h4 className="font-bold text-lg mb-1">Cost Analysis</h4>
                <p className="text-blue-200 text-xs leading-relaxed">Real-time closing cost & potential savings estimates.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <Globe className="w-8 h-8 text-blue-200 mb-4" />
                <h4 className="font-bold text-lg mb-1">National Data</h4>
                <p className="text-blue-200 text-xs leading-relaxed">Access to MLS data across the entire country.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
