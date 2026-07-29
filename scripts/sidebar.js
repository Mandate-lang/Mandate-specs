async function load_sidebar()
{
    const file = await fetch("pages/sidebar.html");
    const html = file.text();

    //There should be only one body element
    document.getElementsByName("body")[0].insertAdjacentHTML("afterbegin", html);
}

document.addEventListener("DOMContentLoaded", function() 
{
  load_sidebar();
});
