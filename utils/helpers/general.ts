export const printContent = (el: string): void => {
  const restorepage = document.body.innerHTML;
  const printcontent = document.getElementById(el)?.innerHTML;
  document.body.innerHTML = printcontent;
  window.print();
  document.body.innerHTML = restorepage;
};
