const fs = require('fs')
const path = require('path')
const request = require('request')

// const svgfilesPath = path.resolve('./app/files/svgfiles')
// const svgfilesPath = 'http://at.alicdn.com/t/font_571559_wsv86dcqnifcg14i.js'

// 下载iconfontsvg图标
function downloadFile(uri, filename, callback) {
  const stream = fs.createWriteStream(`./app/files/${filename}`)
  request(uri).pipe(stream).on('close', callback)
}
const fileUrl = process.argv[2]
const filename = 'svgfont.js'
downloadFile(fileUrl, filename, () => {
  svgformat('./app/files')
})

function svgformat(filePath) {
  fs.readFile(path.join(filePath, filename), 'utf8', (error, data) => {
    if (error) {
      throw error
    } else {
      // const pattern = /<symbol ("[^"]*"|'[^']*'|[^'">])*>[\s\S]*?<\/symbol>/
      // 获取svg图标数组
      const svgArr = data.split('</symbol>')
      // 最后一个为js代码忽略
      svgArr.pop()
      let svgTmp = ''
      let viewBox = ''
      svgArr.forEach((svg) => {
        const tmpPath = svg.split('<path')
        // 删除iconfont的图片的'icon-'字母，将-连接的变量转为驼峰式命名变量
        const viewBoxKey = tmpPath[0].match('id=.*"')[0].split('"')[1].replace('icon-', '').replace(/-(\w)/g, x => x.slice(1).toUpperCase())
        // 获取viewBox大小
        const viewBoxValue = tmpPath[0].match('viewBox=.*"')[0].split('"')[1]
        // const pathValue = tmpPath
        // 默认为 0 0 1024 1024的viewBox不写入文件
        if (viewBoxValue !== '0 0 1024 1024') {
          viewBox[viewBoxKey] = viewBoxValue
          viewBox += `    ${viewBoxKey}: '${viewBoxValue}',\n`
        }
        const pathArr = []
        // 第一个用来获取viewBox获取信息，后面的数据为path
        tmpPath.shift()
        tmpPath.forEach((path) => {
          // 组装为object对象
          pathArr.push(`{${path.replace(/=/g, ': ').replace('fill', ', fill').replace('></path>', '')}}`)
        })
        svgTmp += `  ${viewBoxKey}: [${pathArr}],\n`
      })
      const svgStr =
        `import iconfont from 'rn-b2b2c/app/files/font/iconfont.svg.js'\n\nexport default {\n  ...iconfont,\n  viewBox: {\n    ...iconfont.viewBox,\n${viewBox}\n  },\n${svgTmp}\n}`
      fs.writeFileSync('./app/files/font/iconfont.svg.js', svgStr, 'utf8')
      // 删除下载的文件
      fs.unlink(`./app/files/${filename}`, (err) => {
        if (err) throw err
      })
    }
  })
}
