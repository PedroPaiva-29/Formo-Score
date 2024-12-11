document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const bankCode = document.getElementById('bank-code').value;
    const bankInfoContainer = document.getElementById('bank-info');
    const errorMessage = document.getElementById('error-message');

    bankInfoContainer.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
        const response = await fetch(`https://brasilapi.com.br/api/banks/v1/${bankCode}`);
        
        if (!response.ok) {
            throw new Error('Banco não encontrado');
        }

        const data = await response.json();

        document.getElementById('ispb').textContent = data.ispb;
        document.getElementById('name').textContent = data.name;
        document.getElementById('code').textContent = data.code;
        document.getElementById('full-name').textContent = data.fullName;

        bankInfoContainer.style.display = 'block';
    } catch (error) {
        
        errorMessage.style.display = 'block';
    }
});
