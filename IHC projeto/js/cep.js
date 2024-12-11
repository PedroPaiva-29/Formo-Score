document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const cepInfoContainer = document.getElementById('cep-info');
    const errorMessage = document.getElementById('error-message');

    cepInfoContainer.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        
        if (!response.ok) {
            throw new Error('CEP não encontrado');
        }

        const data = await response.json();

     
        document.getElementById('cep-value').textContent = data.cep;
        document.getElementById('state').textContent = data.state;
        document.getElementById('city').textContent = data.city;
        document.getElementById('neighborhood').textContent = data.neighborhood || 'Não informado';
        document.getElementById('street').textContent = data.street || 'Não informado';

    
        cepInfoContainer.style.display = 'block';
    } catch (error) {
        
        errorMessage.style.display = 'block';
    }
});
