
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-crm-blue mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Страница не найдена</p>
        <p className="mb-8 text-gray-500">
          Запрашиваемая вами страница не существует или была перемещена.
        </p>
        <Link to="/">
          <Button>
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
