// types/ticket.ts
export type Category = "billing" | "technical" | "account" | "general";
export type Priority = "low" | "medium" | "high" | "critical";
export type Status = "open" | "in_progress" | "resolved" | "closed";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: Status;
  created_at: string;
}
