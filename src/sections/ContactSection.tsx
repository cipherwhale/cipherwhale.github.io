import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(15),
});

type FormValues = z.infer<typeof schema>;

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="panel">
      <h2 className="section-title">Contact Transmission</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 grid gap-3">
        <input {...register("name")} placeholder="Name" className="field" />
        <input {...register("email")} placeholder="Email" className="field" />
        <textarea {...register("message")} placeholder="Message" className="field min-h-28" />
        {(errors.name || errors.email || errors.message) ? <p className="text-xs text-red-300">Please complete all fields correctly.</p> : null}
        <button disabled={isSubmitting} className="btn">{isSubmitting ? "Sending..." : "Send Transmission"}</button>
      </form>
      {status === "ok" ? <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-space-cyan">Transmission sent.</motion.p> : null}
      {status === "error" ? <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-red-300">Transmission failed. Try again.</motion.p> : null}
    </section>
  );
}
