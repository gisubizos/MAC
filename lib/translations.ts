
import { MultilingualString } from '../types';

export const translations: Record<string, MultilingualString> = {
  // Navigation
  home: { rw: 'Ahabanza', en: 'Home', fr: 'Accueil', sw: 'Nyumbani' },
  learningHub: { rw: 'Aho Kwigira', en: 'Learning Hub', fr: 'Centre d\'Apprentissage', sw: 'Kituo cha Kujifunza' },
  createStory: { rw: 'Kurema Inkuru', en: 'Create Story', fr: 'Créer une Histoire', sw: 'Tunga Hadithi' },
  favorites: { rw: 'Ibyo Nkunda', en: 'Favorites', fr: 'Favoris', sw: 'Vipendwa' },
  profile: { rw: 'Porofayili', en: 'Profile', fr: 'Profil', sw: 'Wasifu' },

  // Home Page
  storiesForYou: { rw: 'Inkuru zaguteguriwe', en: 'Stories for You', fr: 'Histoires pour vous', sw: 'Hadithi zako' },
  popularStories: { rw: 'Inkuru zikunzwe', en: 'Popular Stories', fr: 'Histoires populaires', sw: 'Hadithi Maarufu' },

  // Story Detail Page
  read: { rw: 'Soma', en: 'Read', fr: 'Lire', sw: 'Soma' },
  comments: { rw: 'Ibitekerezo', en: 'Comments', fr: 'Commentaires', sw: 'Maoni' },
  leaveComment: { rw: 'Siga igitekerezo', en: 'Leave a comment', fr: 'Laisser un commentaire', sw: 'Acha maoni' },
  post: { rw: 'Ohereza', en: 'Post', fr: 'Publier', sw: 'Tuma' },
  downloadStory: { rw: 'Manura Inkuru', en: 'Download Story', fr: 'Télécharger l\'histoire', sw: 'Pakua Hadithi' },
  addToFavorites: { rw: 'Ongeraho mu byo ukunda', en: 'Add to Favorites', fr: 'Ajouter aux favoris', sw: 'Ongeza kwa Vipendwa' },
  removeFromFavorites: { rw: 'Kura mu byo ukunda', en: 'Remove from Favorites', fr: 'Retirer des favoris', sw: 'Ondoa kwenye Vipendwa' },

  // Learning Hub
  lessonsForChildren: { rw: 'Amasomo y\'abana', en: 'Lessons for Children', fr: 'Leçons pour enfants', sw: 'Masomo ya Watoto' },
  lessonsForAdults: { rw: 'Amasomo y\'abakuru', en: 'Lessons for Adults', fr: 'Leçons pour adultes', sw: 'Masomo ya Watu Wazima' },
  healthEducation: { rw: 'Ubuzima bw\'imyororokere', en: 'Health Education', fr: 'Éducation à la santé', sw: 'Elimu ya Afya' },

  // Profile Page
  logout: { rw: 'Sobanukirwa', en: 'Log Out', fr: 'Déconnexion', sw: 'Toka' },
  language: { rw: 'Ururimi', en: 'Language', fr: 'Langue', sw: 'Lugha' },
  theme: { rw: 'Insanganyamatsiko', en: 'Theme', fr: 'Thème', sw: 'Mandhari' },
  light: { rw: 'Umucyo', en: 'Light', fr: 'Clair', sw: 'Mwangaza' },
  dark: { rw: 'Umwijima', en: 'Dark', fr: 'Sombre', sw: 'Giza' },
  parentalControls: { rw: 'Igenzura ry\'ababyeyi', en: 'Parental Controls', fr: 'Contrôles parentaux', sw: 'Udhibiti wa Wazazi' },

  // Login Page
  welcomeTo: { rw: 'Ikaze kuri', en: 'Welcome to', fr: 'Bienvenue à', sw: 'Karibu' },
  login: { rw: 'Injira', en: 'Login', fr: 'Connexion', sw: 'Ingia' },
  username: { rw: 'Izina ukoresha', en: 'Username', fr: 'Nom d\'utilisateur', sw: 'Jina la mtumiaji' },
  password: { rw: 'Ijambobanga', en: 'Password', fr: 'Mot de passe', sw: 'Nenosiri' },
  
  // Create Story Page
  createYourOwnStory: { rw: 'Rema inkuru yawe bwite', en: 'Create Your Own Story', fr: 'Créez votre propre histoire', sw: 'Tunga hadithi yako mwenyewe' },
  storyPrompt: { rw: 'Tanga igitekerezo cy\'inkuru', en: 'Story Prompt', fr: 'Idée d\'histoire', sw: 'Wazo la hadithi' },
  promptPlaceholder: { rw: 'Urugero: Inkuru y\'ingwe n\'urukwavu byigisha isomo ry\'ubucuti.', en: 'E.g., A story about a leopard and a rabbit learning about friendship.', fr: 'Ex: Une histoire sur un léopard et un lapin qui apprennent l\'amitié.', sw: 'Mfano: Hadithi kuhusu chui na sungura wanaojifunza kuhusu urafiki.' },
  generateStory: { rw: 'Rema Inkuru', en: 'Generate Story', fr: 'Générer l\'histoire', sw: 'Tengeneza Hadithi' },
  generating: { rw: 'Turimo kurema inkuru yawe...', en: 'Generating your story...', fr: 'Création de votre histoire...', sw: 'Inatengeneza hadithi yako...' },
  yourGeneratedStory: { rw: 'Inkuru yawe yaremwe', en: 'Your Generated Story', fr: 'Votre histoire générée', sw: 'Hadithi yako iliyotengenezwa' },
};
