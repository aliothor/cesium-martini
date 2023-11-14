module.exports = {
  'pre-commit': 'pnpm lint-staged',
  'commit-msg': 'pnpm commitlint ${1}',
}
