// Biblioteca de modelos de NR — adicione novas NRs aqui.
//
// baseLegal contém SÓ o complemento (ex.: "item 18.12"); a NR já é citada
// pelo campo "nr". validadeMeses = periodicidade do treinamento periódico
// (use 0 para suprimir a linha "Validade" no verso).
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
//           GR1 8h, GR2 12h, GR3 16h, GR4 20h (Portaria MTP 4.219/2022) — a UI tem
//           um seletor de grau de risco que preenche a carga (default GR1 = 8h).
//           Os 24 meses NÃO são reciclagem fixa: renova-se a cada posse de mandato
//           (anual + 1 recondução) e aproveita-se treino anterior de até 2 anos.
//   NR-10 — básico Segurança em Eletricidade, 40h; reciclagem BIENAL (24 meses).
//   NR-23 — proteção contra incêndios, 8h; validade 24 meses (prática da empresa;
//           treinamento de brigada segue NBR 14276/Corpo de Bombeiros, não a NR-23).
//   NR-37 — TREINAMENTO AVANÇADO em plataformas de petróleo (item 37.9.6.5), 8h com
//           1h prática obrigatória a bordo. ⚠ O RT DEVE ser ENGENHEIRO DE SEGURANÇA
//           (CREA), não Técnico (item 37.9.6.1). validade 24m = ciclo da empresa; a
//           reciclagem legal é 4h a cada 5 anos. (Integração = básico, item 37.9.6.3.)
// (NR-6/12/33 vieram dos PDFs da Vetor; baseLegal ficou vazio porque os
//  certificados citam só "em conformidade com a NR-X", sem item específico.)
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
  "NR-37": {
    "nr": "NR-37",
    "curso": "CURSO DE SEGURANÇA E SAÚDE EM PLATAFORMAS DE PETRÓLEO (TREINAMENTO AVANÇADO)",
    "baseLegal": "item 37.9.6.5",
    "carga": "08 horas",
    "validadeMeses": 24,
    "fecho": "obtendo o grau de conclusão ao final do curso",
    "conteudo": "1. Análise preliminar de riscos da tarefa (APR): conceitos e exercícios;\n2. Permissão para trabalho, a frio ou a quente, na presença de combustíveis e inflamáveis;\n3. Aditivos químicos e composição dos fluidos empregados nas operações de perfuração, completação, restauração e estimulação, quando aplicável;\n4. Noções dos sistemas de prevenção e combate a incêndio da plataforma;\n5. Acidentes com inflamáveis: suas causas e as medidas preventivas existentes na área operacional;\n6. Resposta a emergências com combustíveis e inflamáveis, segundo o Plano de Resposta a Emergências (PRE), descrito no capítulo 37.28 da NR-37;\n7. Noções de segurança de processo para plataformas;\n8. Segurança na operação das instalações elétricas em atmosferas explosivas;\n9. Atividade prática a bordo, de no mínimo uma hora, com a indicação in loco dos sistemas e equipamentos disponíveis para o combate a incêndio."
  }
};
