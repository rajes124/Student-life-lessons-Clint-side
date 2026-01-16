// src/pages/Privacy.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Lock, Shield, Database, Eye, UserCheck } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Lock className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: January 16, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12 bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
            <Shield className="w-6 h-6" /> Our Commitment to Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Student Life Lessons, we are committed to protecting your personal information and your right to privacy.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </section>

        {/* Key Sections */}
        <div className="space-y-10">
          <section className="bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
              <Database className="w-6 h-6" /> 1. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Personal information: name, email, profile picture (via Firebase/Google login)</li>
              <li>Usage data: lessons viewed, time spent, device information</li>
              <li>Payment information (handled securely by third-party providers)</li>
            </ul>
          </section>

          <section className="bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6" /> 2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>To provide and improve our services</li>
              <li>To personalize your experience</li>
              <li>To communicate updates, newsletters (if subscribed)</li>
              <li>To prevent fraud and enforce our terms</li>
            </ul>
          </section>

          <section className="bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
              <UserCheck className="w-6 h-6" /> 3. Data Sharing & Security
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Service providers (Firebase, payment gateways)</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We use industry-standard security measures to protect your data.
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
              4. Your Rights
            </h2>
            <p className="text-gray-700">
              You have the right to access, correct, or delete your personal information. Contact us at support@studentlifelessons.com for any requests.
            </p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Privacy;