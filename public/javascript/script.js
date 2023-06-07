const ul = document.querySelector('ul');
const input = document.getElementById('item');

let itemsArray = localStorage.getItem('items') ?
JSON.parse(localStorage.getItem('items')) : [];
itemsArray.forEach(addTask);

function addTask(text){
  const li = document.createElement('li')
  li.textContent = text;
  ul.appendChild(li);
}

async function add(){
  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  addTask(input.value);
  input.value = '';
  await triggerNotif();
  let nc = document.getElementsByTagName('notification-center-component')[0];
nc.onLoad = () => {
  console.log("hello");
};
}

function del(){
  localStorage.setItem('items', []);
  ul.innerHTML = '';
  itemsArray = [];
}

function setSubcriberId(){
  localStorage.setItem('subscriberId', '37cc785a-1ea6-4fda-be61-18ad0587939f')
}

async function triggerNotif(){
  await fetch("http://127.0.0.1:8000/novu/trigger", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscriberId: localStorage.getItem('subscriberId'),
      num_of_tasks: itemsArray.length
    })
  });
}
// }