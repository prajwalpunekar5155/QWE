import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const EventDetailsPage = () => {
  const { date } = useParams();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/getallappointment",
          { withCredentials: true }
        );

        const eventsOnDate = response.data.filter((event) =>
          moment(event.time).isSame(date, "day")
        );

        setEvents(
          eventsOnDate.map((event) => ({
            id: event.id,
            title: event.name,
            time: moment(event.time).format("hh:mm A"),
            hour: moment(event.time).hour(),
            minute: moment(event.time).minute(),
          }))
        );
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [date]);

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
        color: "#333",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "24px",
            color: "#4caf50",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Appointments on {moment(date).format("MMMM Do, YYYY")}
        </h2>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#388e3c")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          Go Back
        </button>
      </div>

      {/* Events Timeline Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 1fr",
          gridGap: "10px",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Time Column */}
        <div
          style={{
            backgroundColor: "#f9f9f9",
            borderRight: "1px solid #ddd",
            padding: "10px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {Array.from({ length: 24 }).map((_, hour) => (
            <div
              key={hour}
              style={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "1px solid #eee",
                fontWeight: "500",
                color: "#555",
                fontSize: "14px",
                transition: "background-color 0.3s ease",
              }}
            >
              <strong>{moment({ hour }).format("hh A")}</strong>
            </div>
          ))}
        </div>

        {/* Event Column */}
        <div style={{ position: "relative", backgroundColor: "#fff" }}>
          {Array.from({ length: 24 }).map((_, hour) => (
            <div
              key={hour}
              style={{
                height: "60px",
                borderBottom: "1px solid #eee",
                position: "relative",
              }}
            >
              {events
                .filter((event) => event.hour === hour)
                .map((event) => (
                  <div
                    key={event.id}
                    style={{
                      position: "absolute",
                      top: `${(event.minute / 60) * 100}%`,
                      left: "5%",
                      right: "5%",
                      backgroundColor: "#4caf50",
                      color: "#fff",
                      borderRadius: "4px",
                      padding: "8px 15px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      cursor: "pointer",
                      transition:
                        "background-color 0.3s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#388e3c")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#4caf50")
                    }
                    onClick={() =>
                      navigate(`/events/${moment(date).format("YYYY-MM-DD")}`)
                    }
                  >
                    <strong>{event.title}</strong> - {event.time}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* No Events Message */}
      {events.length === 0 && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "16px",
            color: "#888",
            fontStyle: "italic",
          }}
        >
          No events for this day.
        </p>
      )}
    </div>
  );
};

export default EventDetailsPage;
