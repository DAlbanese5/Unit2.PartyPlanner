const Url = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2407-FTB-ET-WEB-FT/events`;

const state = {
  events: [],
};

const eventList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

async function getEvents() {
  // TODO
  try {
    const response = await fetch(Url);
    const json = await response.json();
    state.events = json.data;
    console.log(state);
    console.table(state.events);
  } catch (error) {
    console.error(error);
  }
}
function renderEvents() {
    // TODO
    if (!state.events.length) {
      eventList.innerHTML = `<li>No Events
      </li>`;
      return;
    }
  
    const eventCards = state.events.map((event) => {
      const li = document.createElement("li");
      li.innerHTML = `
    <h2>${event.name}</h2>
    <p>${event.description}</p>
    <p>${event.date}</p>
    <p>${event.location}</p>
    `;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";
    li.append(deleteButton);
    deleteButton.addEventListener("click", () => deleteEvent(event.id));
      return li;
    });
    
   
  
    eventList.replaceChildren(...eventCards);
  }


async function render() {
  await getEvents();
  renderEvents();
}
render();

async function addEvent(event) {
    event.preventDefault();
  
    try {
      const response = await fetch(Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: addEventForm.name.value,
          location: addEventForm.location.value,
          description: addEventForm.description.value,
          date: new Date(addEventForm.date.value),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
  
      render();
    } catch (error) {
      console.error(error);
    }
  }

//   create element to create button. Set text content of button, add event listener. Append the button to <li>
async function deleteEvent(id) {
    try {
        const response = await fetch(`${Url}/${id}` , {method: "DELETE"});
    if (!response.ok) {
        throw new Error("Party can't be deleted.");
    }; 
} catch (error) {
    console.error(error);
}
}
