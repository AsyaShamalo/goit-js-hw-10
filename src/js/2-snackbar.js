import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form')



form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === "fulfilled") {
                resolve();
            } else {
                reject();
            }
        }, delay)
    })
    promise
        .then(() => iziToast.success({
                    message: `✅ Fulfilled promise in ${delay}ms`,
                    closeOnClick: true,
                    position: "topRight",
                }))
        .catch(() => iziToast.error({
                    message: `❌ Rejected promise in ${delay}ms`,
                    closeOnClick: true,
                    position: "topRight",
                }));
})