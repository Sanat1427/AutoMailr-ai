import React from 'react';
import { Wand2, LayoutTemplate, ShieldCheck, Code2, Send, Zap } from 'lucide-react';

function Features() {
    const features = [
        {
            icon: Wand2,
            title: "AI Writing Assistant",
            description: "Never stare at a blank screen again. Let AI draft catchy subject lines, engaging body copy, and persuasive CTAs in seconds."
        },
        {
            icon: LayoutTemplate,
            title: "Smart Drag & Drop",
            description: "Build pro-level emails without a designer. Our intuitive drag-and-drop editor ensures pixel-perfect alignment automatically."
        },
        {
            icon: ShieldCheck,
            title: "AI Audit & Optimization",
            description: "Run a 360° health check before you send. Detect spam triggers, optimize tone, and ensure your emails land in the primary inbox."
        },
        {
            icon: Code2,
            title: "Instant HTML Export",
            description: "Need the code? Export clean, responsive HTML compatible with Mailchimp, HubSpot, and all major email clients instantly."
        },
        {
            icon: Zap,
            title: "Pre-Built Templates",
            description: "Start fast with our library of high-converting templates for newsletters, promotions, and welcome sequences."
        },
        {
            icon: Send,
            title: "Seamless Sending",
            description: "Connect your provider and send directly from AutoMailr. Track performance and iterate on your campaigns in one place."
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50/50 via-white to-white pointer-events-none" />

            <div className="px-6 md:px-20 lg:px-32 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-6">
                        Everything you need to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Send Better Emails</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Stop wrestling with clunky editors. AutoMailr gives you the superpowers to create, optimize, and send stunning emails in record time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="h-14 w-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300">
                                <feature.icon className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
