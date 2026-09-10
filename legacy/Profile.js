filterSelection("all") // Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }
}
/*function addClass(element, name) {
    if (!element || !name) return;
    for (const cls of name.trim().split(/\s+/)) {
      element.classList.add(cls);
    }
}*/
// Show filtered elements
function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
var btn = document.querySelectorAll("#myBtnContainer .btn");
btn.forEach(button => {
  if (button) {
    button.addEventListener("click", function(){
      const current = document.querySelector("#myBtnContainer .active");
      if (current.length > 0) {
        current[0].className = current[0].className.replace(" active", "");
      }
      this.className += " active";
    });
  }
});
// Add active class to the current button (highlight it)
/*function filterHighlight(c) {
  var x, i;
  x = document.getElementsByClassName("btn");
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "active");
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "active");
  }
}*/