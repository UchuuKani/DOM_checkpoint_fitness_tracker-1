const exercises = [
  { id: 1, name: 'Bicycling', completed: false, duration: 30, day: "tuesday"},
  { id: 2, name: 'Running', completed: true, duration: 45, day: "tuesday"},
  { id: 3, name: 'Swimming', completed: true, duration: 30, day: "saturday"},
  { id: 4, name: 'Running', completed: true, duration: 20, day: "saturday"},
  { id: 5, name: "Bicycling", completed: false, duration: 30, day: "monday"},
  { id: 6, name: "Running", completed: false, duration: 45, day: "monday"}
];

const toggleCompleted = (exercise, icon) => {
  if (exercise.completed) {
    icon.classList.remove('fas', 'fa-check-circle');
    icon.classList.add('far', 'fa-circle');
  } else {
    icon.classList.remove('far', 'fa-circle');
    icon.classList.add('fas', 'fa-check-circle');
  }
  exercise.completed = !exercise.completed;
};

const updateAnalytics = allExercises => {
  const completedExercises = allExercises.filter(ex => ex.completed);
  const minutesExercised = completedExercises.reduce((total, ex) => {
    return total + ex.duration;
  }, 0);
  const percentageCompleted =
    ((completedExercises.length / allExercises.length) * 100).toFixed(2) + '%';

  const totalMinutesElem = document.getElementById('total-minutes');
  const percentageElem = document.getElementById('percentage-completed');
  totalMinutesElem.innerHTML = minutesExercised;
  percentageElem.innerHTML = percentageCompleted;
};

exercises.forEach(exercise => {
  const exerciseElem = document.getElementById(`exercise-${exercise.id}`);
  const icon = exerciseElem.querySelector('i');
  icon.addEventListener('click', () => {
    toggleCompleted(exercise, icon);
    updateAnalytics(exercises);
  });
});

//create class that produces exercise objects
class Exercise {
  constructor(name, duration, routineDay) {
    this.id = exercises[exercises.length - 1].id + 1;
    this.name = name;
    this.completed = false;
    this.duration = duration;
    this.routineDay = routineDay;
  }
}

const submitFormButton = document.getElementById("submit-button");

const submitExerciseButton = document.getElementById("exercise-submit");

function checkRoutineDay(newRoutine) {
  return exercises.some(ex => {
    if (newRoutine.day === ex.day) return true;
  });
}

// const testCloneParent = document.getElementById("exercise-1");
// const clone = testCloneParent.cloneNode(true);
// console.log(clone);
function createExercise(exerciseObject) {
  const outerDiv = document.createElement("div");
  outerDiv.id = `exercise-${exerciseObject.id}`;
  outerDiv.className = "exercise-header";

  const iTag = document.createElement("i");
  iTag.className = "far fa-circle";
  outerDiv.appendChild(iTag);

  const workoutHeader = document.createElement("h3");
  workoutHeader.innerText = exerciseObject.name;
  outerDiv.appendChild(workoutHeader);

  const durationSpan = document.createElement("span");
  durationSpan.innerText = `${exerciseObject.duration} min`;
  outerDiv.appendChild(durationSpan);
  console.log(outerDiv);
  return outerDiv;
}

console.dir(document.getElementById("exercise-1").firstChild);

submitFormButton.addEventListener("click", function(event) {
  const formData = submitFormButton.form;
  const routineDay = formData[0].value;
  const exerciseDuration = formData[1].valueAsNumber;
  const exerciseType = formData[2].value;

  const newWorkout = new Exercise(exerciseType, exerciseDuration, routineDay);

  // this will check if the exercises array has an exercise for the new workout day - return true if yes, false if no
  if (checkRoutineDay(newWorkout)) { //if the day already exists
    const routineDiv = document.getElementById(routineDay);
    const newExercise = createExercise(newWorkout);

    routineDiv.appendChild(newExercise);
  } else { //do something if the day isn't included in exercises
    //append a newExerciseNode to the DIV representing that day and show that day
  }

  exercises.push(newWorkout);
});

//think i'm done with this event listener
submitExerciseButton.addEventListener("click", function(event) {
  const exerciseSelect = document.getElementById("type-submission");
  const newOption = document.createElement("OPTION");
  let exerciseValue = document.getElementById("newtype-value");

  newOption.innerText = exerciseValue.value;

  exerciseSelect.appendChild(newOption);
  exerciseValue.value = "";
});

//1 - Enable users to add new exercises
//maybe try creating a dropdown menu of all possible exercises that a user can pick, and have a field to be able to add exercises to this dropdown
//might literally want us to add a new exercise with an ID, name, completion status and duration object to the exercises array
//still might be worth listing potential exercises in a dropdown menu

//2 - Enable users to add new routines/workouts
//through combo of dropdown list of exercises and ability to indicate a duration, create DOM elements from this info to create new combo of exercise/duration - need to be able to create a new day to perform stuff on
//how can a user specify what day to add an exercise/duration combo to?

//3 - Enable users to delete routines/workouts and exercises
//document.removeChild?

//4 - Enable users to enter a favorite workout in the Analytics panel. (Like running, yoga, strength training, etc.)

//can think of two options to create days to workout on:
//1.) create all the days already, add a day property to the exercises array objects, and only show a day if it has exercises on that day
//2.) create the day when an exercise is entered that day - one problem seems like it would potentially be unordered

//need to add submission button to submit both forms? or need one two separate buttons?

//want to create click event for form submission that creates a new Exercise class and populates its name and duration from form inputs

//id should be the next id in exercises array
//completed property should default to false

//push to exercises array
//create child

