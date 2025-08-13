// src/lib/api.ts
import type { PortfolioData } from "@/hooks/portfolio";
import axios from "axios";
import api from ".";

interface SavePortfolioParams extends PortfolioData {
  selectedTemplate: string;
  portfolioId: string;
}

export const savePortfolio = async (data: SavePortfolioParams) => {
  try {
    const { portfolioId, ...payload } = data;

    const response = await api.post(
      `/portfolio/save/${portfolioId}`,
      {
        ...payload,
        selectedTemplate: "",
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to save portfolio"
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};

export async function getPortfolio(portfolioId: string) {
  try {
    const res = await api.get(`/portfolio/${portfolioId}`);
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to fetch portfolio.";
    throw new Error(message);
  }
}
