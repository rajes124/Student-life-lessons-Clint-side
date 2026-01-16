// src/pages/Terms.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, FileText, Clock, Users, Lock } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ShieldCheck className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            Terms & Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: January 16, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12 bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
            <FileText className="w-6 h-6" /> Introduction
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to Student Life Lessons. These Terms and Conditions govern your use of our website, services, and platform. By accessing or using our services, you agree to be bound by these terms.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        {/* Key Sections */}
        <div className="space-y-10">
          <section className="bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6" /> 1. Use of Service
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>You must be at least 13 years old to use this platform.</li>
              <li>You agree not to misuse, copy, or distribute content without permission.</li>
              <li>Account sharing or selling is strictly prohibited.</li>
              <li>We reserve the right to terminate accounts for violation of these terms.</li>
            </ul>
          </section>

          <section className="bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
              <Users className="w-6 h-6" /> 2. User Content & Responsibilities
            </h2>
            <p className="text-gray-700 mb-4">
              You are responsible for all content you upload, post, or share. Content must not:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>Infringe on intellectual property rights</li>
              <li>Contain harmful, abusive, or illegal material</li>
              <li>Violate any applicable laws</li>
            </ul>
          </section>

          <section className="bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6" /> 3. Privacy & Data
            </h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Please refer to our{" "}
              <Link to="/privacy" className="text-indigo-600 hover:underline font-medium">
                Privacy Policy
              </Link>{" "}
              for details on how we collect, use, and protect your information.
            </p>
          </section>

          <section className="bg-white shadow-lg rounded-2xl p-8 border border-indigo-100">
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">
              4. Changes to Terms
            </h2>
            <p className="text-gray-700">
              We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.
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

export default Terms;