import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HelpCircle } from "lucide-react";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ - Finance Tracker</title>
        <meta name="description" content="Frequently Asked Questions for Personal Finance Tracker" />
      </Head>
      <Navbar />
      <div className="min-h-screen pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-text">Frequently Asked Questions</h1>
            </div>

            <div className="space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How do I create an account?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Simply visit the homepage and fill in your name, email, and password to create your account. You'll be automatically logged in after registration.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is my financial data secure?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Yes, your data is secured with industry-standard encryption. Your password is hashed using bcrypt, and all data transmission occurs over HTTPS.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I access my data on multiple devices?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Currently, your data is stored locally in your browser. To access it on another device, you would need to use the same browser and be logged into the same account.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How do I delete my account?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Click the logout button in the dashboard header to clear your session. To permanently delete your account and data, please contact us at prosunsajal123@gmail.com
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Is this application free to use?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Yes, the Personal Finance Tracker is completely free to use for personal purposes.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Can I export my data?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Currently, data export is not available. This feature may be added in future updates.
                </p>
              </div>

              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  How is my budget calculated?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Your budget is calculated based on your monthly spending. You can set a monthly budget limit, and the app tracks how much you've spent and shows you the remaining amount.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Who can I contact for support?
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For any questions or support, please email us at prosunsajal123@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
