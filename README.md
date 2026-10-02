# Restaurante Souza

Landing page em português, responsiva e sem dependências de produção. HTML semântico, CSS mobile-first e JavaScript puro.

## Rodar

Abra `dist/index.html` no navegador. Para servir por HTTP, com Node.js 18 ou superior:

```sh
npm start
```

Abra http://127.0.0.1:4173. Não é necessário instalar pacotes.

## Publicação

Publique o conteúdo de `dist/` em qualquer hospedagem estática. Todos os caminhos são relativos, compatíveis com subdiretórios. Não há etapa de build nem coleta de dados: pedidos abrem o WhatsApp para o cliente revisar e enviar a mensagem.

## Organização

- `dist/index.html`: textos, preços, contatos, ícones SVG e estrutura semântica.
- `dist/styles.css`: tokens de identidade, componentes e breakpoints.
- `dist/script.js`: menu móvel acessível e ano do rodapé.
- `dist/assets/churrasco.jpg`: fotografia ilustrativa local.
- `server.mjs`: servidor local de desenvolvimento.

## Dados para completar antes da divulgação

Substitua `[Rua, número e bairro]` e `[Dias e horários de funcionamento]` no rodapé. Os dois valores de Prato Feito e Marmitex foram preservados sem inventar tamanhos. Confirme pelo WhatsApp as modalidades, opções do dia, disponibilidade, taxa, prazo e área de entrega.

WhatsApp principal: (69) 99394-9059. Contato adicional: (69) 3442-7566. A integração usa links `wa.me`; não confirma automaticamente pedidos nem pagamentos.

## Imagem

Foto ilustrativa de Hitesh Dewasi, via [Unsplash](https://unsplash.com/photos/grilled-meat-on-black-charcoal-grill-F-wom_-3mZY), sob a [licença Unsplash](https://unsplash.com/license). Não é uma fotografia do Restaurante Souza. Substitua pelo material real do restaurante quando disponível.

## Acessibilidade

Navegação por teclado, foco visível, link de salto, landmarks semânticos, menu com `aria-expanded`, ícones decorativos, suporte a movimento reduzido e navegação funcional sem JavaScript. Links externos usam `rel="noopener noreferrer"`.
