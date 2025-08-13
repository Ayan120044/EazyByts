import { Router } from "express";
import { PortfolioModel } from "../DB/portfolio.model.js";
import { authenticate } from "../middleware/auth.js";
import mongoose from "mongoose";
import { UserModel } from "../DB/user.model.js";

const portfolioRoutes = Router();

portfolioRoutes.post("/save/:portfolioId", authenticate, async (req, res) => {
  try {
    const data = req.body;
    const userId = (req as any).userId;
    const { portfolioId } = req.params;

    if (portfolioId === "new") {
      console.log("Creating new");

      // Create new portfolio
      const newPortfolio = await PortfolioModel.create({
        ...data,
        owner: userId,
      });

      await UserModel.findByIdAndUpdate(userId, {
        $push: { portfolios: newPortfolio._id },
      });

      return res.status(201).json({
        message: "Portfolio created successfully",
        portfolio: newPortfolio,
      });
    } else {
      console.log("Editing existing portfolio");

      // Validate portfolioId
      if (!mongoose.Types.ObjectId.isValid(portfolioId!)) {
        return res.status(400).json({ message: "Invalid portfolio ID" });
      }

      // Verify ownership before updating
      const existingPortfolio = await PortfolioModel.findOne({
        _id: portfolioId,
        owner: userId,
      });

      if (!existingPortfolio) {
        return res
          .status(404)
          .json({ message: "Portfolio not found or unauthorized" });
      }

      // Update existing portfolio
      const updatedPortfolio = await PortfolioModel.findByIdAndUpdate(
        portfolioId,
        data,
        { new: true }
      );

      return res.status(200).json({
        message: "Portfolio updated successfully",
        portfolio: updatedPortfolio,
      });
    }
  } catch (error: any) {
    console.error("Error saving/updating portfolio:", error);
    res.status(500).json({
      message: "Server error while saving/updating portfolio",
      error: error.message,
    });
  }
});
portfolioRoutes.get("/:portfolioId", async (req, res) => {
  const { portfolioId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(portfolioId!)) {
    return res.status(400).json({ error: "Invalid portfolio ID" });
  }

  try {
    const portfolio = await PortfolioModel.findById(portfolioId);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }
    return res.status(200).json({ portfolio });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default portfolioRoutes;
