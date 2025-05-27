import finance from "@/assets/images/undraw_finance_m6vw.png";
import projections from "@/assets/images/undraw_projections_fhch.png"; // Use as projections/graph image
import planning from "@/assets/images/undraw_savings_uwjn.png"; // Use as budgeting/schedule image

export const images = {
  finance,
  projections,
  planning,
};

export const onboarding = [
  {
    id: 1,
    title: "Track Your Daily Expenses",
    description:
      "Easily record your daily spending and keep track of where your money goes with just a few taps.",
    image: images.projections,
  },
  {
    id: 2,
    title: "Plan and Stay Within Budget",
    description:
      "Set monthly budgets and receive alerts when you're nearing your limit. Stay in control of your finances.",
    image: images.planning,
  },
  {
    id: 3,
    title: "Pay and Manage Anywhere",
    description:
      "Access your finance tracker on the go. Add, edit, or delete expenses securely from your phone.",
    image: images.finance,
  },
];

export const data = {
  onboarding,
};
