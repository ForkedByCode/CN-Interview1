let eventCounter = 1;

const container = document.getElementById("container");
const addEvent = document.getElementById("addEvent");

addEvent.addEventListener("click", appendEvent);

document.getElementById("startTimer").addEventListener("click", () => {
  const eventName = document.getElementById("eventName").value;
  if (!eventName) {
    window.alert("Please enter a valid event name!");
    return;
  }

  const timer = document.getElementById("timer").value;
  if (isNaN(timer) || timer <= 0) {
    window.alert("Please enter a valid timer!");
    return;
  }

  startReverseTimer(eventName, timer);
});

function appendEvent() {
  const currentEventCounter = eventCounter;
  eventCounter++;

  const eventContainer = createElement(
    "div",
    undefined,
    "eventContainer",
    `eventContainerName${currentEventCounter}`
  );

  const nameGroup = createElement("div", undefined, "name-group", undefined);
  nameGroup.classList.add("group");
  const timeGroup = createElement("div", undefined, "time-group", undefined);
  timeGroup.classList.add("group");

  const eventLabel = createElement("label", "Event Name: ");
  eventLabel.htmlFor = `eventName${currentEventCounter}`;
  const timerLabel = createElement("label", "Enter Time: ");
  timerLabel.htmlFor = `timer${currentEventCounter}`;

  const eventNameInput = createElement(
    "input",
    undefined,
    undefined,
    `eventName${currentEventCounter}`
  );
  eventNameInput.type = "text";

  const timerInput = createElement(
    "input",
    undefined,
    undefined,
    `timer${currentEventCounter}`
  );
  timerInput.type = "number";

  const submitButton = createElement(
    "button",
    "Start",
    "startBtn",
    `startTimer${currentEventCounter}`
  );
  submitButton.type = "submit";

  submitButton.addEventListener("click", () => {
    const eventName = document.getElementById(
      `eventName${currentEventCounter}`
    ).value;
    const timer = document.getElementById(`timer${currentEventCounter}`).value;
    startReverseTimer(eventName, timer);
  });

  nameGroup.append(eventLabel, eventNameInput);
  timeGroup.append(timerLabel, timerInput);

  eventContainer.append(nameGroup, timeGroup, submitButton);
  container.appendChild(eventContainer);
}

function createElement(type, text, className, idName) {
  const element = document.createElement(type);
  if (text) element.textContent = text;
  if (className) element.classList.add(className);
  if (idName) element.id = idName;

  return element;
}

const timers = {};

function startReverseTimer(name, duration) {
  if (timers[name]) {
    window.alert(`Timer with name ${name} is already running.`);
    return;
  }

  let timeRemaining = duration;
  console.log(`${name} starts at ${timeRemaining} seconds.`);

  const intervalId = setInterval(() => {
    timeRemaining--;
    console.log(`${name}: ${timeRemaining} seconds remaining`);
    displayTimer(name, timeRemaining);

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      delete timers[name];
      window.alert(`${name} timer has finished.`);
    }
  }, 1000);

  timers[name] = intervalId;
}

function displayTimer(eventName, timeRemaining) {
  let display = document.getElementById(`${eventName}-display`);

  if (!display) {
    display = createElement("div", "", "display", `${eventName}-display`);

    const eventContainers = document.querySelectorAll(".eventContainer");
    let eventContainerFound = false;

    eventContainers.forEach((container) => {
      const inputField = container.querySelector(`input[id^="eventName"]`);
      if (inputField && inputField.value === eventName) {
        eventContainerFound = true;
        container.appendChild(display);
      }
    });

    if (!eventContainerFound) {
      console.error(`Event container for ${eventName} not found.`);
      return;
    }
  }

  display.textContent = `${eventName}: ${timeRemaining} seconds remaining`;
}
