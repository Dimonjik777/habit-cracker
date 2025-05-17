import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { formatDate } from "../../helpers/date/formatDate";

export default function AuthRedirect() {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user !== null) {
      // Redirect user
      if (user.role === "unregistered") {
        navigate("/welcome");
      } else if (
        user.role === "registered" &&
        (window.location.pathname === "/welcome" ||
          window.location.pathname === "/")
      ) {
        navigate(`/dashboard/all?date=${formatDate(new Date())}`);
      }
    }
  }, [user, navigate]);

  return <div>Redirect</div>;
}
