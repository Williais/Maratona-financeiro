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

// Eu preciso somar as entradas
// depois eu preciso somar as saídas
// remover as entradas o valor das saídas. assim, eu terei o total

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify(transactions))
    }
 }

const Transaction = {
    all: Storage.get(),

    add(transactions){
        Transaction.all.push(transactions)

        App.reload()
    },

    remove(index) {

        Transaction.all.splice(index, 1)

        App.reload()
    },   
        // Pegar todas as transações
    incomes() {
        let income = 0;
        // Para cada transação
        Transaction.all.forEach(transactions => {
        // Se ela for maior que zero
            if(transactions.amount > 0) {
        // Somar a uma variavel e retornar a variavel
                income += transactions.amount
            }
        })
        return income
    },

    expenses() {
        let expense = 0
        Transaction.all.forEach(transactions => {
            if(transactions.amount < 0){
                expense += transactions.amount
            }
        })
        return expense
    },

    total() {
        return Transaction.incomes() + Transaction.expenses()
    }
}

/*
   Agora eu preciso substituir os dados do html com os dados do js do meu objetop (transactions) aq no JS e colocar no html
*/

 const DOM = {

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transactions, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transactions, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transactions, index) {

        const CSSclass = transactions.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transactions.amount)

        const html = `
            <td class="description">${transactions.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transactions.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="Remover transação"></td>
        `

        return html
    },

    updateBalance() {
        document.getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    clearTransaction(){
        DOM.transactionsContainer.innerHTML = ""
    }
 }

 const Utils = {

    formatAmount(value){
        value = Number(value) * 100

        return value
    },

    formatDate(date){
        const splittedDate = date.split('-')

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },

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

 const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {

        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },
    
    validateFields() {
        const { description, amount, date} = Form.getValues()

        if(description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por Favor, Preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date} = Form.getValues()
        
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return {
            description,
            amount,
            date
        }
    },

    saveTransaction(transactions) {
        Transaction.add(transactions)
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try{

            Form.validateFields()
            const transactions = Form.formatValues()
            Form.saveTransaction(transactions)
            Form.clearFields()
            Modal.close()
            // Verificar se todas as informações foram preenchidas
            // Formatar os dados para salvar
            // Salvar
            // apagar os dados do formulário
            //modal feche
            // Atualizar a aplicação

        } catch (error){

            alert(error.message)
        }
    }
 }

 const App = {
    init(){
        Transaction.all.forEach((transactions, index) => {
            DOM.addTransaction(transactions, index)
         })
        
         DOM.updateBalance()

         Storage.set(Transaction.all)
    },
    reload() {
        DOM.clearTransaction()
        App.init()
    },
 }

App.init()


