import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Zap,
  BarChart3,
  Globe,
  Layers,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              CRM Features That Drive Results
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              XalesIn CRM provides all the tools your team needs to manage
              customer relationships effectively and close more deals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Multi-tenant Architecture",
                description:
                  "Securely manage multiple organizations with isolated data and customized experiences",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Secure Authentication",
                description:
                  "Powered by Supabase for enterprise-grade security and user management",
              },
              {
                icon: <BarChart3 className="w-6 h-6" />,
                title: "Sales Analytics",
                description:
                  "Comprehensive dashboards to track performance and identify opportunities",
              },
              {
                icon: <Layers className="w-6 h-6" />,
                title: "Contact Management",
                description:
                  "Organize and segment your contacts for targeted engagement",
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Team Collaboration",
                description:
                  "Work together seamlessly across departments and locations",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Automation Tools",
                description:
                  "Streamline workflows and eliminate repetitive tasks",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">85%</div>
              <div className="text-blue-100">Increase in Sales Efficiency</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-blue-100">Organizations Trust Us</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime Reliability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transform Your Customer Relationships Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that use XalesIn CRM to streamline
            their sales process and grow their revenue.
          </p>
          <a
            href="/sign-up"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Your Free Trial
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
