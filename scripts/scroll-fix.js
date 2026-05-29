hexo.extend.filter.register('after_render:html', function (str, data) {
  const style = '<style>body{overflow-y:scroll!important}body.fullscreen{overflow:hidden!important}#loading{pointer-events:none}footer#footer{position:relative!important;z-index:2!important}main{padding-bottom:3rem!important}</style>';
  return str.replace('</head>', style + '</head>');
});
