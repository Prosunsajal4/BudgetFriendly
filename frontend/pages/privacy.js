import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Finance Tracker</title>
        <meta name="description" content="Privacy Policy for Personal Finance Tracker" />
      </Head>
      <Navbar />
      <div className="min-h-screen pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-text">Privacy Policy</h1>
            </div>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Information We Collect
                </h2>
                <p className="leading-relaxed">
                  We collect information you provide directly, including your name, email address, and password for account creation. We also collect financial data you input such as transactions, budgets, and categories.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  How We Use Your Information
                </h2>
                <p className="leading-relaxed">
                  Your information is used to provide and improve our services, track your financial data, generate analytics, and personalize your experience. We do not sell your personal data to third parties.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement industry-standard security measures to protect your data. Your password is securely hashed using bcrypt. All data is transmitted over HTTPS.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Your Rights
                </h2>
                <p className="leading-relaxed">
                  You have the right to access, update, or delete your personal data at any time. You can delete your account and all associated data by contacting us or using the logout functionality.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Contact Us
                </h2>
                <p className="leading-relaxed">
                  If you have questions about this privacy policy, please contact us at prosunsajal123@gmail.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Last Updated
                </h2>
                <p className="leading-relaxed">
                  This privacy policy was last updated on May 7, 2026.
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
