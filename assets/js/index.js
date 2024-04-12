const searchModalRootEl = $('#search-modal-container')
const searchModalCancelBtn = $('#search-modal-cancel')

function closeModal() {
    searchModalRootEl.css('display', 'none')
}

function toggleModal() {
    // check modal display
    const elDisplay = searchModalRootEl.css('display')
    
    if (elDisplay === 'flex') {
        searchModalRootEl.css('display', 'none')
    }
    
    if (elDisplay === 'none') {
        searchModalRootEl.css('display', 'flex')
    }
}

$('#new-search').on("click", toggleModal)
searchModalCancelBtn.on("click", closeModal)

$('#clear').click(() => $('.history').css('display', 'none'));