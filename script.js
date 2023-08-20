const Modal = {
    open(){
        // Abrir Modal
        //adicionar a class active ao modal
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){
        // Fechar o modal
        //remover a class active do modal
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }

}

const transactions = [{
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2023'
    }, 
    {
        id: 2,
        description: 'Criação website',
        amount: 500000,
        date: '20/05/2023'
    }, 
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '25/03/2023'
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '24/06/2023'
    }]


// Eu preciso somar as entradas
// depois eu preciso somar as saídas
// remover as entradas o valor das saídas. assim, eu terei o total

const Transaction = {
    incomes() {
        // Somar as entradas
    },
    expenses() {
        // Somar as saídas
    },
    total() {
        // Entradas - saídas
    }
}

/*
    Agora eu preciso substituir os dados do html com os dados do js do meu objetop (transactions) aq no JS e colocar no html
*/

 const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transactions, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transactions)

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transactions) {

        const CSSclass = transactions.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transactions.amount)

        const html = `
            <td class="description">${transactions.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transactions.date}</td>
            <td><img src="assets/minus.svg" alt="Remover transação"></td>
        `

        return html
    }
 }


 const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "") //  "/\D/g" -> Ache tudo que não for número

        value = Number(value) / 100

        value = value.toLocaleString("pr-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
 }

 transactions.forEach(function(transactions){
    DOM.addTransaction(transactions)
 })

 