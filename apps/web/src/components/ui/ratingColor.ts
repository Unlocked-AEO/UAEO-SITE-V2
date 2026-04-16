import type { Rating } from "@/data/mock-risk-insights";

export const RATING_HEX: Record<Rating, string> = {
  green: "#27AE60",
  amber: "#FF9F43",
  red: "#E74C3C",
};

export function ratingColor(rating: Rating): string {
  return RATING_HEX[rating];
}
