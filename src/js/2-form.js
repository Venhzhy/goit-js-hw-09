const STORAGE_KEY = "feedback-form-state";

let formData = {
  email: "",
  message: "",
};

const form = document.querySelector(".feedback-form");
const { email, message } = form.elements;

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };

    if (formData.email) email.value = formData.email;
    if (formData.message) message.value = formData.message;
  } catch (err) {
    console.error("Error parsing saved data:", err);
  }
}

form.addEventListener("input", (e) => {
  formData[e.target.name] = e.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log("Submitted data:", formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset();
});