import { VuetifyTiptap, VuetifyViewer, createVuetifyProTipTap } from 'vuetify-pro-tiptap'
import {
  locale, BaseKit, Bold, Italic, Underline, Heading,
  BulletList, OrderedList, Link, History } from 'vuetify-pro-tiptap'
import 'vuetify-pro-tiptap/style.css'

locale.setMessage('pt_BR', {
  'editor.bold.tooltip': 'Negrito',
  'editor.italic.tooltip': 'Itálico',
  'editor.underline.tooltip': 'Sublinhado',
  'editor.paragraph.tooltip': 'Parágrafo',
  'editor.bulletlist.tooltip': 'Lista',
  'editor.orderedlist.tooltip': 'Lista Ordenada',
  'editor.undo.tooltip': 'Desfazer',
  'editor.redo.tooltip': 'Refazer',
  'editor.link.tooltip': 'Link',
  'editor.words': 'Palavras',
  'editor.characters': 'Caracteres',
})

export const vuetifyProTipTap = createVuetifyProTipTap({
  lang: 'pt_BR',
  components: {
    VuetifyTiptap,
    VuetifyViewer
  },
  extensions: [
    BaseKit.configure({
      placeholder: {
        placeholder: 'Escreva aqui...'
      }
    }),
    Bold,
    Italic,
    Underline,
    Heading,
    BulletList,
    OrderedList,
    Link,
    History,
  ]
})
