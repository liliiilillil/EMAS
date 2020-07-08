const upstreamTransformer = require('metro/src/transformer')
const sassTransformer = require('react-native-sass-transformer')

module.exports.transform = ({ src, filename, options }) => {
  if (filename.endsWith('.scss')) {
    return sassTransformer.transform({ src, filename, options })
  }
  return upstreamTransformer.transform({ src, filename, options })
}