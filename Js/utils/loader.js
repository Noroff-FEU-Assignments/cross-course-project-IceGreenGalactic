export function showLoader() {
  const loaderContainer = document.createElement("div");
  loaderContainer.className = "loader-container";
  const loader = document.createElement("div");
  loader.className = "loader";
  loaderContainer.appendChild(loader);
  document.body.appendChild(loaderContainer);
}

export function hideLoader() {
  const loaderContainer = document.querySelector(".loader-container");
  if (loaderContainer) {
    document.body.removeChild(loaderContainer);
  }
}
