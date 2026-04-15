// components/TicketForm.tsx
import React, {useState} from "react";
import {createTicket, classifyTicket} from "../services/api";

const TicketForm = ({onSuccess} : any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [priority, setPriority] = useState("low");
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    if (!description) 
      return;
    
    setLoading(true);
    try {
      const res = await classifyTicket(description);
      setCategory(res.data.suggested_category);
      setPriority(res.data.suggested_priority);
    } catch  {
      console.log("LLM failed 😢");
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      await createTicket({
        title, description, category: category.toUpperCase(), // ✅ FIX
        priority: priority.toUpperCase() // ✅ FIX
      });

      setTitle("");
      setDescription("");

      onSuccess && onSuccess();
    } catch (err) {
      console.error("Submit failed ❌", err);
    }
  };
  return (<div className="bg-white p-4 rounded shadow w-full">
    <h2 className="text-lg font-semibold mb-4">Submit a Ticket</h2>
    <input className="w-full border p-2 mb-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>
    <textarea className="w-full border p-2 mb-3" placeholder="Description" value={description} onBlur={handleClassify} onChange={e => setDescription(e.target.value)}/>{" "}
    {loading && <p className="text-sm">Classifying... 🤖</p>}
    <select className="w-full border p-2 mb-2" value={category} onChange={e => setCategory(e.target.value)}>
      <option value="billing">Billing</option>
      <option value="technical">Technical</option>
      <option value="account">Account</option>
      <option value="general">General</option>
    </select>
    <select className="w-full border p-2 mb-3" value={priority} onChange={e => setPriority(e.target.value)}>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
      <option value="critical">Critical</option>
    </select>
    <button className="bg-blue-600 text-white w-full py-2 rounded" onClick={handleSubmit}>
      Submit Ticket
    </button>
  </div>);
};

export default TicketForm;
