// --- CONFIG ---
const SERVICE_ID = "service_ii9zs98";
const ADMIN_TEMPLATE_ID = "template_3hmpab9";
const USER_TEMPLATE_ID = "YOUR_USER_TEMPLATE_ID";
const PUBLIC_KEY = "NQhhbcGtDKqXP38qG";
// -------------------------------------------------

// init EmailJS
(function(){
  if(!window.emailjs){
    console.error("EmailJS SDK not loaded");
  } else {
    emailjs.init(PUBLIC_KEY);
    console.log("EmailJS initialized");
  }
})();

// Scroll animation
const sections = document.querySelectorAll("section");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, { threshold: 0.28 });

sections.forEach(s => io.observe(s));

// FORM HANDLING
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");
const msg = document.getElementById("msg");

function setLoading(on){
  if(on){
    submitBtn.setAttribute("disabled","true");
    spinner.style.display = "inline-block";
    btnText.textContent = "Sending...";
  } else {
    submitBtn.removeAttribute("disabled");
    spinner.style.display = "none";
    btnText.textContent = "Submit";
  }
}

form.addEventListener("submit", function(e){
  e.preventDefault();
  msg.classList.remove("success");
  msg.textContent = "";
  setLoading(true);

  const data = {
    from_name: form.from_name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    purpose: form.purpose.value.trim(),

    to_email: "karthikeyan.snpc@gmail.com",
    user_email: form.email.value.trim()
  };

  if(!data.from_name || !data.email || !data.phone || !data.purpose){
    setLoading(false);
    msg.textContent = "Please fill all fields.";
    return;
  }

  emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, data)
  .then((res) => {
    if(USER_TEMPLATE_ID && USER_TEMPLATE_ID !== "YOUR_USER_TEMPLATE_ID"){
      return emailjs.send(SERVICE_ID, USER_TEMPLATE_ID, data)
        .then(() => ({ userReply: true }));
    } else {
      return { userReply: "skipped" };
    }
  })
  .then(() => {
    setLoading(false);
    msg.classList.add("success");
    msg.textContent = "✔ Message sent successfully — check your inbox.";
    form.reset();
  })
  .catch((err) => {
    console.error("Send error:", err);
    setLoading(false);
    msg.textContent = "✖ Failed to send message.";
  });
});

// Smooth nav
document.querySelectorAll('nav a').forEach(a=>{
  a.addEventListener('click', (ev)=>{
    ev.preventDefault();
    const id = a.getAttribute('href').slice(1);
    document.getElementById(id).scrollIntoView({ behavior:'smooth' });
  });
});
