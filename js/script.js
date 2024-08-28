const items = document.querySelectorAll('.item');
const finalizeOrderButton = document.getElementById('finalizeOrder');
const orderModal = document.getElementById('orderModal');
const orderDetails = document.getElementById('orderDetails');
const orderTotal = document.getElementById('orderTotal');
const confirmOrderButton = document.getElementById('confirmOrder');
const cancelOrderButton = document.getElementById('cancelOrder');

let selectedItems = {
    prato: null,
    bebida: null,
    sobremesa: null
};

items.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');

        // Desmarca o item previamente selecionado na mesma categoria
        if (selectedItems[category]) {
            selectedItems[category].classList.remove('selected');
            selectedItems[category].querySelector('.check-icon').style.display = 'none';
        }

        // Marca o novo item selecionado
        item.classList.add('selected');
        item.querySelector('.check-icon').style.display = 'inline';
        selectedItems[category] = item;

        // Atualiza o estado do botão de finalizar pedido
        updateFinalizeButton();
    });
});

function updateFinalizeButton() 
{
    const allSelected = Object.values(selectedItems).every(item => item !== null);
    if (allSelected) {
        finalizeOrderButton.disabled = false;
        finalizeOrderButton.classList.add('enabled');
        finalizeOrderButton.textContent = 'Fechar pedido';
    } else {
        finalizeOrderButton.disabled = true;
        finalizeOrderButton.classList.remove('enabled');
        finalizeOrderButton.textContent = 'Selecione os 3 itens para fechar o pedido';
    }
}

finalizeOrderButton.addEventListener('click', () => {
    if (finalizeOrderButton.disabled) return;

    let total = 0;
    orderDetails.innerHTML = '';
    Object.values(selectedItems).forEach(item => {
        const name = item.getAttribute('data-name');
        const price = parseFloat(item.getAttribute('data-price'));
        total += price;
        
        orderDetails.innerHTML += `<p><span class="item-name">${name}</span><span class="item-price">R$ ${price.toFixed(2).replace('.', ',')}</span></p>`;
    });

    // Formatar o total com vírgula
    orderTotal.innerHTML = `<span class="item-name">TOTAL</span><span class="item-price">R$ ${total.toFixed(2).replace('.', ',')}</span>`;
    orderModal.style.display = 'flex';
});

confirmOrderButton.addEventListener('click', () => {
    let message = 'Olá, gostaria de fazer o pedido:\n';
    Object.values(selectedItems).forEach(item => {
        const name = item.getAttribute('data-name');
        const price = parseFloat(item.getAttribute('data-price'));
        message += `- ${name}: R$ ${price.toFixed(2).replace('.', ',')}\n`;
    });

    message += `Total: R$ ${orderTotal.textContent.split(': ')[1]}`;
    const whatsappURL = `https://wa.me/5524999979330?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
});

cancelOrderButton.addEventListener('click', () => {
    orderModal.style.display = 'none';
});
