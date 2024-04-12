const searchModalRootEl = $('#search-modal-container')
const searchModalCancelBtn = $('#search-modal-cancel')

function closeModal() {
    searchModalRootEl.css('display', 'none')
    document.querySelector('main').classList.remove('modal-background')
    document.querySelector('.modal-button').disabled = false
}

function toggleModal() {
    // check modal display
    const elDisplay = searchModalRootEl.css('display')
    
    if (elDisplay === 'flex') {
        searchModalRootEl.css('display', 'none')
    
    }
    
    if (elDisplay === 'none') {
        searchModalRootEl.css('display', 'flex')
        document.querySelector('main').classList.add('modal-background')
        document.querySelector('.modal-button').disabled = true
    }
}

$('#new-search').on("click", toggleModal);
searchModalCancelBtn.on("click", closeModal);
