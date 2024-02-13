export default {
  mask: ['(##) J###-####', '(##) #####-####'],
  tokens: {
    J: { pattern: /(-|[0-9])/ },
  },
  reversed: false,
  eager: false,
}
