document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cnpj = document.getElementById('cnpj').value.replace(/\D/g, '');
    const cnpjInfoContainer = document.getElementById('cnpj-info');
    const errorMessage = document.getElementById('error-message');

    cnpjInfoContainer.style.display = 'none';
    errorMessage.style.display = 'none';

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
        
        if (!response.ok) {
            throw new Error('CNPJ não encontrado');
        }

        const data = await response.json();

       
        document.getElementById('razao-social').textContent = data.razao_social;
        document.getElementById('nome-fantasia').textContent = data.nome_fantasia || 'Não informado';
        document.getElementById('situacao-cadastral').textContent = data.descricao_situacao_cadastral;
        document.getElementById('data-abertura').textContent = data.data_inicio_atividade;
        document.getElementById('endereco').textContent = `${data.descricao_tipo_de_logradouro} ${data.logradouro}, ${data.numero}, ${data.bairro}, ${data.municipio} - ${data.uf}, CEP: ${data.cep}`;

     
        cnpjInfoContainer.style.display = 'block';
    } catch (error) {
    
        errorMessage.style.display = 'block';
    }
});
