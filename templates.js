// Biblioteca de modelos de NR — adicione novas NRs aqui.
//
// baseLegal contém SÓ o complemento (ex.: "item 18.12"); a NR já é citada
// pelo campo "nr". validadeMeses = periodicidade do treinamento periódico
// (use 0 para suprimir a linha "Validade" no verso).
//
// titulo (opcional) = manchete do certificado; default "CERTIFICADO DE CONCLUSÃO".
// A fonte encolhe sozinha para caber numa linha, então títulos longos são OK.
// sigla (opcional) = o que vai no nome do arquivo PDF no lugar de "nr"
// (ex.: "Certificado - Maria Silva - Integração.pdf").
//
// cargaOpcoes (opcional) = lista de cargas selecionáveis na UI. Quando
// presente, aparece um seletor logo abaixo do modelo e o campo "carga" do
// template define a opção pré-selecionada. cargaLabel troca o texto do rótulo.
//   cargaOpcoes: [{h:4},{h:6,label:"06 horas — turma estendida"}]
//
// Bases legais e periodicidades atualizadas conforme texto vigente (jun/2026):
//   NR-18 — Portaria SEPRT 3.733/2020: capacitação no item 18.12 + Anexo I;
//           treinamento inicial 4h; periódico BIENAL (24 meses).
//   NR-34 — trabalho a quente no item 34.5 (34.3 é a capacitação geral);
//           periódico ANUAL (12 meses), mín. 4h.
//   NR-35 — capacitação no item 35.3; periódico BIENAL (24 meses), 8h.
//   NR-33 — espaços confinados; periódico ANUAL (12 meses).
//   NR-6  — EPI/EPC; validade 24 meses (prática da empresa; a NR-6 não fixa prazo).
//   NR-12 — máquinas e equipamentos; validade 24 meses (prática da empresa).
//   NR-5  — CIPA (nome atualizado pela Lei 14.457/2022). Carga por grau de risco:
//           GR1 8h, GR2 12h, GR3 16h, GR4 20h (Portaria MTP 4.219/2022) — o seletor
//           de grau de risco vem de cargaOpcoes e preenche a carga (default GR1 = 8h).
//           O seletor tem também "GR1 — 6 horas" para turmas de 6h; atenção: 6h fica
//           ABAIXO do mínimo legal de 8h do GR1 — use só quando houver aproveitamento
//           de treinamento anterior (NR-01, item 1.7.7 / NR-5) que justifique a redução.
//           Os 24 meses NÃO são reciclagem fixa: renova-se a cada posse de mandato
//           (anual + 1 recondução) e aproveita-se treino anterior de até 2 anos.
//   NR-10 — básico Segurança em Eletricidade, 40h; reciclagem BIENAL (24 meses).
//   NR-23 — proteção contra incêndios, 8h; validade 24 meses (prática da empresa;
//           treinamento de brigada segue NBR 14276/Corpo de Bombeiros, não a NR-23).
//   NR-37 — plataformas de petróleo. 3 variantes: Básico (integração/1º embarque,
//           item 37.9.6.3, 8h) · Avançado (item 37.9.6.5, 8h + 1h prática) · Reciclagem (item 37.9.6.6,
//           4h). ⚠ No Avançado e na Reciclagem o RT DEVE ser ENGENHEIRO DE SEGURANÇA
//           (CREA), não Técnico — flag "rtEngenheiro" dispara aviso na UI. validade 24m
//           = ciclo da empresa; a reciclagem legal do avançado é a cada 5 anos.
// (NR-6/12/33 vieram dos PDFs da Vetor; baseLegal ficou vazio porque os
//  certificados citam só "em conformidade com a NR-X", sem item específico.)
//
//   Integração SST (+ Reciclagem) — NÃO é uma NR específica: é o treinamento de
//           informação sobre riscos + EPI da NR-01 (itens 1.4.1 e 1.7), com
//           NR-06 item 6.6.1 "d". Conteúdo montado a partir do inventário de
//           riscos do PGR do cliente (benzeno/tolueno/xileno, ruído, ergonômicos,
//           psicossocial, queda de mesmo nível, altura, espaço confinado) e do
//           conjunto de normas da atividade dele: NR-01, NR-06, NR-20, NR-33 e
//           NR-35 (SEM NR-18 — não é canteiro de obras; é instalação com
//           inflamáveis/combustíveis, o que também explica os aromáticos).
//           Carga selecionável (4/6/8h inicial; 2/4/6h reciclagem) — a NR-01 não
//           fixa carga nem periodicidade; os 24 meses são prática comercial,
//           igual a NR-6/12/23.
//           ⚠ A OBS final do conteúdo é obrigatória: o certificado NÃO habilita
//           trabalho em altura (NR-35) nem espaço confinado (NR-33), não substitui
//           a capacitação da NR-20 (que é graduada pela classe da instalação) e
//           não cobre o controle específico da exposição ao benzeno.
const TEMPLATES = {
  "NR-18": {
    "nr": "NR-18",
    "curso": "CURSO BÁSICO DE SEGURANÇA DO TRABALHO – ADMISSIONAL",
    "baseLegal": "item 18.12 e Anexo I",
    "carga": "04 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "1. As condições e meio ambiente de trabalho;\n2. Os riscos inerentes às atividades desenvolvidas;\n3. Os equipamentos e proteção coletiva existentes no canteiro de obras;\n4. O uso adequado dos equipamentos de proteção individual;\n5. O PGR do canteiro de obras."
  },
  "NR-34": {
    "nr": "NR-34",
    "curso": "CURSO DE CONDIÇÕES E MEIO AMBIENTE DE TRABALHO NA INDÚSTRIA DA CONSTRUÇÃO E REPARAÇÃO NAVAL - TRABALHO A QUENTE",
    "baseLegal": "item 34.5",
    "carga": "08 horas",
    "validadeMeses": 12,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "• Introdução;\n• Os riscos inerentes à atividade;\n• As condições e meio ambiente de trabalho;\n• Os Equipamentos de Proteção Coletiva (EPC) existentes no estabelecimento;\n• O uso adequado dos Equipamentos de Proteção Individual (EPI)."
  },
  "NR-35": {
    "nr": "NR-35",
    "curso": "CURSO DE TRABALHO EM ALTURA",
    "baseLegal": "item 35.3",
    "carga": "08 horas",
    "validadeMeses": 24,
    "fecho": "tendo obtido rendimento satisfatório",
    "conteudo": "Noções de 1º Socorros e Resgate (Módulo 03): Conceitos de Emergência/Priorização de atendimento; Suporte básico à vida; Avaliação da Vítima; Ataque Cardíaco; Lesões; Queimaduras; Quedas; Técnica de Transporte; Tríplice manobra; Resgate.\n\nEquipamentos de Proteção (Módulo 08A): Tipos de equipamentos de segurança - EPI/EPC; Funcionamento dos Equipamentos de proteção coletivo e individual para proteção da Cabeça, Olhos, Face, Membros inferiores e superiores; Proteção coletiva e individual contra queda com diferença de nível; Inspeções diárias dos equipamentos e itens de segurança; Exigências e obrigatoriedade quanto ao uso, guarda, conservação e higienização dos EPI's e/ou EPC's; Obrigações do Empregador; Obrigações do empregado; Informações sobre as condições e meio ambiente de trabalho (NR-18, item 18.12); Uso adequado de EPI (NR-18, item 18.12); Informações sobre EPC (NR-18, item 18.12).\n\nTrabalho em Altura (Módulo 10A): Objetivo; Campo de Aplicação; Normas e Regulamentos aplicáveis ao trabalho em altura; Riscos potenciais inerentes ao trabalho em altura e medidas de prevenção e controle; Utilização de cordas; Sistemas, Equipamentos e Procedimentos de Proteção Coletiva; Equipamento de Proteção Individual para Trabalho em Altura; Acidentes Típicos em Trabalhos em Altura.\n\nTrabalho em Altura (Módulo 10B): Trabalho em Poste tipo Padrão, Poste de Madeira e Poste de Concreto; Trabalho em altura durante acesso em caixa subterrânea; Trabalho em Altura quando encontrado obstáculo (árvores, animais, insetos, etc.); Trabalho em Marquises; EPI para Trabalho em Altura: Seleção, Inspeção, Conservação e Limitação de Uso; LVM – Linha de Vida móvel: Objetivo, Campo de Aplicação, Componentes do kit, Orientação para Instalação, Guarda e Conservação; Obrigatoriedade, Montagem e Utilização da garra para cordoalha de aço (garra meio de vão); Resgate.\n\nAnálise de Risco e Permissão de Trabalho (Módulo 11B): Técnicas de Análise de Risco; Análise Preliminar de Risco (APR); Formalização da APR; Condições adversas e impeditivas; Riscos Adicionais; Riscos inerentes ao trabalho em altura; Riscos inerentes ao Espaço Confinado; Risco inerente ao trabalho em proximidade de redes elétricas; Riscos inerentes ao trabalho a quente; Colocação e remoção de postes; Permissão de Trabalho (PT); Risco inerente à sua função (NR-18, item 18.12); Travessia de via – Análise e meios de neutralizar o risco."
  },
  "NR-6": {
    "nr": "NR-6",
    "curso": "CURSO DE FORMAÇÃO DE EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL (EPI) E EQUIPAMENTO DE PROTEÇÃO COLETIVA (EPC)",
    "baseLegal": "",
    "carga": "06 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "1. Definições da Norma Regulamentadora;\n2. Tipos de E.P.I. e E.P.C. conforme atividade exercida;\n3. Uso adequado;\n4. Substituição e Devolução;\n5. Higienização de EPI's;\n6. Equipamento de uso Permanente (Pessoal);\n7. Equipamentos Reserva;\n8. Capacete de segurança, bota de segurança, óculos de segurança, protetor auricular, luvas;\n9. EPI Específico;\n10. EPIs exclusivos para funções ou atividades específicas: cinto de segurança, vestimenta para arco voltaico;\n11. Vestimenta química, máscara autônoma, luva de malha de aço, protetor facial, vestimenta de aproximação ao fogo;\n12. Circunstâncias para uso do E.P.I. e E.P.C;\n13. Responsabilidade do empregador, do empregado, do fabricante e do importador;\n14. Certificado de aprovação."
  },
  "NR-12": {
    "nr": "NR-12",
    "curso": "CURSO DE SEGURANÇA NO TRABALHO EM MÁQUINAS E EQUIPAMENTOS",
    "baseLegal": "",
    "carga": "04 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "1. Introdução à NR-12;\n2. Instalações e dispositivos elétricos;\n3. Dispositivos de partida, acionamento e parada e parada de emergência;\n4. Sistemas de segurança;\n5. Descrição e identificação dos riscos associados com cada máquina e equipamento e as proteções específicas contra cada um deles;\n6. Funcionamento das proteções; como e porque devem ser usadas;\n7. Como, e em que circunstâncias e por quem uma proteção pode ser removida;\n8. O que fazer se uma proteção foi danificada ou se perdeu sua função;\n9. Princípios de segurança na utilização da máquina ou equipamento;\n10. Segurança para riscos mecânicos, elétricos e outros relevantes;\n11. Método de trabalho seguro;\n12. Permissão de trabalho;\n13. Sistema de bloqueio de funcionamento da máquina e equipamento durante operações de inspeção, limpeza, lubrificação e manutenção;\n14. Noções sobre legislação de trânsito e de legislação de segurança e saúde no trabalho;\n15. Medidas de controle dos riscos; EPC e EPI;\n16. Sinalização de segurança;\n17. Procedimentos em situação de emergência;\n18. Noções básicas de Primeiros Socorros;\n19. O colaborador foi treinado e capacitado para a utilização de ferramentas tais como: furadeiras, parafusadeira elétrica (a bateria) e esmerilhadeira."
  },
  "NR-33": {
    "nr": "NR-33",
    "curso": "CURSO DE SEGURANÇA EM ESPAÇOS CONFINADOS",
    "baseLegal": "",
    "carga": "16 horas",
    "validadeMeses": 12,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "Definições; Identificação dos espaços confinados; Legislação de segurança e saúde no trabalho; Reconhecimento, avaliação e controle de risco; Riscos em espaços confinados; Tipos de nós utilizados em espaços confinados; Sistema 4/1 com polias e cordas; Utilização do tripé; Funcionamento dos equipamentos utilizados; Noções de resgate em espaços confinados e primeiros socorros; Procedimento para utilização da permissão de entrada de trabalho.\n\nCapacitado para Trabalhos em: Caldeiras, Caixas d'água, Caminhão Tanque, Cisternas, Digestores, Dutos, Fornos, Forros, Galerias, Moinhos, Poços, Porões, Silos, Tanques, Tubulações, Valas e locais similares aos descritos, para as atividades de Construção, Manutenção, Inspeção, Limpeza, Medição e Arqueação.\n\nOBS: Este certificado não capacita o aluno como multiplicador/instrutor deste treinamento; não pode ser usado por outra empresa. Apenas o conteúdo programático e a carga horária podem ser aproveitados, nos termos da NR-01, item 1.7.7."
  },
  "NR-5": {
    "nr": "NR-5",
    "curso": "CURSO DE FORMAÇÃO DA COMISSÃO INTERNA DE PREVENÇÃO DE ACIDENTES E DE ASSÉDIO (CIPA)",
    "baseLegal": "",
    "carga": "08 horas",
    "cargaLabel": "Grau de risco do estabelecimento (define a carga da CIPA)",
    "cargaOpcoes": [
      { "h": 6, "label": "GR1 — 6 horas" },
      { "h": 8, "label": "GR1 — 8 horas" },
      { "h": 12, "label": "GR2 — 12 horas" },
      { "h": 16, "label": "GR3 — 16 horas" },
      { "h": 20, "label": "GR4 — 20 horas" }
    ],
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "Introdução;\nA Semana Interna de Prevenção de Acidentes do Trabalho;\nEstudo do ambiente, das condições de trabalho, bem como dos riscos originados do processo produtivo;\nNoções sobre acidentes e doenças relacionadas ao trabalho decorrentes das condições de trabalho e da exposição aos riscos existentes no estabelecimento e suas medidas de prevenção;\nMetodologia de investigação e análise de acidentes e doenças relacionadas ao trabalho;\nPrincípios gerais de higiene do trabalho e de medidas de prevenção dos riscos;\nNoções sobre as legislações trabalhista e previdenciária relativas à segurança e saúde no trabalho;\nNoções sobre a inclusão de pessoas com deficiência e reabilitados nos processos de trabalho;\nOrganização da CIPA e outros assuntos necessários ao exercício das atribuições da Comissão;\nPrevenção e combate ao assédio sexual e a outras formas de violência no trabalho."
  },
  "NR-10": {
    "nr": "NR-10",
    "curso": "CURSO DE FORMAÇÃO EM SEGURANÇA EM INSTALAÇÕES E SERVIÇOS EM ELETRICIDADE",
    "baseLegal": "",
    "carga": "40 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "1. Introdução à segurança com eletricidade;\n2. Riscos em instalações e serviços com eletricidade: o choque elétrico, mecanismos e efeitos, arcos elétricos, queimaduras e quedas, campos eletromagnéticos;\n3. Técnicas de Análise de Risco;\n4. Medidas de Controle do Risco Elétrico: desenergização, aterramento funcional (TN/TT/IT), de proteção, temporário, equipotencialização, seccionamento automático da alimentação, dispositivos a corrente de fuga;\n5. Extra baixa tensão, barreiras e invólucros, bloqueios e impedimentos, obstáculos e anteparos, isolamento das partes vivas, isolação dupla ou reforçada, colocação fora de alcance, separação elétrica;\n6. Normas Técnicas Brasileiras - NBR da ABNT: NBR-5410, NBR 14039 e outras;\n7. Regulamentações do MTE: NRs; NR-10 (Segurança em Instalações e Serviços com Eletricidade), qualificação, habilitação, capacitação e autorização;\n8. Equipamentos de proteção coletiva;\n9. Equipamentos de proteção individual;\n10. Rotinas de trabalho – Procedimentos: instalações desenergizadas, liberação para serviços, sinalização, inspeções de áreas, serviços, ferramental e equipamento;\n11. Documentação de instalações elétricas;\n12. Riscos adicionais: altura, ambientes confinados, áreas classificadas, umidade, condições atmosféricas;\n13. Proteção e combate a incêndios: noções básicas, medidas preventivas, métodos de extinção, prática;\n14. Acidentes de origem elétrica: causas diretas e indiretas; discussão de casos;\n15. Primeiros socorros: noções sobre lesões, priorização do atendimento, aplicação de respiração artificial, massagem cardíaca, técnicas para remoção e transporte de acidentados e práticas;\n16. Responsabilidades: do empregador, dos trabalhadores e dos profissionais que projetam, executam e mantêm as instalações elétricas."
  },
  "NR-23": {
    "nr": "NR-23",
    "curso": "CURSO DE PROTEÇÃO CONTRA INCÊNDIOS",
    "baseLegal": "",
    "carga": "08 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "Introdução;\nLegislação pertinente;\nTeoria do fogo;\nMeios de propagação do fogo;\nClassificação do fogo;\nEquipamentos de combate ao fogo;\nTécnicas de combate ao fogo;\nAbandono de área;\nTécnicas de prevenção de incêndios;\nReconhecimento e utilização de extintores de incêndio e hidrantes;\nProcedimentos para evacuação dos locais de trabalho com segurança;\nAvaliação primária;\nManobras de reanimação;\nFerimentos e hemorragias;\nFraturas e imobilização;\nQueimaduras;\nEmergências clínicas;\nRealização de manobras de reanimação cardíaca em manequim de treinamento."
  },
  "NR-37 Básico": {
    "nr": "NR-37",
    "curso": "CURSO DE SEGURANÇA E SAÚDE EM PLATAFORMAS DE PETRÓLEO (BÁSICO)",
    "baseLegal": "item 37.9.6.3",
    "carga": "08 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "1. Condições e meio ambiente de trabalho na plataforma marítima;\n2. Meios e procedimentos seguros de acesso e movimentação na plataforma;\n3. Riscos inerentes às atividades e as respectivas medidas preventivas e de controle;\n4. Substâncias inflamáveis, tóxicas e perigosas presentes a bordo;\n5. Uso correto, guarda e conservação de Equipamentos de Proteção Individual (EPI) e Coletiva (EPC);\n6. Procedimentos em situações de emergência e alarmes da unidade;\n7. Rotas de fuga, pontos de encontro e estações de abandono;\n8. Localização e noções de uso de equipamentos de salvatagem e de combate a incêndios;\n9. Procedimentos para relato de incidentes, acidentes e condições de risco."
  },
  "NR-37 Avançado": {
    "nr": "NR-37",
    "rtEngenheiro": true,
    "curso": "CURSO DE SEGURANÇA E SAÚDE EM PLATAFORMAS DE PETRÓLEO (TREINAMENTO AVANÇADO)",
    "baseLegal": "item 37.9.6.5",
    "carga": "08 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "1. Análise preliminar de riscos da tarefa (APR): conceitos e exercícios;\n2. Permissão para trabalho, a frio ou a quente, na presença de combustíveis e inflamáveis;\n3. Aditivos químicos e composição dos fluidos empregados nas operações de perfuração, completação, restauração e estimulação, quando aplicável;\n4. Noções dos sistemas de prevenção e combate a incêndio da plataforma;\n5. Acidentes com inflamáveis: suas causas e as medidas preventivas existentes na área operacional;\n6. Resposta a emergências com combustíveis e inflamáveis, segundo o Plano de Resposta a Emergências (PRE), descrito no capítulo 37.28 da NR-37;\n7. Noções de segurança de processo para plataformas;\n8. Segurança na operação das instalações elétricas em atmosferas explosivas;\n9. Atividade prática a bordo, de no mínimo uma hora, com a indicação in loco dos sistemas e equipamentos disponíveis para o combate a incêndio."
  },
  "NR-37 Reciclagem": {
    "nr": "NR-37",
    "rtEngenheiro": true,
    "curso": "CURSO DE SEGURANÇA E SAÚDE EM PLATAFORMAS DE PETRÓLEO (RECICLAGEM DO TREINAMENTO AVANÇADO)",
    "baseLegal": "item 37.9.6.6",
    "carga": "04 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "Reciclagem do treinamento avançado (mantida a parte prática obrigatória a bordo, item 37.9.6.6.1):\n\n1. Análise preliminar de riscos da tarefa (APR): revisão;\n2. Permissão para trabalho, a frio ou a quente, na presença de combustíveis e inflamáveis;\n3. Sistemas de prevenção e combate a incêndio da plataforma;\n4. Resposta a emergências com combustíveis e inflamáveis, segundo o Plano de Resposta a Emergências (PRE);\n5. Noções de segurança de processo e de instalações elétricas em atmosferas explosivas;\n6. Atividade prática a bordo, de no mínimo uma hora, com a indicação in loco dos sistemas e equipamentos de combate a incêndio."
  },
  "Integração SST": {
    "nr": "NR-01",
    "titulo": "CERTIFICADO DE TREINAMENTO DE INTEGRAÇÃO",
    "sigla": "Integração",
    "curso": "TREINAMENTO DE INTEGRAÇÃO EM SEGURANÇA DO TRABALHO – RISCOS OCUPACIONAIS E USO DE EPI",
    "baseLegal": "itens 1.4.1 e 1.7 (informação sobre riscos e capacitação) e NR-06, item 6.6.1 'd'",
    "carga": "04 horas",
    "cargaLabel": "Carga horária da turma",
    "cargaOpcoes": [
      { "h": 4, "label": "04 horas — integração padrão" },
      { "h": 6, "label": "06 horas" },
      { "h": 8, "label": "08 horas" }
    ],
    "validadeMeses": 24,
    "fecho": "tendo sido informado dos riscos ocupacionais de suas atividades e capacitado quanto às medidas de prevenção e ao uso dos equipamentos de proteção",
    "conteudo": "1. NORMAS DE SEGURANÇA E RESPONSABILIDADES: Objetivo do treinamento; Normas Regulamentadoras aplicáveis à atividade – NR-01, NR-06, NR-20, NR-33 e NR-35; Obrigações do empregador e do trabalhador; Ordem de Serviço; Direito de recusa diante de risco grave e iminente; Comunicação de acidentes, incidentes e condições de risco.\n\n2. RISCOS QUÍMICOS – BENZENO, TOLUENO E XILENO: Identificação dos produtos, leitura da FISPQ e da rotulagem GHS; Vias de absorção (respiratória, cutânea e digestiva); Efeitos agudos e crônicos à saúde; BENZENO – agente cancerígeno reconhecido (LINACH, grupo 1): não existe limite seguro de exposição, toda exposição deve ser reduzida ao menor nível tecnicamente possível; Proibição do uso de solventes aromáticos para limpeza da pele, de ferramentas e de EPI; Ventilação, armazenagem e manuseio seguro; Proteção respiratória adequada ao agente; Higiene pessoal e ocupacional; Exames médicos do PCMSO.\n\n3. INFLAMÁVEIS E COMBUSTÍVEIS (NR-20): Propriedades dos inflamáveis e combustíveis presentes na instalação; Atmosfera explosiva e limites de inflamabilidade; Classificação de áreas e controle das fontes de ignição; Eletricidade estática, aterramento e equalização de potencial; Permissão de Trabalho a frio e a quente; Procedimentos operacionais e de bloqueio; Vazamentos e derramamentos – ações imediatas; Plano de Resposta a Emergências da instalação.\n\n4. RISCOS FÍSICOS – RUÍDO CONTÍNUO OU INTERMITENTE: Fontes de ruído na instalação; Perda Auditiva Induzida por Ruído (PAIR); Limites de tolerância e tempo de exposição; Protetor auditivo – seleção, atenuação, colocação correta, higienização e substituição; Programa de Conservação Auditiva e audiometrias.\n\n5. RISCOS ERGONÔMICOS: Levantamento, transporte e descarga individual de materiais; Movimentos com esforço físico e sobrecarga muscular; Movimentos repetitivos de membros superiores; Posições estáticas e posturas forçadas; Organização do posto de trabalho, pausas e revezamento; Alongamento e ginástica laboral; Sinais e sintomas precoces – a quem comunicar.\n\n6. FATORES DE RISCO PSICOSSOCIAIS: Organização do trabalho, ritmo e autonomia; Falta de autonomia na execução das tarefas e seus efeitos sobre a saúde; Canais de comunicação e participação do trabalhador; Prevenção e combate ao assédio e a outras formas de violência no trabalho.\n\n7. RISCOS DE ACIDENTES: Queda de mesmo nível – organização e limpeza da área, pisos, aberturas, cabos e mangueiras, sinalização e iluminação; Queda com diferença de nível (trabalho em altura) – reconhecimento do risco, proteção coletiva, Análise de Risco e Permissão de Trabalho; somente o trabalhador capacitado conforme a NR-35 executa trabalho em altura; Espaços confinados – identificação e sinalização, atmosfera IPVS, entrada PROIBIDA sem Permissão de Entrada e Trabalho e sem capacitação conforme a NR-33.\n\n8. EPI E EPC: Equipamentos de proteção coletiva existentes na instalação; EPI por risco – capacete, óculos, protetor auditivo, luvas, calçado, proteção respiratória, vestimenta antichama e cinturão tipo paraquedista; Certificado de Aprovação (CA) e prazo de validade; Uso adequado, guarda, conservação, higienização e substituição; Inspeção antes do uso e procedimento para EPI danificado; Obrigações do empregador e do empregado quanto ao EPI.\n\n9. EMERGÊNCIAS: Alarme, rotas de fuga e ponto de encontro; Prevenção e combate a princípio de incêndio; Noções de primeiros socorros; Acionamento do socorro e comunicação interna.\n\nOBS: Treinamento de integração e informação sobre riscos ocupacionais, dirigido aos riscos inventariados no PGR do estabelecimento. NÃO substitui as capacitações específicas exigidas para trabalho em altura (NR-35), espaços confinados (NR-33) e inflamáveis e combustíveis (NR-20, conforme a classe da instalação e a função do trabalhador), nem o controle específico da exposição ocupacional ao benzeno."
  },
  "Integração SST (Reciclagem)": {
    "nr": "NR-01",
    "titulo": "CERTIFICADO DE RECICLAGEM DA INTEGRAÇÃO",
    "sigla": "Integração (Reciclagem)",
    "curso": "TREINAMENTO DE RECICLAGEM DA INTEGRAÇÃO EM SEGURANÇA DO TRABALHO – RISCOS OCUPACIONAIS E USO DE EPI",
    "baseLegal": "itens 1.4.1 e 1.7 (informação sobre riscos e capacitação) e NR-06, item 6.6.1 'd'",
    "carga": "04 horas",
    "cargaLabel": "Carga horária da turma",
    "cargaOpcoes": [
      { "h": 2, "label": "02 horas" },
      { "h": 4, "label": "04 horas — reciclagem padrão" },
      { "h": 6, "label": "06 horas" }
    ],
    "validadeMeses": 24,
    "fecho": "tendo revisado os riscos ocupacionais de suas atividades e as medidas de prevenção e de uso dos equipamentos de proteção",
    "conteudo": "Reciclagem do treinamento de integração – revisão dos riscos inventariados no PGR do estabelecimento e das medidas de prevenção, à luz da NR-01, NR-06, NR-20, NR-33 e NR-35:\n\n1. NORMAS DE SEGURANÇA E RESPONSABILIDADES: Revisão das obrigações do empregador e do trabalhador; Direito de recusa diante de risco grave e iminente; Comunicação de acidentes, incidentes e condições de risco; Mudanças no processo, nos produtos e nos procedimentos desde o último treinamento.\n\n2. RISCOS QUÍMICOS – BENZENO, TOLUENO E XILENO: Revisão da FISPQ e da rotulagem GHS; Vias de absorção e efeitos à saúde; BENZENO – agente cancerígeno (LINACH, grupo 1), sem limite seguro de exposição; Proibição do uso de solventes aromáticos para limpeza da pele e de ferramentas; Proteção respiratória, higiene ocupacional e exames do PCMSO.\n\n3. INFLAMÁVEIS E COMBUSTÍVEIS (NR-20): Revisão da classificação de áreas e do controle de fontes de ignição; Atmosfera explosiva; Eletricidade estática e aterramento; Permissão de Trabalho a frio e a quente; Vazamentos e derramamentos – ações imediatas; Plano de Resposta a Emergências da instalação.\n\n4. RISCOS FÍSICOS – RUÍDO: Revisão da PAIR, do uso correto e da conservação do protetor auditivo, do Programa de Conservação Auditiva e das audiometrias.\n\n5. RISCOS ERGONÔMICOS: Revisão de levantamento e transporte de cargas, esforço físico, movimentos repetitivos de membros superiores, posições estáticas, pausas e postura; Sinais e sintomas precoces – a quem comunicar.\n\n6. FATORES DE RISCO PSICOSSOCIAIS: Organização do trabalho e autonomia; Canais de comunicação e participação; Prevenção e combate ao assédio e a outras formas de violência no trabalho.\n\n7. RISCOS DE ACIDENTES: Queda de mesmo nível – organização, limpeza e sinalização; Trabalho em altura – reconhecimento do risco e restrição ao trabalhador capacitado conforme a NR-35; Espaços confinados – entrada PROIBIDA sem Permissão de Entrada e Trabalho e sem capacitação conforme a NR-33.\n\n8. EPI E EPC: Revisão da seleção por risco, do CA e da validade, do uso, guarda, conservação, higienização, inspeção e substituição dos equipamentos.\n\n9. EMERGÊNCIAS: Revisão do alarme, das rotas de fuga, do ponto de encontro, do combate a princípio de incêndio e do acionamento do socorro.\n\n10. ANÁLISE DOS ACIDENTES E QUASE-ACIDENTES OCORRIDOS NO PERÍODO E LIÇÕES APRENDIDAS.\n\nOBS: Treinamento de integração e informação sobre riscos ocupacionais, dirigido aos riscos inventariados no PGR do estabelecimento. NÃO substitui as capacitações específicas exigidas para trabalho em altura (NR-35), espaços confinados (NR-33) e inflamáveis e combustíveis (NR-20, conforme a classe da instalação e a função do trabalhador), nem o controle específico da exposição ocupacional ao benzeno."
  }
};
