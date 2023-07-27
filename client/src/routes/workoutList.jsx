import React, { useState } from 'react';
import axios from 'axios';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const muscleGroups = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps',
  ];

  const difficulties = ['beginner', 'intermediate', 'expert'];

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWorkouts();
  };

  const fetchWorkouts = () => {
    setLoading(true);
    axios
      .get('https://api.api-ninjas.com/v1/exercises', {
        headers: {
          'X-Api-Key': '8iEGI6IQMoO9RRPmguQztMrEwgUNxV9qETUa7a5t', 
        },
        params: {
          muscle: selectedMuscle,
          difficulty: selectedDifficulty,
        },
      })
      .then((response) => {
        setWorkouts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching workout data:', error);
        setLoading(false);
      });
  };

  const handleAddToMyWorkout = (workout) => {
    // Store the selected workout in state or send it to the backend
    console.log('Adding to My Workout:', workout.name);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Workout List</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center mb-4">
          <label htmlFor="muscleSelect" className="block font-semibold text-lg mr-4">
            Select Muscle Group:
          </label>
          <select
            id="muscleSelect"
            className="block w-48 mt-1 p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            value={selectedMuscle}
            onChange={(e) => setSelectedMuscle(e.target.value)}
          >
            <option value="">Select Muscle Group</option>
            {muscleGroups.map((muscle) => (
              <option key={muscle} value={muscle}>
                {muscle}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="difficultySelect" className="block font-semibold text-lg mr-4">
            Select Difficulty:
          </label>
          <select
            id="difficultySelect"
            className="block w-48 mt-1 p-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="">Select Difficulty</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{workout.name}</h2>
              <p><span className="font-semibold">Type:</span> {workout.type}</p>
              <p><span className="font-semibold">Muscle:</span> {workout.muscle}</p>
              <p><span className="font-semibold">Equipment:</span> {workout.equipment}</p>
              <p><span className="font-semibold">Difficulty:</span> {workout.difficulty}</p>
              <div>
                <span className="font-semibold">Instructions:</span>
                <div className="max-h-16 overflow-y-auto">
                  {workout.instructions}
                </div>
              </div>
              <button
                onClick={() => handleAddToMyWorkout(workout)}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
              >
                Add to My Workout
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
