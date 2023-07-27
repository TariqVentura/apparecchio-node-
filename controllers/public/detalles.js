document.addEventListener("DOMContentLoaded", function () {
  const date = new Date();

  let format = date.toISOString();

  document.getElementById("date").innerHTML = format.substring(0, 10);
});
