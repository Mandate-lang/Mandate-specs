// Data
const pages = [
  "preamble",
];

//Helper Functions
function set_caps(name)
{
  return String(name).charAt(0).toUpperCase() + String(name).slice(1);
}
function get_page()
{
  const path = window.location.pathname;
  const page_name = path.split("/").pop();
  return page_name;
}


// Functions for adding sidebar
async function load_sidebar()
{
  let file = null

  //handle index.html being at top of directory
  try
  {
    file = await fetch("../pages/sidebar.html");

    if (!file.ok)
    {
      throw new Error("sidebar laoding failed with error code " + file.status);
    }
  }
  catch(error)
  {
    file = await fetch("pages/sidebar.html");
  }
  const html = await file.text();

  //There should be only one body element
  document.body.insertAdjacentHTML("afterbegin", html);
}
async function setup_table_of_contents()
{
  const current_page = get_page();
  let path_level = "../";
  if (current_page == "index.html")
  {
    path_level = "";
  }

  const table_of_contents = await document.getElementById("table-of-contents");
  for (const page of pages)
  {
    const link = "<li>\n" +
                 "  <a href=\"" + path_level + "pages/" + page + ".html\">" + set_caps(page) +"</a>\n" +
                 "</li>"
    
    table_of_contents.insertAdjacentHTML("beforeend", link);
  }
}

document.addEventListener("DOMContentLoaded", async function() 
{
  await load_sidebar();
  await setup_table_of_contents();
});
