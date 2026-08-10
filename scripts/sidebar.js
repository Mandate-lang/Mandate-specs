// Data
const pages = [
  "preamble",
];

//Helper Functions
function set_caps(name)
{
  return String(name).charAt(0).toUpperCase() + String(name).slice(1);
}


// Functions for adding sidebar
async function load_sidebar()
{
  const file = await fetch("/pages/sidebar.html");
  const html = await file.text();

  //There should be only one body element
  document.body.insertAdjacentHTML("afterbegin", html);
}
async function setup_table_of_contents()
{
  const table_of_contents = await document.getElementById("table-of-contents");
  for (const page of pages)
  {
    const link = "<li>\n" +
                 "  <a href=\"/pages/" + page + ".html\">" + set_caps(page) +"</a>\n" +
                 "</li>"
    
    table_of_contents.insertAdjacentHTML("beforeend", link);
  }
}

document.addEventListener("DOMContentLoaded", async function() 
{
  await load_sidebar();
  await setup_table_of_contents();
});
