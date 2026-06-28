# Gerador de Certificados — Vetor SST

Ferramenta estática (roda 100% no navegador, sem backend) para emitir
certificados de NR em PDF, individual ou em lote. Frente + verso, com a
marca e o conteúdo programático já embutidos por NR.

## Estrutura

```
index.html      → markup da página
styles.css      → estilos
templates.js    → BIBLIOTECA DE NRs (é aqui que você adiciona novos modelos)
app.js          → lógica (preview, lote, geração de PDF)
assets/         → logos oficiais (vertical, horizontal, símbolo)
```

## Gerar o PDF

O "Baixar PDF" abre o **diálogo de impressão do navegador** → escolha
**"Salvar como PDF"**. O texto sai vetorial (nítido e selecionável). O nome
do arquivo já vem sugerido (ex.: `Certificado - Fulano - NR-18`; lote inclui
a data). O nome sugerido é confiável no **Chrome/Edge**; Firefox/Safari podem
ignorá-lo — nesse caso é só digitar o nome na hora de salvar.

**Lote:** por padrão gera **1 PDF por participante** (separados) — o navegador
abre um "Salvar como PDF" para cada pessoa, em sequência, já com o nome no
arquivo. Para receber tudo num **único PDF**, desmarque "Baixar 1 PDF por
participante" na aba Lote.

- Mantenha o destino em **A4 / Paisagem** (já vem sugerido).
- As cores de fundo (cantos navy, faixas) saem por padrão. Se algum
  navegador imprimir sem elas, ative **"Gráficos em segundo plano"** em
  "Mais configurações" no diálogo de impressão.

## Rodar localmente

Não abra o `index.html` com duplo-clique (`file://`) — o navegador trata
os logos como origem diferente e o "Baixar PDF" falha (canvas tainted).
Sirva por HTTP:

- VS Code: extensão **Live Server** → botão "Go Live".
- ou: `python3 -m http.server` na pasta e abrir `http://localhost:8000`.

## Adicionar uma NR nova

Edite só o `templates.js`. Copie um bloco e ajuste:

```js
"NR-10": {
  nr: "NR-10",
  curso: "CURSO BÁSICO DE SEGURANÇA EM INSTALAÇÕES E SERVIÇOS EM ELETRICIDADE",
  baseLegal: "NR-10",            // Portaria/item, se houver
  carga: "40 horas",
  validadeMeses: 24,             // validade some da data + esses meses
  fecho: "obtendo o grau de conclusão ao final do curso",
  conteudo: "Item 1;\nItem 2;\nItem 3."   // conteúdo programático (use \n para quebra)
}
```

O dropdown e o preenchimento automático se atualizam sozinhos.

## Deploy com acesso restrito (recomendado)

GitHub Pages não tem senha. Para uma ferramenta interna, use
**Cloudflare Pages + Cloudflare Access** (gratuito):

1. Suba o repositório no GitHub.
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → conecte o repo.
   Build command: vazio. Output directory: `/` (raiz).
3. Zero Trust → Access → Applications → Add → Self-hosted, aponte para o
   domínio do Pages.
4. Policy: permitir apenas e-mails `@vetorsst.com.br` (ou lista de e-mails).

Quem acessar recebe um código de login por e-mail; sem e-mail autorizado,
não entra. Cada `git push` republica.

## Validações automáticas

O "Baixar PDF" **bloqueia a emissão** e avisa quando faltar: data do curso,
endereço da empresa, responsável técnico, nome do participante ou **CPF
válido** (dígitos verificadores conferidos; máscara automática). No lote,
linhas com nome/CPF inválido são sinalizadas (⚠) antes de gerar.

Os dados de empresa/RT e preferências ficam salvos no navegador entre
sessões.

## Base legal e periodicidade (atualizadas — jun/2026)

Confirmadas contra o texto vigente das normas:

| NR | Base legal (capacitação) | Periodicidade do periódico |
|----|--------------------------|----------------------------|
| NR-18 | item **18.12** + Anexo I (Portaria SEPRT 3.733/2020) | bienal — **24 meses** |
| NR-34 | item **34.5** (trabalho a quente) | anual — **12 meses** |
| NR-35 | item **35.3** | bienal — **24 meses** |

- **Registro do RT** — ajustado para `Reg. MTE nº 0027636/RS` (registro de
  Técnico em Segurança do Trabalho no MTE/SRTE). O app alerta em vermelho se
  algum dia voltar a constar `CRP` (Conselho de Psicologia) com titulação técnica.
- `validadeMeses: 0` suprime a linha "Validade" no verso (para treinamentos
  que não têm periodicidade).

**Endereço oficial:** R. Mostardeiro, nº 777 - 15º andar - Independência,
Porto Alegre - RS, 90430-001 (já é o valor padrão). A emissão continua
bloqueada caso o campo seja apagado.

## Pendências de conteúdo (confirmar com o RT antes de emitir oficialmente)

- **Carga horária por NR** — a NR-18 mantém 4h (inicial, vigente); revisar caso
  a turma seja periódica/eventual (cargas distintas no Anexo I).
- **Conteúdo programático da NR-35** — as referências internas a "NR-18 item
  18.28.2" (capítulo revogado) foram remapeadas para o item **18.12**; revisar
  se o conteúdo de cada módulo segue adequado.
```
