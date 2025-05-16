import { Tag, ContentType } from '../types';

export const initialTags: Tag[] = [
  // Tech
  { id: '1', name: 'JavaScript', selected: false },
  { id: '2', name: 'React', selected: false },
  { id: '3', name: 'Python', selected: false },
  { id: '4', name: 'Data Science', selected: false },
  { id: '5', name: 'Machine Learning', selected: false },
  { id: '6', name: 'Cloud Computing', selected: false },
  { id: '7', name: 'DevOps', selected: false },
  { id: '8', name: 'Cybersecurity', selected: false },
  // Design
  { id: '9', name: 'UI Design', selected: false },
  { id: '10', name: 'UX Research', selected: false },
  { id: '11', name: 'Design Systems', selected: false },
  { id: '12', name: 'Figma', selected: false },
  { id: '13', name: 'Design Thinking', selected: false },
  { id: '14', name: 'Product Design', selected: false },
  // Business
  { id: '15', name: 'Startup', selected: false },
  { id: '16', name: 'Marketing Digital', selected: false },
  { id: '17', name: 'Growth Hacking', selected: false },
  { id: '18', name: 'Product Management', selected: false },
  { id: '19', name: 'Business Model', selected: false },
  { id: '20', name: 'Entrepreneuriat', selected: false },
];

export const initialContentTypes: ContentType[] = [
  {
    id: '1',
    title: 'Articles',
    description: 'Articles de blog, études de cas et analyses approfondies',
    selected: false
  },
  {
    id: '2',
    title: 'Outils',
    description: 'Découvrez des outils et ressources pour booster votre productivité',
    selected: false
  },
  {
    id: '3',
    title: 'Vidéos',
    description: 'Tutoriels, conférences et démonstrations en format vidéo',
    selected: true
  },
  {
    id: '4',
    title: 'Podcasts',
    description: 'Discussions et interviews avec des experts du domaine',
    selected: true
  },
  {
    id: '5',
    title: 'Newsletters',
    description: 'Les meilleures newsletters pour rester à jour',
    selected: false
  },
  {
    id: '6',
    title: 'Templates',
    description: 'Modèles et ressources prêts à l\'emploi',
    selected: true
  },
  {
    id: '7',
    title: 'Études de cas',
    description: 'Analyses détaillées de projets et success stories',
    selected: false
  },
  {
    id: '8',
    title: 'Événements',
    description: 'Conférences, meetups et workshops à ne pas manquer',
    selected: false
  },
  {
    id: '9',
    title: 'Communauté',
    description: 'Discussions et retours d\'expérience de la communauté',
    selected: false
  }
];