import FrontSection from "@/components/frontSection/FrontSection";
import IconBadge from "@/components/IconBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { House, Clock, PhoneOutgoing, Mail } from "lucide-react";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import youtube from "../assets/youtube.svg";
import twitter from "../assets/twitter.svg";
import PulseAndSpices from "@/components/PulseAndSpices";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      newErrors.email = "Invalid email format";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      toast.loading("Sending your message...");

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/contact`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.dismiss();
      toast.success(data?.message || "✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.dismiss();
      toast.error(
        error?.response?.data?.message ||
          "❌ Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-10">
      <FrontSection
        imgUrl="/contact-us-header.png"
        title="Contact Us"
        path="Home"
        subPath="Contact us"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-16">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-4">
            <IconBadge title="Connect With Om Kudrat" />
            <h3 className="font-belfast text-4xl">
              Get In <span className="text-text-green">Touch</span> With Us
            </h3>
            <hr className="bg-grayish-blue w-28 h-[2px]" />
            <p className="text-Black-Olive">
              Your email address will not be published. Required fields <br />{" "}
              are marked*
            </p>
          </div>
          <div className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name*"
              value={formData.name}
              onChange={handleChange}
              className={`b-grayish-blue rounded-full font-medium text-sm text-Black-Olive placeholder:text-Black-Olive ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}

            <Input
              name="email"
              placeholder="Your Email*"
              value={formData.email}
              onChange={handleChange}
              className={`b-grayish-blue rounded-full font-medium text-sm text-Black-Olive placeholder:text-Black-Olive ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}

            <Textarea
              name="message"
              placeholder="Your Message*"
              value={formData.message}
              onChange={handleChange}
              className={`b-grayish-blue resize-none h-48 rounded-3xl font-medium text-sm text-Black-Olive placeholder:text-Black-Olive ${
                errors.message ? "border-red-500" : ""
              }`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs">{errors.message}</p>
            )}

            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="font-medium w-fit rounded-full text-sm"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.88243923789!2d72.84005977503634!3d21.196828580494863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ef22a0178b1%3A0x2f02ec2c91fcd100!2sVision%20Infotech!5e0!3m2!1sen!2sin!4v1761454576286!5m2!1sen!2sin"
          loading="lazy"
          className="w-full h-full rounded-3xl"
        ></iframe>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-14">
        <div className="space-y-7">
          <h4 className="font-belfast text-Chinese-Black text-2xl">
            Contact Us
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14">
            <div className="flex gap-5 py-4 border-b border-b-Light-Silver">
              <div className="flex items-center justify-center w-10 h-10 shrink-0">
                <House className="w-8 h-8 text-text-green" />
              </div>
              <div>
                <p className="font-medium">Address</p>
                <span className="text-sm text-Black-Olive break-all whitespace-normal">
                  7563 St. Vicent Place, Glasgow
                </span>
              </div>
            </div>
            <div className="flex gap-5 py-4 border-b border-b-Light-Silver">
              <div className="flex items-center justify-center w-10 h-10 shrink-0">
                <Clock className="w-8 h-8 text-text-green" />
              </div>
              <div>
                <p className="font-medium">Hours</p>
                <span className="text-sm text-Black-Olive break-all whitespace-normal">
                  7 Days a week from 10:00 am <br /> to 6:00 pmt
                </span>
              </div>
            </div>
            <div className="flex gap-5 py-4 border-b border-b-Light-Silver">
              <div className="flex items-center justify-center w-10 h-10 shrink-0">
                <PhoneOutgoing className="w-8 h-8 text-text-green" />
              </div>{" "}
              <div>
                <p className="font-medium">Phone</p>
                <span className="text-sm text-Black-Olive break-all whitespace-normal">
                  +09123 456 789
                </span>
              </div>
            </div>
            <div className="flex gap-5 py-4 border-b border-b-Light-Silver">
              <div className="flex items-center justify-center w-10 h-10 shrink-0">
                <Mail className="w-8 h-8 text-text-green" />
              </div>{" "}
              <div>
                <p className="font-medium">E-mail</p>
                <span className="text-sm text-Black-Olive break-all whitespace-normal">
                  zemes@demolink.org
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-off-white space-y-7 p-7 rounded-3xl">
          <h4 className="font-belfast text-Chinese-Black text-2xl">
            Follow Us
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-14">
            <div className="flex gap-5 py-4 border-b border-b-Light-Silver">
              <img src={facebook} className="w-4" alt="" />
              <div>
                <p className="font-medium">Follow Us On Facebook</p>
              </div>
            </div>
            <div className="flex gap-5 py-4 border-b border-b-Light-Silver">
              <img src={instagram} className="w-5" alt="" />

              <div>
                <p className="font-medium">Follow Us On Instagram</p>
              </div>
            </div>
            <div className="flex gap-5 py-4 border-b border-b-Light-Silver">
              <img src={twitter} className="w-5" alt="" />
              <div>
                <p className="font-medium">Join Us On Twitter</p>
              </div>
            </div>
            <div className="flex gap-5 py-4 border-b border-b-Light-Silver">
              <img src={youtube} className="w-5" alt="" />
              <div>
                <p className="font-medium">Subscribe Us On Youtube</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PulseAndSpices />
    </div>
  );
};

export default ContactUs;
