
import { Story, Comment, Lesson } from '../types';

export const stories: Story[] = [
  {
    id: '1',
    title: {
      rw: 'Imbeba irya imyenda',
      en: 'The Mouse That Eats Clothes',
      fr: 'La souris qui mange les vêtements',
      sw: 'Panya Anayekula Nguo',
    },
    description: {
      rw: 'Inkuru y\'imbeba y\'indyarya yaryaga imyenda ikabyibuha, ikaza gufatwa igakubitwa.',
      en: 'A story of a greedy mouse that eats clothes, grows fat, gets caught, and is beaten.',
      fr: 'L\'histoire d\'une souris gourmande qui mange des vêtements, grossit, se fait attraper et se fait battre.',
      sw: 'Hadithi ya panya mlafi anayekula nguo, ananenepa, anakamatwa na kupigwa.',
    },
    coverImage: 'https://picsum.photos/seed/mouse1/400/300',
    content: [
      {
        text: {
          rw: 'Habayeho imbeba y\'umunebwe itakundaga gushaka ibyo kurya. Yabonye ko mu nzu yabagamo hari imyenda myinshi.',
          en: 'There once was a lazy mouse who did not like to look for food. It saw that in the house where it lived, there were many clothes.',
          fr: 'Il était une fois une souris paresseuse qui n\'aimait pas chercher de la nourriture. Elle a vu que dans la maison où elle vivait, il y avait beaucoup de vêtements.',
          sw: 'Hapo zamani za kale, palikuwa na panya mvivu ambaye hakupenda kutafuta chakula. Aliona kuwa ndani ya nyumba aliyoishi, kulikuwa na nguo nyingi.',
        },
        image: 'https://picsum.photos/seed/mouse_clothes/400/250',
        audio: 'audio1.mp3',
      },
      {
        text: {
          rw: 'Itangira kurya iyo myenda buhoro buhoro. Uko yarushagaho kurya, ninako yarushagaho kubyibuha no kwiyemera.',
          en: 'It began to eat the clothes slowly. The more it ate, the fatter and more arrogant it became.',
          fr: 'Elle a commencé à manger les vêtements lentement. Plus elle mangeait, plus elle devenait grosse et arrogante.',
          sw: 'Akaanza kula nguo polepole. Kadiri alivyokula, ndivyo alivyozidi kunenepa na kuwa na kiburi.',
        },
        image: 'https://picsum.photos/seed/fat_mouse/400/250',
        audio: 'audio2.mp3',
      },
      {
        text: {
          rw: 'Umunsi umwe, nyir\'inzu yaje kureba imyenda ye asanga imbeba yayimazeho. Yayitegeye umutego, irafatwa, irakubitwa cyane.',
          en: 'One day, the owner of the house came to check on his clothes and found the mouse had finished them. He set a trap for it, it was caught, and it was beaten severely.',
          fr: 'Un jour, le propriétaire de la maison est venu vérifier ses vêtements et a découvert que la souris les avait terminés. Il lui a tendu un piège, elle a été attrapée et a été sévèrement battue.',
          sw: 'Siku moja, mwenye nyumba alikuja kuangalia nguo zake na akakuta panya amezimaliza. Alimtegea mtego, akakamatwa na kupigwa sana.',
        },
        image: 'https://picsum.photos/seed/mouse_trap/400/250',
        audio: 'audio3.mp3',
      },
    ],
  },
  {
    id: '2',
    title: {
      rw: 'Imbeba n\'injangwe',
      en: 'The Mouse and the Cat',
      fr: 'La Souris et le Chat',
      sw: 'Panya na Paka',
    },
    description: {
      rw: 'Imbeba yahoraga ishondana n\'injangwe kugeza umunsi injangwe iyishe.',
      en: 'A mouse that constantly fought with a cat until the cat ended up killing it.',
      fr: 'Une souris qui se battait constamment avec un chat jusqu\'à ce que le chat finisse par la tuer.',
      sw: 'Panya aliyekuwa akipigana kila wakati na paka hadi paka akamuua.',
    },
    coverImage: 'https://picsum.photos/seed/cat1/400/300',
    content: [
        {
            text: {
                rw: "Kera habayeho imbeba n'injangwe byari abaturanyi ariko bidacana uwaka.",
                en: "Long ago, there lived a mouse and a cat who were neighbors but did not get along.",
                fr: "Il y a longtemps, vivaient une souris et un chat qui étaient voisins mais ne s'entendaient pas.",
                sw: "Hapo zamani za kale, paliishi panya na paka waliokuwa majirani lakini hawakuelewani."
            },
            image: "https://picsum.photos/seed/cat_mouse_neighbors/400/250",
            audio: "audio_cat1.mp3"
        },
        {
            text: {
                rw: "Imbeba yahoraga itega injangwe, ikayiba ibiryo, ikanayiseka. Injangwe yarayihoreye igihe kirekire.",
                en: "The mouse always provoked the cat, stole its food, and laughed at it. The cat was patient for a long time.",
                fr: "La souris provoquait toujours le chat, lui volait sa nourriture et se moquait de lui. Le chat a été patient pendant longtemps.",
                sw: "Panya daima alimchokoza paka, akamwibia chakula, na kumcheka. Paka alivumilia kwa muda mrefu."
            },
            image: "https://picsum.photos/seed/mouse_stealing/400/250",
            audio: "audio_cat2.mp3"
        },
        {
            text: {
                rw: "Umunsi umwe, injangwe yariye karungu, yirukansa imbeba, irayifata, irayica. Ubushotoranyi burakugiraho ingaruka mbi.",
                en: "One day, the cat got very angry, chased the mouse, caught it, and killed it. Provocation has bad consequences.",
                fr: "Un jour, le chat est devenu très en colère, a poursuivi la souris, l'a attrapée et l'a tuée. La provocation a de mauvaises conséquences.",
                sw: "Siku moja, paka alikasirika sana, akamfukuza panya, akamkamata, na kumuua. Uchokozi una madhara mabaya."
            },
            image: "https://picsum.photos/seed/cat_chasing/400/250",
            audio: "audio_cat3.mp3"
        }
    ]
  },
];

export const comments: Comment[] = [
  {
    id: 'c1',
    storyId: '1',
    author: 'Kalisa',
    avatar: 'https://i.pravatar.cc/150?u=kalisa',
    text: 'Iyi nkuru irigisha cyane! Abana bagomba kumenya ko ubugugu ari bubi.',
    timestamp: '2 days ago',
  },
  {
    id: 'c2',
    storyId: '1',
    author: 'Mutesi',
    avatar: 'https://i.pravatar.cc/150?u=mutesi',
    text: 'My kids loved the animation. Thank you!',
    timestamp: '1 day ago',
  },
];

export const lessons: Lesson[] = [
    {
        id: 'l1',
        category: 'children',
        title: {
            rw: 'Kubara kugeza ku 10',
            en: 'Counting to 10',
            fr: 'Compter jusqu\'à 10',
            sw: 'Kuhesabu hadi 10'
        },
        content: 'I somo ryo kwiga kubara mu Kinyarwanda.',
    },
    {
        id: 'l2',
        category: 'adults',
        title: {
            rw: 'Gucunga umutungo',
            en: 'Managing Finances',
            fr: 'Gérer les finances',
            sw: 'Kusimamia Fedha'
        },
        content: 'Amabwiriza y\'ibanze ku gucunga amafaranga yawe.',
    },
     {
        id: 'l3',
        category: 'health',
        title: {
            rw: 'Isuku ni isoko y\'ubuzima',
            en: 'Hygiene is the source of life',
            fr: 'L\'hygiène est source de vie',
            sw: 'Usafi ni chanzo cha uzima'
        },
        content: 'Ibiganiro ku isuku n\'akamaro kayo mu buzima bwa buri munsi.',
    }
];
