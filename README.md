# TaskFlow — Lista de Tarefas

Lista de tarefas simples e rápida, feita com HTML, CSS e JavaScript puros, sem frameworks e sem dependências.

**Demo:** https://vitormarques07.github.io/lista-de-tarefas/

## Funcionalidades

- Adicionar tarefas (com tecla Enter ou botão)
- Marcar e desmarcar tarefas como concluídas
- Excluir tarefas
- Filtrar por todas, pendentes ou concluídas, com contador em cada filtro
- Barra de progresso com a porcentagem de tarefas concluídas
- Limpar todas as concluídas de uma vez
- Salvamento automático no navegador com `localStorage`
- Tema claro e escuro, seguindo a preferência do sistema
- Layout responsivo, de celular a desktop
- Acessível: navegação por teclado, foco visível, `aria-live` na lista, `progressbar` com valor atualizado e respeito a `prefers-reduced-motion`

## Como usar

Abra o `index.html` no navegador. Não há build nem instalação.

```bash
git clone https://github.com/VitorMarques07/lista-de-tarefas.git
cd lista-de-tarefas
# abra o index.html no navegador
```

## Estrutura

```
lista-de-tarefas/
├── index.html   # estrutura da página
├── style.css    # estilos, temas e responsividade
├── script.js    # lógica, filtros, progresso e persistência
└── README.md
```

## Decisões técnicas

- O texto das tarefas é inserido com `textContent`, nunca como HTML, o que evita injeção de código.
- Os dados vivem no `localStorage` sob a chave `taskflow:tasks`. Se o conteúdo estiver corrompido ou o armazenamento indisponível, o app inicia vazio em vez de quebrar.
- Eventos de marcar e excluir usam delegação no elemento da lista.

## Autor

Vitor Marques — [@VitorMarques07](https://github.com/VitorMarques07)
