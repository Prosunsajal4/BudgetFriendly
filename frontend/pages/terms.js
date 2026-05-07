import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - Finance Tracker</title>
        <meta name="description" content="Terms of Service for Personal Finance Tracker" />
      </Head>
      <Navbar />
      <div className="min-h-screen pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-text">Terms of Service</h1>
            </div>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Acceptance of Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing and using the Personal Finance Tracker application, you accept and agree to be bound by the terms and provisions of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Use License
                </h2>
                <p className="leading-relaxed">
                  Permission is granted to use this application for personal, non-commercial purposes. You may not modify, copy, distribute, sell, or lease any part of the application.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  User Accounts
                </h2>
                <p className="leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Data Accuracy
                </h2>
                <p className="leading-relaxed">
                  While we strive to keep your financial data accurate and secure, we do not guarantee that the information will always be error-free. You should verify your financial data independently.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Disclaimer
                </h2>
                <p className="leading-relaxed">
                  This application is provided "as is" without any warranties, expressed or implied. We do not guarantee the application will be uninterrupted or error-free.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access or use of this application.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Termination
                </h2>
                <p className="leading-relaxed">
                  We reserve the right to terminate or suspend your account at any time without prior notice for any reason, including violation of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Governing Law
                </h2>
                <p className="leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of Bangladesh.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  For any questions about these terms, please contact us at prosunsajal123@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Last Updated
                </h2>
                <p className="leading-relaxed">
                  These terms of service were last updated on May 7, 2026.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
