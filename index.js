const url = `https://crudcrud.com/api/da7ec1de45fa4b6392d86ed859208b72/student`;

let editingStudentId = null;

console.log(editingStudentId);

function handleForm(event) {
  event.preventDefault();
  const newStudent = {
    name: event.target.name.value,
    number: event.target.number.value,
    address: event.target.address.value,
  };
  studentPost();
  async function studentPost() {
    try {
      if (editingStudentId === null) {
        console.log("new");
        const res = await axios.post(url, newStudent)
        showUser(res.data);
        totalStudent();
      }else{
        console.log("update");
         const updateData = await axios.put(`${url}/${editingStudentId}`,newStudent)
         showUser({...newStudent,_id:editingStudentId})
         editingStudentId=null
      }
    } catch (error) {
      console.log("sdjkn");
      console.log(error);
    }
  }
}

function totalStudent() {
  const total = document.getElementById("totalStudent");
  studentLength();
  async function studentLength() {
    try {
      const res = await axios.get(url);
      total.innerText = res.data.length;
      console.log(res.data.length);
    } catch (error) {
      console.log(error);
    }
  }
}

function deleteStudent(event) {
  const parent = event.target.parentNode;
  const studentId = parent.querySelector("._id").innerText;
  console.log(studentId);

  deleteStudentCrud();
  async function deleteStudentCrud() {
    try {
      const res = await axios.delete(`${url}/${studentId}`, studentId);
      totalStudent();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  parent.remove();
}

function editStudent(event) {
  const parent = event.target.parentNode;
  editingStudentId = parent.querySelector("._id").innerText;
  console.log(editingStudentId);

  const name = parent.querySelector(".name").innerText;
  const number = parent.querySelector(".number").innerText;
  const address = parent.querySelector(".address").innerText;

  const form = document.querySelector("form");
  const inputCount = form.getElementsByTagName("input");
  inputCount[0].value = name;
  inputCount[1].value = number;
  inputCount[2].value = address;

  //   deleteStudent(event);
}

window.addEventListener("DOMContentLoaded", function () {
  getStudentData();
  async function getStudentData() {
    try {
      const res = await axios.get(url);
      const allUser = res.data;
      console.log(allUser.length);
      for (let i = 0; i < allUser.length; i++) {
        showUser(allUser[i]);
      }
      totalStudent();
    } catch (error) {
      console.log(error);
    }
  }
});

function showUser(newStudent) {
  const studentEntries = Object.entries(newStudent);
  const newUl = document.createElement("ul");
  for (let i = 0; i < studentEntries.length; i++) {
    const [key, value] = studentEntries[i];
    const newLi = document.createElement("li");
    newLi.innerText = value;
    newLi.setAttribute("class", key);
    newUl.append(newLi);
  }
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.setAttribute("onclick", "editStudent(event)");
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.setAttribute("onclick", "deleteStudent(event)");
  newUl.append(editBtn);
  newUl.append(deleteBtn);
  const form = document.querySelector("form");
  const container2 = document.getElementById("container2");
  container2.prepend(newUl);
  const inputCount = form.getElementsByTagName("input");
  for (let i = 0; i < inputCount.length; i++) {
    inputCount[i].value = "";
  }
}
