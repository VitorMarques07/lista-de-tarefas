# TaskFlow — Lista de Tarefas

Aplicativo web para organizar tarefas do dia a dia: você adiciona, marca o que já fez e acompanha o progresso em uma barra. Tudo fica salvo no seu navegador.

**[Abrir demo](https://vitormarques07.github.io/lista-de-tarefas/)**

<!-- Para adicionar uma imagem da tela: salve um print como screenshot.png no repositório e troque esta linha por: ![TaskFlow](screenshot.png) -->

## O que ele faz

- Adiciona tarefas (tecla Enter ou botão)
- Marca e desmarca tarefas como concluídas
- Exclui tarefas e limpa todas as concluídas de uma vez
- Filtra por todas, pendentes ou concluídas, com contador em cada filtro
- Mostra a porcentagem de tarefas concluídas em uma barra de progresso
- Salva automaticamente: ao reabrir a página, suas tarefas continuam lá
- Funciona em celular e computador, com tema claro e escuro conforme a preferência do sistema
- Pensado para acessibilidade: uso pelo teclado e rótulos para leitores de tela

## Tecnologias

HTML, CSS e JavaScript puros, sem frameworks nem bibliotecas. As fontes são carregadas do Google Fonts.

## Como usar

Abra o `index.html` no navegador. Não há instalação.

```bash
git clone https://github.com/VitorMarques07/lista-de-tarefas.git
cd lista-de-tarefas
# abra o index.html no navegador
```

## Estrutura

```
lista-de-tarefas/
├── index.html   # estrutura da página
├── style.css    # visual, temas e responsividade
├── script.js    # lógica, filtros, progresso e salvamento
└── README.md
```

## Detalhes técnicos

- Os dados são guardados no `localStorage` do navegador. Se estiverem corrompidos ou indisponíveis, o app abre vazio em vez de quebrar.
- O texto das tarefas é inserido como texto puro, nunca como HTML, o que evita injeção de código.
- O comportamento foi verificado com testes automatizados em navegador real: adicionar, concluir, excluir, filtrar, progresso, persistência e layout de celular.

## Autor

Vitor Marques — [LinkedIn](https://www.linkedin.com/in/vitor-bezerra-marques-116b10376) · [GitHub](https://github.com/VitorMarques07)
