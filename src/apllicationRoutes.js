export const applicationRoutes = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    route: '/',
    description: 'Listagem de versões e changelog',
  },
  {
    label: 'Decks',
    icon: 'SwitchAccount',
    route: '/deck',
    description: "Criação de novos decks"
  },
  {
    label: 'Cards',
    icon: 'AssignmentInd',
    route: '/card',
    description: "Criação de novas cards para os decks"
  },
  {
    label: 'Assuntos / Perguntas',
    icon: 'TitleIcon',
    route: '/combinationsubject',
    description: "Criação da assuntos possíveis a serem perguntados"
  },
  {
    label: 'Qtd de cartas',
    icon: 'StyleIcon',
    route: '/combinationtype',
    description: "Criação das possibilidades de quantidades de cartas tiradas para um jogo possível"
  },
  {
    label: 'Jogos possíveis',
    icon: 'AltRouteIcon',
    route: '/combination',
    description: "Jogos possíveis a serem analisados. Casamento de pergunta X quantidade de cartas para a resposta."
  },
  {
    label: 'Jogo',
    icon: 'CasinoIcon',
    route: '/combinationinfo',
    description: "Jogo a ser analisado. Casamento de jogos que saem X perguntas"
  },
  {
    label: 'Análise do jogo',
    icon: 'PsychologyIcon',
    route: '/analysis',
    description: "Análise para o jogo"
  },
  {
    label: 'Usuário jogou',
    icon: 'VideogameAssetIcon',
    route: '/game',
    description: "O que os usuários já jogaram. Como ficaram as análises que eles receberam"
  },
  {
    label: 'Reviews',
    icon: 'RateReviewIcon',
    route: '/reviews',
    description: "O que os usuários jogaram, quando e o que acharam e opinaram das suas jogadas"
  },
  {
    label: 'Usuários',
    icon: 'PeopleAltIcon',
    route: '/users',
    description: "Quem está cadastrado no Pull Cards Tarot"
  },
]