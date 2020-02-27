const requireEffect = require.context('../effects', false, /\.vue$/);
const effectList = requireEffect.keys();

const effects = {};
const components = {};

for (const filename of effectList) {
  const name = filename.replace('./', '').replace('.vue', '');
  const type = name.substring(0, name.indexOf('-'));
  const raw = require(`!!raw-loader!~/effects/${name}`).default;
  const component = requireEffect(filename).default;

  const html = /<template>(.*?)<\/template>/g // find html between template tags
    .exec(JSON.stringify(raw))[0]
    .replace(/<\/?template>/g, '') // remove template tags
    .replace(/^\\n/, '') // remove leading linebreak
    .replace(/\\n/g, '\n') // replace escape characters
    .replace(/\\"/g, '"')
    .replace(/ :style="cssProps"/, '')
  
  const css = /<style(.*?)scoped>(.*?)<\/style>/g // find css between style tags
    .exec(JSON.stringify(raw))[0]
    .replace(/<\/?style((.*?)scoped)?>/g, '') // remove style tags
    .replace(/^\\n/, '') // remove leading linebreak
    .replace(/\\n/g, '\n'); // replace \n with newlines

  const js = /<script>(.*?)<\/script>/g
    .exec(JSON.stringify(raw))[0]
    .replace(/<\/?script>/g, '')
    .replace(/import { mapGetters } from 'vuex';/g, '')
    .replace(/(?:\\n\ \ \ \ \.\.\.mapGetters\(\[)(.*?)(?:\]\)\,)/, '')
    .replace(/(?:\\n\ \ \ \ \ cssProps\(\))(.*?)(?:\ \}\\n\ \ \ \ \ \}\\n\ \ )/, '')
    .replace(/(?:\\n\ \ props\:)(.*?)(?:\}\\n\ \ \}\,)/, '')
    .replace(/^\\n/, '')
    .replace(/\\n/g, '\n') // replace escape characters
    .replace(/\\"/g, '"')
    
  effects[name] = { name, type, html, css, js };
  components[name] = component;
}

export { effects, components };
