// src/pages/Privacy.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Lock, Shield, Database, Eye, UserCheck, 
  ChevronRight, Mail, ArrowLeft, Globe, Scale
} from "lucide-react";

// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

const Privacy = () => {
  // AOS Initialize
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const sections = [
    { id: "collect", icon: <Database size={20} />, title: "Information Collection" },
    { id: "usage", icon: <Eye size={20} />, title: "Usage of Data" },
    { id: "security", icon: <Shield size={20} />, title: "Data Security" },
    { id: "rights", icon: <UserCheck size={20} />, title: "Your Privacy Rights" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION - Minimal & Bold */}
      <header className="relative pt-24 pb-16 px-6 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest mb-8 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Safety
          </Link>
          <div data-aos="zoom-in">
             <div className="w-20 h-20 bg-indigo-600/20 backdrop-blur-xl border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Lock size={40} className="text-indigo-400" />
             </div>
             <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none">
               Privacy <span className="text-indigo-500">Shield.</span>
             </h1>
             <p className="text-slate-400 max-w-xl mx-auto font-medium text-lg leading-relaxed">
               Your trust is our most valuable asset. We build everything with a privacy-first mindset.
             </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 2. SIDEBAR - Navigation (Sticky on Desktop) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-12 space-y-4">
              <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Quick Jump</h3>
                <nav className="space-y-2">
                  {sections.map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 font-bold text-sm transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 group-hover:text-indigo-600">{item.icon}</span>
                        {item.title}
                      </div>
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </nav>
              </div>

              <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                 <Globe className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-125 transition-transform duration-700" size={120} />
                 <p className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-4">Need Help?</p>
                 <h4 className="text-xl font-black mb-6">Have questions about your data?</h4>
                 <a href="mailto:support@studentlifelessons.com" className="flex items-center gap-2 text-xs font-black uppercase bg-white text-indigo-600 px-6 py-4 rounded-xl hover:bg-slate-900 hover:text-white transition-all text-center justify-center">
                    <Mail size={16} /> Contact Support
                 </a>
              </div>
            </div>
          </aside>

          {/* 3. CONTENT AREA */}
          <div className="lg:col-span-8 space-y-10">
            {/* Introduction Card */}
            <section data-aos="fade-up" className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Our Commitment</h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Effective: Jan 16, 2026</p>
                    </div>
                </div>
                <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed">
                    <p>
                        At <span className="text-indigo-600 font-bold">Student Life Lessons</span>, we are committed to protecting your personal information and your right to privacy.
                        This document outlines how we collect, use, and safeguard your digital footprint within our ecosystem.
                    </p>
                </div>
            </section>

            {/* Section 1: Collection */}
            <section id="collect" data-aos="fade-up" className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[5rem]"></div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-3 mb-8">
                    <span className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">01</span>
                    Information We Collect
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Identity", desc: "Name, Email & Google Profile via Firebase", icon: <UserCheck size={18}/> },
                        { title: "Usage", desc: "Viewed lessons, time & device metrics", icon: <Eye size={18}/> },
                        { title: "Finance", desc: "Encrypted transactions via secure providers", icon: <Database size={18}/> },
                        { title: "Social", desc: "Likes, saves & community interactions", icon: <Scale size={18}/> },
                    ].map((card, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-colors">
                            <div className="text-indigo-600 mb-4">{card.icon}</div>
                            <h4 className="font-black text-slate-900 mb-1">{card.title}</h4>
                            <p className="text-sm text-slate-500 font-medium">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 2: Usage */}
            <section id="usage" data-aos="fade-up" className="bg-indigo-900 p-10 md:p-14 rounded-[3.5rem] text-white shadow-2xl relative">
                <div className="absolute top-10 right-10 opacity-10"><Eye size={120}/></div>
                <h3 className="text-xl font-black flex items-center gap-3 mb-8">
                    <span className="w-8 h-8 bg-indigo-500 text-white rounded-lg flex items-center justify-center text-xs">02</span>
                    How We Use Data
                </h3>
                <ul className="space-y-6">
                    {[
                        "To refine our educational algorithms and content delivery.",
                        "To personalize your dashboard based on interests.",
                        "To send critical system updates and community newsletters.",
                        "To detect and prevent fraudulent activities on the platform."
                    ].map((text, i) => (
                        <li key={i} className="flex gap-4 items-start group">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 group-hover:scale-150 transition-transform"></div>
                            <p className="text-indigo-100 font-medium leading-tight">{text}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Section 3: Your Rights */}
            <section id="rights" data-aos="fade-up" className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-sm border-l-[12px] border-l-indigo-600">
                <h3 className="text-2xl font-black text-slate-900 mb-6">Digital Autonomy & Rights</h3>
                <p className="text-slate-600 font-medium mb-10 leading-relaxed">
                    You own your data. We provide the tools for you to manage it effectively. Under our policy, you have the following rights:
                </p>
                <div className="flex flex-wrap gap-3">
                    {["Access Data", "Correct Errors", "Permanent Deletion", "Opt-out Tracking"].map((tag, i) => (
                        <span key={i} className="px-6 py-3 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest">
                            {tag}
                        </span>
                    ))}
                </div>
            </section>

            {/* Final Footer Call to Action */}
            <div className="text-center pt-10" data-aos="zoom-in">
                <Link
                    to="/"
                    className="group relative inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:pr-16 active:scale-95"
                >
                    <span className="relative z-10">Accept & Return Home</span>
                    <ArrowLeft size={18} className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all -rotate-180" />
                </Link>
            </div>
        </div>
      </div>
    </main>
    </div>
  );
};

export default Privacy;