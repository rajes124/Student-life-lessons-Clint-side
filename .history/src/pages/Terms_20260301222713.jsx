// src/pages/Terms.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, FileText, Clock, Users, Lock, 
  ArrowRight, Scale, AlertCircle, CheckCircle2,
  ChevronRight, RefreshCw
} from "lucide-react";

// AOS Import
import AOS from 'aos';
import 'aos/dist/aos.css';

const Terms = () => {
  // AOS Initialize
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const termRules = [
    {
      id: "01",
      title: "Use of Service",
      icon: <Clock className="text-amber-500" />,
      content: [
        "Minimum age requirement: 13 years old.",
        "Prohibition of content copying or distribution.",
        "Strict ban on account sharing or selling.",
        "Right to terminate accounts for violations."
      ],
      animation: "fade-right"
    },
    {
      id: "02",
      title: "User Responsibilities",
      icon: <Users className="text-indigo-500" />,
      content: [
        "No infringement on intellectual property.",
        "Strictly no harmful or illegal materials.",
        "Full compliance with local & global laws.",
        "Responsible for all content you upload."
      ],
      animation: "fade-left"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFF] text-slate-900 font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      
      {/* 1. DYNAMIC HERO SECTION */}
      <header className="relative py-24 px-6 bg-[#0B0F1A] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center" data-aos="zoom-out">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <ShieldCheck size={14} /> Legal Framework
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6">
              Agreement & <span className="text-indigo-500">Terms.</span>
            </h1>
            <div className="flex items-center gap-3 text-slate-400 font-bold text-sm bg-white/5 px-6 py-3 rounded-2xl backdrop-blur-md border border-white/5">
              <RefreshCw size={16} className="animate-spin-slow" />
              Last Revised: Jan 16, 2026
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-32">
        {/* 2. INTRODUCTION BENTO CARD */}
        <section data-aos="fade-up" className="bg-white p-8 md:p-14 rounded-[3.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12">
             <FileText size={200} />
          </div>
          <div className="max-w-3xl relative z-10">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <Scale className="text-indigo-600" /> Executive Summary
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              Welcome to <span className="text-indigo-600 font-black">Student Life Lessons</span>. These terms represent a binding legal agreement. By entering our platform, you acknowledge that you have read, understood, and consented to these regulations.
            </p>
          </div>
        </section>

        {/* 3. DYNAMIC RULES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {termRules.map((rule) => (
            <section 
              key={rule.id} 
              data-aos={rule.animation}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                {rule.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="text-xs font-black text-indigo-600">{rule.id}.</span> {rule.title}
              </h3>
              <ul className="space-y-4">
                {rule.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-500 font-medium">
                    <CheckCircle2 size={18} className="text-indigo-500 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* 4. PRIVACY REDIRECT CARD */}
        <section data-aos="fade-up" className="bg-indigo-600 rounded-[3.5rem] p-10 md:p-16 text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Lock size={24} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Your Data, Protected.</h2>
              <p className="text-indigo-100 font-medium leading-relaxed mb-8">
                Integrity is at our core. Our Privacy Policy details exactly how we handle your digital footprints with extreme care.
              </p>
              <Link 
                to="/privacy" 
                className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
              >
                Read Privacy Policy <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full animate-pulse"></div>
                <ShieldCheck size={200} className="relative text-white opacity-20" />
              </div>
            </div>
          </div>
        </section>

        {/* 5. AMENDMENTS SECTION */}
        <section data-aos="fade-up" className="mt-12 bg-slate-50 border border-slate-200 p-10 rounded-[3rem] flex flex-col md:flex-row items-center gap-8">
           <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
              <AlertCircle size={30} className="text-slate-400" />
           </div>
           <div>
              <h4 className="text-xl font-black text-slate-900 mb-2">4. Policy Amendments</h4>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                We reserve the right to evolve these terms. We recommend checking this page periodically. Continued use of Student Life Lessons implies full acceptance of the updated legal framework.
              </p>
           </div>
        </section>

        {/* 6. NAVIGATION FOOTER */}
        <div className="mt-20 text-center" data-aos="zoom-in">
          <Link
            to="/"
            className="group relative inline-flex items-center gap-4 bg-slate-900 text-white px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all active:scale-95"
          >
            <span className="relative z-10">Return to Home</span>
            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Terms;