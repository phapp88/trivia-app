import React from 'react';

const Timer = ({ timeLeft, timeAllowed }) => {
  let gradientClassName = `w-${timeLeft}/${timeAllowed} h-6 bg-gradient-to-r from-red-500 via-pink-500 to-purple-400 rounded-xl`;

  if (timeLeft !== 0) {
    gradientClassName += ' min-w-gradient';
  }

  return (
    <div className="relative border-2 border-gray-500 w-5/6 mx-auto rounded-xl my-3">
      <div className={gradientClassName}>
        <p className="absolute left-1/2 text-sm font-semibold">{timeLeft}</p>
      </div>
    </div>
  );
};

export default Timer;
