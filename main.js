window.onload = () => {
  // Limit setting
  let limit = 10;

  // We are waiting for the widget to be mounted and pick up the necessary elements
  function collectData() {
    const interval = setInterval(() => {
      const cardItems = [
        ...document.querySelectorAll(`[class*="Grid__Container"] > div`),
      ];
      if (cardItems.length > 0) {
        handlerData(cardItems);
        console.log(cardItems);
        clearInterval(interval);
      }
    }, 500);
  }

  // The main logic of working with received elements
  function handlerData(cardItems) {
    // Create a target element at the end of the list of works
    const layoutContainer = document.querySelector(
      `[class*="LayoutContainer__Container"]`
    );
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
      // We emulate data loading from the server
      setTimeout(() => {
        countJobs += limit;
        if (cardItems.length < countJobs) {
          countJobs = cardItems.length;
          observer.unobserve(loadMore); // Turning off the observer
        }

        showJobsInView();
      }, 500);
    }, options);

    // Checking for a limit, if everything is ok, then it shows blocks
    const showJobsInView = () => {
      cardItems.map((item, index) =>
        index < countJobs
          ? (item.style.display = "block")
          : (item.style.display = "none")
      );
    };

    observer.observe(loadMore);

    showJobsInView();
  }
  collectData();
};
