// DOM selector
const todosInput = document.querySelector('.input');
const todosButton = document.querySelector('.button');
const todosList = document.querySelector('.list-group');

// Button event
todosButton.addEventListener('click', function (e) {
    e.preventDefault();

    // Pengecekan terhadap input
    if (todosInput.value === '') {
        alert('Silahkan isi inputan Anda');
    } else {
        // Buat item todo baru
        const newTodoHTML = `
            <li class="list-group-item">
                <input class="form-check-input me-1" type="checkbox">
                ${todosInput.value}
            </li>
        `;

        // Tambahkan item todo baru ke dalam list
        todosList.innerHTML += newTodoHTML;

        // Reset input setelah menambahkan todo
        todosInput.value = '';

        // Debugging: Tampilkan HTML dari todo baru di console
        console.log(newTodoHTML);
    }
});
