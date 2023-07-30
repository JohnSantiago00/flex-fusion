import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const WorkoutPlan = () => {
  const { userId } = useParams(); // Get the user ID from the URL params
  const [workouts, setWorkouts] = useState([]);
  console.log(userId);

  useEffect(() => {
    // Fetch workouts data from the server for the specified user
    fetch(`/users/${userId}/workouts`)
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => console.log(error));
  }, [userId]);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Workout Plan</h1>
      <div className="grid grid-cols-3 gap-4">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="p-4 text-white bg-gray-800 rounded-lg shadow-lg text-center"
          >
            <Link to={`/user/${userId}/workout/day/${day}/exercises`}>
              <h2>{day}</h2>
            </Link>
            {workouts.map((workout) => (
              <div key={workout.id}>
                <p>{workout.name}</p>
                {/* Display other workout details here */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
