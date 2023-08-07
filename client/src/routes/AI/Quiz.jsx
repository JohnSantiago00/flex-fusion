/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const Quiz = () => {
  const [generatedWorkout, setGeneratedWorkout] = useState('');

  const workoutOptions = [
    {
      field: 'workoutType',
      question: 'What type of workout do you prefer?',
      options: ['Cardio', 'Strength', 'Yoga', 'HIIT'],
    },
    {
      field: 'intensity',
      question: 'How intense do you want your workout to be?',
      options: ['Light', 'Moderate', 'Intense'],
    },
    {
      field: 'duration',
      question: 'How long do you want your workout to be?',
      options: ['10 mins', '30 mins', '1 hour', '2 hours'],
    },
    {
      field: 'equipment',
      question: 'Do you have any exercise equipment?',
      options: ['Yes', 'No'],
    },
    {
      field: 'fitnessGoal',
      question: 'What are your fitness goals?',
      options: ['Build Muscle', 'Lose Weight', 'Improve Flexibility', 'Increase Endurance'],
    },
    {
      field: 'fitnessLevel',
      question: 'What is your fitness level?',
      options: ['Beginner', 'Intermediate', 'Advanced'],
    },
    {
      field: 'days',
      question: 'How many days a week do you plan to workout?',
      options: ['3 days', '4 days', '5 days', '6 days', '7 days'],
    },
  ];

  const [answers, setAnswers] = useState({
    workoutType: null,
    intensity: null,
    duration: null,
    equipment: null,
    fitnessGoal: null,
    fitnessLevel: null,
    days: null,
  });

  useEffect(() => {
    const isAllAnswered = Object.values(answers).every((answer) => answer !== null);
    const button = document.getElementById('generate-btn');
    if (button) {
      button.disabled = !isAllAnswered;
    }
  }, [answers]);

  const handleAnswerSelection = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [workoutOptions[questionIndex].field]: workoutOptions[questionIndex].options[optionIndex],
    });
  };

  const generateWorkoutPlan = async () => {
    const prompt = `As a fitness enthusiast, I want a workout plan that fits my preferences.
    I prefer ${answers.workoutType} workouts with ${answers.intensity} intensity.
    I want the workout to be ${answers.duration} long and ${answers.equipment} equipment.
    My fitness goal is to ${answers.fitnessGoal}.
    My fitness level is ${answers.fitnessLevel}.
    I plan to work out ${answers.days} a week.
    Generate a workout plan for me.`;

    const apiKey = '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'; // Replace with your API key
    const openAi = new OpenAIApi(
      new Configuration({
        apiKey,
      })
    );

    try {
      const response = await openAi.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are a fitness enthusiast seeking a workout plan.' }, { role: 'user', content: prompt }],
      });

      const generatedPlan = response.data.choices[0]?.message?.content;
      setGeneratedWorkout(generatedPlan);
    } catch (error) {
      console.error('Error generating workout plan:', error);
    }
  };

  return (
    <div className="min-h-screen py-8 ">
      <div className="mx-auto max-w-2xl rounded-lg bg-white px-4 py-4 shadow-md">
        <h1 className="pb-4 text-center text-4xl font-bold">Workout Quiz</h1>
        {workoutOptions.map((option, questionIndex) => (
          <div key={questionIndex} className="mb-10">
            <h3 className="mb-3 text-xl font-semibold">{option.question}</h3>
            <ul className="flex justify-center">
              {option.options.map((choice, optionIndex) => (
                <li key={optionIndex} className="mx-2">
                  <button
                    onClick={() =>
                      handleAnswerSelection(questionIndex, optionIndex)
                    }
                    className={`w-full rounded-lg px-4 py-2 ${
                      answers[option.field] === choice
                        ? 'bg-orange-400 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-300'
                    } transition-colors duration-300 ease-in-out`}
                  >
                    {choice}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button
          id="generate-btn"
          onClick={generateWorkoutPlan}
          className={`mx-auto block rounded-lg px-6 py-3 ${
            Object.values(answers).every((answer) => answer !== null)
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-gray-400 text-gray-600 cursor-not-allowed'
          } font-semibold transition-colors duration-300 ease-in-out`}
        >
          Generate Workout Plan
        </button>
        {generatedWorkout && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Generated Workout Plan</h3>
            <p className="bg-gray-100 p-4 rounded-lg">{generatedWorkout}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;