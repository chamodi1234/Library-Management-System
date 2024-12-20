
import axios from "axios";
import { useEffect, useState } from "react";

const Notifications = () => {
  const userEmail = localStorage.getItem("userEmail"); 
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchNotifications = async () => {
    try {
      if (!userEmail) {
        setError("No email found in localStorage.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/notificationRoutes1/${encodeURIComponent(userEmail)}`
      );

      setNotifications(response.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to fetch notifications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

 
  if (loading) {
    return <p>Loading notifications...</p>;
  }

 
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Notifications</h3>
      </div>
      <div className="card-body">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id} className="alert alert-info mb-3">
              <p className="mb-1">{notification.message}</p>
              <small className="text-muted">
                {notification.createdAt
                  ? ` ${new Date(notification.createdAt).toLocaleString()}`
                  : "Date not available"}
              </small>
            </div>
          ))
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications