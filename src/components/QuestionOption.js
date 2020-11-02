import React from 'react';

const QuestionOption = ({
  answerWasSubmitted,
  correct,
  onOptionChange,
  option,
  selectedOption,
}) => {
  let divClassName =
    'border-2 border-teal-800 rounded-xl my-3 px-2 py-1 text-left';

  if (answerWasSubmitted) {
    if (option === correct) {
      divClassName += ' bg-green-500';
    } else if (option === selectedOption && option !== correct) {
      divClassName += ' bg-red-500';
    }
  }

  const customRadioClassName =
    option === selectedOption
      ? 'bg-blue-500 w-4 h-4 rounded-full'
      : 'border-2 border-teal-800 w-4 h-4 rounded-full';

  return (
    <div className={divClassName}>
      <label className="cursor-pointer flex items-center" htmlFor={option}>
        {option}
        <span className="flex-grow"></span>
        <span className={customRadioClassName}></span>
      </label>
      <input
        checked={option === selectedOption}
        className="hidden"
        disabled={answerWasSubmitted}
        id={option}
        name="options"
        onChange={onOptionChange}
        type="radio"
        value={option}
      />
    </div>
  );
};

export default QuestionOption;
