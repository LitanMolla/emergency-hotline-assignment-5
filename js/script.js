// Reusable function
function getElement(id) {
    let element = document.getElementById(id);
    return element;
}

// get elements from id
let totalHeart = getElement('total_heart');
let totalCoin = getElement('total_coin');
let totalCopy = getElement('total_copy');
let clearBtn = getElement('clear_btn');
let historyContainer = getElement('history_container');

// element to number convert
let currentTotalHeart = Number(totalHeart.innerText);
let currentTotalCoin = Number(totalCoin.innerText);
let currentTotalCopy = Number(totalCopy.innerText);

// Event
const serviceContainer = getElement('card_container');
serviceContainer.addEventListener('click', function (event) {
    // heart count addition
    if (event.target.className.includes('heart_btn')) {
        currentTotalHeart++;
        totalHeart.innerText = currentTotalHeart;
    }
    // copy funtional
    if (event.target.className.includes('copy_btn')) {
        const number = event.target.parentNode.parentNode.children[3].innerText;
        navigator.clipboard.writeText(number);
        currentTotalCopy++;
        totalCopy.innerText = currentTotalCopy;
        return alert('Number copied');
    }

    // call fuctionality
    if (event.target.className.includes('call_btn')) {
        // low blance warning
        if (currentTotalCoin <= 0) {
            return alert('Low coin, must be need 20 coin minumam for call')
        }
        const serviceTitle = event.target.parentNode.parentNode.children[1].innerText;
        const serviceNumber = event.target.parentNode.parentNode.children[3].innerText;
        let div = document.createElement('div');
        currentTotalCoin -= 20;
        totalCoin.innerText = currentTotalCoin;
        // time
        const currentDate = new Date();
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        };
        const currentTime12Hour = currentDate.toLocaleString('en-BD', options);
        // time
        div.innerHTML = `
                        <div class="p-4 bg-[#FAFAFA] rounded-lg border border-gray-100">
                            <div class="flex justify-between items-center">
                                <div class="">
                                    <h4 class="text-lg font-semibold">${serviceTitle}</h4>
                                    <p class="text-gray-500">${serviceNumber}</p>
                                </div>
                                <div class="">
                                    <p class="">${currentTime12Hour}</p>
                                </div>
                            </div>
                        </div>
        `
        historyContainer.appendChild(div)
        return alert(`📞 Calling ${serviceTitle}, ${serviceNumber}...`)
    }
})

// clear function
clearBtn.addEventListener('click',function () {
    historyContainer.innerHTML=''
})