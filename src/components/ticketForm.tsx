import React, { useState } from "react";
import { createTicket, classifyTicket } from "../services/api";
import toast from "react-hot-toast";

const TicketForm = ({ onSuccess }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("low");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false); // ✅ prevent double submit

  // ✅ LLM classify
  const handleClassify = async () => {
    if (!description.trim()) return;

    setLoading(true);
    try {
      const res = await classifyTicket(description);

      if (res?.suggested_category) {
        setCategory(res.suggested_category);
      }

      if (res?.suggested_priority) {
        setPriority(res.suggested_priority);
      }
    } catch {
      toast.error("Classification failed 😢");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Submit ticket
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ prevent page reload

    if (!title.trim() || !description.trim()) {
      toast.error("Title & Description required ❗");
      return;
    }

    try {
      setSubmitting(true);

      await createTicket({
        title,
        description,
        category: (category || "general").toUpperCase(),
        priority: (priority || "low").toUpperCase(),
      });

      toast.success("Ticket created successfully 🎉");

      // reset form
      setTitle("");
      setDescription("");
      setCategory("general");
      setPriority("low");

      onSuccess?.();
    } catch (err) {
      console.error("Submit failed ❌", err);
      toast.error("Failed to create ticket 😢");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-4"
      >
        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          🎫 Create Ticket
        </h2>

        {/* Title */}
        <div>
          <label className="text-sm text-gray-600">Title</label>
          <input
            className="w-full border mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter ticket title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-gray-600">Description</label>
          <textarea
            className="w-full border mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe your issue..."
            value={description}
            onBlur={handleClassify}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-sm text-blue-500 animate-pulse">
            🤖 Classifying...
          </p>
        )}

        {/* Category */}
        <div>
          <label className="text-sm text-gray-600">Category</label>
          <select
            className="w-full border mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="account">Account</option>
            <option value="general">General</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="text-sm text-gray-600">Priority</label>
          <select
            className="w-full border mt-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-2 rounded-lg font-medium text-white shadow transition ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Submitting..." : "🚀 Submit Ticket"}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;