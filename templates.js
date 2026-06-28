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
  }
};
