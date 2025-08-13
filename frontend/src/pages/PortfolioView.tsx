import { useNavigate, useParams } from "react-router-dom";
import { usePortfolio } from "@/hooks/portfolio";
import { useEffect } from "react";
import Portfolio from "@/components/templates/Portfolio";

function PortfolioView() {
  const { portfolioData, loading } = usePortfolio();
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (portfolioId === "new") navigate("/");
  }, [portfolioData]);
  if (loading)
    return (
      <div className="inset-0 bg-red-50 fixed grid place-content-center">
        <span className="h-12 aspect-square border-primary border-4 rounded-full border-t-transparent animate-spin"></span>
      </div>
    );
  return (
    <div className="space-y-12 w-full min-h-svh border relative">
      <Portfolio portfolioData={portfolioData} />
    </div>
  );
}

export default PortfolioView;
