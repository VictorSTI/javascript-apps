document.addEventListener('DOMContentLoaded',function()
{
    // FOCA O INPUT DE ADICIONAR ITENS
    document.getElementById('input_add').focus();

    // ADICIONA ITENS COM A TECLA 'ENTER'
    document.addEventListener('keydown',function(eKey)
    {
        eKey.key == 'Enter' ? addItem() : '';
    });

    // PRIMEIRA LETRA MAIÚSCULA NO INPUT
    document.getElementById('input_add').addEventListener('onkeydown',function(e)
    {
        if(document.getElementById('input_add').value.length == 0)
        e.target.value = e.target.value.toUpperCase();
    });

    // RENDERIZA OS ITENS
    renderItems();
});

function renderItems()
{
    const keys = Object.keys(localStorage);
    for(let i of keys)
    {
        let item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = i.slice(0,5) + ' - ' + localStorage.getItem(i);
        document.getElementById('notes-container').appendChild(item);
    }
}

function addItem()
{
    // PEGA A DATA ATUAL
    const data = getData();
    let conteudo = document.getElementById('input_add').value;
    conteudo = conteudo.charAt(0).toUpperCase() + conteudo.slice(1);
    console.log(conteudo);

    let item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = data + ' - ' + conteudo;
    const container = document.getElementById('notes-container');
    container.appendChild(item);
    clearInput();

    let i = 0;
    let flag = localStorage.getItem(data + i) ? true : false;

    while(flag == true)
    {
        if(localStorage.getItem(data + i))
        {
            flag = true;
            i++;
        }
        else
        {
            flag = false;
        }
    }

    localStorage.setItem(data + i,conteudo);

}

function getData()
{
    const data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;

    if(dia < 10)
    dia = '0' + dia;

    if(mes < 10)
    mes = '0' + mes;

    return dia + '/' + mes;
}

function clearInput()
{
    document.getElementById('input_add').value = '';
}