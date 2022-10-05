window.onload = () => {
  // Limit setting
  let limit = 10;

  // Array of all elements
  const cardItems = [
    ...document.querySelectorAll(`[class*="Grid__Container"] > div`),
  ];
  const layoutContainer = document.querySelector(
    `[class*="LayoutContainer__Container"]`
  );

  if (cardItems) {
    // Create a target element at the end of the list of works
    const loadMore = document.createElement("div");
    loadMore.style = `width: 100%; height: 1px;`;
    layoutContainer.appendChild(loadMore);

    // The number of elements of the list before the first observer is processed
    let countJobs = 0;

    // Settings for the observer
    const options = {
      rootMargin: "0px",
      threshold: 0.5,
    };

    // Works with scroll
    const observer = new IntersectionObserver(() => {
      if (cardItems.length > countJobs) {
        countJobs += limit;
      } else {
        countJobs = cardItems.length;
        observer.unobserve(loadMore); // Turning off the observer
      }

      // We emulate data loading from the server
      setTimeout(() => {
        showJobsInView();
      }, 2000)
    }, options);

    observer.observe(loadMore);

    // Checking for a limit, if everything is ok, then it shows blocks
    const showJobsInView = () => {
      cardItems.map((item, index) =>
        index < countJobs
          ? (item.style.display = "block")
          : (item.style.display = "none")
      );
    };
    showJobsInView();
  }
};
