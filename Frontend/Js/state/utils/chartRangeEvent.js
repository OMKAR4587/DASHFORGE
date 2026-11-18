export function initRangeEvent(onRangeChange) {

    const rangeButtons = document.querySelectorAll(".range-btn");

    rangeButtons.forEach((button) => {

        button.addEventListener("click", () => {

            rangeButtons.forEach((btn) => {

                btn.classList.remove("active");

            });

            button.classList.add("active");

            onRangeChange(button.dataset.range);

        });

    });

}