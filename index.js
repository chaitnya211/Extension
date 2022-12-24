//chrome://extensions/
const inputBtn = document.getElementById("input-btn");

let myLeads = []; 
// let oldLeads = [];            

// myLeads = JSON.parse(myLeads);  // json.parse(arr) is used to convert a string into Array.
// myLeads.push("www.gmail.com");
// myLeads.push("www.erp.com");
// myLeads = JSON.stringify(myLeads);  // json.stringify(arr) is used to convert array to string.
// // console.log(myLeads);
// console.log(typeof myLeads);

const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leads = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.getElementById("tab-btn");

// console.log(leads);

if (leads) {
    myLeads = leads;
    render(myLeads);
}

tabBtn.addEventListener("click",function () {

    chrome.tabs.query({active: true, currentwindow: true},function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads)
    })
})

function render (leads) {
    let listItems = "";
    for (let i=0; i<leads.length; i++) {
        listItems += `
        <li>
            <a target = '_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick",function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click",function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.setItem("myLeads",JSON.stringify(myLeads));

    render(myLeads);
    // console.log(localStorage.getItem("myLeads"));
})

