import { useState } from "react";
import { FiClock, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import HomeLayout from "@/Layouts/HomeLayout";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Backend contact functionality can be connected later.
        console.log("Contact form:", form);

        setSubmitted(true);

        setForm({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        });
    };

    return (
        <HomeLayout>
            {/* Hero */}
            <section className="bg-indigo-700 text-white">
                <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
                            Contact Us
                        </p>

                        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                            We'd Love to Hear From You
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-indigo-100">
                            Have a question, suggestion, or need help with
                            your order? Send us a message and our team will be
                            happy to help.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Contact Information */}
                        <div className="space-y-5">
                            <ContactInfo
                                icon={<FiMail size={22} />}
                                title="Email"
                                value="support@example.com"
                                href="mailto:support@example.com"
                            />

                            <ContactInfo
                                icon={<FiPhone size={22} />}
                                title="Phone"
                                value="+880 1XXX-XXXXXX"
                                href="tel:+8801XXXXXXXXX"
                            />

                            <ContactInfo
                                icon={<FiMapPin size={22} />}
                                title="Address"
                                value="Dhaka, Bangladesh"
                            />

                            <ContactInfo
                                icon={<FiClock size={22} />}
                                title="Business Hours"
                                value="Saturday - Thursday, 9:00 AM - 6:00 PM"
                            />

                            <div className="rounded-xl bg-indigo-700 p-6 text-white">
                                <h3 className="text-lg font-bold">
                                    Need Quick Help?
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-indigo-100">
                                    For urgent questions, please contact us
                                    directly by phone during business hours.
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                                <div className="mb-7">
                                    <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                        Send a Message
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                        Get in Touch
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Fill out the form below and we'll get
                                        back to you as soon as possible.
                                    </p>
                                </div>

                                {submitted && (
                                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                                        Thank you for contacting us. Your
                                        message has been received.
                                    </div>
                                )}

                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <Input
                                            label="Your Name"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            required
                                        />

                                        <Input
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2">
                                        <Input
                                            label="Phone Number"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                        />

                                        <Input
                                            label="Subject"
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            placeholder="Enter subject"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="mb-2 block text-sm font-semibold text-gray-700"
                                        >
                                            Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows="7"
                                            placeholder="Write your message..."
                                            required
                                            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        <FiSend />
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}

function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-2 block text-sm font-semibold text-gray-700"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
        </div>
    );
}

function ContactInfo({ icon, title, value, href }) {
    const content = (
        <>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                {icon}
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                    {value}
                </p>
            </div>
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className="flex gap-4 rounded-xl bg-white p-5 shadow-sm transition hover:shadow-md"
            >
                {content}
            </a>
        );
    }

    return (
        <div className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
            {content}
        </div>
    );
}