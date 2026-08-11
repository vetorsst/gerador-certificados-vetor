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

Para deixar a **carga horária selecionável** (como na CIPA e na Integração SST),
acrescente `cargaOpcoes` — aparece um seletor abaixo do modelo, e o campo
`carga` define a opção pré-selecionada:

```js
cargaLabel: "Carga horária da turma",     // opcional; default "Carga horária"
cargaOpcoes: [{h:4, label:"04 horas — integração padrão"},{h:6},{h:8}]
```

Outros dois campos opcionais:

```js
titulo: "CERTIFICADO DE TREINAMENTO DE INTEGRAÇÃO",  // manchete; default "CERTIFICADO DE CONCLUSÃO"
sigla:  "Integração",                                 // nome do arquivo PDF; default = campo "nr"
```

O `titulo` encolhe sozinho para caber numa linha (46px → mínimo 24px), então
título longo é seguro. Ele também é editável em "Ajustar modelo".

## Integração SST (módulo do cliente com NR-01/06/20/33/35)

Dois modelos — `Integração SST` e `Integração SST (Reciclagem)` — para o
treinamento de **informação sobre riscos + EPI** da NR-01 (itens 1.4.1 e 1.7)
com NR-06 (item 6.6.1 "d"). Não é uma NR específica: o conteúdo é montado a
partir do **inventário de riscos do PGR do cliente** (benzeno, tolueno, xileno,
ruído, ergonômicos, psicossociais, queda de mesmo nível, altura e espaço
confinado) e do conjunto de normas da atividade dele — **NR-01, NR-06, NR-20,
NR-33 e NR-35**, sem NR-18 (não é canteiro de obras).

O certificado diz **explicitamente** que é integração, em quatro pontos: a
manchete (`CERTIFICADO DE TREINAMENTO DE INTEGRAÇÃO` / `CERTIFICADO DE
RECICLAGEM DA INTEGRAÇÃO`), o nome do curso no corpo do texto, o título do verso
e o nome do arquivo PDF (`Certificado - Fulano - Integração.pdf`).

- Carga selecionável: 4/6/8h na inicial, 2/4/6h na reciclagem. A NR-01 não fixa
  carga nem periodicidade — os **24 meses** são prática comercial, igual a
  NR-6/12/23.
- A **OBS ao final do conteúdo é obrigatória**: o certificado não habilita
  trabalho em altura (NR-35) nem espaço confinado (NR-33), não substitui a
  capacitação da NR-20 (graduada pela classe da instalação) e não cobre o
  controle específico da exposição ao benzeno. Não remova essa ressalva.

**Campo "Empresa do participante / obra"** (opcional, no painel): entra no
certificado como "…colaborador(a) da **MATICX**, participou do…" e no verso como
"Empresa: …". De propósito **não** fica salvo entre sessões — é dado de turma,
e carregar de um cliente para o outro colocaria empresa errada num documento
legal.

**Aviso de verso cortado:** o conteúdo programático encolhe até 7px para caber
no verso. Se nem assim couber, o painel mostra um alerta vermelho e o "Baixar
PDF" pede confirmação antes de emitir com corte — antes isso acontecia em
silêncio. O verso da Integração SST é o mais denso da biblioteca (~3,9 mil
caracteres); confira a pré-visualização do verso antes de emitir em lote.

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
- **Integração SST** — confirmar com o RT os incisos citados na base legal
  (NR-01 itens 1.4.1 e 1.7; NR-06 item 6.6.1 "d") e a **fonte do benzeno** no
  inventário do cliente: se vier de combustível derivado de petróleo, o Anexo
  13-A da NR-15 (PPEOB) em regra não se aplica e o controle corre por NR-20 +
  PCMSO; se vier de solvente/produto com ≥1% de benzeno, o PPEOB é exigível e
  este certificado não o supre.
- **NR-20 não está na biblioteca** — a capacitação da NR-20 é graduada pela
  classe da instalação e pela função (integração/básico/intermediário/avançado),
  com cargas e reciclagens próprias. A Integração SST cobre só o bloco
  informativo de inflamáveis; o treinamento normativo da NR-20 precisa de
  modelo próprio.
```
