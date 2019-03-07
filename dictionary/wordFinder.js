let wordFinderInput = document.getElementById('word-finder-input');

wordFinderInput.focus();
wordFinderInput.addEventListener('keyup', function() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("word-finder-input");
  filter = new RegExp('\\b' + input.value, 'i');
  table = document.getElementById("dictionary-table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (filter.test(txtValue)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});
