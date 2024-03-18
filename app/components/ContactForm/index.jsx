"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import Spinner from "../Spinner";

const schema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  name: z.string().nonempty("Name is required"),
  phone: z.string().nonempty("Phone Number is required"),
  subject: z.string().nonempty("Subject is required"),
  message: z.string().nonempty("Message is required"),
});

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    // Sending email using EmailJS
    console.log(data);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        console.log("Email sent!", response);
        toast.success("Email sent successfully!");
        reset();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Error sending email:", error);
        reset();
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      <Spinner />;
    }
  }, [isLoading]);

  return (
    <>
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0">
              <div
                className="bg-light d-flex flex-column justify-content-center px-5"
                style={{ height: 450 }}
              >
                <div className="d-flex align-items-center mb-5">
                  <div className="btn-icon bg-primary mr-4">
                    <i className="fa fa-2x fa-map-marker-alt text-white" />
                  </div>
                  <div className="mt-n1">
                    <h4>Our Location</h4>
                    <p className="m-0">123 Street, New York, USA</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-5">
                  <div className="btn-icon bg-secondary mr-4">
                    <i className="fa fa-2x fa-phone-alt text-white" />
                  </div>
                  <div className="mt-n1">
                    <h4>Call Us</h4>
                    <p className="m-0">+012 345 6789</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="btn-icon bg-warning mr-4">
                    <i className="fa fa-2x fa-envelope text-white" />
                  </div>
                  <div className="mt-n1">
                    <h4>Email Us</h4>
                    <p className="m-0">info@example.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="section-title position-relative mb-4">
                <h6 className="d-inline-block position-relative text-secondary text-uppercase pb-2">
                  Need Help?
                </h6>
                <h1 className="display-4">Send Us A Message</h1>
              </div>
              <div className="contact-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-6 form-group">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        name="name"
                        className="form-control border-top-0 border-right-0 border-left-0 p-0"
                        placeholder="Your Name"
                        required="required"
                      />
                      {errors?.name && <span>{errors?.name?.message}</span>}
                    </div>

                    <div className="col-6 form-group">
                      <input
                        {...register("email", { required: true })}
                        type="email"
                        name="email"
                        className="form-control border-top-0 border-right-0 border-left-0 p-0"
                        placeholder="Your Email"
                        required="required"
                      />
                      {errors?.email && <span>{errors?.email?.message}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <input
                      {...register("phone", { required: true })}
                      type="number"
                      name="phone"
                      className="form-control border-top-0 border-right-0 border-left-0 p-0"
                      placeholder="Phone Number"
                      required="required"
                    />
                    {errors?.phone && <span>{errors?.phone?.message}</span>}
                  </div>
                  <div className="form-group">
                    <input
                      {...register("subject", { required: true })}
                      type="text"
                      name="subject"
                      className="form-control border-top-0 border-right-0 border-left-0 p-0"
                      placeholder="Subject"
                      required="required"
                    />
                    {errors?.subject && <span>{errors?.subject?.message}</span>}
                  </div>
                  <div className="form-group">
                    <textarea
                      {...register("message", { required: true })}
                      name="message"
                      className="form-control border-top-0 border-right-0 border-left-0 p-0"
                      rows={5}
                      placeholder="Message"
                      required="required"
                      defaultValue={""}
                    />
                    {errors?.message && <span>{errors?.message?.message}</span>}
                  </div>
                  <div>
                    <button className="btn btn-primary py-3 px-5" type="submit">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
